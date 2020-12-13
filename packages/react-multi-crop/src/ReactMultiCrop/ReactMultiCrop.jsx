import React, { Component } from "react";
import { fabric } from "fabric";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

class ReactMultiCrop extends Component {
  REGEXP_ORIGINS = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;

  constructor(props) {
    super(props);

    this.state = {
      canvas: null,
      initial: true,
    };

    this.color = props.cropBackgroundColor;
    this.opacity = props.cropBackgroundOpacity;
    this.strokeColor = props.cropOutlineColor;
    this.strokeWidth = props.cropOutlineWidth;
    this.strokeDashArray = [5, 5];

    this.keyboardHandler = this.keyboardHandler.bind(this);
    this.addNew = this.addNew.bind(this);
    this.deleteShapes = this.deleteShapes.bind(this);
    this.multiSelect = this.multiSelect.bind(this);
    this.discardActiveObject = this.discardActiveObject.bind(this);
  }

  componentDidMount() {
    const { canvas } = this.state;
    if (!canvas) {
      this.initialCanvas();
    }
  }

  componentDidUpdate() {
    // this.changeImage();
  }

  changeImage() {
    const { canvas } = this.state;
    if (!canvas) {
      return;
    }
    if (canvas.backgroundImage) {
      return;
    }
    this.initialImage();
  }

  loadImage(img) {
    let { initial, canvas } = this.state;
    if (!canvas) {
      return;
    }
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
      scaleX: canvas.width / img.width,
      scaleY: canvas.height / img.height,
    });
    if (typeof initial === "boolean" && initial) {
      this.setState({ initial: false }, this.initialObjects.bind(this));
    }
  }

  isCrossOriginURL(url) {
    var parts = url.match(this.REGEXP_ORIGINS);
    return (
      parts !== null &&
      (parts[1] !== location.protocol ||
        parts[2] !== location.hostname ||
        parts[3] !== location.port)
    );
  }

  initialImage() {
    const { record, image } = this.props;
    const loadImageNow = this.loadImage.bind(this);
    if (typeof record === "object" && record.image) {
      const isCrossOrigin = this.isCrossOriginURL(record.image);
      const options = {};
      if (isCrossOrigin) {
        options.crossOrigin = "Anonymous";
      }
      fabric.Image.fromURL(record.image, loadImageNow, options);
    } else if (typeof image === "string") {
      const isCrossOrigin = this.isCrossOriginURL(image);
      const options = {};
      if (isCrossOrigin) {
        options.crossOrigin = "Anonymous";
      }
      fabric.Image.fromURL(image, loadImageNow, options);
    }
  }

  initialObjects() {
    const { canvas } = this.state;
    if (!canvas) {
      return;
    }
    const { record, readonly } = this.props;
    if (typeof record === "object" && record) {
      const setOutput = this.setOutput.bind(this);
      const setStateOf = this.setState.bind(this);
      const inputObject = record.clippings;
      const createObject = this.createObject.bind(this);
      if (
        Array.isArray(inputObject) &&
        inputObject.length > 0 &&
        typeof inputObject[0] === "object"
      ) {
        inputObject.forEach(function (coord) {
          let rect = createObject(canvas, coord, readonly);
          canvas.add(rect);
        });
      }
      canvas.renderAll();
      setStateOf({ canvas }, setOutput);
    } else {
      console.log("Not have any record. Skipped.");
    }
  }

  zoom(options) {
    const { canvas } = this.state;
    if (!canvas) {
      return;
    }
    var delta = options.e.deltaY;
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.setZoom(zoom);
    options.e.preventDefault();
    options.e.stopPropagation();
  }

  mouseHover(options) {
    const { onHover } = this.props;
    const converter = this.shapetoStructureData.bind(this);
    const target = options.target;
    if (target && target.type === "rect" && onHover) {
      const data = converter(target);
      onHover(data);
    }
  }

  mouseOut(options) {
    const { onHover } = this.props;
    const target = options.target;
    if (target && target.type === "rect" && onHover) {
      onHover(null);
    }
  }

  selectionHandler(options) {
    const { onSelect } = this.props;
    const converter = this.shapetoStructureData.bind(this);
    const target = options.target;
    if (target && target.type === "rect" && onSelect) {
      const data = converter(target);
      onSelect(data);
    }
  }

  selectionClearHandler(options) {
    const { onSelect } = this.props;
    if (onSelect) {
      onSelect(null);
    }
  }

  initialCanvas() {
    const { width, height, readonly } = this.props;
    const canvas = new fabric.Canvas(this.props.id, {
      width: width,
      height: height,
    });
    canvas.uniScaleTransform = true;
    // handler setup
    if (readonly) {
      // readonly mode
      const mouseHoverHandler = this.mouseHover.bind(this);
      const mouseHoverOutHandler = this.mouseOut.bind(this);
      const selectionObjectHandler = this.selectionHandler.bind(this);
      const selectionObjectClearHandler = this.selectionClearHandler.bind(this);
      canvas.on("mouse:over", mouseHoverHandler);
      canvas.on("mouse:out", mouseHoverOutHandler);
      canvas.on("selection:created", selectionObjectHandler);
      canvas.on("selection:updated", selectionObjectHandler);
      canvas.on("selection:cleared", selectionObjectClearHandler);
    } else {
      // edit mode
      const doubleClickEvent = this.doubleClickEvent.bind(this);
      const objectModifiedEvent = this.setOutput.bind(this);
      canvas.on("mouse:dblclick", doubleClickEvent);
      canvas.on("object:modified", objectModifiedEvent);
    }
    // all mode handler
    const zoomHandler = this.zoom.bind(this);
    canvas.on("mouse:wheel", zoomHandler);
    // setup move drag: alt + click
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
    let initialImg = this.initialImage.bind(this);
    this.setState({ canvas }, initialImg);
  }

  addNew() {
    const { canvas } = this.state;
    if (!canvas) {
      return;
    }
    let coor = {};
    coor.id = null;
    coor.rect = { x1: 0, y1: 0, x2: 0.2, y2: 0.2 };
    let rect = this.createObject(canvas, coor, false);
    canvas.add(rect);
    canvas.renderAll();
    this.setState({ canvas }, this.setOutput);
  }

  doubleClickEvent(options) {
    let { canvas } = this.state;
    if (!canvas) {
      return;
    }
    if (
      typeof options === "object" &&
      typeof options.target === "object" &&
      options.target
    ) {
      const left = options.target.left;
      const top = options.target.top;
      const width = options.target.width;
      const height = options.target.height;
      let attribute = {};
      attribute.left = left + 50;
      attribute.top = top + 50;
      attribute.width = width * options.target.scaleX;
      attribute.height = height * options.target.scaleY;
      let rect = this.createObjectByAttribute(attribute);
      canvas.add(rect);
      canvas.renderAll();
      this.setState({ canvas }, this.setOutput);
    } else if (
      typeof options === "object" &&
      typeof options.pointer === "object" &&
      options.pointer
    ) {
      const left = options.absolutePointer.x;
      const top = options.absolutePointer.y;
      let attribute = {};
      attribute.left = left;
      attribute.top = top;
      attribute.width = 100;
      attribute.height = 100;
      let rect = this.createObjectByAttribute(attribute);
      canvas.add(rect);
      canvas.renderAll();
      this.setState({ canvas }, this.setOutput);
    }
  }

  createObjectByAttribute(attribute) {
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
      lockRotation: true,
    });
  }

  shapetoStructureData(element) {
    let { canvas } = this.state;
    if (!canvas) {
      return;
    }
    const { includeDataUrl, includeHtmlCanvas } = this.props;
    let coord = {};
    coord.id = element.id;
    let x1 = element.left / canvas.width;
    let y1 = element.top / canvas.height;
    let x2 = (element.left + element.width * element.scaleX) / canvas.width;
    let y2 = (element.top + element.height * element.scaleY) / canvas.height;
    let rectangle = { x1: x1, y1: y1, x2: x2, y2: y2 };
    coord.rect = JSON.stringify(rectangle);
    if (
      typeof canvas === "object" &&
      typeof canvas.backgroundImage === "object" &&
      canvas.backgroundImage
    ) {
      let canvasBackground = canvas.backgroundImage;
      if (includeDataUrl) {
        let dataUrl = null;
        try {
          dataUrl = canvasBackground.toDataURL({
            height: element.getScaledHeight(),
            width: element.getScaledWidth(),
            left: element.left,
            top: element.top,
            format: "jpeg",
          });
        } catch (error) {
          console.log(error);
        }
        coord.dataUrl = dataUrl;
      }
      if (includeHtmlCanvas) {
        let canvasElement = null;
        try {
          canvasElement = canvasBackground.toCanvasElement({
            height: element.getScaledHeight(),
            width: element.getScaledWidth(),
            left: element.left,
            top: element.top,
          });
        } catch (error) {
          console.log(error);
        }
        coord.canvasElement = canvasElement;
      }
      let imgWidth = canvasBackground.width;
      let imgHeight = canvasBackground.height;
      let x1Px = x1 * imgWidth;
      let x2Px = x2 * imgWidth;
      let y1Px = y1 * imgHeight;
      let y2Px = y2 * imgHeight;
      let rectanglePx = {
        x: x1Px,
        y: y1Px,
        x2: x2Px,
        y2: y2Px,
        w: x2Px - x1Px,
        h: y2Px - y1Px,
        boundX: imgWidth,
        boundY: imgHeight,
      };
      coord.crop = JSON.stringify(rectanglePx);
    }
    coord.deletedAt = "-1";
    return coord;
  }

  deleteShapes() {
    const { readonly } = this.props;
    const { canvas } = this.state;
    if (canvas && !readonly) {
      canvas.getActiveObjects().forEach(function (element) {
        canvas.remove(element);
      });
      this.setState({ canvas }, this.setOutput);
    }
  }

  setOutput() {
    const { canvas } = this.state;
    if (!canvas) {
      return;
    }
    let shapeToStructureData = this.shapetoStructureData.bind(this);
    let outputValue = [];
    let cropcoords = canvas.getObjects();
    cropcoords.forEach(function (element) {
      outputValue.push(shapeToStructureData(element));
    });
    // let stringOut = JSON.stringify(outputValue)
    const { input } = this.props;
    if (input) {
      input.onChange(outputValue);
    }
  }

  createObject(canvas, coor, readonly) {
    if (!canvas) {
      return;
    }
    let rectangle;
    if (typeof coor.rect === "string") {
      rectangle = JSON.parse(coor.rect);
    } else {
      rectangle = coor.rect;
    }
    let left = canvas.width * rectangle.x1;
    let top = canvas.height * rectangle.y1;
    let right = canvas.width * rectangle.x2;
    let bottom = canvas.height * rectangle.y2;
    let width = right - left;
    let height = bottom - top;
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
      lockRotation: true,
      lockMovementX: readonly,
      lockMovementY: readonly,
      lockScalingX: readonly,
      lockScalingY: readonly,
    });
  }

  multiSelect() {
    const { readonly } = this.props;
    const { canvas } = this.state;
    if (canvas && !readonly) {
      canvas.discardActiveObject();
      let sel = new fabric.ActiveSelection(canvas.getObjects(), {
        canvas: canvas,
      });
      canvas.setActiveObject(sel);
      canvas.requestRenderAll();
    } else {
      console.log("Canvas not defined or read-only mode");
    }
  }

  discardActiveObject() {
    const { canvas } = this.state;
    if (canvas) {
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    } else {
      console.log("Canvas not defined");
    }
  }

  keyboardHandler(event) {
    if (event.keyCode === 46) {
      // Handle Delete
      event.preventDefault();
      this.deleteShapes();
    } else if (event.ctrlKey && event.keyCode === 65) {
      event.preventDefault();
      this.multiSelect();
    }
  }

  render() {
    const {
      input,
      source,
      showLabel,
      showButton,
      id,
      width,
      height,
      readonly,
    } = this.props;
    const renderInputRedux = !!input;
    let valueForm;
    let nameForm = source;
    if (renderInputRedux) {
      const { value, name } = input;
      valueForm = value;
      nameForm = name;
    }

    return (
      <div id="canvas-wrapper">
        {showLabel && <div className="label">{nameForm}</div>}

        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid
            item
            xs
            onKeyDown={!readonly ? this.keyboardHandler : undefined}
            tabIndex="0"
          >
            <canvas
              id={id}
              width={width}
              height={height}
              style={{ border: "0px solid #aaa" }}
            />
          </Grid>
          {showButton && !readonly && (
            <Grid
              container
              item
              xs
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs>
                <Button
                  variant="contained"
                  id="addmore"
                  color="primary"
                  onClick={this.addNew}
                >
                  {" "}
                  Add More Shapes
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  variant="contained"
                  id="deleteselected"
                  color="primary"
                  onClick={this.deleteShapes}
                >
                  {" "}
                  Delete Selected Object{" "}
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  variant="contained"
                  id="multiselect"
                  color="primary"
                  onClick={this.multiSelect}
                >
                  {" "}
                  Select All{" "}
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  variant="contained"
                  id="discard"
                  color="primary"
                  onClick={this.discardActiveObject}
                >
                  {" "}
                  Discard Selection
                </Button>
              </Grid>
            </Grid>
          )}
          {renderInputRedux && <input type="hidden" value={valueForm} />}
        </Grid>
      </div>
    );
  }
}

ReactMultiCrop.defaultProps = {
  id: "canvas",
  width: 800,
  height: 800,
  input: null,
  source: "react-crop-form",
  record: {
    image: null,
    clippings: [],
  },
  readonly: false,
  onHover: function (data) {
    console.log(data);
  },
  onSelect: function (data) {
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
  includeHtmlCanvas: false,
};

ReactMultiCrop.propTypes = {
  id: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  source: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.any,
    ]),
    name: PropTypes.string,
    onChange: PropTypes.func,
  }),
  record: PropTypes.shape({
    image: PropTypes.string,
    clippings: PropTypes.array,
  }),
  readonly: PropTypes.bool,
  onHover: PropTypes.func,
  onSelect: PropTypes.func,
  image: PropTypes.string,
  cropBackgroundColor: PropTypes.string,
  cropBackgroundOpacity: PropTypes.number,
  cropOutlineColor: PropTypes.string,
  cropOutlineWidth: PropTypes.number,
  showLabel: PropTypes.bool,
  showButton: PropTypes.bool,
  includeDataUrl: PropTypes.bool,
  includeHtmlCanvas: PropTypes.bool,
};

export default ReactMultiCrop;
