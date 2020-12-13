'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var fabric = require('fabric');
var Button = require('@material-ui/core/Button');
var Grid = require('@material-ui/core/Grid');
var PropTypes = require('prop-types');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
var Grid__default = /*#__PURE__*/_interopDefaultLegacy(Grid);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
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

    _defineProperty(_assertThisInitialized(_this), "REGEXP_ORIGINS", /^(\w+:)\/\/([^:/?#]*):?(\d*)/i);

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
    value: function componentDidUpdate() {// this.changeImage();
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

      this.initialImage();
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
    key: "isCrossOriginURL",
    value: function isCrossOriginURL(url) {
      var parts = url.match(this.REGEXP_ORIGINS);
      return parts !== null && (parts[1] !== location.protocol || parts[2] !== location.hostname || parts[3] !== location.port);
    }
  }, {
    key: "initialImage",
    value: function initialImage() {
      var _this$props = this.props,
          record = _this$props.record,
          image = _this$props.image;
      var loadImageNow = this.loadImage.bind(this);

      if (_typeof(record) === "object" && record.image) {
        var isCrossOrigin = this.isCrossOriginURL(record.image);
        var options = {};

        if (isCrossOrigin) {
          options.crossOrigin = "Anonymous";
        }

        fabric.fabric.Image.fromURL(record.image, loadImageNow, options);
      } else if (typeof image === "string") {
        var _isCrossOrigin = this.isCrossOriginURL(image);

        var _options = {};

        if (_isCrossOrigin) {
          _options.crossOrigin = "Anonymous";
        }

        fabric.fabric.Image.fromURL(image, loadImageNow, _options);
      }
    }
  }, {
    key: "initialObjects",
    value: function initialObjects() {
      var canvas = this.state.canvas;

      if (!canvas) {
        return;
      }

      var _this$props2 = this.props,
          record = _this$props2.record,
          readonly = _this$props2.readonly;

      if (_typeof(record) === "object" && record) {
        var setOutput = this.setOutput.bind(this);
        var setStateOf = this.setState.bind(this);
        var inputObject = record.clippings;
        var createObject = this.createObject.bind(this);

        if (Array.isArray(inputObject) && inputObject.length > 0 && _typeof(inputObject[0]) === "object") {
          inputObject.forEach(function (coord) {
            var rect = createObject(canvas, coord, readonly);
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
    }
  }, {
    key: "mouseHover",
    value: function mouseHover(options) {
      var onHover = this.props.onHover;
      var converter = this.shapetoStructureData.bind(this);
      var target = options.target;

      if (target && target.type === "rect" && onHover) {
        var data = converter(target);
        onHover(data);
      }
    }
  }, {
    key: "mouseOut",
    value: function mouseOut(options) {
      var onHover = this.props.onHover;
      var target = options.target;

      if (target && target.type === "rect" && onHover) {
        onHover(null);
      }
    }
  }, {
    key: "selectionHandler",
    value: function selectionHandler(options) {
      var onSelect = this.props.onSelect;
      var converter = this.shapetoStructureData.bind(this);
      var target = options.target;

      if (target && target.type === "rect" && onSelect) {
        var data = converter(target);
        onSelect(data);
      }
    }
  }, {
    key: "selectionClearHandler",
    value: function selectionClearHandler(options) {
      var onSelect = this.props.onSelect;

      if (onSelect) {
        onSelect(null);
      }
    }
  }, {
    key: "initialCanvas",
    value: function initialCanvas() {
      var _this$props3 = this.props,
          width = _this$props3.width,
          height = _this$props3.height,
          readonly = _this$props3.readonly;
      var canvas = new fabric.fabric.Canvas(this.props.id, {
        width: width,
        height: height
      });
      canvas.uniScaleTransform = true; // handler setup

      if (readonly) {
        // readonly mode
        canvas.selectionKey = null; // disable multi select

        var mouseHoverHandler = this.mouseHover.bind(this);
        var mouseHoverOutHandler = this.mouseOut.bind(this);
        var selectionObjectHandler = this.selectionHandler.bind(this);
        var selectionObjectClearHandler = this.selectionClearHandler.bind(this);
        canvas.on("mouse:over", mouseHoverHandler);
        canvas.on("mouse:out", mouseHoverOutHandler);
        canvas.on("selection:created", selectionObjectHandler);
        canvas.on("selection:updated", selectionObjectHandler);
        canvas.on("selection:cleared", selectionObjectClearHandler);
      } else {
        // edit mode
        var doubleClickEvent = this.doubleClickEvent.bind(this);
        var objectModifiedEvent = this.setOutput.bind(this);
        canvas.on("mouse:dblclick", doubleClickEvent);
        canvas.on("object:modified", objectModifiedEvent);
      } // all mode handler


      var zoomHandler = this.zoom.bind(this);
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
      canvas.on("mouse:up", function (opt) {
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
      var rect = this.createObject(canvas, coor, false);
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
        var _left = options.absolutePointer.x;
        var _top = options.absolutePointer.y;
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
      return new fabric.fabric.Rect({
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

      var _this$props4 = this.props,
          includeDataUrl = _this$props4.includeDataUrl,
          includeHtmlCanvas = _this$props4.includeHtmlCanvas;
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

      coord.deletedAt = "-1";
      return coord;
    }
  }, {
    key: "deleteShapes",
    value: function deleteShapes() {
      var readonly = this.props.readonly;
      var canvas = this.state.canvas;

      if (canvas && !readonly) {
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
    value: function createObject(canvas, coor, readonly) {
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
      return new fabric.fabric.Rect({
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
        lockRotation: true,
        lockMovementX: readonly,
        lockMovementY: readonly,
        lockScalingX: readonly,
        lockScalingY: readonly
      });
    }
  }, {
    key: "multiSelect",
    value: function multiSelect() {
      var readonly = this.props.readonly;
      var canvas = this.state.canvas;

      if (canvas && !readonly) {
        canvas.discardActiveObject();
        var sel = new fabric.fabric.ActiveSelection(canvas.getObjects(), {
          canvas: canvas
        });
        canvas.setActiveObject(sel);
        canvas.requestRenderAll();
      } else {
        console.log("Canvas not defined or read-only mode");
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
      var _this$props5 = this.props,
          input = _this$props5.input,
          source = _this$props5.source,
          showLabel = _this$props5.showLabel,
          showButton = _this$props5.showButton,
          id = _this$props5.id,
          width = _this$props5.width,
          height = _this$props5.height,
          readonly = _this$props5.readonly;
      var renderInputRedux = !!input;
      var valueForm;
      var nameForm = source;

      if (renderInputRedux) {
        var value = input.value,
            name = input.name;
        valueForm = value;
        nameForm = name;
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
        onKeyDown: !readonly ? this.keyboardHandler : undefined,
        tabIndex: "0"
      }, /*#__PURE__*/React__default['default'].createElement("canvas", {
        id: id,
        width: width,
        height: height,
        style: {
          border: "0px solid #aaa"
        }
      })), showButton && !readonly && /*#__PURE__*/React__default['default'].createElement(Grid__default['default'], {
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
    }
  }]);

  return ReactMultiCrop;
}(React.Component);

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
  readonly: false,
  onHover: function onHover(data) {
    console.log(data);
  },
  onSelect: function onSelect(data) {
    console.log(data);
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
ReactMultiCrop.propTypes = {
  id: PropTypes__default['default'].string,
  width: PropTypes__default['default'].number,
  height: PropTypes__default['default'].number,
  source: PropTypes__default['default'].string,
  input: PropTypes__default['default'].shape({
    value: PropTypes__default['default'].oneOfType([PropTypes__default['default'].object, PropTypes__default['default'].string, PropTypes__default['default'].any]),
    name: PropTypes__default['default'].string,
    onChange: PropTypes__default['default'].func
  }),
  record: PropTypes__default['default'].shape({
    image: PropTypes__default['default'].string,
    clippings: PropTypes__default['default'].array
  }),
  readonly: PropTypes__default['default'].bool,
  onHover: PropTypes__default['default'].func,
  onSelect: PropTypes__default['default'].func,
  image: PropTypes__default['default'].string,
  cropBackgroundColor: PropTypes__default['default'].string,
  cropBackgroundOpacity: PropTypes__default['default'].number,
  cropOutlineColor: PropTypes__default['default'].string,
  cropOutlineWidth: PropTypes__default['default'].number,
  showLabel: PropTypes__default['default'].bool,
  showButton: PropTypes__default['default'].bool,
  includeDataUrl: PropTypes__default['default'].bool,
  includeHtmlCanvas: PropTypes__default['default'].bool
};

exports.ReactMultiCrop = ReactMultiCrop;
