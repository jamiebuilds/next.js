/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	/* global self */

	var CACHE_NAME = 'next-prefetcher-v1';
	var log = () => {};

	self.addEventListener('install', () => {
	  log('Installing Next Prefetcher');
	});

	self.addEventListener('activate', e => {
	  log('Activated Next Prefetcher');
	  e.waitUntil(Promise.all([resetCache(), notifyClients()]));
	});

	self.addEventListener('fetch', e => {
	  e.respondWith(getResponse(e.request));
	});

	self.addEventListener('message', e => {
	  switch (e.data.action) {
	    case 'ADD_URL':
	      {
	        log('CACHING ', e.data.url);
	        sendReply(e, cacheUrl(e.data.url));
	        break;
	      }
	    case 'RESET':
	      {
	        log('RESET');
	        sendReply(e, resetCache());
	        break;
	      }
	    default:
	      console.error('Unknown action: ' + e.data.action);
	  }
	});

	function sendReply(e, result) {
	  var payload = { action: 'REPLY', actionType: e.data.action, replyFor: e.data.id };
	  result.then(result => {
	    payload.result = result;
	    e.source.postMessage(payload);
	  }).catch(error => {
	    payload.error = error.message;
	    e.source.postMessage(payload);
	  });
	}

	function cacheUrl(url) {
	  var req = new self.Request(url, {
	    mode: 'no-cors',
	    headers: {
	      'Accept': 'application/json'
	    }
	  });

	  return self.caches.open(CACHE_NAME).then(cache => {
	    return self.fetch(req).then(res => cache.put(req, res));
	  });
	}

	function getResponse(req) {
	  return self.caches.open(CACHE_NAME).then(cache => cache.match(req)).then(res => {
	    if (res) {
	      log('CACHE HIT: ' + req.url);
	      return res;
	    } else {
	      log('CACHE MISS: ' + req.url);
	      return self.fetch(req);
	    }
	  });
	}

	function resetCache() {
	  var cache = void 0;

	  return self.caches.open(CACHE_NAME).then(c => {
	    cache = c;
	    return cache.keys();
	  }).then(function (items) {
	    var deleteAll = items.map(item => cache.delete(item));
	    return Promise.all(deleteAll);
	  });
	}

	function notifyClients() {
	  return self.clients.claim().then(() => self.clients.matchAll()).then(clients => {
	    var notifyAll = clients.map(client => {
	      return client.postMessage({ action: 'NEXT_PREFETCHER_ACTIVATED' });
	    });
	    return Promise.all(notifyAll);
	  });
	}

/***/ }
/******/ ]);