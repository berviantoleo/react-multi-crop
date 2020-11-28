"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Default = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ReactMultiCrop = _interopRequireDefault(require("./ReactMultiCrop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = {
  title: "ReactMultiCrop",
  component: _ReactMultiCrop["default"]
};
exports["default"] = _default;

var Template = function Template(args) {
  return /*#__PURE__*/_react["default"].createElement(_ReactMultiCrop["default"], _extends({
    hideLabel: true
  }, args));
};

var Default = Template.bind({});
exports.Default = Default;
Default.args = {
  image: "https://picsum.photos/200",
  hideLabel: true
};
Default.parameters = {
  docs: {
    description: {
      component: "Example load an image to cropper"
    },
    source: {
      code: "<ReactMultiCrop image=\"https://picsum.photos/200\" hideLabel />"
    }
  }
};
Default.argTypes = {
  image: {
    description: "image url"
  },
  hideLabel: {
    description: "hide the default label"
  }
};