'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require('path');

var _url = require('url');

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _send = require('send');

var _send2 = _interopRequireDefault(_send);

var _render = require('./render');

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _hotReloader = require('./hot-reloader');

var _hotReloader2 = _interopRequireDefault(_hotReloader);

var _resolve = require('./resolve');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Server = function () {
  function Server() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$dir = _ref.dir,
        dir = _ref$dir === undefined ? '.' : _ref$dir,
        _ref$dev = _ref.dev,
        dev = _ref$dev === undefined ? false : _ref$dev,
        _ref$staticMarkup = _ref.staticMarkup,
        staticMarkup = _ref$staticMarkup === undefined ? false : _ref$staticMarkup,
        _ref$quiet = _ref.quiet,
        quiet = _ref$quiet === undefined ? false : _ref$quiet;

    (0, _classCallCheck3.default)(this, Server);

    this.dir = (0, _path.resolve)(dir);
    this.dev = dev;
    this.quiet = quiet;
    this.renderOpts = { dir: this.dir, dev: dev, staticMarkup: staticMarkup };
    this.router = new _router2.default();
    this.hotReloader = dev ? new _hotReloader2.default(this.dir) : null;
    this.http = null;

    this.defineRoutes();
  }

  (0, _createClass3.default)(Server, [{
    key: 'getRequestHandler',
    value: function getRequestHandler() {
      var _this = this;

      return function (req, res) {
        _this.run(req, res).catch(function (err) {
          if (!_this.quiet) console.error(err);
          res.statusCode = 500;
          res.end('error');
        });
      };
    }
  }, {
    key: 'prepare',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.hotReloader) {
                  _context.next = 3;
                  break;
                }

                _context.next = 3;
                return this.hotReloader.start();

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function prepare() {
        return _ref2.apply(this, arguments);
      }

      return prepare;
    }()
  }, {
    key: 'close',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.hotReloader) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return this.hotReloader.stop();

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function close() {
        return _ref3.apply(this, arguments);
      }

      return close;
    }()
  }, {
    key: 'defineRoutes',
    value: function defineRoutes() {
      var _this2 = this;

      this.router.get('/_next-prefetcher.js', function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, params) {
          var p;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  p = (0, _path.join)(__dirname, '../client/next-prefetcher-bundle.js');
                  _context3.next = 3;
                  return _this2.serveStatic(req, res, p);

                case 3:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this2);
        }));

        return function (_x2, _x3, _x4) {
          return _ref4.apply(this, arguments);
        };
      }());

      this.router.get('/_next/main.js', function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, params) {
          var p;
          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  p = (0, _path.join)(_this2.dir, '.next/main.js');
                  _context4.next = 3;
                  return _this2.serveStatic(req, res, p);

                case 3:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this2);
        }));

        return function (_x5, _x6, _x7) {
          return _ref5.apply(this, arguments);
        };
      }());

      this.router.get('/_next/commons.js', function () {
        var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res, params) {
          var p;
          return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  p = (0, _path.join)(_this2.dir, '.next/commons.js');
                  _context5.next = 3;
                  return _this2.serveStatic(req, res, p);

                case 3:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, _this2);
        }));

        return function (_x8, _x9, _x10) {
          return _ref6.apply(this, arguments);
        };
      }());

      this.router.get('/_next/pages/:path*', function () {
        var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(req, res, params) {
          var paths, pathname;
          return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  paths = params.path || [];
                  pathname = '/' + paths.join('/');
                  _context6.next = 4;
                  return _this2.renderJSON(res, pathname);

                case 4:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, _this2);
        }));

        return function (_x11, _x12, _x13) {
          return _ref7.apply(this, arguments);
        };
      }());

      this.router.get('/_next/:path+', function () {
        var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(req, res, params) {
          var p;
          return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  p = _path.join.apply(undefined, [__dirname, '..', 'client'].concat((0, _toConsumableArray3.default)(params.path || [])));
                  _context7.next = 3;
                  return _this2.serveStatic(req, res, p);

                case 3:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, _this2);
        }));

        return function (_x14, _x15, _x16) {
          return _ref8.apply(this, arguments);
        };
      }());
      this.router.get('/static/:path+', function () {
        var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(req, res, params) {
          var p;
          return _regenerator2.default.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  p = _path.join.apply(undefined, [_this2.dir, 'static'].concat((0, _toConsumableArray3.default)(params.path || [])));
                  _context8.next = 3;
                  return _this2.serveStatic(req, res, p);

                case 3:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, _this2);
        }));

        return function (_x17, _x18, _x19) {
          return _ref9.apply(this, arguments);
        };
      }());

      this.router.get('/:path*', function () {
        var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(req, res) {
          var _parse, pathname, query;

          return _regenerator2.default.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _parse = (0, _url.parse)(req.url, true), pathname = _parse.pathname, query = _parse.query;
                  _context9.next = 3;
                  return _this2.render(req, res, pathname, query);

                case 3:
                case 'end':
                  return _context9.stop();
              }
            }
          }, _callee9, _this2);
        }));

        return function (_x20, _x21) {
          return _ref10.apply(this, arguments);
        };
      }());
    }
  }, {
    key: 'start',
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(port) {
        var _this3 = this;

        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this.prepare();

              case 2:
                this.http = _http2.default.createServer(this.getRequestHandler());
                _context10.next = 5;
                return new _promise2.default(function (resolve, reject) {
                  _this3.http.listen(port, function (err) {
                    if (err) return reject(err);
                    resolve();
                  });
                });

              case 5:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function start(_x22) {
        return _ref11.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: 'run',
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(req, res) {
        var fn;
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!this.hotReloader) {
                  _context11.next = 3;
                  break;
                }

                _context11.next = 3;
                return this.hotReloader.run(req, res);

              case 3:
                fn = this.router.match(req, res);

                if (!fn) {
                  _context11.next = 9;
                  break;
                }

                _context11.next = 7;
                return fn();

              case 7:
                _context11.next = 11;
                break;

              case 9:
                _context11.next = 11;
                return this.render404(req, res);

              case 11:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function run(_x23, _x24) {
        return _ref12.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: 'render',
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(req, res, pathname, query) {
        var html;
        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this.renderToHTML(req, res, pathname, query);

              case 2:
                html = _context12.sent;

                (0, _render.sendHTML)(res, html);

              case 4:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function render(_x25, _x26, _x27, _x28) {
        return _ref13.apply(this, arguments);
      }

      return render;
    }()
  }, {
    key: 'renderToHTML',
    value: function () {
      var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13(req, res, pathname, query) {
        var compilationErr;
        return _regenerator2.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                if (!this.dev) {
                  _context13.next = 5;
                  break;
                }

                compilationErr = this.getCompilationError(pathname);

                if (!compilationErr) {
                  _context13.next = 5;
                  break;
                }

                res.statusCode = 500;
                return _context13.abrupt('return', this.renderErrorToHTML(compilationErr, req, res, pathname, query));

              case 5:
                _context13.prev = 5;
                _context13.next = 8;
                return (0, _render.renderToHTML)(req, res, pathname, query, this.renderOpts);

              case 8:
                return _context13.abrupt('return', _context13.sent);

              case 11:
                _context13.prev = 11;
                _context13.t0 = _context13['catch'](5);

                if (!(_context13.t0.code === 'ENOENT')) {
                  _context13.next = 18;
                  break;
                }

                res.statusCode = 404;
                return _context13.abrupt('return', this.renderErrorToHTML(null, req, res, pathname, query));

              case 18:
                if (!this.quiet) console.error(_context13.t0);
                res.statusCode = 500;
                return _context13.abrupt('return', this.renderErrorToHTML(_context13.t0, req, res, pathname, query));

              case 21:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this, [[5, 11]]);
      }));

      function renderToHTML(_x29, _x30, _x31, _x32) {
        return _ref14.apply(this, arguments);
      }

      return renderToHTML;
    }()
  }, {
    key: 'renderError',
    value: function () {
      var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14(err, req, res, pathname, query) {
        var html;
        return _regenerator2.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return this.renderErrorToHTML(err, req, res, pathname, query);

              case 2:
                html = _context14.sent;

                (0, _render.sendHTML)(res, html);

              case 4:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function renderError(_x33, _x34, _x35, _x36, _x37) {
        return _ref15.apply(this, arguments);
      }

      return renderError;
    }()
  }, {
    key: 'renderErrorToHTML',
    value: function () {
      var _ref16 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee15(err, req, res, pathname, query) {
        var compilationErr;
        return _regenerator2.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if (!this.dev) {
                  _context15.next = 5;
                  break;
                }

                compilationErr = this.getCompilationError('/_error');

                if (!compilationErr) {
                  _context15.next = 5;
                  break;
                }

                res.statusCode = 500;
                return _context15.abrupt('return', (0, _render.renderErrorToHTML)(compilationErr, req, res, pathname, query, this.renderOpts));

              case 5:
                _context15.prev = 5;
                _context15.next = 8;
                return (0, _render.renderErrorToHTML)(err, req, res, pathname, query, this.renderOpts);

              case 8:
                return _context15.abrupt('return', _context15.sent);

              case 11:
                _context15.prev = 11;
                _context15.t0 = _context15['catch'](5);

                if (!this.dev) {
                  _context15.next = 19;
                  break;
                }

                if (!this.quiet) console.error(_context15.t0);
                res.statusCode = 500;
                return _context15.abrupt('return', (0, _render.renderErrorToHTML)(_context15.t0, req, res, pathname, query, this.renderOpts));

              case 19:
                throw _context15.t0;

              case 20:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee15, this, [[5, 11]]);
      }));

      function renderErrorToHTML(_x38, _x39, _x40, _x41, _x42) {
        return _ref16.apply(this, arguments);
      }

      return renderErrorToHTML;
    }()
  }, {
    key: 'render404',
    value: function () {
      var _ref17 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee16(req, res) {
        var _parse2, pathname, query;

        return _regenerator2.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _parse2 = (0, _url.parse)(req.url, true), pathname = _parse2.pathname, query = _parse2.query;

                res.statusCode = 404;
                this.renderErrorToHTML(null, req, res, pathname, query);

              case 3:
              case 'end':
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function render404(_x43, _x44) {
        return _ref17.apply(this, arguments);
      }

      return render404;
    }()
  }, {
    key: 'renderJSON',
    value: function () {
      var _ref18 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee17(res, page) {
        var compilationErr;
        return _regenerator2.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                if (!this.dev) {
                  _context17.next = 4;
                  break;
                }

                compilationErr = this.getCompilationError(page);

                if (!compilationErr) {
                  _context17.next = 4;
                  break;
                }

                return _context17.abrupt('return', this.renderErrorJSON(compilationErr, res));

              case 4:
                _context17.prev = 4;
                _context17.next = 7;
                return (0, _render.renderJSON)(res, page, this.renderOpts);

              case 7:
                _context17.next = 19;
                break;

              case 9:
                _context17.prev = 9;
                _context17.t0 = _context17['catch'](4);

                if (!(_context17.t0.code === 'ENOENT')) {
                  _context17.next = 16;
                  break;
                }

                res.statusCode = 404;
                return _context17.abrupt('return', this.renderErrorJSON(null, res));

              case 16:
                if (!this.quiet) console.error(_context17.t0);
                res.statusCode = 500;
                return _context17.abrupt('return', this.renderErrorJSON(_context17.t0, res));

              case 19:
              case 'end':
                return _context17.stop();
            }
          }
        }, _callee17, this, [[4, 9]]);
      }));

      function renderJSON(_x45, _x46) {
        return _ref18.apply(this, arguments);
      }

      return renderJSON;
    }()
  }, {
    key: 'renderErrorJSON',
    value: function () {
      var _ref19 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee18(err, res) {
        var compilationErr;
        return _regenerator2.default.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                if (!this.dev) {
                  _context18.next = 5;
                  break;
                }

                compilationErr = this.getCompilationError('/_error');

                if (!compilationErr) {
                  _context18.next = 5;
                  break;
                }

                res.statusCode = 500;
                return _context18.abrupt('return', (0, _render.renderErrorJSON)(compilationErr, res, this.renderOpts));

              case 5:
                return _context18.abrupt('return', (0, _render.renderErrorJSON)(err, res, this.renderOpts));

              case 6:
              case 'end':
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function renderErrorJSON(_x47, _x48) {
        return _ref19.apply(this, arguments);
      }

      return renderErrorJSON;
    }()
  }, {
    key: 'serveStatic',
    value: function serveStatic(req, res, path) {
      var _this4 = this;

      return new _promise2.default(function (resolve, reject) {
        (0, _send2.default)(req, path).on('error', function (err) {
          if (err.code === 'ENOENT') {
            _this4.render404(req, res).then(resolve, reject);
          } else {
            reject(err);
          }
        }).pipe(res).on('finish', resolve);
      });
    }
  }, {
    key: 'getCompilationError',
    value: function getCompilationError(page) {
      if (!this.hotReloader) return;

      var errors = this.hotReloader.getCompilationErrors();
      if (!errors.size) return;

      var id = (0, _path.join)(this.dir, '.next', 'bundles', 'pages', page);
      var p = (0, _resolve.resolveFromList)(id, errors.keys());
      if (p) return errors.get(p)[0];
    }
  }]);
  return Server;
}();

exports.default = Server;