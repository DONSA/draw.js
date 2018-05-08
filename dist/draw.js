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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ ({

/***/ "./src/Draw.js":
/*!*********************!*\
  !*** ./src/Draw.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Draw; });\n/* harmony import */ var _Vector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector.js */ \"./src/Vector.js\");\n\n\nwindow.width = undefined\nwindow.height = undefined\n\n/**\n * Draw class\n */\nclass Draw {\n\n    constructor() {\n        this.pixelDensity = Math.ceil(window.devicePixelRatio) || 1\n        this.canvas = undefined\n        this.ctx = undefined\n        this.lastFrameTime = window.performance.now()\n        this.targetFrameRate = 60\n        this.frameRate = 0\n\n        this.events = this.getDeafultEvents()\n\n        this.doStroke = true\n        this.doFill = true\n\n        this.setup()\n        this.draw()\n    }\n\n    setup() {\n        this.bindGlobalFunctions()\n        this.bindGlobalEvents()\n        createCanvas(600, 600)\n\n        if (typeof window.setup === 'function') {\n            window.setup()\n        }\n    }\n\n    draw() {\n        let now = window.performance.now()\n        let timeSinceLast = now - this.lastFrameTime\n        let targetTimeBetweenFrames = 1000 / this.targetFrameRate\n\n        const epsilon = 5\n        if (timeSinceLast >= targetTimeBetweenFrames - epsilon ) {\n            this.frameRate = 1000.0 / (now - this.lastFrameTime)\n            this.lastFrameTime = now\n            window.draw()\n        }\n\n        window.requestAnimationFrame(() => this.draw())\n    }\n\n    bindGlobalFunctions() {\n        for (let prop in Draw.prototype) {\n            if (typeof Draw.prototype[prop] === 'function') {\n                if (prop in window) {\n                    console.log(`global '${prop}' already exists`)\n                    continue\n                }\n\n                window[prop] = Draw.prototype[prop].bind(this)\n            } else {\n                window[prop] = Draw.prototype[prop]\n            }\n        }\n    }\n\n    bindGlobalEvents() {\n        for (var e in this.events) {\n            let fx = this['on' + e.capitalize()]\n\n            if (fx) {\n                let m = fx.bind(this)\n                window.addEventListener(e, m)\n                this.events[e] = m\n            }\n        }\n    }\n\n    getDeafultEvents() {\n        return {\n            'mousemove': null,\n            'mousedown': null,\n            'mouseup': null,\n            'dragend': null,\n            'dragover': null,\n            'click': null,\n            'mouseover': null,\n            'mouseout': null,\n            'keydown': null,\n            'keyup': null,\n            'keypress': null,\n            'touchstart': null,\n            'touchmove': null,\n            'touchend': null,\n            'resize': null,\n            'blur': null\n        }\n    }\n\n    setProperty(prop, value) {\n        this[prop] = value\n        window[prop] = value\n    }\n}\n\nDraw.prototype.keyCode = 0\n\nDraw.prototype.noStroke = function() {\n    this.setProperty('doStroke', false)\n}\n\nDraw.prototype.fill = function(r, g, b, a = 1) {\n    this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`\n}\n\nDraw.prototype.rect = function(x, y, w, h, color = '#fffff', lineWidth = 0.0001) {\n    this.ctx.save()\n    this.ctx.fillRect(x, y, w, h)\n    this.ctx.restore()\n\n    if (!this.doStroke) {\n        return\n    }\n\n    let vals = canvas.modeAdjust(x, y, w, h, 'corner')\n    // Translate the line by (0.5, 0.5) to draw a crisp rectangle border\n    if (this.doStroke && this.ctx.lineWidth % 2 === 1) {\n        this.ctx.translate(0.5, 0.5)\n    }\n    this.ctx.beginPath()\n\n    // No rounded corners\n    this.ctx.rect(vals.x, vals.y, vals.w, vals.h)\n    this.ctx.stroke()\n\n    if (this.doStroke && this.ctx.lineWidth % 2 === 1) {\n        this.ctx.translate(-0.5, -0.5);\n    }\n}\n\nDraw.prototype.background = function(r, g, b, a = 1) {\n    if (arguments.length === 1) {\n        g = r\n        b = r\n    }\n\n    this.ctx.save()\n    this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`\n    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)\n    this.ctx.restore()\n}\n\nDraw.prototype.constrain = function(n, low, high) {\n    return Math.max(Math.min(n, high), low)\n}\n\nDraw.prototype.distance = function(x1, y1, z1, x2, y2, z2) {\n    if (arguments.length === 4) {\n        return Math.hypot(z1-x1, x2-y1)\n    } else if (arguments.length === 6) {\n        return Math.hypot(x2-x1, y2-y1, z2-z1)\n    }\n}\n\nDraw.prototype.createVector = function (x, y, z) {\n    return new _Vector_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](x, y, z)\n}\n\nDraw.prototype.frameRate = function(fps) {\n    if (typeof fps === 'number' && fps > 0) {\n        this.targetFrameRate = fps\n    }\n}\n\nDraw.prototype.noCanvas = function() {\n    if (this.canvas) {\n        this.canvas.parentNode.removeChild(this.canvas)\n    }\n}\n\nDraw.prototype.createCanvas = function(w, h, renderer = '2d') {\n    let elements = document.getElementsByTagName('canvas')\n    Array.from(elements).forEach(element => element.remove())\n\n    this.canvas = document.createElement('canvas')\n    this.ctx = this.canvas.getContext(renderer)\n\n    this.canvas.width = (width = w) * this.pixelDensity\n    this.canvas.height = (height = h) * this.pixelDensity\n    this.canvas.style.width = `${width}px`;\n    this.canvas.style.height = `${height}px`;\n\n    this.ctx.scale(this.pixelDensity, this.pixelDensity)\n\n    document.body.appendChild(this.canvas)\n}\n\nDraw.prototype.random = function(min, max) {\n    if (max < min) {\n        throw new Error(`Max (${max}) is lower than min (${min})`)\n    }\n\n    if (typeof min === 'undefined') {\n        return Math.random()\n    }\n\n    if (typeof max === 'undefined') {\n        max = min\n        min = 0\n    }\n\n    return Math.floor(Math.random() * (max - min + 1)) + min\n}\n\n/*\n * Keys binding\n */\nDraw.prototype.onKeydown = function (e) {\n    this.setProperty('keyCode', e.keyCode)\n\n    let keys = {\n        32: 'keySpace',\n        37: 'keyLeft',\n        38: 'keyUp',\n        39: 'keyRight',\n        40: 'keyDown'\n    }\n\n    if (keys[e.keyCode] && typeof window[keys[e.keyCode]] === 'function') {\n        window[keys[e.keyCode]](e)\n    }\n\n    if (typeof window.keyPressed === 'function') {\n        window.keyPressed(e)\n    }\n}\n\nDraw.prototype.onMousedown = function(e) {\n    if (typeof window.mousePressed === 'function') {\n        window.mousePressed(e)\n    }\n}\n\n/*\n * Canvas\n */\nlet canvas = new class Canvas {\n    modeAdjust(a, b, c, d, mode) {\n        switch (mode) {\n            case 'corner':\n                return { x: a, y: b, w: c, h: d }\n            case 'corners':\n                return { x: a, y: b, w: c-a, h: d-b }\n            case 'radius':\n                return { x: a-c, y: b-d, w: 2*c, h: 2*d }\n            case 'center':\n                return { x: a-c*0.5, y: b-d*0.5, w: c, h: d }\n        }\n    }\n}\n\n\n\n//# sourceURL=webpack:///./src/Draw.js?");

/***/ }),

/***/ "./src/Vector.js":
/*!***********************!*\
  !*** ./src/Vector.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Vector; });\nclass Vector {\n    constructor(x = 0, y = 0, z = 0) {\n        this.x = x\n        this.y = y\n        this.z = z\n    }\n\n    multiply(n) {\n        this.x *= n || 0\n        this.y *= n || 0\n        this.z *= n || 0\n    }\n\n    distance() {\n        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z))\n    }\n}\n\n//# sourceURL=webpack:///./src/Vector.js?");

/***/ }),

/***/ "./src/helper.js":
/*!***********************!*\
  !*** ./src/helper.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nString.prototype.capitalize = function() {\n    return this.charAt(0).toUpperCase() + this.slice(1)\n}\n\nArray.prototype.last = function() {\n    return this[this.length - 1]\n}\n\n//# sourceURL=webpack:///./src/helper.js?");

/***/ }),

/***/ "./src/init.js":
/*!*********************!*\
  !*** ./src/init.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Draw_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Draw.js */ \"./src/Draw.js\");\n\n\nfunction init() {\n    if (\n        typeof window.setup === 'function'\n        || typeof window.draw === 'function'\n    ) {\n        new _Draw_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\n    }\n}\n\nwindow.addEventListener('load', init, false)\n\n//# sourceURL=webpack:///./src/init.js?");

/***/ }),

/***/ 0:
/*!*******************************************!*\
  !*** multi ./src/helper.js ./src/init.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/helper.js */\"./src/helper.js\");\nmodule.exports = __webpack_require__(/*! ./src/init.js */\"./src/init.js\");\n\n\n//# sourceURL=webpack:///multi_./src/helper.js_./src/init.js?");

/***/ })

/******/ });