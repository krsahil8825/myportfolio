/*! elementor - v3.24.0 - 23-09-2024 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***************************************************!*\
  !*** ../assets/dev/js/admin/wc-product-editor.js ***!
  \***************************************************/


function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
(function () {
  var WcProductEditor = {
    init: function init() {
      this.getDefaultSettings();
      this.wcNewProductEditorSwitchButton();
    },
    getDefaultSettings: function getDefaultSettings() {
      this.selectors = {
        wcProductHeaderInner: '.woocommerce-product-header__inner',
        buttonTemplate: '#elementor-woocommerce-new-editor-button',
        wcLoader: '.woocommerce-product-header[role="region"]',
        wcEditButton: '.woocommerce-product-header__inner #elementor-editor-button',
        body: 'body'
      };
    },
    wcNewProductEditorSwitchButton: function wcNewProductEditorSwitchButton() {
      var body = document.querySelector(this.selectors.body),
        that = this;
      if (!body) {
        return;
      }
      var observer = new MutationObserver(function (mutationsList) {
        var _iterator = _createForOfIteratorHelper(mutationsList),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var mutation = _step.value;
            if ('childList' === mutation.type) {
              if (mutation.addedNodes.length > 0) {
                if (that.isWcProductEditorLoading() && !that.isElementorButtonInjected()) {
                  that.injectElementorButton();
                  observer.disconnect();
                }
              }
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      });
      observer.observe(body, {
        childList: true,
        subtree: true
      });
    },
    injectElementorButton: function injectElementorButton() {
      var wcProductHeaderInner = document.querySelector(this.selectors.wcProductHeaderInner);
      if (wcProductHeaderInner) {
        var buttonTemplate = document.querySelector(this.selectors.buttonTemplate),
          tempDiv = document.createElement('div');
        tempDiv.innerHTML = buttonTemplate.innerHTML;
        var button = tempDiv.firstElementChild;
        wcProductHeaderInner.firstChild.append(button);
      }
    },
    isWcProductEditorLoading: function isWcProductEditorLoading() {
      return !!document.querySelector(this.selectors.wcLoader);
    },
    isElementorButtonInjected: function isElementorButtonInjected() {
      return !!document.querySelector(this.selectors.wcEditButton);
    }
  };
  WcProductEditor.init();
})();
/******/ })()
;
//# sourceMappingURL=wc-product-editor.js.map