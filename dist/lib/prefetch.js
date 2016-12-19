'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

exports.prefetch = prefetch;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _link = require('./link');

var _link2 = _interopRequireDefault(_link);

var _url = require('url');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Messenger = function () {
  function Messenger() {
    var _this = this;

    (0, _classCallCheck3.default)(this, Messenger);

    this.id = 0;
    this.callacks = {};
    this.serviceWorkerReadyCallbacks = [];
    this.serviceWorkerState = null;

    navigator.serviceWorker.addEventListener('message', function (_ref) {
      var data = _ref.data;

      if (data.action !== 'REPLY') return;
      if (_this.callacks[data.replyFor]) {
        _this.callacks[data.replyFor](data);
      }
    });

    // Reset the cache always.
    // Sometimes, there's an already running service worker with cached requests.
    // If the app doesn't use any prefetch calls, `ensureInitialized` won't get
    // called and cleanup resources.
    // So, that's why we do this.
    this._resetCache();
  }

  (0, _createClass3.default)(Messenger, [{
    key: 'send',
    value: function send(payload, cb) {
      var _this2 = this;

      if (this.serviceWorkerState === 'REGISTERED') {
        this._send(payload, cb);
      } else {
        this.serviceWorkerReadyCallbacks.push(function () {
          _this2._send(payload, cb);
        });
      }
    }
  }, {
    key: '_send',
    value: function _send(payload) {
      var _this3 = this;

      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      var id = this.id++;
      var newPayload = (0, _extends3.default)({}, payload, { id: id });

      this.callacks[id] = function (data) {
        if (data.error) {
          cb(data.error);
        } else {
          cb(null, data.result);
        }

        delete _this3.callacks[id];
      };

      navigator.serviceWorker.controller.postMessage(newPayload);
    }
  }, {
    key: '_resetCache',
    value: function _resetCache(cb) {
      var _this4 = this;

      var reset = function reset() {
        _this4._send({ action: 'RESET' }, cb);
      };

      if (navigator.serviceWorker.controller) {
        reset();
      } else {
        navigator.serviceWorker.oncontrollerchange = reset;
      }
    }
  }, {
    key: 'ensureInitialized',
    value: function ensureInitialized() {
      var _this5 = this;

      if (this.serviceWorkerState) {
        return;
      }

      this.serviceWorkerState = 'REGISTERING';
      navigator.serviceWorker.register('/_next-prefetcher.js');

      // Reset the cache after registered
      // We don't need to have any old caches since service workers lives beyond
      // life time of the webpage.
      // With this prefetching won't work 100% if multiple pages of the same app
      // loads in the same browser in same time.
      // Basically, cache will only have prefetched resourses for the last loaded
      // page of a given app.
      // We could mitigate this, when we add a hash to a every file we fetch.
      this._resetCache(function (err) {
        if (err) throw err;
        _this5.serviceWorkerState = 'REGISTERED';
        _this5.serviceWorkerReadyCallbacks.forEach(function (cb) {
          return cb();
        });
        _this5.serviceWorkerReadyCallbacks = [];
      });
    }
  }]);
  return Messenger;
}();

function hasServiceWorkerSupport() {
  return typeof navigator !== 'undefined' && navigator.serviceWorker;
}

var PREFETCHED_URLS = {};
var messenger = void 0;

if (hasServiceWorkerSupport()) {
  messenger = new Messenger();
}

function prefetch(href) {
  if (!hasServiceWorkerSupport()) return;
  if (!(0, _link.isLocal)(href)) return;

  // Register the service worker if it's not.
  messenger.ensureInitialized();

  var _urlParse = (0, _url.parse)(href),
      pathname = _urlParse.pathname;
  // Add support for the index page

  var url = '/_next/pages' + pathname;
  if (PREFETCHED_URLS[url]) return;

  messenger.send({ action: 'ADD_URL', url: url });
  PREFETCHED_URLS[url] = true;
}

var LinkPrefetch = function (_React$Component) {
  (0, _inherits3.default)(LinkPrefetch, _React$Component);

  function LinkPrefetch() {
    (0, _classCallCheck3.default)(this, LinkPrefetch);
    return (0, _possibleConstructorReturn3.default)(this, (LinkPrefetch.__proto__ || (0, _getPrototypeOf2.default)(LinkPrefetch)).apply(this, arguments));
  }

  (0, _createClass3.default)(LinkPrefetch, [{
    key: 'render',
    value: function render() {
      var href = this.props.href;

      if (this.props.prefetch !== false) {
        prefetch(href);
      }

      return _react2.default.createElement(_link2.default, this.props);
    }
  }]);
  return LinkPrefetch;
}(_react2.default.Component);

exports.default = LinkPrefetch;