import React, { Component } from "react";
import { fabric } from "fabric";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

class ReactMultiCrop extends Component {
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
    this.changeImage();
  }

  changeImage() {
    const { canvas } = this.state;
    if (!canvas) {
      return;
    }
    if (canvas.backgroundImage) {
      return;
    }
    const { record, image } = this.props;
    let setImage = this.loadImage.bind(this);
    if (typeof record === "object" && record.image) {
      fabric.Image.fromURL(record.image, setImage);
    } else if (typeof image === "string") {
      fabric.Image.fromURL(image, setImage);
    }
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

  initialImage() {
    const { record, image } = this.props;
    let loadImageNow = this.loadImage.bind(this);
    if (typeof record === "object" && record.image) {
      fabric.Image.fromURL(record.image, loadImageNow);
    } else if (typeof image === "string") {
      fabric.Image.fromURL(image, loadImageNow);
    }
  }

  initialObjects() {
    let { canvas } = this.state;
    if (!canvas) {
      return;
    }
    const { record } = this.props;
    if (typeof record === "object" && record) {
      let setOutput = this.setOutput.bind(this);
      let setStateOf = this.setState.bind(this);
      let inputObject = record.clippings;
      let createObject = this.createObject.bind(this);
      if (
        Array.isArray(inputObject) &&
        inputObject.length > 0 &&
        typeof inputObject[0] === "object"
      ) {
        inputObject.forEach(function (coord) {
          let rect = createObject(canvas, coord);
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
    this.setState({ canvas });
  }

  initialCanvas() {
    let canvas = new fabric.Canvas(this.props.id);
    canvas.uniScaleTransform = true;
    let doubleClickEvent = this.doubleClickEvent.bind(this);
    let objectModifiedEvent = this.setOutput.bind(this);
    let zoomHandler = this.zoom.bind(this);
    canvas.on("mouse:dblclick", doubleClickEvent);
    canvas.on("object:modified", objectModifiedEvent);
    canvas.on("mouse:wheel", zoomHandler);
    let initialImg = this.initialImage.bind(this);
    this.setState({ canvas }, initialImg);
  }

  addNew() {
    let { canvas } = this.state;
    if (!canvas) {
      return;
    }
    let coor = {};
    coor.id = null;
    coor.rect = { x1: 0, y1: 0, x2: 0.2, y2: 0.2 };
    let rect = this.createObject(canvas, coor);
    rect.lockRotation = true;
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
      rect.lockRotation = true;
      canvas.add(rect);
      canvas.renderAll();
      this.setState({ canvas }, this.setOutput);
    } else if (
      typeof options === "object" &&
      typeof options.pointer === "object" &&
      options.pointer
    ) {
      const left = options.pointer.x;
      const top = options.pointer.y;
      let attribute = {};
      attribute.left = left;
      attribute.top = top;
      attribute.width = 100;
      attribute.height = 100;
      let rect = this.createObjectByAttribute(attribute);
      rect.lockRotation = true;
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
    });
  }

  shapetoStructureData(element) {
    let { canvas } = this.state;
    if (!canvas) {
      return;
    }
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
      let imgWidth = canvas.backgroundImage.width;
      let imgHeight = canvas.backgroundImage.height;
      let x1Px = x1 * imgWidth;
      let x2Px = x2 * imgWidth;
      let y1Px = y1 * imgHeight;
      let y2Px = y2 * imgHeight;
      let rectanglePx = { x: x1Px, y: y1Px, x2: x2Px, y2: y2Px };
      coord.rectPx = JSON.stringify(rectanglePx);
    }
    coord.deletedAt = "-1";
    return coord;
  }

  deleteShapes() {
    let { canvas } = this.state;
    if (canvas) {
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

  createObject(canvas, coor) {
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
    });
  }

  multiSelect() {
    let { canvas } = this.state;
    if (canvas) {
      canvas.discardActiveObject();
      let sel = new fabric.ActiveSelection(canvas.getObjects(), {
        canvas: canvas,
      });
      canvas.setActiveObject(sel);
      canvas.requestRenderAll();
    } else {
      console.log("Canvas not defined");
    }
  }

  discardActiveObject() {
    let { canvas } = this.state;
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
    const { input, source, hideLabel, hideButton, ...otherProps } = this.props;
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
        {!hideLabel && <div className="label">{nameForm}</div>}

        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs onKeyDown={this.keyboardHandler} tabIndex="0">
            <canvas
              width="800"
              height="800"
              style={{ border: "0px solid #aaa" }}
              {...otherProps}
            />
          </Grid>
          {!hideButton && (
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
  input: null,
  source: "react-crop-form",
  hideLabel: true,
  hideButton: true,
  record: {
    image: null,
    clippings: [],
  },
  image: null,
  cropBackgroundColor: "yellow",
  cropBackgroundOpacity: 0.5,
  cropOutlineColor: "yellow",
  cropOutlineWidth: 5,
};

ReactMultiCrop.propTypes = {
  id: PropTypes.string,
  source: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    name: PropTypes.string,
    onChange: PropTypes.func,
  }),
  hideLabel: PropTypes.bool,
  hideButton: PropTypes.bool,
  record: PropTypes.shape({
    image: PropTypes.string,
    clippings: PropTypes.array,
  }),
  image: PropTypes.string,
  cropBackgroundColor: PropTypes.string,
  cropBackgroundOpacity: PropTypes.number,
  cropOutlineColor: PropTypes.string,
  cropOutlineWidth: PropTypes.number,
};

export default ReactMultiCrop;
