import React, { Component } from 'react';
import { fabric } from 'fabric';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

var ReactMultiCrop = /*#__PURE__*/function (_Component) {
  _inherits(ReactMultiCrop, _Component);

  var _super = _createSuper(ReactMultiCrop);

  function ReactMultiCrop(props) {
    var _this;

    _classCallCheck(this, ReactMultiCrop);

    _this = _super.call(this, props);
    _this.state = {
      canvas: null,
      initial: true
    };
    _this.color = props.cropBackgroundColor;
    _this.opacity = props.cropBackgroundOpacity;
    _this.strokeColor = props.cropOutlineColor;
    _this.strokeWidth = props.cropOutlineWidth;
    _this.strokeDashArray = [5, 5];
    _this.keyboardHandler = _this.keyboardHandler.bind(_assertThisInitialized(_this));
    _this.addNew = _this.addNew.bind(_assertThisInitialized(_this));
    _this.deleteShapes = _this.deleteShapes.bind(_assertThisInitialized(_this));
    _this.multiSelect = _this.multiSelect.bind(_assertThisInitialized(_this));
    _this.discardActiveObject = _this.discardActiveObject.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ReactMultiCrop, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var canvas = this.state.canvas;

      if (!canvas) {
        this.initialCanvas();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.changeImage();
    }
  }, {
    key: "changeImage",
    value: function changeImage() {
      var canvas = this.state.canvas;

      if (!canvas) {
        return;
      }

      if (canvas.backgroundImage) {
        return;
      }

      var _this$props = this.props,
          record = _this$props.record,
          image = _this$props.image;
      var setImage = this.loadImage.bind(this);

      if (_typeof(record) === "object" && record.image) {
        fabric.Image.fromURL(record.image, setImage);
      } else if (typeof image === "string") {
        fabric.Image.fromURL(image, setImage);
      }
    }
  }, {
    key: "loadImage",
    value: function loadImage(img) {
      var _this$state = this.state,
          initial = _this$state.initial,
          canvas = _this$state.canvas;

      if (!canvas) {
        return;
      }

      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height
      });

      if (typeof initial === "boolean" && initial) {
        this.setState({
          initial: false
        }, this.initialObjects.bind(this));
      }
    }
  }, {
    key: "initialImage",
    value: function initialImage() {
      var _this$props2 = this.props,
          record = _this$props2.record,
          image = _this$props2.image;
      var loadImageNow = this.loadImage.bind(this);

      if (_typeof(record) === "object" && record.image) {
        fabric.Image.fromURL(record.image, loadImageNow);
      } else if (typeof image === "string") {
        fabric.Image.fromURL(image, loadImageNow);
      }
    }
  }, {
    key: "initialObjects",
    value: function initialObjects() {
      var canvas = this.state.canvas;

      if (!canvas) {
        return;
      }

      var record = this.props.record;

      if (_typeof(record) === "object" && record) {
        var setOutput = this.setOutput.bind(this);
        var setStateOf = this.setState.bind(this);
        var inputObject = record.clippings;
        var createObject = this.createObject.bind(this);

        if (Array.isArray(inputObject) && inputObject.length > 0 && _typeof(inputObject[0]) === "object") {
          inputObject.forEach(function (coord) {
            var rect = createObject(canvas, coord);
            canvas.add(rect);
          });
        }

        canvas.renderAll();
        setStateOf({
          canvas: canvas
        }, setOutput);
      } else {
        console.log("Not have any record. Skipped.");
      }
    }
  }, {
    key: "zoom",
    value: function zoom(options) {
      var canvas = this.state.canvas;

      if (!canvas) {
        return;
      }

      var delta = options.e.deltaY;
      var zoom = canvas.getZoom();
      zoom *= Math.pow(0.999, delta);
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      canvas.setZoom(zoom);
      options.e.preventDefault();
      options.e.stopPropagation();
      this.setState({
        canvas: canvas
      });
    }
  }, {
    key: "initialCanvas",
    value: function initialCanvas() {
      var canvas = new fabric.Canvas(this.props.id);
      canvas.uniScaleTransform = true;
      var doubleClickEvent = this.doubleClickEvent.bind(this);
      var objectModifiedEvent = this.setOutput.bind(this);
      var zoomHandler = this.zoom.bind(this);
      canvas.on("mouse:dblclick", doubleClickEvent);
      canvas.on("object:modified", objectModifiedEvent);
      canvas.on("mouse:wheel", zoomHandler);
      var initialImg = this.initialImage.bind(this);
      this.setState({
        canvas: canvas
      }, initialImg);
    }
  }, {
    key: "addNew",
    value: function addNew() {
      var canvas = this.state.canvas;

      if (!canvas) {
        return;
      }

      var coor = {};
      coor.id = null;
      coor.rect = {
        x1: 0,
        y1: 0,
        x2: 0.2,
        y2: 0.2
      };
      var rect = this.createObject(canvas, coor);
      canvas.add(rect);
      canvas.renderAll();
      this.setState({
        canvas: canvas
      }, this.setOutput);
    }
  }, {
    key: "doubleClickEvent",
    value: function doubleClickEvent(options) {
      var canvas = this.state.canvas;

      if (!canvas) {
        return;
      }

      if (_typeof(options) === "object" && _typeof(options.target) === "object" && options.target) {
        var left = options.target.left;
        var top = options.target.top;
        var width = options.target.width;
        var height = options.target.height;
        var attribute = {};
        attribute.left = left + 50;
        attribute.top = top + 50;
        attribute.width = width * options.target.scaleX;
        attribute.height = height * options.target.scaleY;
        var rect = this.createObjectByAttribute(attribute);
        canvas.add(rect);
        canvas.renderAll();
        this.setState({
          canvas: canvas
        }, this.setOutput);
      } else if (_typeof(options) === "object" && _typeof(options.pointer) === "object" && options.pointer) {
        var _left = options.pointer.x;
        var _top = options.pointer.y;
        var _attribute = {};
        _attribute.left = _left;
        _attribute.top = _top;
        _attribute.width = 100;
        _attribute.height = 100;

        var _rect = this.createObjectByAttribute(_attribute);

        canvas.add(_rect);
        canvas.renderAll();
        this.setState({
          canvas: canvas
        }, this.setOutput);
      }
    }
  }, {
    key: "createObjectByAttribute",
    value: function createObjectByAttribute(attribute) {
      return new fabric.Rect({
        left: attribute.left,
        top: attribute.top,
        width: attribute.width,
        height: attribute.height,
        fill: this.color,
        opacity: this.opacity,
        id: null,
        strokeDashArray: this.strokeDashArray,
        stroke: this.strokeColor,
        strokeWidth: this.strokeWidth,
        lockRotation: true
      });
    }
  }, {
    key: "shapetoStructureData",
    value: function shapetoStructureData(element) {
      var canvas = this.state.canvas;

      if (!canvas) {
        return;
      }

      var coord = {};
      coord.id = element.id;
      var x1 = element.left / canvas.width;
      var y1 = element.top / canvas.height;
      var x2 = (element.left + element.width * element.scaleX) / canvas.width;
      var y2 = (element.top + element.height * element.scaleY) / canvas.height;
      var rectangle = {
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2
      };
      coord.rect = JSON.stringify(rectangle);

      if (_typeof(canvas) === "object" && _typeof(canvas.backgroundImage) === "object" && canvas.backgroundImage) {
        var imgWidth = canvas.backgroundImage.width;
        var imgHeight = canvas.backgroundImage.height;
        var x1Px = x1 * imgWidth;
        var x2Px = x2 * imgWidth;
        var y1Px = y1 * imgHeight;
        var y2Px = y2 * imgHeight;
        var rectanglePx = {
          x: x1Px,
          y: y1Px,
          x2: x2Px,
          y2: y2Px
        };
        coord.rectPx = JSON.stringify(rectanglePx);
      }

      coord.deletedAt = "-1";
      return coord;
    }
  }, {
    key: "deleteShapes",
    value: function deleteShapes() {
      var canvas = this.state.canvas;

      if (canvas) {
        canvas.getActiveObjects().forEach(function (element) {
          canvas.remove(element);
        });
        this.setState({
          canvas: canvas
        }, this.setOutput);
      }
    }
  }, {
    key: "setOutput",
    value: function setOutput() {
      var canvas = this.state.canvas;

      if (!canvas) {
        return;
      }

      var shapeToStructureData = this.shapetoStructureData.bind(this);
      var outputValue = [];
      var cropcoords = canvas.getObjects();
      cropcoords.forEach(function (element) {
        outputValue.push(shapeToStructureData(element));
      }); // let stringOut = JSON.stringify(outputValue)

      var input = this.props.input;

      if (input) {
        input.onChange(outputValue);
      }
    }
  }, {
    key: "createObject",
    value: function createObject(canvas, coor) {
      if (!canvas) {
        return;
      }

      var rectangle;

      if (typeof coor.rect === "string") {
        rectangle = JSON.parse(coor.rect);
      } else {
        rectangle = coor.rect;
      }

      var left = canvas.width * rectangle.x1;
      var top = canvas.height * rectangle.y1;
      var right = canvas.width * rectangle.x2;
      var bottom = canvas.height * rectangle.y2;
      var width = right - left;
      var height = bottom - top;
      return new fabric.Rect({
        left: left,
        top: top,
        width: width,
        height: height,
        fill: this.color,
        opacity: this.opacity,
        id: coor.id,
        strokeDashArray: this.strokeDashArray,
        stroke: this.strokeColor,
        strokeWidth: this.strokeWidth,
        lockRotation: true
      });
    }
  }, {
    key: "multiSelect",
    value: function multiSelect() {
      var canvas = this.state.canvas;

      if (canvas) {
        canvas.discardActiveObject();
        var sel = new fabric.ActiveSelection(canvas.getObjects(), {
          canvas: canvas
        });
        canvas.setActiveObject(sel);
        canvas.requestRenderAll();
      } else {
        console.log("Canvas not defined");
      }
    }
  }, {
    key: "discardActiveObject",
    value: function discardActiveObject() {
      var canvas = this.state.canvas;

      if (canvas) {
        canvas.discardActiveObject();
        canvas.requestRenderAll();
      } else {
        console.log("Canvas not defined");
      }
    }
  }, {
    key: "keyboardHandler",
    value: function keyboardHandler(event) {
      if (event.keyCode === 46) {
        // Handle Delete
        event.preventDefault();
        this.deleteShapes();
      } else if (event.ctrlKey && event.keyCode === 65) {
        event.preventDefault();
        this.multiSelect();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          input = _this$props3.input,
          source = _this$props3.source,
          hideLabel = _this$props3.hideLabel,
          hideButton = _this$props3.hideButton,
          otherProps = _objectWithoutProperties(_this$props3, ["input", "source", "hideLabel", "hideButton"]);

      var renderInputRedux = !!input;
      var valueForm;
      var nameForm = source;

      if (renderInputRedux) {
        var value = input.value,
            name = input.name;
        valueForm = value;
        nameForm = name;
      }

      return /*#__PURE__*/React.createElement("div", {
        id: "canvas-wrapper"
      }, !hideLabel && /*#__PURE__*/React.createElement("div", {
        className: "label"
      }, nameForm), /*#__PURE__*/React.createElement(Grid, {
        container: true,
        direction: "row",
        justify: "flex-start",
        alignItems: "flex-start"
      }, /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: true,
        onKeyDown: this.keyboardHandler,
        tabIndex: "0"
      }, /*#__PURE__*/React.createElement("canvas", _extends({
        width: "800",
        height: "800",
        style: {
          border: "0px solid #aaa"
        }
      }, otherProps))), !hideButton && /*#__PURE__*/React.createElement(Grid, {
        container: true,
        item: true,
        xs: true,
        direction: "column",
        justify: "flex-start",
        alignItems: "flex-start"
      }, /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: true
      }, /*#__PURE__*/React.createElement(Button, {
        variant: "contained",
        id: "addmore",
        color: "primary",
        onClick: this.addNew
      }, " ", "Add More Shapes")), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: true
      }, /*#__PURE__*/React.createElement(Button, {
        variant: "contained",
        id: "deleteselected",
        color: "primary",
        onClick: this.deleteShapes
      }, " ", "Delete Selected Object", " ")), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: true
      }, /*#__PURE__*/React.createElement(Button, {
        variant: "contained",
        id: "multiselect",
        color: "primary",
        onClick: this.multiSelect
      }, " ", "Select All", " ")), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: true
      }, /*#__PURE__*/React.createElement(Button, {
        variant: "contained",
        id: "discard",
        color: "primary",
        onClick: this.discardActiveObject
      }, " ", "Discard Selection"))), renderInputRedux && /*#__PURE__*/React.createElement("input", {
        type: "hidden",
        value: valueForm
      })));
    }
  }]);

  return ReactMultiCrop;
}(Component);

ReactMultiCrop.defaultProps = {
  id: "canvas",
  input: null,
  source: "react-crop-form",
  hideLabel: true,
  hideButton: true,
  record: {
    image: null,
    clippings: []
  },
  image: null,
  cropBackgroundColor: "yellow",
  cropBackgroundOpacity: 0.5,
  cropOutlineColor: "yellow",
  cropOutlineWidth: 5
};
ReactMultiCrop.propTypes = {
  id: PropTypes.string,
  source: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    name: PropTypes.string,
    onChange: PropTypes.func
  }),
  hideLabel: PropTypes.bool,
  hideButton: PropTypes.bool,
  record: PropTypes.shape({
    image: PropTypes.string,
    clippings: PropTypes.array
  }),
  image: PropTypes.string,
  cropBackgroundColor: PropTypes.string,
  cropBackgroundOpacity: PropTypes.number,
  cropOutlineColor: PropTypes.string,
  cropOutlineWidth: PropTypes.number
};

export { ReactMultiCrop };
