'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var fabric = require('fabric');
var Button = require('@material-ui/core/Button');
var Grid = require('@material-ui/core/Grid');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
var Grid__default = /*#__PURE__*/_interopDefaultLegacy(Grid);

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

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var CustomFabricRect =
/** @class */
function (_super) {
  __extends(CustomFabricRect, _super);

  function CustomFabricRect(options) {
    var _this = _super.call(this, options) || this;

    _this.id = null;

    if (options) {
      _this.id = options.id;
    }

    return _this;
  }

  return CustomFabricRect;
}(fabric.fabric.Rect);

var ReactMultiCrop =
/** @class */
function (_super) {
  __extends(ReactMultiCrop, _super);

  function ReactMultiCrop(props) {
    var _this = _super.call(this, props) || this;

    _this.REGEXP_ORIGINS = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
    _this.state = {
      canvas: null,
      initial: true
    };
    _this.color = props.cropBackgroundColor || "yellow";
    _this.opacity = props.cropBackgroundOpacity || 0.5;
    _this.strokeColor = props.cropOutlineColor || "yellow";
    _this.strokeWidth = props.cropOutlineWidth || 5;
    _this.strokeDashArray = [5, 5];
    _this.keyboardHandler = _this.keyboardHandler.bind(_this);
    _this.addNew = _this.addNew.bind(_this);
    _this.deleteShapes = _this.deleteShapes.bind(_this);
    _this.multiSelect = _this.multiSelect.bind(_this);
    _this.discardActiveObject = _this.discardActiveObject.bind(_this);
    return _this;
  }

  ReactMultiCrop.prototype.componentDidMount = function () {
    var canvas = this.state.canvas;

    if (!canvas) {
      this.initialCanvas();
    }
  };

  ReactMultiCrop.prototype.componentDidUpdate = function () {// this.changeImage();
  };

  ReactMultiCrop.prototype.changeImage = function () {
    var canvas = this.state.canvas;

    if (!canvas) {
      return;
    }

    if (canvas.backgroundImage) {
      return;
    }

    this.initialImage();
  };

  ReactMultiCrop.prototype.loadImage = function (img) {
    var _a = this.state,
        initial = _a.initial,
        canvas = _a.canvas;

    if (!canvas) {
      return;
    }

    if (!canvas.width || !canvas.height || !img.height || !img.width) {
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
  };

  ReactMultiCrop.prototype.isCrossOriginURL = function (url) {
    var parts = url.match(this.REGEXP_ORIGINS);
    return parts !== null && (parts[1] !== location.protocol || parts[2] !== location.hostname || parts[3] !== location.port);
  };

  ReactMultiCrop.prototype.initialImage = function () {
    var _a = this.props,
        record = _a.record,
        image = _a.image;
    var loadImageNow = this.loadImage.bind(this);

    if (_typeof(record) === "object" && record.image) {
      var isCrossOrigin = this.isCrossOriginURL(record.image);
      var options = {};

      if (isCrossOrigin) {
        options.crossOrigin = "Anonymous";
      }

      fabric.fabric.Image.fromURL(record.image, loadImageNow, options);
    } else if (typeof image === "string") {
      var isCrossOrigin = this.isCrossOriginURL(image);
      var options = {};

      if (isCrossOrigin) {
        options.crossOrigin = "Anonymous";
      }

      fabric.fabric.Image.fromURL(image, loadImageNow, options);
    }
  };

  ReactMultiCrop.prototype.initialObjects = function () {
    var canvas = this.state.canvas;

    if (!canvas) {
      return;
    }

    var record = this.props.record;

    if (_typeof(record) === "object" && record) {
      var setOutput = this.setOutput.bind(this);
      var setStateOf = this.setState.bind(this);
      var inputObject = record.clippings;
      var createObject_1 = this.createObject.bind(this);

      if (Array.isArray(inputObject) && inputObject.length > 0 && _typeof(inputObject[0]) === "object") {
        inputObject.forEach(function (coord) {
          var rect = createObject_1(canvas, coord);

          if (rect) {
            canvas.add(rect);
          }
        });
      }

      canvas.renderAll();
      setStateOf({
        canvas: canvas
      }, setOutput);
    } else {
      console.log("Not have any record. Skipped.");
    }
  };

  ReactMultiCrop.prototype.zoom = function (options) {
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
  };

  ReactMultiCrop.prototype.initialCanvas = function () {
    var _a = this.props,
        id = _a.id,
        width = _a.width,
        height = _a.height;
    var canvas = new fabric.fabric.Canvas(id || "canvas", {
      width: width,
      height: height
    });
    canvas.uniScaleTransform = true;
    var doubleClickEvent = this.doubleClickEvent.bind(this);
    var objectModifiedEvent = this.setOutput.bind(this);
    var zoomHandler = this.zoom.bind(this);
    canvas.on("mouse:dblclick", doubleClickEvent);
    canvas.on("object:modified", objectModifiedEvent);
    canvas.on("mouse:wheel", zoomHandler); // setup move drag: alt + click

    canvas.on("mouse:down", function (opt) {
      var evt = opt.e;

      if (evt.altKey === true) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }
    });
    canvas.on("mouse:move", function (opt) {
      if (this.isDragging) {
        var e = opt.e;
        var vpt = this.viewportTransform;
        vpt[4] += e.clientX - this.lastPosX;
        vpt[5] += e.clientY - this.lastPosY;
        this.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      }
    });
    canvas.on("mouse:up", function () {
      // on mouse up we want to recalculate new interaction
      // for all objects, so we call setViewportTransform
      this.setViewportTransform(this.viewportTransform);
      this.isDragging = false;
      this.selection = true;
    });
    var initialImg = this.initialImage.bind(this);
    this.setState({
      canvas: canvas
    }, initialImg);
  };

  ReactMultiCrop.prototype.addNew = function () {
    var canvas = this.state.canvas;

    if (!canvas) {
      return;
    }

    var coor = {
      id: null,
      rect: {
        x1: 0,
        y1: 0,
        x2: 0.2,
        y2: 0.2
      }
    };
    var rect = this.createObject(canvas, coor);

    if (!rect) {
      return;
    }

    canvas.add(rect);
    canvas.renderAll();
    this.setState({
      canvas: canvas
    }, this.setOutput);
  };

  ReactMultiCrop.prototype.doubleClickEvent = function (options) {
    var canvas = this.state.canvas;

    if (!canvas) {
      return;
    }

    if (_typeof(options) === "object" && _typeof(options.target) === "object" && options.target) {
      var left = options.target.left;
      var top_1 = options.target.top;
      var width = options.target.width;
      var height = options.target.height;
      var attribute = {
        left: left + 50,
        top: top_1 + 50,
        width: width * options.target.scaleX,
        height: height * options.target.scaleY
      };
      var rect = this.createObjectByAttribute(attribute);
      canvas.add(rect);
      canvas.renderAll();
      this.setState({
        canvas: canvas
      }, this.setOutput);
    } else if (_typeof(options) === "object" && _typeof(options.pointer) === "object" && options.pointer) {
      var left = options.absolutePointer.x;
      var top_2 = options.absolutePointer.y;
      var attribute = {
        left: left,
        top: top_2,
        width: 100,
        height: 100
      };
      var rect = this.createObjectByAttribute(attribute);
      canvas.add(rect);
      canvas.renderAll();
      this.setState({
        canvas: canvas
      }, this.setOutput);
    }
  };

  ReactMultiCrop.prototype.createObjectByAttribute = function (attribute) {
    return new CustomFabricRect({
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
  };

  ReactMultiCrop.prototype.shapetoStructureData = function (element) {
    var canvas = this.state.canvas;

    if (!canvas) {
      return null;
    }

    if (!element.left || !element.top || !element.width || !element.height || !element.scaleX || !element.scaleY || !canvas.width || !canvas.height) {
      return null;
    }

    var _a = this.props,
        includeDataUrl = _a.includeDataUrl,
        includeHtmlCanvas = _a.includeHtmlCanvas;
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
    var coord = {
      id: element.id,
      rect: JSON.stringify(rectangle)
    };

    if (_typeof(canvas) === "object" && _typeof(canvas.backgroundImage) === "object" && canvas.backgroundImage) {
      var canvasBackground = canvas.backgroundImage;

      if (includeDataUrl) {
        var dataUrl = null;

        try {
          dataUrl = canvasBackground.toDataURL({
            height: element.getScaledHeight(),
            width: element.getScaledWidth(),
            left: element.left,
            top: element.top,
            format: "jpeg"
          });
        } catch (error) {
          console.log(error);
        }

        coord.dataUrl = dataUrl;
      }

      if (includeHtmlCanvas) {
        var canvasElement = null;

        try {
          canvasElement = canvasBackground.toCanvasElement({
            height: element.getScaledHeight(),
            width: element.getScaledWidth(),
            left: element.left,
            top: element.top
          });
        } catch (error) {
          console.log(error);
        }

        coord.canvasElement = canvasElement;
      }

      if (canvasBackground.width && canvasBackground.height) {
        var imgWidth = canvasBackground.width;
        var imgHeight = canvasBackground.height;
        var x1Px = x1 * imgWidth;
        var x2Px = x2 * imgWidth;
        var y1Px = y1 * imgHeight;
        var y2Px = y2 * imgHeight;
        var rectanglePx = {
          x: x1Px,
          y: y1Px,
          x2: x2Px,
          y2: y2Px,
          w: x2Px - x1Px,
          h: y2Px - y1Px,
          boundX: imgWidth,
          boundY: imgHeight
        };
        coord.crop = JSON.stringify(rectanglePx);
      }
    }

    coord.deletedAt = "-1";
    return coord;
  };

  ReactMultiCrop.prototype.deleteShapes = function () {
    var canvas = this.state.canvas;

    if (canvas) {
      canvas.getActiveObjects().forEach(function (element) {
        canvas.remove(element);
      });
      this.setState({
        canvas: canvas
      }, this.setOutput);
    }
  };

  ReactMultiCrop.prototype.setOutput = function () {
    var canvas = this.state.canvas;

    if (!canvas) {
      return;
    }

    var shapeToStructureData = this.shapetoStructureData.bind(this);
    var outputValue = [];
    var cropcoords = canvas.getObjects("rect");
    cropcoords.forEach(function (element) {
      var data = element;
      var outputData = shapeToStructureData(data);

      if (outputData) {
        outputValue.push(outputData);
      }
    }); // let stringOut = JSON.stringify(outputValue)

    var input = this.props.input;

    if (input) {
      input.onChange(outputValue);
    }
  };

  ReactMultiCrop.prototype.createObject = function (canvas, coor) {
    if (!canvas) {
      return null;
    }

    if (!canvas.width || !canvas.height) {
      return null;
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
    return new CustomFabricRect({
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
  };

  ReactMultiCrop.prototype.multiSelect = function () {
    var canvas = this.state.canvas;

    if (canvas) {
      canvas.discardActiveObject();
      var sel = new fabric.fabric.ActiveSelection(canvas.getObjects(), {
        canvas: canvas
      });
      canvas.setActiveObject(sel);
      canvas.requestRenderAll();
    } else {
      console.log("Canvas not defined");
    }
  };

  ReactMultiCrop.prototype.discardActiveObject = function () {
    var canvas = this.state.canvas;

    if (canvas) {
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    } else {
      console.log("Canvas not defined");
    }
  };

  ReactMultiCrop.prototype.keyboardHandler = function (event) {
    if (event.defaultPrevented) {
      return;
    }

    var handled = false;
    var key = event.key || event.keyCode;

    if (key === "Delete" || key === 46) {
      // Handle Delete
      this.deleteShapes();
      handled = true;
    } else if (event.ctrlKey && (key === 65 || key === "a")) {
      this.multiSelect();
      handled = true;
    }

    if (handled) {
      // Suppress "double action" if event handled
      event.preventDefault();
    }
  };

  ReactMultiCrop.prototype.render = function () {
    var _a = this.props,
        input = _a.input,
        source = _a.source,
        showLabel = _a.showLabel,
        showButton = _a.showButton,
        id = _a.id,
        width = _a.width,
        height = _a.height;
    var renderInputRedux = !!input;
    var valueForm;
    var nameForm = source;

    if (input) {
      var value = input.value,
          name_1 = input.name;
      valueForm = value;
      nameForm = name_1;
    }

    return /*#__PURE__*/React__default['default'].createElement("div", {
      id: "canvas-wrapper"
    }, showLabel && /*#__PURE__*/React__default['default'].createElement("div", {
      className: "label"
    }, nameForm), /*#__PURE__*/React__default['default'].createElement(Grid__default['default'], {
      container: true,
      direction: "row",
      justify: "flex-start",
      alignItems: "flex-start"
    }, /*#__PURE__*/React__default['default'].createElement(Grid__default['default'], {
      item: true,
      xs: true,
      onKeyDown: this.keyboardHandler,
      tabIndex: 0
    }, /*#__PURE__*/React__default['default'].createElement("canvas", {
      id: id,
      width: width,
      height: height,
      style: {
        border: "0px solid #aaa"
      }
    })), showButton && /*#__PURE__*/React__default['default'].createElement(Grid__default['default'], {
      container: true,
      item: true,
      xs: true,
      direction: "column",
      justify: "flex-start",
      alignItems: "flex-start"
    }, /*#__PURE__*/React__default['default'].createElement(Grid__default['default'], {
      item: true,
      xs: true
    }, /*#__PURE__*/React__default['default'].createElement(Button__default['default'], {
      variant: "contained",
      id: "addmore",
      color: "primary",
      onClick: this.addNew
    }, " ", "Add More Shapes")), /*#__PURE__*/React__default['default'].createElement(Grid__default['default'], {
      item: true,
      xs: true
    }, /*#__PURE__*/React__default['default'].createElement(Button__default['default'], {
      variant: "contained",
      id: "deleteselected",
      color: "primary",
      onClick: this.deleteShapes
    }, " ", "Delete Selected Object", " ")), /*#__PURE__*/React__default['default'].createElement(Grid__default['default'], {
      item: true,
      xs: true
    }, /*#__PURE__*/React__default['default'].createElement(Button__default['default'], {
      variant: "contained",
      id: "multiselect",
      color: "primary",
      onClick: this.multiSelect
    }, " ", "Select All", " ")), /*#__PURE__*/React__default['default'].createElement(Grid__default['default'], {
      item: true,
      xs: true
    }, /*#__PURE__*/React__default['default'].createElement(Button__default['default'], {
      variant: "contained",
      id: "discard",
      color: "primary",
      onClick: this.discardActiveObject
    }, " ", "Discard Selection"))), renderInputRedux && /*#__PURE__*/React__default['default'].createElement("input", {
      type: "hidden",
      value: valueForm
    })));
  };

  ReactMultiCrop.defaultProps = {
    id: "canvas",
    width: 800,
    height: 800,
    input: null,
    source: "react-crop-form",
    record: {
      image: null,
      clippings: []
    },
    image: null,
    cropBackgroundColor: "yellow",
    cropBackgroundOpacity: 0.5,
    cropOutlineColor: "yellow",
    cropOutlineWidth: 5,
    showLabel: false,
    showButton: false,
    includeDataUrl: false,
    includeHtmlCanvas: false
  };
  return ReactMultiCrop;
}(React.Component);

exports.ReactMultiCrop = ReactMultiCrop;
//# sourceMappingURL=index.cjs.js.map
