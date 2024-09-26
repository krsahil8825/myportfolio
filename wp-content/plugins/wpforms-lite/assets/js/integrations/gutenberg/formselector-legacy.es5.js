(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/* global wpforms_gutenberg_form_selector, JSX */
/* jshint es3: false, esversion: 6 */

/**
 * @param strings.update_wp_notice_head
 * @param strings.update_wp_notice_text
 * @param strings.update_wp_notice_link
 * @param strings.wpforms_empty_help
 * @param strings.wpforms_empty_info
 */

var _wp = wp,
  _wp$serverSideRender = _wp.serverSideRender,
  ServerSideRender = _wp$serverSideRender === void 0 ? wp.components.ServerSideRender : _wp$serverSideRender;
var _wp$element = wp.element,
  createElement = _wp$element.createElement,
  Fragment = _wp$element.Fragment;
var registerBlockType = wp.blocks.registerBlockType;
var _ref = wp.blockEditor || wp.editor,
  InspectorControls = _ref.InspectorControls;
var _wp$components = wp.components,
  SelectControl = _wp$components.SelectControl,
  ToggleControl = _wp$components.ToggleControl,
  PanelBody = _wp$components.PanelBody,
  Placeholder = _wp$components.Placeholder;
var __ = wp.i18n.__;
var wpformsIcon = createElement('svg', {
  width: 20,
  height: 20,
  viewBox: '0 0 612 612',
  className: 'dashicon'
}, createElement('path', {
  fill: 'currentColor',
  d: 'M544,0H68C30.445,0,0,30.445,0,68v476c0,37.556,30.445,68,68,68h476c37.556,0,68-30.444,68-68V68 C612,30.445,581.556,0,544,0z M464.44,68L387.6,120.02L323.34,68H464.44z M288.66,68l-64.26,52.02L147.56,68H288.66z M544,544H68 V68h22.1l136,92.14l79.9-64.6l79.56,64.6l136-92.14H544V544z M114.24,263.16h95.88v-48.28h-95.88V263.16z M114.24,360.4h95.88 v-48.62h-95.88V360.4z M242.76,360.4h255v-48.62h-255V360.4L242.76,360.4z M242.76,263.16h255v-48.28h-255V263.16L242.76,263.16z M368.22,457.3h129.54V408H368.22V457.3z'
}));

/**
 * Popup container.
 *
 * @since 1.8.3
 *
 * @type {Object}
 */
var $popup = {};

/**
 * Close button (inside the form builder) click event.
 *
 * @since 1.8.3
 *
 * @param {string} clientID Block Client ID.
 */
var builderCloseButtonEvent = function builderCloseButtonEvent(clientID) {
  $popup.off('wpformsBuilderInPopupClose').on('wpformsBuilderInPopupClose', function (e, action, formId, formTitle) {
    if (action !== 'saved' || !formId) {
      return;
    }

    // Insert a new block when a new form is created from the popup to update the form list and attributes.
    var newBlock = wp.blocks.createBlock('wpforms/form-selector', {
      formId: formId.toString() // Expects string value, make sure we insert string.
    });

    // eslint-disable-next-line camelcase
    wpforms_gutenberg_form_selector.forms = [{
      ID: formId,
      post_title: formTitle
    }];

    // Insert a new block.
    wp.data.dispatch('core/block-editor').removeBlock(clientID);
    wp.data.dispatch('core/block-editor').insertBlocks(newBlock);
  });
};

/**
 * Init Modern style Dropdown fields (<select>) with choiceJS.
 *
 * @since 1.9.0
 *
 * @param {Object} e Block Details.
 */
var loadChoiceJS = function loadChoiceJS(e) {
  if (typeof window.Choices !== 'function') {
    return;
  }
  var $form = jQuery(e.detail.block.querySelector("#wpforms-".concat(e.detail.formId)));
  var config = window.wpforms_choicesjs_config || {};
  $form.find('.choicesjs-select').each(function (index, element) {
    if (!(element instanceof HTMLSelectElement)) {
      return;
    }
    var $el = jQuery(element);
    if ($el.data('choicesjs')) {
      return;
    }
    var $field = $el.closest('.wpforms-field');
    config.callbackOnInit = function () {
      var self = this,
        $element = jQuery(self.passedElement.element),
        $input = jQuery(self.input.element),
        sizeClass = $element.data('size-class');

      // Add CSS-class for size.
      if (sizeClass) {
        jQuery(self.containerOuter.element).addClass(sizeClass);
      }

      /**
       * If a multiple select has selected choices - hide a placeholder text.
       * In case if select is empty - we return placeholder text.
       */
      if ($element.prop('multiple')) {
        // On init event.
        $input.data('placeholder', $input.attr('placeholder'));
        if (self.getValue(true).length) {
          $input.removeAttr('placeholder');
        }
      }
      this.disable();
      $field.find('.is-disabled').removeClass('is-disabled');
    };
    $el.data('choicesjs', new window.Choices(element, config));

    // Placeholder fix on iframes.
    if ($el.val()) {
      $el.parent().find('.choices__input').attr('style', 'display: none !important');
    }
  });
};

// on document ready
jQuery(function () {
  jQuery(window).on('wpformsFormSelectorFormLoaded', loadChoiceJS);
});
/**
 * Open builder popup.
 *
 * @since 1.6.2
 *
 * @param {string} clientID Block Client ID.
 */
var openBuilderPopup = function openBuilderPopup(clientID) {
  if (jQuery.isEmptyObject($popup)) {
    var tmpl = jQuery('#wpforms-gutenberg-popup');
    var parent = jQuery('#wpwrap');
    parent.after(tmpl);
    $popup = parent.siblings('#wpforms-gutenberg-popup');
  }
  var url = wpforms_gutenberg_form_selector.get_started_url,
    $iframe = $popup.find('iframe');
  builderCloseButtonEvent(clientID);
  $iframe.attr('src', url);
  $popup.fadeIn();
};
var hasForms = function hasForms() {
  return wpforms_gutenberg_form_selector.forms.length > 0;
};
registerBlockType('wpforms/form-selector', {
  title: wpforms_gutenberg_form_selector.strings.title,
  description: wpforms_gutenberg_form_selector.strings.description,
  icon: wpformsIcon,
  keywords: wpforms_gutenberg_form_selector.strings.form_keywords,
  category: 'widgets',
  attributes: {
    formId: {
      type: 'string'
    },
    displayTitle: {
      type: 'boolean'
    },
    displayDesc: {
      type: 'boolean'
    },
    preview: {
      type: 'boolean'
    },
    pageTitle: {
      type: 'string'
    }
  },
  example: {
    attributes: {
      preview: true
    }
  },
  supports: {
    customClassName: hasForms()
  },
  edit: function edit(props) {
    // eslint-disable-line max-lines-per-function
    var _props$attributes = props.attributes,
      _props$attributes$for = _props$attributes.formId,
      formId = _props$attributes$for === void 0 ? '' : _props$attributes$for,
      _props$attributes$dis = _props$attributes.displayTitle,
      displayTitle = _props$attributes$dis === void 0 ? false : _props$attributes$dis,
      _props$attributes$dis2 = _props$attributes.displayDesc,
      displayDesc = _props$attributes$dis2 === void 0 ? false : _props$attributes$dis2,
      _props$attributes$pre = _props$attributes.preview,
      preview = _props$attributes$pre === void 0 ? false : _props$attributes$pre,
      setAttributes = props.setAttributes;
    var formOptions = wpforms_gutenberg_form_selector.forms.map(function (value) {
      return {
        value: value.ID,
        label: value.post_title
      };
    });
    var strings = wpforms_gutenberg_form_selector.strings;
    var jsx;
    formOptions.unshift({
      value: '',
      label: wpforms_gutenberg_form_selector.strings.form_select
    });
    function selectForm(value) {
      // eslint-disable-line jsdoc/require-jsdoc
      setAttributes({
        formId: value
      });
    }
    function toggleDisplayTitle(value) {
      // eslint-disable-line jsdoc/require-jsdoc
      setAttributes({
        displayTitle: value
      });
    }
    function toggleDisplayDesc(value) {
      // eslint-disable-line jsdoc/require-jsdoc
      setAttributes({
        displayDesc: value
      });
    }

    /**
     * Get block empty JSX code.
     *
     * @since 1.8.3
     *
     * @param {Object} blockProps Block properties.
     *
     * @return {JSX.Element} Block empty JSX code.
     */
    function getEmptyFormsPreview(blockProps) {
      var clientId = blockProps.clientId;
      return /*#__PURE__*/React.createElement(Fragment, {
        key: "wpforms-gutenberg-form-selector-fragment-block-empty"
      }, /*#__PURE__*/React.createElement("div", {
        className: "wpforms-no-form-preview"
      }, /*#__PURE__*/React.createElement("img", {
        src: wpforms_gutenberg_form_selector.block_empty_url,
        alt: ""
      }), /*#__PURE__*/React.createElement("p", {
        dangerouslySetInnerHTML: {
          __html: strings.wpforms_empty_info
        }
      }), /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "get-started-button components-button is-button is-primary",
        onClick: function onClick() {
          openBuilderPopup(clientId);
        }
      }, __('Get Started', 'wpforms-lite')), /*#__PURE__*/React.createElement("p", {
        className: "empty-desc",
        dangerouslySetInnerHTML: {
          __html: strings.wpforms_empty_help
        }
      }), /*#__PURE__*/React.createElement("div", {
        id: "wpforms-gutenberg-popup",
        className: "wpforms-builder-popup"
      }, /*#__PURE__*/React.createElement("iframe", {
        src: "about:blank",
        width: "100%",
        height: "100%",
        id: "wpforms-builder-iframe",
        title: "wpforms-gutenberg-popup"
      }))));
    }

    /**
     * Print empty forms notice.
     *
     * @since 1.8.3
     *
     * @param {string} clientId Block client ID.
     *
     * @return {JSX.Element} Field styles JSX code.
     */
    function printEmptyFormsNotice(clientId) {
      return /*#__PURE__*/React.createElement(InspectorControls, {
        key: "wpforms-gutenberg-form-selector-inspector-main-settings"
      }, /*#__PURE__*/React.createElement(PanelBody, {
        className: "wpforms-gutenberg-panel",
        title: strings.form_settings
      }, /*#__PURE__*/React.createElement("p", {
        className: "wpforms-gutenberg-panel-notice wpforms-warning wpforms-empty-form-notice",
        style: {
          display: 'block'
        }
      }, /*#__PURE__*/React.createElement("strong", null, __('You haven’t created a form, yet!', 'wpforms-lite')), __('What are you waiting for?', 'wpforms-lite')), /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "get-started-button components-button is-button is-secondary",
        onClick: function onClick() {
          openBuilderPopup(clientId);
        }
      }, __('Get Started', 'wpforms-lite'))));
    }

    /**
     * Get styling panels preview.
     *
     * @since 1.8.8
     *
     * @return {JSX.Element} JSX code.
     */
    function getStylingPanelsPreview() {
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(PanelBody, {
        className: "wpforms-gutenberg-panel disabled_panel",
        title: strings.themes
      }, /*#__PURE__*/React.createElement("div", {
        className: "wpforms-panel-preview wpforms-panel-preview-themes"
      })), /*#__PURE__*/React.createElement(PanelBody, {
        className: "wpforms-gutenberg-panel disabled_panel",
        title: strings.field_styles
      }, /*#__PURE__*/React.createElement("div", {
        className: "wpforms-panel-preview wpforms-panel-preview-field"
      })), /*#__PURE__*/React.createElement(PanelBody, {
        className: "wpforms-gutenberg-panel disabled_panel",
        title: strings.label_styles
      }, /*#__PURE__*/React.createElement("div", {
        className: "wpforms-panel-preview wpforms-panel-preview-label"
      })), /*#__PURE__*/React.createElement(PanelBody, {
        className: "wpforms-gutenberg-panel disabled_panel",
        title: strings.button_styles
      }, /*#__PURE__*/React.createElement("div", {
        className: "wpforms-panel-preview wpforms-panel-preview-button"
      })), /*#__PURE__*/React.createElement(PanelBody, {
        className: "wpforms-gutenberg-panel disabled_panel",
        title: strings.container_styles
      }, /*#__PURE__*/React.createElement("div", {
        className: "wpforms-panel-preview wpforms-panel-preview-container"
      })), /*#__PURE__*/React.createElement(PanelBody, {
        className: "wpforms-gutenberg-panel disabled_panel",
        title: strings.background_styles
      }, /*#__PURE__*/React.createElement("div", {
        className: "wpforms-panel-preview wpforms-panel-preview-background"
      })));
    }
    if (!hasForms()) {
      jsx = [printEmptyFormsNotice(props.clientId)];
      jsx.push(getEmptyFormsPreview(props));
      return jsx;
    }
    jsx = [/*#__PURE__*/React.createElement(InspectorControls, {
      key: "wpforms-gutenberg-form-selector-inspector-controls"
    }, /*#__PURE__*/React.createElement(PanelBody, {
      title: wpforms_gutenberg_form_selector.strings.form_settings
    }, /*#__PURE__*/React.createElement(SelectControl, {
      label: wpforms_gutenberg_form_selector.strings.form_selected,
      value: formId,
      options: formOptions,
      onChange: selectForm
    }), /*#__PURE__*/React.createElement(ToggleControl, {
      label: wpforms_gutenberg_form_selector.strings.show_title,
      checked: displayTitle,
      onChange: toggleDisplayTitle
    }), /*#__PURE__*/React.createElement(ToggleControl, {
      label: wpforms_gutenberg_form_selector.strings.show_description,
      checked: displayDesc,
      onChange: toggleDisplayDesc
    }), /*#__PURE__*/React.createElement("p", {
      className: "wpforms-gutenberg-panel-notice wpforms-warning"
    }, /*#__PURE__*/React.createElement("strong", null, strings.update_wp_notice_head), strings.update_wp_notice_text, " ", /*#__PURE__*/React.createElement("a", {
      href: strings.update_wp_notice_link,
      rel: "noreferrer",
      target: "_blank"
    }, strings.learn_more))), getStylingPanelsPreview())];
    if (formId) {
      var _document$querySelect, _document$querySelect2;
      props.setAttributes({
        pageTitle: (_document$querySelect = (_document$querySelect2 = document.querySelector('.editor-post-title__input')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.textContent) !== null && _document$querySelect !== void 0 ? _document$querySelect : ''
      });
      jsx.push( /*#__PURE__*/React.createElement(ServerSideRender, {
        key: "wpforms-gutenberg-form-selector-server-side-renderer",
        block: "wpforms/form-selector",
        attributes: props.attributes
      }));
    } else if (preview) {
      jsx.push( /*#__PURE__*/React.createElement(Fragment, {
        key: "wpforms-gutenberg-form-selector-fragment-block-preview"
      }, /*#__PURE__*/React.createElement("img", {
        src: wpforms_gutenberg_form_selector.block_preview_url,
        style: {
          width: '100%'
        },
        alt: ""
      })));
    } else {
      jsx.push( /*#__PURE__*/React.createElement(Placeholder, {
        key: "wpforms-gutenberg-form-selector-wrap",
        className: "wpforms-gutenberg-form-selector-wrap"
      }, /*#__PURE__*/React.createElement("img", {
        src: wpforms_gutenberg_form_selector.logo_url,
        alt: ""
      }), /*#__PURE__*/React.createElement(SelectControl, {
        key: "wpforms-gutenberg-form-selector-select-control",
        value: formId,
        options: formOptions,
        onChange: selectForm
      })));
    }
    return jsx;
  },
  save: function save() {
    return null;
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfd3AiLCJ3cCIsIl93cCRzZXJ2ZXJTaWRlUmVuZGVyIiwic2VydmVyU2lkZVJlbmRlciIsIlNlcnZlclNpZGVSZW5kZXIiLCJjb21wb25lbnRzIiwiX3dwJGVsZW1lbnQiLCJlbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsIkZyYWdtZW50IiwicmVnaXN0ZXJCbG9ja1R5cGUiLCJibG9ja3MiLCJfcmVmIiwiYmxvY2tFZGl0b3IiLCJlZGl0b3IiLCJJbnNwZWN0b3JDb250cm9scyIsIl93cCRjb21wb25lbnRzIiwiU2VsZWN0Q29udHJvbCIsIlRvZ2dsZUNvbnRyb2wiLCJQYW5lbEJvZHkiLCJQbGFjZWhvbGRlciIsIl9fIiwiaTE4biIsIndwZm9ybXNJY29uIiwid2lkdGgiLCJoZWlnaHQiLCJ2aWV3Qm94IiwiY2xhc3NOYW1lIiwiZmlsbCIsImQiLCIkcG9wdXAiLCJidWlsZGVyQ2xvc2VCdXR0b25FdmVudCIsImNsaWVudElEIiwib2ZmIiwib24iLCJlIiwiYWN0aW9uIiwiZm9ybUlkIiwiZm9ybVRpdGxlIiwibmV3QmxvY2siLCJjcmVhdGVCbG9jayIsInRvU3RyaW5nIiwid3Bmb3Jtc19ndXRlbmJlcmdfZm9ybV9zZWxlY3RvciIsImZvcm1zIiwiSUQiLCJwb3N0X3RpdGxlIiwiZGF0YSIsImRpc3BhdGNoIiwicmVtb3ZlQmxvY2siLCJpbnNlcnRCbG9ja3MiLCJsb2FkQ2hvaWNlSlMiLCJ3aW5kb3ciLCJDaG9pY2VzIiwiJGZvcm0iLCJqUXVlcnkiLCJkZXRhaWwiLCJibG9jayIsInF1ZXJ5U2VsZWN0b3IiLCJjb25jYXQiLCJjb25maWciLCJ3cGZvcm1zX2Nob2ljZXNqc19jb25maWciLCJmaW5kIiwiZWFjaCIsImluZGV4IiwiSFRNTFNlbGVjdEVsZW1lbnQiLCIkZWwiLCIkZmllbGQiLCJjbG9zZXN0IiwiY2FsbGJhY2tPbkluaXQiLCJzZWxmIiwiJGVsZW1lbnQiLCJwYXNzZWRFbGVtZW50IiwiJGlucHV0IiwiaW5wdXQiLCJzaXplQ2xhc3MiLCJjb250YWluZXJPdXRlciIsImFkZENsYXNzIiwicHJvcCIsImF0dHIiLCJnZXRWYWx1ZSIsImxlbmd0aCIsInJlbW92ZUF0dHIiLCJkaXNhYmxlIiwicmVtb3ZlQ2xhc3MiLCJ2YWwiLCJwYXJlbnQiLCJvcGVuQnVpbGRlclBvcHVwIiwiaXNFbXB0eU9iamVjdCIsInRtcGwiLCJhZnRlciIsInNpYmxpbmdzIiwidXJsIiwiZ2V0X3N0YXJ0ZWRfdXJsIiwiJGlmcmFtZSIsImZhZGVJbiIsImhhc0Zvcm1zIiwidGl0bGUiLCJzdHJpbmdzIiwiZGVzY3JpcHRpb24iLCJpY29uIiwia2V5d29yZHMiLCJmb3JtX2tleXdvcmRzIiwiY2F0ZWdvcnkiLCJhdHRyaWJ1dGVzIiwidHlwZSIsImRpc3BsYXlUaXRsZSIsImRpc3BsYXlEZXNjIiwicHJldmlldyIsInBhZ2VUaXRsZSIsImV4YW1wbGUiLCJzdXBwb3J0cyIsImN1c3RvbUNsYXNzTmFtZSIsImVkaXQiLCJwcm9wcyIsIl9wcm9wcyRhdHRyaWJ1dGVzIiwiX3Byb3BzJGF0dHJpYnV0ZXMkZm9yIiwiX3Byb3BzJGF0dHJpYnV0ZXMkZGlzIiwiX3Byb3BzJGF0dHJpYnV0ZXMkZGlzMiIsIl9wcm9wcyRhdHRyaWJ1dGVzJHByZSIsInNldEF0dHJpYnV0ZXMiLCJmb3JtT3B0aW9ucyIsIm1hcCIsInZhbHVlIiwibGFiZWwiLCJqc3giLCJ1bnNoaWZ0IiwiZm9ybV9zZWxlY3QiLCJzZWxlY3RGb3JtIiwidG9nZ2xlRGlzcGxheVRpdGxlIiwidG9nZ2xlRGlzcGxheURlc2MiLCJnZXRFbXB0eUZvcm1zUHJldmlldyIsImJsb2NrUHJvcHMiLCJjbGllbnRJZCIsIlJlYWN0Iiwia2V5Iiwic3JjIiwiYmxvY2tfZW1wdHlfdXJsIiwiYWx0IiwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwiLCJfX2h0bWwiLCJ3cGZvcm1zX2VtcHR5X2luZm8iLCJvbkNsaWNrIiwid3Bmb3Jtc19lbXB0eV9oZWxwIiwiaWQiLCJwcmludEVtcHR5Rm9ybXNOb3RpY2UiLCJmb3JtX3NldHRpbmdzIiwic3R5bGUiLCJkaXNwbGF5IiwiZ2V0U3R5bGluZ1BhbmVsc1ByZXZpZXciLCJ0aGVtZXMiLCJmaWVsZF9zdHlsZXMiLCJsYWJlbF9zdHlsZXMiLCJidXR0b25fc3R5bGVzIiwiY29udGFpbmVyX3N0eWxlcyIsImJhY2tncm91bmRfc3R5bGVzIiwicHVzaCIsImZvcm1fc2VsZWN0ZWQiLCJvcHRpb25zIiwib25DaGFuZ2UiLCJzaG93X3RpdGxlIiwiY2hlY2tlZCIsInNob3dfZGVzY3JpcHRpb24iLCJ1cGRhdGVfd3Bfbm90aWNlX2hlYWQiLCJ1cGRhdGVfd3Bfbm90aWNlX3RleHQiLCJocmVmIiwidXBkYXRlX3dwX25vdGljZV9saW5rIiwicmVsIiwidGFyZ2V0IiwibGVhcm5fbW9yZSIsIl9kb2N1bWVudCRxdWVyeVNlbGVjdCIsIl9kb2N1bWVudCRxdWVyeVNlbGVjdDIiLCJkb2N1bWVudCIsInRleHRDb250ZW50IiwiYmxvY2tfcHJldmlld191cmwiLCJsb2dvX3VybCIsInNhdmUiXSwic291cmNlcyI6WyJmYWtlXzM2ZThlYjk2LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbCB3cGZvcm1zX2d1dGVuYmVyZ19mb3JtX3NlbGVjdG9yLCBKU1ggKi9cbi8qIGpzaGludCBlczM6IGZhbHNlLCBlc3ZlcnNpb246IDYgKi9cblxuLyoqXG4gKiBAcGFyYW0gc3RyaW5ncy51cGRhdGVfd3Bfbm90aWNlX2hlYWRcbiAqIEBwYXJhbSBzdHJpbmdzLnVwZGF0ZV93cF9ub3RpY2VfdGV4dFxuICogQHBhcmFtIHN0cmluZ3MudXBkYXRlX3dwX25vdGljZV9saW5rXG4gKiBAcGFyYW0gc3RyaW5ncy53cGZvcm1zX2VtcHR5X2hlbHBcbiAqIEBwYXJhbSBzdHJpbmdzLndwZm9ybXNfZW1wdHlfaW5mb1xuICovXG5cbmNvbnN0IHsgc2VydmVyU2lkZVJlbmRlcjogU2VydmVyU2lkZVJlbmRlciA9IHdwLmNvbXBvbmVudHMuU2VydmVyU2lkZVJlbmRlciB9ID0gd3A7XG5jb25zdCB7IGNyZWF0ZUVsZW1lbnQsIEZyYWdtZW50IH0gPSB3cC5lbGVtZW50O1xuY29uc3QgeyByZWdpc3RlckJsb2NrVHlwZSB9ID0gd3AuYmxvY2tzO1xuY29uc3QgeyBJbnNwZWN0b3JDb250cm9scyB9ID0gd3AuYmxvY2tFZGl0b3IgfHwgd3AuZWRpdG9yO1xuY29uc3QgeyBTZWxlY3RDb250cm9sLCBUb2dnbGVDb250cm9sLCBQYW5lbEJvZHksIFBsYWNlaG9sZGVyIH0gPSB3cC5jb21wb25lbnRzO1xuY29uc3QgeyBfXyB9ID0gd3AuaTE4bjtcblxuY29uc3Qgd3Bmb3Jtc0ljb24gPSBjcmVhdGVFbGVtZW50KCAnc3ZnJywgeyB3aWR0aDogMjAsIGhlaWdodDogMjAsIHZpZXdCb3g6ICcwIDAgNjEyIDYxMicsIGNsYXNzTmFtZTogJ2Rhc2hpY29uJyB9LFxuXHRjcmVhdGVFbGVtZW50KCAncGF0aCcsIHtcblx0XHRmaWxsOiAnY3VycmVudENvbG9yJyxcblx0XHRkOiAnTTU0NCwwSDY4QzMwLjQ0NSwwLDAsMzAuNDQ1LDAsNjh2NDc2YzAsMzcuNTU2LDMwLjQ0NSw2OCw2OCw2OGg0NzZjMzcuNTU2LDAsNjgtMzAuNDQ0LDY4LTY4VjY4IEM2MTIsMzAuNDQ1LDU4MS41NTYsMCw1NDQsMHogTTQ2NC40NCw2OEwzODcuNiwxMjAuMDJMMzIzLjM0LDY4SDQ2NC40NHogTTI4OC42Niw2OGwtNjQuMjYsNTIuMDJMMTQ3LjU2LDY4SDI4OC42NnogTTU0NCw1NDRINjggVjY4aDIyLjFsMTM2LDkyLjE0bDc5LjktNjQuNmw3OS41Niw2NC42bDEzNi05Mi4xNEg1NDRWNTQ0eiBNMTE0LjI0LDI2My4xNmg5NS44OHYtNDguMjhoLTk1Ljg4VjI2My4xNnogTTExNC4yNCwzNjAuNGg5NS44OCB2LTQ4LjYyaC05NS44OFYzNjAuNHogTTI0Mi43NiwzNjAuNGgyNTV2LTQ4LjYyaC0yNTVWMzYwLjRMMjQyLjc2LDM2MC40eiBNMjQyLjc2LDI2My4xNmgyNTV2LTQ4LjI4aC0yNTVWMjYzLjE2TDI0Mi43NiwyNjMuMTZ6IE0zNjguMjIsNDU3LjNoMTI5LjU0VjQwOEgzNjguMjJWNDU3LjN6Jyxcblx0fSApXG4pO1xuXG4vKipcbiAqIFBvcHVwIGNvbnRhaW5lci5cbiAqXG4gKiBAc2luY2UgMS44LjNcbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5sZXQgJHBvcHVwID0ge307XG5cbi8qKlxuICogQ2xvc2UgYnV0dG9uIChpbnNpZGUgdGhlIGZvcm0gYnVpbGRlcikgY2xpY2sgZXZlbnQuXG4gKlxuICogQHNpbmNlIDEuOC4zXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNsaWVudElEIEJsb2NrIENsaWVudCBJRC5cbiAqL1xuY29uc3QgYnVpbGRlckNsb3NlQnV0dG9uRXZlbnQgPSBmdW5jdGlvbiggY2xpZW50SUQgKSB7XG5cdCRwb3B1cFxuXHRcdC5vZmYoICd3cGZvcm1zQnVpbGRlckluUG9wdXBDbG9zZScgKVxuXHRcdC5vbiggJ3dwZm9ybXNCdWlsZGVySW5Qb3B1cENsb3NlJywgZnVuY3Rpb24oIGUsIGFjdGlvbiwgZm9ybUlkLCBmb3JtVGl0bGUgKSB7XG5cdFx0XHRpZiAoIGFjdGlvbiAhPT0gJ3NhdmVkJyB8fCAhIGZvcm1JZCApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJbnNlcnQgYSBuZXcgYmxvY2sgd2hlbiBhIG5ldyBmb3JtIGlzIGNyZWF0ZWQgZnJvbSB0aGUgcG9wdXAgdG8gdXBkYXRlIHRoZSBmb3JtIGxpc3QgYW5kIGF0dHJpYnV0ZXMuXG5cdFx0XHRjb25zdCBuZXdCbG9jayA9IHdwLmJsb2Nrcy5jcmVhdGVCbG9jayggJ3dwZm9ybXMvZm9ybS1zZWxlY3RvcicsIHtcblx0XHRcdFx0Zm9ybUlkOiBmb3JtSWQudG9TdHJpbmcoKSwgLy8gRXhwZWN0cyBzdHJpbmcgdmFsdWUsIG1ha2Ugc3VyZSB3ZSBpbnNlcnQgc3RyaW5nLlxuXHRcdFx0fSApO1xuXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG5cdFx0XHR3cGZvcm1zX2d1dGVuYmVyZ19mb3JtX3NlbGVjdG9yLmZvcm1zID0gWyB7IElEOiBmb3JtSWQsIHBvc3RfdGl0bGU6IGZvcm1UaXRsZSB9IF07XG5cblx0XHRcdC8vIEluc2VydCBhIG5ldyBibG9jay5cblx0XHRcdHdwLmRhdGEuZGlzcGF0Y2goICdjb3JlL2Jsb2NrLWVkaXRvcicgKS5yZW1vdmVCbG9jayggY2xpZW50SUQgKTtcblx0XHRcdHdwLmRhdGEuZGlzcGF0Y2goICdjb3JlL2Jsb2NrLWVkaXRvcicgKS5pbnNlcnRCbG9ja3MoIG5ld0Jsb2NrICk7XG5cdFx0fSApO1xufTtcblxuLyoqXG4gKiBJbml0IE1vZGVybiBzdHlsZSBEcm9wZG93biBmaWVsZHMgKDxzZWxlY3Q+KSB3aXRoIGNob2ljZUpTLlxuICpcbiAqIEBzaW5jZSAxLjkuMFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlIEJsb2NrIERldGFpbHMuXG4gKi9cbmNvbnN0IGxvYWRDaG9pY2VKUyA9IGZ1bmN0aW9uKCBlICkge1xuXHRpZiAoIHR5cGVvZiB3aW5kb3cuQ2hvaWNlcyAhPT0gJ2Z1bmN0aW9uJyApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCAkZm9ybSA9IGpRdWVyeSggZS5kZXRhaWwuYmxvY2sucXVlcnlTZWxlY3RvciggYCN3cGZvcm1zLSR7IGUuZGV0YWlsLmZvcm1JZCB9YCApICk7XG5cdGNvbnN0IGNvbmZpZyA9IHdpbmRvdy53cGZvcm1zX2Nob2ljZXNqc19jb25maWcgfHwge307XG5cblx0JGZvcm0uZmluZCggJy5jaG9pY2VzanMtc2VsZWN0JyApLmVhY2goIGZ1bmN0aW9uKCBpbmRleCwgZWxlbWVudCApIHtcblx0XHRpZiAoICEgKCBlbGVtZW50IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQgKSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCAkZWwgPSBqUXVlcnkoIGVsZW1lbnQgKTtcblxuXHRcdGlmICggJGVsLmRhdGEoICdjaG9pY2VzanMnICkgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgJGZpZWxkID0gJGVsLmNsb3Nlc3QoICcud3Bmb3Jtcy1maWVsZCcgKTtcblxuXHRcdGNvbmZpZy5jYWxsYmFja09uSW5pdCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29uc3Qgc2VsZiA9IHRoaXMsXG5cdFx0XHRcdCRlbGVtZW50ID0galF1ZXJ5KCBzZWxmLnBhc3NlZEVsZW1lbnQuZWxlbWVudCApLFxuXHRcdFx0XHQkaW5wdXQgPSBqUXVlcnkoIHNlbGYuaW5wdXQuZWxlbWVudCApLFxuXHRcdFx0XHRzaXplQ2xhc3MgPSAkZWxlbWVudC5kYXRhKCAnc2l6ZS1jbGFzcycgKTtcblxuXHRcdFx0Ly8gQWRkIENTUy1jbGFzcyBmb3Igc2l6ZS5cblx0XHRcdGlmICggc2l6ZUNsYXNzICkge1xuXHRcdFx0XHRqUXVlcnkoIHNlbGYuY29udGFpbmVyT3V0ZXIuZWxlbWVudCApLmFkZENsYXNzKCBzaXplQ2xhc3MgKTtcblx0XHRcdH1cblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBJZiBhIG11bHRpcGxlIHNlbGVjdCBoYXMgc2VsZWN0ZWQgY2hvaWNlcyAtIGhpZGUgYSBwbGFjZWhvbGRlciB0ZXh0LlxuXHRcdFx0ICogSW4gY2FzZSBpZiBzZWxlY3QgaXMgZW1wdHkgLSB3ZSByZXR1cm4gcGxhY2Vob2xkZXIgdGV4dC5cblx0XHRcdCAqL1xuXHRcdFx0aWYgKCAkZWxlbWVudC5wcm9wKCAnbXVsdGlwbGUnICkgKSB7XG5cdFx0XHRcdC8vIE9uIGluaXQgZXZlbnQuXG5cdFx0XHRcdCRpbnB1dC5kYXRhKCAncGxhY2Vob2xkZXInLCAkaW5wdXQuYXR0ciggJ3BsYWNlaG9sZGVyJyApICk7XG5cblx0XHRcdFx0aWYgKCBzZWxmLmdldFZhbHVlKCB0cnVlICkubGVuZ3RoICkge1xuXHRcdFx0XHRcdCRpbnB1dC5yZW1vdmVBdHRyKCAncGxhY2Vob2xkZXInICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dGhpcy5kaXNhYmxlKCk7XG5cdFx0XHQkZmllbGQuZmluZCggJy5pcy1kaXNhYmxlZCcgKS5yZW1vdmVDbGFzcyggJ2lzLWRpc2FibGVkJyApO1xuXHRcdH07XG5cblx0XHQkZWwuZGF0YSggJ2Nob2ljZXNqcycsIG5ldyB3aW5kb3cuQ2hvaWNlcyggZWxlbWVudCwgY29uZmlnICkgKTtcblxuXHRcdC8vIFBsYWNlaG9sZGVyIGZpeCBvbiBpZnJhbWVzLlxuXHRcdGlmICggJGVsLnZhbCgpICkge1xuXHRcdFx0JGVsLnBhcmVudCgpLmZpbmQoICcuY2hvaWNlc19faW5wdXQnICkuYXR0ciggJ3N0eWxlJywgJ2Rpc3BsYXk6IG5vbmUgIWltcG9ydGFudCcgKTtcblx0XHR9XG5cdH0gKTtcbn07XG5cbi8vIG9uIGRvY3VtZW50IHJlYWR5XG5qUXVlcnkoIGZ1bmN0aW9uKCkge1xuXHRqUXVlcnkoIHdpbmRvdyApLm9uKCAnd3Bmb3Jtc0Zvcm1TZWxlY3RvckZvcm1Mb2FkZWQnLCBsb2FkQ2hvaWNlSlMgKTtcbn0gKTtcbi8qKlxuICogT3BlbiBidWlsZGVyIHBvcHVwLlxuICpcbiAqIEBzaW5jZSAxLjYuMlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbGllbnRJRCBCbG9jayBDbGllbnQgSUQuXG4gKi9cbmNvbnN0IG9wZW5CdWlsZGVyUG9wdXAgPSBmdW5jdGlvbiggY2xpZW50SUQgKSB7XG5cdGlmICggalF1ZXJ5LmlzRW1wdHlPYmplY3QoICRwb3B1cCApICkge1xuXHRcdGNvbnN0IHRtcGwgPSBqUXVlcnkoICcjd3Bmb3Jtcy1ndXRlbmJlcmctcG9wdXAnICk7XG5cdFx0Y29uc3QgcGFyZW50ID0galF1ZXJ5KCAnI3dwd3JhcCcgKTtcblxuXHRcdHBhcmVudC5hZnRlciggdG1wbCApO1xuXG5cdFx0JHBvcHVwID0gcGFyZW50LnNpYmxpbmdzKCAnI3dwZm9ybXMtZ3V0ZW5iZXJnLXBvcHVwJyApO1xuXHR9XG5cblx0Y29uc3QgdXJsID0gd3Bmb3Jtc19ndXRlbmJlcmdfZm9ybV9zZWxlY3Rvci5nZXRfc3RhcnRlZF91cmwsXG5cdFx0JGlmcmFtZSA9ICRwb3B1cC5maW5kKCAnaWZyYW1lJyApO1xuXG5cdGJ1aWxkZXJDbG9zZUJ1dHRvbkV2ZW50KCBjbGllbnRJRCApO1xuXHQkaWZyYW1lLmF0dHIoICdzcmMnLCB1cmwgKTtcblx0JHBvcHVwLmZhZGVJbigpO1xufTtcblxuY29uc3QgaGFzRm9ybXMgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHdwZm9ybXNfZ3V0ZW5iZXJnX2Zvcm1fc2VsZWN0b3IuZm9ybXMubGVuZ3RoID4gMDtcbn07XG5cbnJlZ2lzdGVyQmxvY2tUeXBlKCAnd3Bmb3Jtcy9mb3JtLXNlbGVjdG9yJywge1xuXHR0aXRsZTogd3Bmb3Jtc19ndXRlbmJlcmdfZm9ybV9zZWxlY3Rvci5zdHJpbmdzLnRpdGxlLFxuXHRkZXNjcmlwdGlvbjogd3Bmb3Jtc19ndXRlbmJlcmdfZm9ybV9zZWxlY3Rvci5zdHJpbmdzLmRlc2NyaXB0aW9uLFxuXHRpY29uOiB3cGZvcm1zSWNvbixcblx0a2V5d29yZHM6IHdwZm9ybXNfZ3V0ZW5iZXJnX2Zvcm1fc2VsZWN0b3Iuc3RyaW5ncy5mb3JtX2tleXdvcmRzLFxuXHRjYXRlZ29yeTogJ3dpZGdldHMnLFxuXHRhdHRyaWJ1dGVzOiB7XG5cdFx0Zm9ybUlkOiB7XG5cdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHR9LFxuXHRcdGRpc3BsYXlUaXRsZToge1xuXHRcdFx0dHlwZTogJ2Jvb2xlYW4nLFxuXHRcdH0sXG5cdFx0ZGlzcGxheURlc2M6IHtcblx0XHRcdHR5cGU6ICdib29sZWFuJyxcblx0XHR9LFxuXHRcdHByZXZpZXc6IHtcblx0XHRcdHR5cGU6ICdib29sZWFuJyxcblx0XHR9LFxuXHRcdHBhZ2VUaXRsZToge1xuXHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0fSxcblx0fSxcblx0ZXhhbXBsZToge1xuXHRcdGF0dHJpYnV0ZXM6IHtcblx0XHRcdHByZXZpZXc6IHRydWUsXG5cdFx0fSxcblx0fSxcblx0c3VwcG9ydHM6IHtcblx0XHRjdXN0b21DbGFzc05hbWU6IGhhc0Zvcm1zKCksXG5cdH0sXG5cdGVkaXQoIHByb3BzICkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG1heC1saW5lcy1wZXItZnVuY3Rpb25cblx0XHRjb25zdCB7IGF0dHJpYnV0ZXM6IHsgZm9ybUlkID0gJycsIGRpc3BsYXlUaXRsZSA9IGZhbHNlLCBkaXNwbGF5RGVzYyA9IGZhbHNlLCBwcmV2aWV3ID0gZmFsc2UgfSwgc2V0QXR0cmlidXRlcyB9ID0gcHJvcHM7XG5cdFx0Y29uc3QgZm9ybU9wdGlvbnMgPSB3cGZvcm1zX2d1dGVuYmVyZ19mb3JtX3NlbGVjdG9yLmZvcm1zLm1hcCggKCB2YWx1ZSApID0+IChcblx0XHRcdHsgdmFsdWU6IHZhbHVlLklELCBsYWJlbDogdmFsdWUucG9zdF90aXRsZSB9XG5cdFx0KSApO1xuXG5cdFx0Y29uc3Qgc3RyaW5ncyA9IHdwZm9ybXNfZ3V0ZW5iZXJnX2Zvcm1fc2VsZWN0b3Iuc3RyaW5ncztcblx0XHRsZXQganN4O1xuXG5cdFx0Zm9ybU9wdGlvbnMudW5zaGlmdCggeyB2YWx1ZTogJycsIGxhYmVsOiB3cGZvcm1zX2d1dGVuYmVyZ19mb3JtX3NlbGVjdG9yLnN0cmluZ3MuZm9ybV9zZWxlY3QgfSApO1xuXG5cdFx0ZnVuY3Rpb24gc2VsZWN0Rm9ybSggdmFsdWUgKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUganNkb2MvcmVxdWlyZS1qc2RvY1xuXHRcdFx0c2V0QXR0cmlidXRlcyggeyBmb3JtSWQ6IHZhbHVlIH0gKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB0b2dnbGVEaXNwbGF5VGl0bGUoIHZhbHVlICkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGpzZG9jL3JlcXVpcmUtanNkb2Ncblx0XHRcdHNldEF0dHJpYnV0ZXMoIHsgZGlzcGxheVRpdGxlOiB2YWx1ZSB9ICk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdG9nZ2xlRGlzcGxheURlc2MoIHZhbHVlICkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGpzZG9jL3JlcXVpcmUtanNkb2Ncblx0XHRcdHNldEF0dHJpYnV0ZXMoIHsgZGlzcGxheURlc2M6IHZhbHVlIH0gKTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBHZXQgYmxvY2sgZW1wdHkgSlNYIGNvZGUuXG5cdFx0ICpcblx0XHQgKiBAc2luY2UgMS44LjNcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBibG9ja1Byb3BzIEJsb2NrIHByb3BlcnRpZXMuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtKU1guRWxlbWVudH0gQmxvY2sgZW1wdHkgSlNYIGNvZGUuXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gZ2V0RW1wdHlGb3Jtc1ByZXZpZXcoIGJsb2NrUHJvcHMgKSB7XG5cdFx0XHRjb25zdCBjbGllbnRJZCA9IGJsb2NrUHJvcHMuY2xpZW50SWQ7XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxGcmFnbWVudFxuXHRcdFx0XHRcdGtleT1cIndwZm9ybXMtZ3V0ZW5iZXJnLWZvcm0tc2VsZWN0b3ItZnJhZ21lbnQtYmxvY2stZW1wdHlcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIndwZm9ybXMtbm8tZm9ybS1wcmV2aWV3XCI+XG5cdFx0XHRcdFx0XHQ8aW1nIHNyYz17IHdwZm9ybXNfZ3V0ZW5iZXJnX2Zvcm1fc2VsZWN0b3IuYmxvY2tfZW1wdHlfdXJsIH0gYWx0PVwiXCIgLz5cblx0XHRcdFx0XHRcdDxwIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXsgeyBfX2h0bWw6IHN0cmluZ3Mud3Bmb3Jtc19lbXB0eV9pbmZvIH0gfT48L3A+XG5cdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJnZXQtc3RhcnRlZC1idXR0b24gY29tcG9uZW50cy1idXR0b24gaXMtYnV0dG9uIGlzLXByaW1hcnlcIlxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtcblx0XHRcdFx0XHRcdFx0XHQoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRvcGVuQnVpbGRlclBvcHVwKCBjbGllbnRJZCApO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHR7IF9fKCAnR2V0IFN0YXJ0ZWQnLCAnd3Bmb3Jtcy1saXRlJyApIH1cblx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PHAgY2xhc3NOYW1lPVwiZW1wdHktZGVzY1wiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXsgeyBfX2h0bWw6IHN0cmluZ3Mud3Bmb3Jtc19lbXB0eV9oZWxwIH0gfT48L3A+XG5cblx0XHRcdFx0XHRcdHsgLyogVGVtcGxhdGUgZm9yIHBvcHVwIHdpdGggYnVpbGRlciBpZnJhbWUgKi8gfVxuXHRcdFx0XHRcdFx0PGRpdiBpZD1cIndwZm9ybXMtZ3V0ZW5iZXJnLXBvcHVwXCIgY2xhc3NOYW1lPVwid3Bmb3Jtcy1idWlsZGVyLXBvcHVwXCI+XG5cdFx0XHRcdFx0XHRcdDxpZnJhbWUgc3JjPVwiYWJvdXQ6YmxhbmtcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgaWQ9XCJ3cGZvcm1zLWJ1aWxkZXItaWZyYW1lXCIgdGl0bGU9XCJ3cGZvcm1zLWd1dGVuYmVyZy1wb3B1cFwiPjwvaWZyYW1lPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvRnJhZ21lbnQ+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFByaW50IGVtcHR5IGZvcm1zIG5vdGljZS5cblx0XHQgKlxuXHRcdCAqIEBzaW5jZSAxLjguM1xuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IGNsaWVudElkIEJsb2NrIGNsaWVudCBJRC5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0pTWC5FbGVtZW50fSBGaWVsZCBzdHlsZXMgSlNYIGNvZGUuXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gcHJpbnRFbXB0eUZvcm1zTm90aWNlKCBjbGllbnRJZCApIHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxJbnNwZWN0b3JDb250cm9scyBrZXk9XCJ3cGZvcm1zLWd1dGVuYmVyZy1mb3JtLXNlbGVjdG9yLWluc3BlY3Rvci1tYWluLXNldHRpbmdzXCI+XG5cdFx0XHRcdFx0PFBhbmVsQm9keSBjbGFzc05hbWU9XCJ3cGZvcm1zLWd1dGVuYmVyZy1wYW5lbFwiIHRpdGxlPXsgc3RyaW5ncy5mb3JtX3NldHRpbmdzIH0+XG5cdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJ3cGZvcm1zLWd1dGVuYmVyZy1wYW5lbC1ub3RpY2Ugd3Bmb3Jtcy13YXJuaW5nIHdwZm9ybXMtZW1wdHktZm9ybS1ub3RpY2VcIiBzdHlsZT17IHsgZGlzcGxheTogJ2Jsb2NrJyB9IH0+XG5cdFx0XHRcdFx0XHRcdDxzdHJvbmc+eyBfXyggJ1lvdSBoYXZlbuKAmXQgY3JlYXRlZCBhIGZvcm0sIHlldCEnLCAnd3Bmb3Jtcy1saXRlJyApIH08L3N0cm9uZz5cblx0XHRcdFx0XHRcdFx0eyBfXyggJ1doYXQgYXJlIHlvdSB3YWl0aW5nIGZvcj8nLCAnd3Bmb3Jtcy1saXRlJyApIH1cblx0XHRcdFx0XHRcdDwvcD5cblx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImdldC1zdGFydGVkLWJ1dHRvbiBjb21wb25lbnRzLWJ1dHRvbiBpcy1idXR0b24gaXMtc2Vjb25kYXJ5XCJcblx0XHRcdFx0XHRcdFx0b25DbGljaz17XG5cdFx0XHRcdFx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0b3BlbkJ1aWxkZXJQb3B1cCggY2xpZW50SWQgKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0eyBfXyggJ0dldCBTdGFydGVkJywgJ3dwZm9ybXMtbGl0ZScgKSB9XG5cdFx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHQ8L1BhbmVsQm9keT5cblx0XHRcdFx0PC9JbnNwZWN0b3JDb250cm9scz5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogR2V0IHN0eWxpbmcgcGFuZWxzIHByZXZpZXcuXG5cdFx0ICpcblx0XHQgKiBAc2luY2UgMS44Ljhcblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0pTWC5FbGVtZW50fSBKU1ggY29kZS5cblx0XHQgKi9cblx0XHRmdW5jdGlvbiBnZXRTdHlsaW5nUGFuZWxzUHJldmlldygpIHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxGcmFnbWVudD5cblx0XHRcdFx0XHQ8UGFuZWxCb2R5IGNsYXNzTmFtZT1cIndwZm9ybXMtZ3V0ZW5iZXJnLXBhbmVsIGRpc2FibGVkX3BhbmVsXCIgdGl0bGU9eyBzdHJpbmdzLnRoZW1lcyB9PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ3cGZvcm1zLXBhbmVsLXByZXZpZXcgd3Bmb3Jtcy1wYW5lbC1wcmV2aWV3LXRoZW1lc1wiPjwvZGl2PlxuXHRcdFx0XHRcdDwvUGFuZWxCb2R5PlxuXHRcdFx0XHRcdDxQYW5lbEJvZHkgY2xhc3NOYW1lPVwid3Bmb3Jtcy1ndXRlbmJlcmctcGFuZWwgZGlzYWJsZWRfcGFuZWxcIiB0aXRsZT17IHN0cmluZ3MuZmllbGRfc3R5bGVzIH0+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIndwZm9ybXMtcGFuZWwtcHJldmlldyB3cGZvcm1zLXBhbmVsLXByZXZpZXctZmllbGRcIj48L2Rpdj5cblx0XHRcdFx0XHQ8L1BhbmVsQm9keT5cblx0XHRcdFx0XHQ8UGFuZWxCb2R5IGNsYXNzTmFtZT1cIndwZm9ybXMtZ3V0ZW5iZXJnLXBhbmVsIGRpc2FibGVkX3BhbmVsXCIgdGl0bGU9eyBzdHJpbmdzLmxhYmVsX3N0eWxlcyB9PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ3cGZvcm1zLXBhbmVsLXByZXZpZXcgd3Bmb3Jtcy1wYW5lbC1wcmV2aWV3LWxhYmVsXCI+PC9kaXY+XG5cdFx0XHRcdFx0PC9QYW5lbEJvZHk+XG5cdFx0XHRcdFx0PFBhbmVsQm9keSBjbGFzc05hbWU9XCJ3cGZvcm1zLWd1dGVuYmVyZy1wYW5lbCBkaXNhYmxlZF9wYW5lbFwiIHRpdGxlPXsgc3RyaW5ncy5idXR0b25fc3R5bGVzIH0+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIndwZm9ybXMtcGFuZWwtcHJldmlldyB3cGZvcm1zLXBhbmVsLXByZXZpZXctYnV0dG9uXCI+PC9kaXY+XG5cdFx0XHRcdFx0PC9QYW5lbEJvZHk+XG5cdFx0XHRcdFx0PFBhbmVsQm9keSBjbGFzc05hbWU9XCJ3cGZvcm1zLWd1dGVuYmVyZy1wYW5lbCBkaXNhYmxlZF9wYW5lbFwiIHRpdGxlPXsgc3RyaW5ncy5jb250YWluZXJfc3R5bGVzIH0+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIndwZm9ybXMtcGFuZWwtcHJldmlldyB3cGZvcm1zLXBhbmVsLXByZXZpZXctY29udGFpbmVyXCI+PC9kaXY+XG5cdFx0XHRcdFx0PC9QYW5lbEJvZHk+XG5cdFx0XHRcdFx0PFBhbmVsQm9keSBjbGFzc05hbWU9XCJ3cGZvcm1zLWd1dGVuYmVyZy1wYW5lbCBkaXNhYmxlZF9wYW5lbFwiIHRpdGxlPXsgc3RyaW5ncy5iYWNrZ3JvdW5kX3N0eWxlcyB9PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ3cGZvcm1zLXBhbmVsLXByZXZpZXcgd3Bmb3Jtcy1wYW5lbC1wcmV2aWV3LWJhY2tncm91bmRcIj48L2Rpdj5cblx0XHRcdFx0XHQ8L1BhbmVsQm9keT5cblx0XHRcdFx0PC9GcmFnbWVudD5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKCAhIGhhc0Zvcm1zKCkgKSB7XG5cdFx0XHRqc3ggPSBbIHByaW50RW1wdHlGb3Jtc05vdGljZSggcHJvcHMuY2xpZW50SWQgKSBdO1xuXG5cdFx0XHRqc3gucHVzaCggZ2V0RW1wdHlGb3Jtc1ByZXZpZXcoIHByb3BzICkgKTtcblx0XHRcdHJldHVybiBqc3g7XG5cdFx0fVxuXG5cdFx0anN4ID0gW1xuXHRcdFx0PEluc3BlY3RvckNvbnRyb2xzIGtleT1cIndwZm9ybXMtZ3V0ZW5iZXJnLWZvcm0tc2VsZWN0b3ItaW5zcGVjdG9yLWNvbnRyb2xzXCI+XG5cdFx0XHRcdDxQYW5lbEJvZHkgdGl0bGU9eyB3cGZvcm1zX2d1dGVuYmVyZ19mb3JtX3NlbGVjdG9yLnN0cmluZ3MuZm9ybV9zZXR0aW5ncyB9PlxuXHRcdFx0XHRcdDxTZWxlY3RDb250cm9sXG5cdFx0XHRcdFx0XHRsYWJlbD17IHdwZm9ybXNfZ3V0ZW5iZXJnX2Zvcm1fc2VsZWN0b3Iuc3RyaW5ncy5mb3JtX3NlbGVjdGVkIH1cblx0XHRcdFx0XHRcdHZhbHVlPXsgZm9ybUlkIH1cblx0XHRcdFx0XHRcdG9wdGlvbnM9eyBmb3JtT3B0aW9ucyB9XG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17IHNlbGVjdEZvcm0gfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PFRvZ2dsZUNvbnRyb2xcblx0XHRcdFx0XHRcdGxhYmVsPXsgd3Bmb3Jtc19ndXRlbmJlcmdfZm9ybV9zZWxlY3Rvci5zdHJpbmdzLnNob3dfdGl0bGUgfVxuXHRcdFx0XHRcdFx0Y2hlY2tlZD17IGRpc3BsYXlUaXRsZSB9XG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17IHRvZ2dsZURpc3BsYXlUaXRsZSB9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8VG9nZ2xlQ29udHJvbFxuXHRcdFx0XHRcdFx0bGFiZWw9eyB3cGZvcm1zX2d1dGVuYmVyZ19mb3JtX3NlbGVjdG9yLnN0cmluZ3Muc2hvd19kZXNjcmlwdGlvbiB9XG5cdFx0XHRcdFx0XHRjaGVja2VkPXsgZGlzcGxheURlc2MgfVxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9eyB0b2dnbGVEaXNwbGF5RGVzYyB9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJ3cGZvcm1zLWd1dGVuYmVyZy1wYW5lbC1ub3RpY2Ugd3Bmb3Jtcy13YXJuaW5nXCI+XG5cdFx0XHRcdFx0XHQ8c3Ryb25nPnsgc3RyaW5ncy51cGRhdGVfd3Bfbm90aWNlX2hlYWQgfTwvc3Ryb25nPlxuXHRcdFx0XHRcdFx0eyBzdHJpbmdzLnVwZGF0ZV93cF9ub3RpY2VfdGV4dCB9IDxhIGhyZWY9eyBzdHJpbmdzLnVwZGF0ZV93cF9ub3RpY2VfbGluayB9IHJlbD1cIm5vcmVmZXJyZXJcIiB0YXJnZXQ9XCJfYmxhbmtcIj57IHN0cmluZ3MubGVhcm5fbW9yZSB9PC9hPlxuXHRcdFx0XHRcdDwvcD5cblx0XHRcdFx0PC9QYW5lbEJvZHk+XG5cdFx0XHRcdHsgZ2V0U3R5bGluZ1BhbmVsc1ByZXZpZXcoKSB9XG5cdFx0XHQ8L0luc3BlY3RvckNvbnRyb2xzPixcblx0XHRdO1xuXG5cdFx0aWYgKCBmb3JtSWQgKSB7XG5cdFx0XHRwcm9wcy5zZXRBdHRyaWJ1dGVzKCB7IHBhZ2VUaXRsZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJy5lZGl0b3ItcG9zdC10aXRsZV9faW5wdXQnICk/LnRleHRDb250ZW50ID8/ICcnIH0gKTtcblxuXHRcdFx0anN4LnB1c2goXG5cdFx0XHRcdDxTZXJ2ZXJTaWRlUmVuZGVyXG5cdFx0XHRcdFx0a2V5PVwid3Bmb3Jtcy1ndXRlbmJlcmctZm9ybS1zZWxlY3Rvci1zZXJ2ZXItc2lkZS1yZW5kZXJlclwiXG5cdFx0XHRcdFx0YmxvY2s9XCJ3cGZvcm1zL2Zvcm0tc2VsZWN0b3JcIlxuXHRcdFx0XHRcdGF0dHJpYnV0ZXM9eyBwcm9wcy5hdHRyaWJ1dGVzIH1cblx0XHRcdFx0Lz5cblx0XHRcdCk7XG5cdFx0fSBlbHNlIGlmICggcHJldmlldyApIHtcblx0XHRcdGpzeC5wdXNoKFxuXHRcdFx0XHQ8RnJhZ21lbnRcblx0XHRcdFx0XHRrZXk9XCJ3cGZvcm1zLWd1dGVuYmVyZy1mb3JtLXNlbGVjdG9yLWZyYWdtZW50LWJsb2NrLXByZXZpZXdcIj5cblx0XHRcdFx0XHQ8aW1nIHNyYz17IHdwZm9ybXNfZ3V0ZW5iZXJnX2Zvcm1fc2VsZWN0b3IuYmxvY2tfcHJldmlld191cmwgfSBzdHlsZT17IHsgd2lkdGg6ICcxMDAlJyB9IH0gYWx0PVwiXCIgLz5cblx0XHRcdFx0PC9GcmFnbWVudD5cblx0XHRcdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGpzeC5wdXNoKFxuXHRcdFx0XHQ8UGxhY2Vob2xkZXJcblx0XHRcdFx0XHRrZXk9XCJ3cGZvcm1zLWd1dGVuYmVyZy1mb3JtLXNlbGVjdG9yLXdyYXBcIlxuXHRcdFx0XHRcdGNsYXNzTmFtZT1cIndwZm9ybXMtZ3V0ZW5iZXJnLWZvcm0tc2VsZWN0b3Itd3JhcFwiPlxuXHRcdFx0XHRcdDxpbWcgc3JjPXsgd3Bmb3Jtc19ndXRlbmJlcmdfZm9ybV9zZWxlY3Rvci5sb2dvX3VybCB9IGFsdD1cIlwiIC8+XG5cdFx0XHRcdFx0PFNlbGVjdENvbnRyb2xcblx0XHRcdFx0XHRcdGtleT1cIndwZm9ybXMtZ3V0ZW5iZXJnLWZvcm0tc2VsZWN0b3Itc2VsZWN0LWNvbnRyb2xcIlxuXHRcdFx0XHRcdFx0dmFsdWU9eyBmb3JtSWQgfVxuXHRcdFx0XHRcdFx0b3B0aW9ucz17IGZvcm1PcHRpb25zIH1cblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsgc2VsZWN0Rm9ybSB9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0PC9QbGFjZWhvbGRlcj5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGpzeDtcblx0fSxcblx0c2F2ZSgpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcbn0gKTtcbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUFBLEdBQUEsR0FBZ0ZDLEVBQUU7RUFBQUMsb0JBQUEsR0FBQUYsR0FBQSxDQUExRUcsZ0JBQWdCO0VBQUVDLGdCQUFnQixHQUFBRixvQkFBQSxjQUFHRCxFQUFFLENBQUNJLFVBQVUsQ0FBQ0QsZ0JBQWdCLEdBQUFGLG9CQUFBO0FBQzNFLElBQUFJLFdBQUEsR0FBb0NMLEVBQUUsQ0FBQ00sT0FBTztFQUF0Q0MsYUFBYSxHQUFBRixXQUFBLENBQWJFLGFBQWE7RUFBRUMsUUFBUSxHQUFBSCxXQUFBLENBQVJHLFFBQVE7QUFDL0IsSUFBUUMsaUJBQWlCLEdBQUtULEVBQUUsQ0FBQ1UsTUFBTSxDQUEvQkQsaUJBQWlCO0FBQ3pCLElBQUFFLElBQUEsR0FBOEJYLEVBQUUsQ0FBQ1ksV0FBVyxJQUFJWixFQUFFLENBQUNhLE1BQU07RUFBakRDLGlCQUFpQixHQUFBSCxJQUFBLENBQWpCRyxpQkFBaUI7QUFDekIsSUFBQUMsY0FBQSxHQUFpRWYsRUFBRSxDQUFDSSxVQUFVO0VBQXRFWSxhQUFhLEdBQUFELGNBQUEsQ0FBYkMsYUFBYTtFQUFFQyxhQUFhLEdBQUFGLGNBQUEsQ0FBYkUsYUFBYTtFQUFFQyxTQUFTLEdBQUFILGNBQUEsQ0FBVEcsU0FBUztFQUFFQyxXQUFXLEdBQUFKLGNBQUEsQ0FBWEksV0FBVztBQUM1RCxJQUFRQyxFQUFFLEdBQUtwQixFQUFFLENBQUNxQixJQUFJLENBQWRELEVBQUU7QUFFVixJQUFNRSxXQUFXLEdBQUdmLGFBQWEsQ0FBRSxLQUFLLEVBQUU7RUFBRWdCLEtBQUssRUFBRSxFQUFFO0VBQUVDLE1BQU0sRUFBRSxFQUFFO0VBQUVDLE9BQU8sRUFBRSxhQUFhO0VBQUVDLFNBQVMsRUFBRTtBQUFXLENBQUMsRUFDakhuQixhQUFhLENBQUUsTUFBTSxFQUFFO0VBQ3RCb0IsSUFBSSxFQUFFLGNBQWM7RUFDcEJDLENBQUMsRUFBRTtBQUNKLENBQUUsQ0FDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1DLHVCQUF1QixHQUFHLFNBQTFCQSx1QkFBdUJBLENBQWFDLFFBQVEsRUFBRztFQUNwREYsTUFBTSxDQUNKRyxHQUFHLENBQUUsNEJBQTZCLENBQUMsQ0FDbkNDLEVBQUUsQ0FBRSw0QkFBNEIsRUFBRSxVQUFVQyxDQUFDLEVBQUVDLE1BQU0sRUFBRUMsTUFBTSxFQUFFQyxTQUFTLEVBQUc7SUFDM0UsSUFBS0YsTUFBTSxLQUFLLE9BQU8sSUFBSSxDQUFFQyxNQUFNLEVBQUc7TUFDckM7SUFDRDs7SUFFQTtJQUNBLElBQU1FLFFBQVEsR0FBR3RDLEVBQUUsQ0FBQ1UsTUFBTSxDQUFDNkIsV0FBVyxDQUFFLHVCQUF1QixFQUFFO01BQ2hFSCxNQUFNLEVBQUVBLE1BQU0sQ0FBQ0ksUUFBUSxDQUFDLENBQUMsQ0FBRTtJQUM1QixDQUFFLENBQUM7O0lBRUg7SUFDQUMsK0JBQStCLENBQUNDLEtBQUssR0FBRyxDQUFFO01BQUVDLEVBQUUsRUFBRVAsTUFBTTtNQUFFUSxVQUFVLEVBQUVQO0lBQVUsQ0FBQyxDQUFFOztJQUVqRjtJQUNBckMsRUFBRSxDQUFDNkMsSUFBSSxDQUFDQyxRQUFRLENBQUUsbUJBQW9CLENBQUMsQ0FBQ0MsV0FBVyxDQUFFaEIsUUFBUyxDQUFDO0lBQy9EL0IsRUFBRSxDQUFDNkMsSUFBSSxDQUFDQyxRQUFRLENBQUUsbUJBQW9CLENBQUMsQ0FBQ0UsWUFBWSxDQUFFVixRQUFTLENBQUM7RUFDakUsQ0FBRSxDQUFDO0FBQ0wsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1XLFlBQVksR0FBRyxTQUFmQSxZQUFZQSxDQUFhZixDQUFDLEVBQUc7RUFDbEMsSUFBSyxPQUFPZ0IsTUFBTSxDQUFDQyxPQUFPLEtBQUssVUFBVSxFQUFHO0lBQzNDO0VBQ0Q7RUFFQSxJQUFNQyxLQUFLLEdBQUdDLE1BQU0sQ0FBRW5CLENBQUMsQ0FBQ29CLE1BQU0sQ0FBQ0MsS0FBSyxDQUFDQyxhQUFhLGFBQUFDLE1BQUEsQ0FBZXZCLENBQUMsQ0FBQ29CLE1BQU0sQ0FBQ2xCLE1BQU0sQ0FBSSxDQUFFLENBQUM7RUFDdkYsSUFBTXNCLE1BQU0sR0FBR1IsTUFBTSxDQUFDUyx3QkFBd0IsSUFBSSxDQUFDLENBQUM7RUFFcERQLEtBQUssQ0FBQ1EsSUFBSSxDQUFFLG1CQUFvQixDQUFDLENBQUNDLElBQUksQ0FBRSxVQUFVQyxLQUFLLEVBQUV4RCxPQUFPLEVBQUc7SUFDbEUsSUFBSyxFQUFJQSxPQUFPLFlBQVl5RCxpQkFBaUIsQ0FBRSxFQUFHO01BQ2pEO0lBQ0Q7SUFFQSxJQUFNQyxHQUFHLEdBQUdYLE1BQU0sQ0FBRS9DLE9BQVEsQ0FBQztJQUU3QixJQUFLMEQsR0FBRyxDQUFDbkIsSUFBSSxDQUFFLFdBQVksQ0FBQyxFQUFHO01BQzlCO0lBQ0Q7SUFFQSxJQUFNb0IsTUFBTSxHQUFHRCxHQUFHLENBQUNFLE9BQU8sQ0FBRSxnQkFBaUIsQ0FBQztJQUU5Q1IsTUFBTSxDQUFDUyxjQUFjLEdBQUcsWUFBVztNQUNsQyxJQUFNQyxJQUFJLEdBQUcsSUFBSTtRQUNoQkMsUUFBUSxHQUFHaEIsTUFBTSxDQUFFZSxJQUFJLENBQUNFLGFBQWEsQ0FBQ2hFLE9BQVEsQ0FBQztRQUMvQ2lFLE1BQU0sR0FBR2xCLE1BQU0sQ0FBRWUsSUFBSSxDQUFDSSxLQUFLLENBQUNsRSxPQUFRLENBQUM7UUFDckNtRSxTQUFTLEdBQUdKLFFBQVEsQ0FBQ3hCLElBQUksQ0FBRSxZQUFhLENBQUM7O01BRTFDO01BQ0EsSUFBSzRCLFNBQVMsRUFBRztRQUNoQnBCLE1BQU0sQ0FBRWUsSUFBSSxDQUFDTSxjQUFjLENBQUNwRSxPQUFRLENBQUMsQ0FBQ3FFLFFBQVEsQ0FBRUYsU0FBVSxDQUFDO01BQzVEOztNQUVBO0FBQ0g7QUFDQTtBQUNBO01BQ0csSUFBS0osUUFBUSxDQUFDTyxJQUFJLENBQUUsVUFBVyxDQUFDLEVBQUc7UUFDbEM7UUFDQUwsTUFBTSxDQUFDMUIsSUFBSSxDQUFFLGFBQWEsRUFBRTBCLE1BQU0sQ0FBQ00sSUFBSSxDQUFFLGFBQWMsQ0FBRSxDQUFDO1FBRTFELElBQUtULElBQUksQ0FBQ1UsUUFBUSxDQUFFLElBQUssQ0FBQyxDQUFDQyxNQUFNLEVBQUc7VUFDbkNSLE1BQU0sQ0FBQ1MsVUFBVSxDQUFFLGFBQWMsQ0FBQztRQUNuQztNQUNEO01BRUEsSUFBSSxDQUFDQyxPQUFPLENBQUMsQ0FBQztNQUNkaEIsTUFBTSxDQUFDTCxJQUFJLENBQUUsY0FBZSxDQUFDLENBQUNzQixXQUFXLENBQUUsYUFBYyxDQUFDO0lBQzNELENBQUM7SUFFRGxCLEdBQUcsQ0FBQ25CLElBQUksQ0FBRSxXQUFXLEVBQUUsSUFBSUssTUFBTSxDQUFDQyxPQUFPLENBQUU3QyxPQUFPLEVBQUVvRCxNQUFPLENBQUUsQ0FBQzs7SUFFOUQ7SUFDQSxJQUFLTSxHQUFHLENBQUNtQixHQUFHLENBQUMsQ0FBQyxFQUFHO01BQ2hCbkIsR0FBRyxDQUFDb0IsTUFBTSxDQUFDLENBQUMsQ0FBQ3hCLElBQUksQ0FBRSxpQkFBa0IsQ0FBQyxDQUFDaUIsSUFBSSxDQUFFLE9BQU8sRUFBRSwwQkFBMkIsQ0FBQztJQUNuRjtFQUNELENBQUUsQ0FBQztBQUNKLENBQUM7O0FBRUQ7QUFDQXhCLE1BQU0sQ0FBRSxZQUFXO0VBQ2xCQSxNQUFNLENBQUVILE1BQU8sQ0FBQyxDQUFDakIsRUFBRSxDQUFFLCtCQUErQixFQUFFZ0IsWUFBYSxDQUFDO0FBQ3JFLENBQUUsQ0FBQztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBTW9DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBZ0JBLENBQWF0RCxRQUFRLEVBQUc7RUFDN0MsSUFBS3NCLE1BQU0sQ0FBQ2lDLGFBQWEsQ0FBRXpELE1BQU8sQ0FBQyxFQUFHO0lBQ3JDLElBQU0wRCxJQUFJLEdBQUdsQyxNQUFNLENBQUUsMEJBQTJCLENBQUM7SUFDakQsSUFBTStCLE1BQU0sR0FBRy9CLE1BQU0sQ0FBRSxTQUFVLENBQUM7SUFFbEMrQixNQUFNLENBQUNJLEtBQUssQ0FBRUQsSUFBSyxDQUFDO0lBRXBCMUQsTUFBTSxHQUFHdUQsTUFBTSxDQUFDSyxRQUFRLENBQUUsMEJBQTJCLENBQUM7RUFDdkQ7RUFFQSxJQUFNQyxHQUFHLEdBQUdqRCwrQkFBK0IsQ0FBQ2tELGVBQWU7SUFDMURDLE9BQU8sR0FBRy9ELE1BQU0sQ0FBQytCLElBQUksQ0FBRSxRQUFTLENBQUM7RUFFbEM5Qix1QkFBdUIsQ0FBRUMsUUFBUyxDQUFDO0VBQ25DNkQsT0FBTyxDQUFDZixJQUFJLENBQUUsS0FBSyxFQUFFYSxHQUFJLENBQUM7RUFDMUI3RCxNQUFNLENBQUNnRSxNQUFNLENBQUMsQ0FBQztBQUNoQixDQUFDO0FBRUQsSUFBTUMsUUFBUSxHQUFHLFNBQVhBLFFBQVFBLENBQUEsRUFBYztFQUMzQixPQUFPckQsK0JBQStCLENBQUNDLEtBQUssQ0FBQ3FDLE1BQU0sR0FBRyxDQUFDO0FBQ3hELENBQUM7QUFFRHRFLGlCQUFpQixDQUFFLHVCQUF1QixFQUFFO0VBQzNDc0YsS0FBSyxFQUFFdEQsK0JBQStCLENBQUN1RCxPQUFPLENBQUNELEtBQUs7RUFDcERFLFdBQVcsRUFBRXhELCtCQUErQixDQUFDdUQsT0FBTyxDQUFDQyxXQUFXO0VBQ2hFQyxJQUFJLEVBQUU1RSxXQUFXO0VBQ2pCNkUsUUFBUSxFQUFFMUQsK0JBQStCLENBQUN1RCxPQUFPLENBQUNJLGFBQWE7RUFDL0RDLFFBQVEsRUFBRSxTQUFTO0VBQ25CQyxVQUFVLEVBQUU7SUFDWGxFLE1BQU0sRUFBRTtNQUNQbUUsSUFBSSxFQUFFO0lBQ1AsQ0FBQztJQUNEQyxZQUFZLEVBQUU7TUFDYkQsSUFBSSxFQUFFO0lBQ1AsQ0FBQztJQUNERSxXQUFXLEVBQUU7TUFDWkYsSUFBSSxFQUFFO0lBQ1AsQ0FBQztJQUNERyxPQUFPLEVBQUU7TUFDUkgsSUFBSSxFQUFFO0lBQ1AsQ0FBQztJQUNESSxTQUFTLEVBQUU7TUFDVkosSUFBSSxFQUFFO0lBQ1A7RUFDRCxDQUFDO0VBQ0RLLE9BQU8sRUFBRTtJQUNSTixVQUFVLEVBQUU7TUFDWEksT0FBTyxFQUFFO0lBQ1Y7RUFDRCxDQUFDO0VBQ0RHLFFBQVEsRUFBRTtJQUNUQyxlQUFlLEVBQUVoQixRQUFRLENBQUM7RUFDM0IsQ0FBQztFQUNEaUIsSUFBSSxXQUFBQSxLQUFFQyxLQUFLLEVBQUc7SUFBRTtJQUNmLElBQUFDLGlCQUFBLEdBQW1IRCxLQUFLLENBQWhIVixVQUFVO01BQUFZLHFCQUFBLEdBQUFELGlCQUFBLENBQUk3RSxNQUFNO01BQU5BLE1BQU0sR0FBQThFLHFCQUFBLGNBQUcsRUFBRSxHQUFBQSxxQkFBQTtNQUFBQyxxQkFBQSxHQUFBRixpQkFBQSxDQUFFVCxZQUFZO01BQVpBLFlBQVksR0FBQVcscUJBQUEsY0FBRyxLQUFLLEdBQUFBLHFCQUFBO01BQUFDLHNCQUFBLEdBQUFILGlCQUFBLENBQUVSLFdBQVc7TUFBWEEsV0FBVyxHQUFBVyxzQkFBQSxjQUFHLEtBQUssR0FBQUEsc0JBQUE7TUFBQUMscUJBQUEsR0FBQUosaUJBQUEsQ0FBRVAsT0FBTztNQUFQQSxPQUFPLEdBQUFXLHFCQUFBLGNBQUcsS0FBSyxHQUFBQSxxQkFBQTtNQUFJQyxhQUFhLEdBQUtOLEtBQUssQ0FBdkJNLGFBQWE7SUFDOUcsSUFBTUMsV0FBVyxHQUFHOUUsK0JBQStCLENBQUNDLEtBQUssQ0FBQzhFLEdBQUcsQ0FBRSxVQUFFQyxLQUFLO01BQUEsT0FDckU7UUFBRUEsS0FBSyxFQUFFQSxLQUFLLENBQUM5RSxFQUFFO1FBQUUrRSxLQUFLLEVBQUVELEtBQUssQ0FBQzdFO01BQVcsQ0FBQztJQUFBLENBQzNDLENBQUM7SUFFSCxJQUFNb0QsT0FBTyxHQUFHdkQsK0JBQStCLENBQUN1RCxPQUFPO0lBQ3ZELElBQUkyQixHQUFHO0lBRVBKLFdBQVcsQ0FBQ0ssT0FBTyxDQUFFO01BQUVILEtBQUssRUFBRSxFQUFFO01BQUVDLEtBQUssRUFBRWpGLCtCQUErQixDQUFDdUQsT0FBTyxDQUFDNkI7SUFBWSxDQUFFLENBQUM7SUFFaEcsU0FBU0MsVUFBVUEsQ0FBRUwsS0FBSyxFQUFHO01BQUU7TUFDOUJILGFBQWEsQ0FBRTtRQUFFbEYsTUFBTSxFQUFFcUY7TUFBTSxDQUFFLENBQUM7SUFDbkM7SUFFQSxTQUFTTSxrQkFBa0JBLENBQUVOLEtBQUssRUFBRztNQUFFO01BQ3RDSCxhQUFhLENBQUU7UUFBRWQsWUFBWSxFQUFFaUI7TUFBTSxDQUFFLENBQUM7SUFDekM7SUFFQSxTQUFTTyxpQkFBaUJBLENBQUVQLEtBQUssRUFBRztNQUFFO01BQ3JDSCxhQUFhLENBQUU7UUFBRWIsV0FBVyxFQUFFZ0I7TUFBTSxDQUFFLENBQUM7SUFDeEM7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0lBQ0UsU0FBU1Esb0JBQW9CQSxDQUFFQyxVQUFVLEVBQUc7TUFDM0MsSUFBTUMsUUFBUSxHQUFHRCxVQUFVLENBQUNDLFFBQVE7TUFFcEMsb0JBQ0NDLEtBQUEsQ0FBQTdILGFBQUEsQ0FBQ0MsUUFBUTtRQUNSNkgsR0FBRyxFQUFDO01BQXNELGdCQUMxREQsS0FBQSxDQUFBN0gsYUFBQTtRQUFLbUIsU0FBUyxFQUFDO01BQXlCLGdCQUN2QzBHLEtBQUEsQ0FBQTdILGFBQUE7UUFBSytILEdBQUcsRUFBRzdGLCtCQUErQixDQUFDOEYsZUFBaUI7UUFBQ0MsR0FBRyxFQUFDO01BQUUsQ0FBRSxDQUFDLGVBQ3RFSixLQUFBLENBQUE3SCxhQUFBO1FBQUdrSSx1QkFBdUIsRUFBRztVQUFFQyxNQUFNLEVBQUUxQyxPQUFPLENBQUMyQztRQUFtQjtNQUFHLENBQUksQ0FBQyxlQUMxRVAsS0FBQSxDQUFBN0gsYUFBQTtRQUFRZ0csSUFBSSxFQUFDLFFBQVE7UUFBQzdFLFNBQVMsRUFBQywyREFBMkQ7UUFDMUZrSCxPQUFPLEVBQ04sU0FBQUEsUUFBQSxFQUFNO1VBQ0x2RCxnQkFBZ0IsQ0FBRThDLFFBQVMsQ0FBQztRQUM3QjtNQUNBLEdBRUMvRyxFQUFFLENBQUUsYUFBYSxFQUFFLGNBQWUsQ0FDN0IsQ0FBQyxlQUNUZ0gsS0FBQSxDQUFBN0gsYUFBQTtRQUFHbUIsU0FBUyxFQUFDLFlBQVk7UUFBQytHLHVCQUF1QixFQUFHO1VBQUVDLE1BQU0sRUFBRTFDLE9BQU8sQ0FBQzZDO1FBQW1CO01BQUcsQ0FBSSxDQUFDLGVBR2pHVCxLQUFBLENBQUE3SCxhQUFBO1FBQUt1SSxFQUFFLEVBQUMseUJBQXlCO1FBQUNwSCxTQUFTLEVBQUM7TUFBdUIsZ0JBQ2xFMEcsS0FBQSxDQUFBN0gsYUFBQTtRQUFRK0gsR0FBRyxFQUFDLGFBQWE7UUFBQy9HLEtBQUssRUFBQyxNQUFNO1FBQUNDLE1BQU0sRUFBQyxNQUFNO1FBQUNzSCxFQUFFLEVBQUMsd0JBQXdCO1FBQUMvQyxLQUFLLEVBQUM7TUFBeUIsQ0FBUyxDQUNySCxDQUNELENBQ0ksQ0FBQztJQUViOztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNFLFNBQVNnRCxxQkFBcUJBLENBQUVaLFFBQVEsRUFBRztNQUMxQyxvQkFDQ0MsS0FBQSxDQUFBN0gsYUFBQSxDQUFDTyxpQkFBaUI7UUFBQ3VILEdBQUcsRUFBQztNQUF5RCxnQkFDL0VELEtBQUEsQ0FBQTdILGFBQUEsQ0FBQ1csU0FBUztRQUFDUSxTQUFTLEVBQUMseUJBQXlCO1FBQUNxRSxLQUFLLEVBQUdDLE9BQU8sQ0FBQ2dEO01BQWUsZ0JBQzdFWixLQUFBLENBQUE3SCxhQUFBO1FBQUdtQixTQUFTLEVBQUMsMEVBQTBFO1FBQUN1SCxLQUFLLEVBQUc7VUFBRUMsT0FBTyxFQUFFO1FBQVE7TUFBRyxnQkFDckhkLEtBQUEsQ0FBQTdILGFBQUEsaUJBQVVhLEVBQUUsQ0FBRSxrQ0FBa0MsRUFBRSxjQUFlLENBQVcsQ0FBQyxFQUMzRUEsRUFBRSxDQUFFLDJCQUEyQixFQUFFLGNBQWUsQ0FDaEQsQ0FBQyxlQUNKZ0gsS0FBQSxDQUFBN0gsYUFBQTtRQUFRZ0csSUFBSSxFQUFDLFFBQVE7UUFBQzdFLFNBQVMsRUFBQyw2REFBNkQ7UUFDNUZrSCxPQUFPLEVBQ04sU0FBQUEsUUFBQSxFQUFNO1VBQ0x2RCxnQkFBZ0IsQ0FBRThDLFFBQVMsQ0FBQztRQUM3QjtNQUNBLEdBRUMvRyxFQUFFLENBQUUsYUFBYSxFQUFFLGNBQWUsQ0FDN0IsQ0FDRSxDQUNPLENBQUM7SUFFdEI7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFDRSxTQUFTK0gsdUJBQXVCQSxDQUFBLEVBQUc7TUFDbEMsb0JBQ0NmLEtBQUEsQ0FBQTdILGFBQUEsQ0FBQ0MsUUFBUSxxQkFDUjRILEtBQUEsQ0FBQTdILGFBQUEsQ0FBQ1csU0FBUztRQUFDUSxTQUFTLEVBQUMsd0NBQXdDO1FBQUNxRSxLQUFLLEVBQUdDLE9BQU8sQ0FBQ29EO01BQVEsZ0JBQ3JGaEIsS0FBQSxDQUFBN0gsYUFBQTtRQUFLbUIsU0FBUyxFQUFDO01BQW9ELENBQU0sQ0FDL0QsQ0FBQyxlQUNaMEcsS0FBQSxDQUFBN0gsYUFBQSxDQUFDVyxTQUFTO1FBQUNRLFNBQVMsRUFBQyx3Q0FBd0M7UUFBQ3FFLEtBQUssRUFBR0MsT0FBTyxDQUFDcUQ7TUFBYyxnQkFDM0ZqQixLQUFBLENBQUE3SCxhQUFBO1FBQUttQixTQUFTLEVBQUM7TUFBbUQsQ0FBTSxDQUM5RCxDQUFDLGVBQ1owRyxLQUFBLENBQUE3SCxhQUFBLENBQUNXLFNBQVM7UUFBQ1EsU0FBUyxFQUFDLHdDQUF3QztRQUFDcUUsS0FBSyxFQUFHQyxPQUFPLENBQUNzRDtNQUFjLGdCQUMzRmxCLEtBQUEsQ0FBQTdILGFBQUE7UUFBS21CLFNBQVMsRUFBQztNQUFtRCxDQUFNLENBQzlELENBQUMsZUFDWjBHLEtBQUEsQ0FBQTdILGFBQUEsQ0FBQ1csU0FBUztRQUFDUSxTQUFTLEVBQUMsd0NBQXdDO1FBQUNxRSxLQUFLLEVBQUdDLE9BQU8sQ0FBQ3VEO01BQWUsZ0JBQzVGbkIsS0FBQSxDQUFBN0gsYUFBQTtRQUFLbUIsU0FBUyxFQUFDO01BQW9ELENBQU0sQ0FDL0QsQ0FBQyxlQUNaMEcsS0FBQSxDQUFBN0gsYUFBQSxDQUFDVyxTQUFTO1FBQUNRLFNBQVMsRUFBQyx3Q0FBd0M7UUFBQ3FFLEtBQUssRUFBR0MsT0FBTyxDQUFDd0Q7TUFBa0IsZ0JBQy9GcEIsS0FBQSxDQUFBN0gsYUFBQTtRQUFLbUIsU0FBUyxFQUFDO01BQXVELENBQU0sQ0FDbEUsQ0FBQyxlQUNaMEcsS0FBQSxDQUFBN0gsYUFBQSxDQUFDVyxTQUFTO1FBQUNRLFNBQVMsRUFBQyx3Q0FBd0M7UUFBQ3FFLEtBQUssRUFBR0MsT0FBTyxDQUFDeUQ7TUFBbUIsZ0JBQ2hHckIsS0FBQSxDQUFBN0gsYUFBQTtRQUFLbUIsU0FBUyxFQUFDO01BQXdELENBQU0sQ0FDbkUsQ0FDRixDQUFDO0lBRWI7SUFFQSxJQUFLLENBQUVvRSxRQUFRLENBQUMsQ0FBQyxFQUFHO01BQ25CNkIsR0FBRyxHQUFHLENBQUVvQixxQkFBcUIsQ0FBRS9CLEtBQUssQ0FBQ21CLFFBQVMsQ0FBQyxDQUFFO01BRWpEUixHQUFHLENBQUMrQixJQUFJLENBQUV6QixvQkFBb0IsQ0FBRWpCLEtBQU0sQ0FBRSxDQUFDO01BQ3pDLE9BQU9XLEdBQUc7SUFDWDtJQUVBQSxHQUFHLEdBQUcsY0FDTFMsS0FBQSxDQUFBN0gsYUFBQSxDQUFDTyxpQkFBaUI7TUFBQ3VILEdBQUcsRUFBQztJQUFvRCxnQkFDMUVELEtBQUEsQ0FBQTdILGFBQUEsQ0FBQ1csU0FBUztNQUFDNkUsS0FBSyxFQUFHdEQsK0JBQStCLENBQUN1RCxPQUFPLENBQUNnRDtJQUFlLGdCQUN6RVosS0FBQSxDQUFBN0gsYUFBQSxDQUFDUyxhQUFhO01BQ2IwRyxLQUFLLEVBQUdqRiwrQkFBK0IsQ0FBQ3VELE9BQU8sQ0FBQzJELGFBQWU7TUFDL0RsQyxLQUFLLEVBQUdyRixNQUFRO01BQ2hCd0gsT0FBTyxFQUFHckMsV0FBYTtNQUN2QnNDLFFBQVEsRUFBRy9CO0lBQVksQ0FDdkIsQ0FBQyxlQUNGTSxLQUFBLENBQUE3SCxhQUFBLENBQUNVLGFBQWE7TUFDYnlHLEtBQUssRUFBR2pGLCtCQUErQixDQUFDdUQsT0FBTyxDQUFDOEQsVUFBWTtNQUM1REMsT0FBTyxFQUFHdkQsWUFBYztNQUN4QnFELFFBQVEsRUFBRzlCO0lBQW9CLENBQy9CLENBQUMsZUFDRkssS0FBQSxDQUFBN0gsYUFBQSxDQUFDVSxhQUFhO01BQ2J5RyxLQUFLLEVBQUdqRiwrQkFBK0IsQ0FBQ3VELE9BQU8sQ0FBQ2dFLGdCQUFrQjtNQUNsRUQsT0FBTyxFQUFHdEQsV0FBYTtNQUN2Qm9ELFFBQVEsRUFBRzdCO0lBQW1CLENBQzlCLENBQUMsZUFDRkksS0FBQSxDQUFBN0gsYUFBQTtNQUFHbUIsU0FBUyxFQUFDO0lBQWdELGdCQUM1RDBHLEtBQUEsQ0FBQTdILGFBQUEsaUJBQVV5RixPQUFPLENBQUNpRSxxQkFBK0IsQ0FBQyxFQUNoRGpFLE9BQU8sQ0FBQ2tFLHFCQUFxQixFQUFFLEdBQUMsZUFBQTlCLEtBQUEsQ0FBQTdILGFBQUE7TUFBRzRKLElBQUksRUFBR25FLE9BQU8sQ0FBQ29FLHFCQUF1QjtNQUFDQyxHQUFHLEVBQUMsWUFBWTtNQUFDQyxNQUFNLEVBQUM7SUFBUSxHQUFHdEUsT0FBTyxDQUFDdUUsVUFBZSxDQUNwSSxDQUNPLENBQUMsRUFDVnBCLHVCQUF1QixDQUFDLENBQ1IsQ0FBQyxDQUNwQjtJQUVELElBQUsvRyxNQUFNLEVBQUc7TUFBQSxJQUFBb0kscUJBQUEsRUFBQUMsc0JBQUE7TUFDYnpELEtBQUssQ0FBQ00sYUFBYSxDQUFFO1FBQUVYLFNBQVMsR0FBQTZELHFCQUFBLElBQUFDLHNCQUFBLEdBQUVDLFFBQVEsQ0FBQ2xILGFBQWEsQ0FBRSwyQkFBNEIsQ0FBQyxjQUFBaUgsc0JBQUEsdUJBQXJEQSxzQkFBQSxDQUF1REUsV0FBVyxjQUFBSCxxQkFBQSxjQUFBQSxxQkFBQSxHQUFJO01BQUcsQ0FBRSxDQUFDO01BRTlHN0MsR0FBRyxDQUFDK0IsSUFBSSxlQUNQdEIsS0FBQSxDQUFBN0gsYUFBQSxDQUFDSixnQkFBZ0I7UUFDaEJrSSxHQUFHLEVBQUMsc0RBQXNEO1FBQzFEOUUsS0FBSyxFQUFDLHVCQUF1QjtRQUM3QitDLFVBQVUsRUFBR1UsS0FBSyxDQUFDVjtNQUFZLENBQy9CLENBQ0YsQ0FBQztJQUNGLENBQUMsTUFBTSxJQUFLSSxPQUFPLEVBQUc7TUFDckJpQixHQUFHLENBQUMrQixJQUFJLGVBQ1B0QixLQUFBLENBQUE3SCxhQUFBLENBQUNDLFFBQVE7UUFDUjZILEdBQUcsRUFBQztNQUF3RCxnQkFDNURELEtBQUEsQ0FBQTdILGFBQUE7UUFBSytILEdBQUcsRUFBRzdGLCtCQUErQixDQUFDbUksaUJBQW1CO1FBQUMzQixLQUFLLEVBQUc7VUFBRTFILEtBQUssRUFBRTtRQUFPLENBQUc7UUFBQ2lILEdBQUcsRUFBQztNQUFFLENBQUUsQ0FDMUYsQ0FDWCxDQUFDO0lBQ0YsQ0FBQyxNQUFNO01BQ05iLEdBQUcsQ0FBQytCLElBQUksZUFDUHRCLEtBQUEsQ0FBQTdILGFBQUEsQ0FBQ1ksV0FBVztRQUNYa0gsR0FBRyxFQUFDLHNDQUFzQztRQUMxQzNHLFNBQVMsRUFBQztNQUFzQyxnQkFDaEQwRyxLQUFBLENBQUE3SCxhQUFBO1FBQUsrSCxHQUFHLEVBQUc3RiwrQkFBK0IsQ0FBQ29JLFFBQVU7UUFBQ3JDLEdBQUcsRUFBQztNQUFFLENBQUUsQ0FBQyxlQUMvREosS0FBQSxDQUFBN0gsYUFBQSxDQUFDUyxhQUFhO1FBQ2JxSCxHQUFHLEVBQUMsZ0RBQWdEO1FBQ3BEWixLQUFLLEVBQUdyRixNQUFRO1FBQ2hCd0gsT0FBTyxFQUFHckMsV0FBYTtRQUN2QnNDLFFBQVEsRUFBRy9CO01BQVksQ0FDdkIsQ0FDVyxDQUNkLENBQUM7SUFDRjtJQUVBLE9BQU9ILEdBQUc7RUFDWCxDQUFDO0VBQ0RtRCxJQUFJLFdBQUFBLEtBQUEsRUFBRztJQUNOLE9BQU8sSUFBSTtFQUNaO0FBQ0QsQ0FBRSxDQUFDIn0=
},{}]},{},[1])