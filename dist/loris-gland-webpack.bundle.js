/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_2__);

/**
 * Module dependencies.
 */




var debug = __webpack_require__(12)('gland:server');


/**
 * Normalize a port into a number, string, or false.
 */

var normalizePort = function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};
/**
 * Event listener for HTTP server "error" event.
 */


var onError = function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port; // handle specific listen errors with friendly messages

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;

    default:
      throw error;
  }
};
/**
 * Event listener for HTTP server "listening" event.
 */


var onListening = function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
};
/**
 * Get port from environment and store in Express.
 */


var port = normalizePort(process.env.PORT || _config__WEBPACK_IMPORTED_MODULE_1__["default"].port.server);
_app__WEBPACK_IMPORTED_MODULE_0__["default"].set('port', port);
/**
 * Create HTTP server.
 */

var server = http__WEBPACK_IMPORTED_MODULE_2___default.a.createServer(_app__WEBPACK_IMPORTED_MODULE_0__["default"]);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(morgan__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _routes_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);

/**
 * Module dependencies.
 */







/**
 * Express.js server.
 */

var app = express__WEBPACK_IMPORTED_MODULE_0___default()();
app.use(morgan__WEBPACK_IMPORTED_MODULE_3___default()('dev'));
app.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.json());
app.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.urlencoded({
  extended: false
}));
app.use(cookie_parser__WEBPACK_IMPORTED_MODULE_4___default()());
app.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.static(path__WEBPACK_IMPORTED_MODULE_2___default.a.join(__dirname, 'public')));
app.use('/', _routes_index__WEBPACK_IMPORTED_MODULE_5__["default"]);

var server = __webpack_require__(8).Server(app);
/**
 * Socket.io websockets.
 */


var io = __webpack_require__(9)(server); // add socket.io 'websockets'.


server.listen(_config__WEBPACK_IMPORTED_MODULE_1__["default"].port.socket); // listen for websockets on port 6660

io.on('connection', function (socket) {
  console.log('[*] Websocket connection found!' + '\n');

  var client = __webpack_require__(10);
});
/* harmony default export */ __webpack_exports__["default"] = (app);
/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  app: {
    name: 'Gland',
    version: '0.0.1',
    info: 'Web Service'
  },
  ip: {
    server: '0.0.0.0'
  },
  port: {
    server: 5000,
    socket: 6660
  },
  security: {
    log: {
      enabled: false,
      fileName: 'gland_log'
    },
    cookie: {
      secret: '',
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week cookie age.

    }
  },
  websocket: {
    use: 'development',
    deployment: ['ws://loris.ca', 'wss://loris.ca', 'http://loris.ca', 'https://loris.ca'],
    development: ['ws://localhost:6660', 'wss://localhost:6660', 'http://localhost:6660', 'https://localhost:6660']
  }
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);



var router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();
/* Start of GET REQUESTS */
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "socketHandler", function() { return socketHandler; });
/* harmony import */ var _client_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _client_model__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_client_model__WEBPACK_IMPORTED_MODULE_0__);



/**
 * Websocket event handlers.
 */

function socketHandler(socket) {}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ })
/******/ ]);