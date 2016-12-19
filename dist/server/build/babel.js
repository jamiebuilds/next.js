'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var babel = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(dir) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$dev = _ref2.dev,
        dev = _ref2$dev === undefined ? false : _ref2$dev;

    var src, _transform, code, file;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dir = (0, _path.resolve)(dir);

            src = void 0;
            _context.prev = 2;
            _context.next = 5;
            return (0, _fs.readFile)((0, _path.join)(dir, 'pages', '_document.js'), 'utf8');

          case 5:
            src = _context.sent;
            _context.next = 17;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](2);

            if (!(_context.t0.code === 'ENOENT')) {
              _context.next = 16;
              break;
            }

            _context.next = 13;
            return (0, _fs.readFile)((0, _path.join)(__dirname, '..', '..', 'pages', '_document.js'), 'utf8');

          case 13:
            src = _context.sent;
            _context.next = 17;
            break;

          case 16:
            throw _context.t0;

          case 17:
            _transform = (0, _babelCore.transform)(src, {
              babelrc: false,
              sourceMaps: dev ? 'inline' : false,
              presets: ['es2015', 'react'],
              plugins: [require.resolve('babel-plugin-react-require'), require.resolve('babel-plugin-transform-async-to-generator'), require.resolve('babel-plugin-transform-object-rest-spread'), require.resolve('babel-plugin-transform-class-properties'), require.resolve('babel-plugin-transform-runtime'), [require.resolve('babel-plugin-module-resolver'), {
                alias: {
                  'babel-runtime': babelRuntimePath,
                  react: require.resolve('react'),
                  'next/link': require.resolve('../../lib/link'),
                  'next/css': require.resolve('../../lib/css'),
                  'next/head': require.resolve('../../lib/head'),
                  'next/document': require.resolve('../../server/document')
                }
              }]]
            }), code = _transform.code;
            file = (0, _path.join)(dir, '.next', 'dist', 'pages', '_document.js');
            _context.next = 21;
            return (0, _mkdirpThen2.default)((0, _path.dirname)(file));

          case 21:
            _context.next = 23;
            return (0, _fs.writeFile)(file, code);

          case 23:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 8]]);
  }));

  return function babel(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.watch = watch;

var _path = require('path');

var _fs = require('mz/fs');

var _babelCore = require('babel-core');

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _mkdirpThen = require('mkdirp-then');

var _mkdirpThen2 = _interopRequireDefault(_mkdirpThen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelRuntimePath = require.resolve('babel-runtime/package').replace(/[\\/]package\.json$/, '');

exports.default = babel;
function watch(dir) {
  return _chokidar2.default.watch('pages/_document.js', {
    cwd: dir,
    ignoreInitial: true
  });
}