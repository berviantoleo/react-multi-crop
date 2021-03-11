import React, { Component } from 'react';
import { fabric } from 'fabric';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export interface IRecordProps {
  image?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clippings: Array<any>;
}

export interface IOutputData extends ICoord {
  crop?: string;
  deletedAt?: string;
  dataUrl?: string | null;
  canvasElement?: HTMLCanvasElement | null;
}

export interface IInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: string | any;
  name?: string;
  onChange(value: Array<IOutputData>): void;
}

export interface IReactMultiCropProps {
  id?: string;
  width?: number;
  height?: number;
  source?: string;
  input?: IInputProps;
  record?: IRecordProps;
  image?: string;
  cropBackgroundColor?: string;
  cropBackgroundOpacity?: number;
  showLabel?: boolean;
  showButton?: boolean;
  includeDataUrl?: boolean;
  includeHtmlCanvas?: boolean;
  readonly?: boolean;
  onHover?(value: IOutputData | null): void;
  onSelect?(value: IOutputData | null): void;
}

export interface IReactMultiCropStates {
  canvas: fabric.Canvas | null;
  initial: boolean;
}

export interface IRectCoord {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export interface ICoord {
  id: string | null;
  rect: IRectCoord | string;
}

export interface IAttribute {
  left: number;
  top: number;
  height: number;
  width: number;
}

export interface ICustomFabricRect extends fabric.IRectOptions {
  id: string | null;
}

export class CustomFabricRect extends fabric.Rect {
  public id: string | null = null;
  constructor(options?: ICustomFabricRect) {
    super(options);
    if (options) {
      this.id = options.id;
    }
  }
}

class ReactMultiCrop extends Component<IReactMultiCropProps, IReactMultiCropStates> {
  public static defaultProps = {
    id: 'canvas',
    width: 800,
    height: 800,
    input: null,
    source: 'react-crop-form',
    record: {
      image: null,
      clippings: [],
    },
    image: null,
    cropBackgroundColor: 'yellow',
    cropBackgroundOpacity: 0.5,
    readonly: false,
    showLabel: false,
    showButton: false,
    includeDataUrl: false,
    includeHtmlCanvas: false,
  };

  private color: string;
  private opacity: number;
  private REGEXP_ORIGINS = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;

  constructor(props: IReactMultiCropProps) {
    super(props);

    this.state = {
      canvas: null,
      initial: true,
    };

    this.color = props.cropBackgroundColor || 'yellow';
    this.opacity = props.cropBackgroundOpacity || 0.5;

    this.keyboardHandler = this.keyboardHandler.bind(this);
    this.addNew = this.addNew.bind(this);
    this.deleteShapes = this.deleteShapes.bind(this);
    this.multiSelect = this.multiSelect.bind(this);
    this.discardActiveObject = this.discardActiveObject.bind(this);
  }

  componentDidMount(): void {
    const { canvas } = this.state;
    if (!canvas) {
      this.initialCanvas();
    }
  }

  componentDidUpdate(): void {
    // this.changeImage();
  }

  changeImage(): void {
    const { canvas } = this.state;
    if (!canvas) {
      return;
    }
    if (canvas.backgroundImage) {
      return;
    }
    this.initialImage();
  }

  loadImage(img: fabric.Image): void {
    const { initial, canvas } = this.state;
    if (!canvas) {
      return;
    }
    if (!canvas.width || !canvas.height || !img.height || !img.width) {
      return;
    }
    // detect ratio
    const ratio = img.height / img.width;
    const newHeight = canvas.width * ratio;
    canvas.setHeight(newHeight);
    canvas.setZoom(canvas.width / img.width);
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    if (typeof initial === 'boolean' && initial) {
      this.setState({ initial: false }, this.initialObjects.bind(this));
    }
  }

  isCrossOriginURL(url: string): boolean {
    const parts = url.match(this.REGEXP_ORIGINS);
    return (
      parts !== null &&
      (parts[1] !== location.protocol ||
        parts[2] !== location.hostname ||
        parts[3] !== location.port)
    );
  }

  initialImage(): void {
    const { record, image } = this.props;
    const loadImageNow = this.loadImage.bind(this);
    if (typeof record === 'object' && record.image) {
      const isCrossOrigin = this.isCrossOriginURL(record.image);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options: any = {};
      if (isCrossOrigin) {
        options.crossOrigin = 'Anonymous';
      }
      fabric.Image.fromURL(record.image, loadImageNow, options);
    } else if (typeof image === 'string') {
      const isCrossOrigin = this.isCrossOriginURL(image);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options: any = {};
      if (isCrossOrigin) {
        options.crossOrigin = 'Anonymous';
      }
      fabric.Image.fromURL(image, loadImageNow, options);
    }
  }

  initialObjects(): void {
    const { canvas } = this.state;
    if (!canvas) {
      return;
    }
    const { record, readonly } = this.props;
    if (record) {
      const setOutput = this.setOutput.bind(this);
      const setStateOf = this.setState.bind(this);
      const inputObject = record.clippings;
      const createObject = this.createObject.bind(this);
      if (
        Array.isArray(inputObject) &&
        inputObject.length > 0 &&
        typeof inputObject[0] === 'object'
      ) {
        inputObject.forEach(function (coord) {
          const rect = createObject(canvas, coord, readonly || false);
          if (rect) {
            canvas.add(rect);
          }
        });
      }
      canvas.renderAll();
      setStateOf({ canvas }, setOutput);
    } else {
      console.log('Not have any record. Skipped.');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
  zoom(options: any): void {
    const { canvas } = this.state;
    if (!canvas) {
      return;
    }
    const delta = options.e.deltaY;
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.setZoom(zoom);
    options.e.preventDefault();
    options.e.stopPropagation();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
  mouseHover(options: any): void {
    const { onHover } = this.props;
    const converter = this.shapetoStructureData.bind(this);
    const target = options.target;
    if (target && target.type === 'rect' && onHover) {
      const data = converter(target);
      onHover(data);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
  mouseOut(options: any): void {
    const { onHover } = this.props;
    const target = options.target;
    if (target && target.type === 'rect' && onHover) {
      onHover(null);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
  selectionHandler(options: any): void {
    const { onSelect } = this.props;
    const converter = this.shapetoStructureData.bind(this);
    const target = options.target;
    if (target && target.type === 'rect' && onSelect) {
      const data = converter(target);
      onSelect(data);
    }
  }

  selectionClearHandler(): void {
    const { onSelect } = this.props;
    if (onSelect) {
      onSelect(null);
    }
  }

  initialCanvas(): void {
    const { id, width, height, readonly } = this.props;
    const canvas = new fabric.Canvas(id || 'canvas', {
      width: width,
      height: height,
    });
    if (readonly) {
      // readonly mode
      canvas.selectionKey = undefined;
      const mouseHoverHandler = this.mouseHover.bind(this);
      const mouseHoverOutHandler = this.mouseOut.bind(this);
      const selectionObjectHandler = this.selectionHandler.bind(this);
      const selectionObjectClearHandler = this.selectionClearHandler.bind(this);
      canvas.on('mouse:over', mouseHoverHandler);
      canvas.on('mouse:out', mouseHoverOutHandler);
      canvas.on('selection:created', selectionObjectHandler);
      canvas.on('selection:updated', selectionObjectHandler);
      canvas.on('selection:cleared', selectionObjectClearHandler);
    } else {
      // edit mode
      const doubleClickEvent = this.doubleClickEvent.bind(this);
      const objectModifiedEvent = this.setOutput.bind(this);
      canvas.on('mouse:dblclick', doubleClickEvent);
      canvas.on('object:modified', objectModifiedEvent);
    }
    const zoomHandler = this.zoom.bind(this);
    canvas.on('mouse:wheel', zoomHandler);
    // setup move drag: alt + click
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    canvas.on('mouse:down', function (opt: any) {
      const evt = opt.e;
      if (evt.altKey === true) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    canvas.on('mouse:move', function (opt: any) {
      if (this.isDragging) {
        const e = opt.e;
        const vpt = this.viewportTransform;
        vpt[4] += e.clientX - this.lastPosX;
        vpt[5] += e.clientY - this.lastPosY;
        this.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      }
    });
    canvas.on('mouse:up', function () {
      // on mouse up we want to recalculate new interaction
      // for all objects, so we call setViewportTransform
      this.setViewportTransform(this.viewportTransform);
      this.isDragging = false;
      this.selection = true;
    });
    const initialImg = this.initialImage.bind(this);
    this.setState({ canvas }, initialImg);
  }

  addNew(): void {
    const { canvas } = this.state;
    if (!canvas) {
      return;
    }
    const coor: ICoord = {
      id: null,
      rect: { x1: 0, y1: 0, x2: 0.2, y2: 0.2 },
    };
    const rect = this.createObject(canvas, coor, false);
    if (!rect) {
      return;
    }
    canvas.add(rect);
    canvas.renderAll();
    this.setState({ canvas }, this.setOutput);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
  doubleClickEvent(options: any): void {
    const { canvas } = this.state;
    if (!canvas) {
      return;
    }
    const { readonly } = this.props;
    if (options && options.target) {
      const left = options.target.left;
      const top = options.target.top;
      const width = options.target.width;
      const height = options.target.height;
      const attribute: IAttribute = {
        left: left + 50,
        top: top + 50,
        width: width * options.target.scaleX,
        height: height * options.target.scaleY,
      };
      const rect = this.createObjectByAttribute(attribute, readonly || false);
      canvas.add(rect);
      canvas.discardActiveObject();
      canvas.setActiveObject(rect);
      canvas.renderAll();
      this.setState({ canvas }, this.setOutput);
    } else if (options && options.pointer) {
      const left = options.absolutePointer.x;
      const top = options.absolutePointer.y;
      const attribute: IAttribute = {
        left: left,
        top: top,
        width: 100,
        height: 100,
      };
      const rect = this.createObjectByAttribute(attribute, readonly || false);
      canvas.add(rect);
      canvas.discardActiveObject();
      canvas.setActiveObject(rect);
      canvas.renderAll();
      this.setState({ canvas }, this.setOutput);
    }
  }

  createObjectByAttribute(attribute: IAttribute, readonly: boolean): CustomFabricRect {
    return new CustomFabricRect({
      left: attribute.left,
      top: attribute.top,
      width: attribute.width,
      height: attribute.height,
      fill: this.color,
      opacity: this.opacity,
      id: null,
      strokeWidth: 0,
      strokeUniform: true,
      lockRotation: true,
      lockMovementX: readonly,
      lockMovementY: readonly,
      lockScalingX: readonly,
      lockScalingY: readonly,
    });
  }

  shapetoStructureData(element: CustomFabricRect): IOutputData | null {
    const { canvas } = this.state;
    if (!canvas || !canvas.backgroundImage) {
      return null;
    }
    const background = canvas.backgroundImage;
    if (!(background instanceof fabric.Image)) {
      return null;
    }
    if (
      element.left === undefined ||
      element.top === undefined ||
      element.width === undefined ||
      element.height === undefined ||
      element.scaleX === undefined ||
      element.scaleY === undefined ||
      background.width === undefined ||
      background.height === undefined
    ) {
      return null;
    }
    const { includeDataUrl, includeHtmlCanvas } = this.props;
    const x1 = element.left / background.width;
    const y1 = element.top / background.height;
    const x2 = (element.left + element.width * element.scaleX) / background.width;
    const y2 = (element.top + element.height * element.scaleY) / background.height;
    const rectangle = { x1: x1, y1: y1, x2: x2, y2: y2 };
    const coord: IOutputData = {
      id: element.id,
      rect: JSON.stringify(rectangle),
    };
    // dataUrl
    if (includeDataUrl) {
      let dataUrl: string | null = null;
      try {
        dataUrl = background.toDataURL({
          height: element.getScaledHeight(),
          width: element.getScaledWidth(),
          left: element.left,
          top: element.top,
          format: 'jpeg',
        });
      } catch (error) {
        console.log(error);
      }
      coord.dataUrl = dataUrl;
    }
    // html canvas
    if (includeHtmlCanvas) {
      let canvasElement = null;
      try {
        canvasElement = background.toCanvasElement({
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
    // crop item
    const imgWidth = background.width;
    const imgHeight = background.height;
    const x1Px = x1 * imgWidth;
    const x2Px = x2 * imgWidth;
    const y1Px = y1 * imgHeight;
    const y2Px = y2 * imgHeight;
    const rectanglePx = {
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
    coord.deletedAt = '-1';
    return coord;
  }

  deleteShapes(): void {
    const { readonly } = this.props;
    const { canvas } = this.state;
    if (canvas && !readonly) {
      canvas.getActiveObjects().forEach(function (element) {
        canvas.remove(element);
      });
      this.setState({ canvas }, this.setOutput);
    }
  }

  setOutput(): void {
    const { canvas } = this.state;
    if (!canvas) {
      return;
    }
    const shapeToStructureData = this.shapetoStructureData.bind(this);
    const outputValue: Array<IOutputData> = [];
    const cropcoords = canvas.getObjects('rect');
    cropcoords.forEach(function (element: fabric.Object) {
      const data = element as CustomFabricRect;
      const outputData = shapeToStructureData(data);
      if (outputData) {
        outputValue.push(outputData);
      }
    });
    // let stringOut = JSON.stringify(outputValue)
    const { input } = this.props;
    if (input) {
      input.onChange(outputValue);
    }
  }

  createObject(
    canvas: fabric.Canvas | null,
    coor: ICoord,
    readonly: boolean,
  ): CustomFabricRect | null {
    if (!canvas || !canvas.backgroundImage) {
      return null;
    }
    const background = canvas.backgroundImage;
    if (!(background instanceof fabric.Image)) {
      return null;
    }
    if (!background.width || !background.height) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let rectangle: any;
    if (typeof coor.rect === 'string') {
      rectangle = JSON.parse(coor.rect);
    } else {
      rectangle = coor.rect;
    }
    const left = background.width * rectangle.x1;
    const top = background.height * rectangle.y1;
    const right = background.width * rectangle.x2;
    const bottom = background.height * rectangle.y2;
    const width = right - left;
    const height = bottom - top;
    return new CustomFabricRect({
      left: left,
      top: top,
      width: width,
      height: height,
      fill: this.color,
      opacity: this.opacity,
      id: coor.id,
      strokeWidth: 0,
      strokeUniform: true,
      lockRotation: true,
      hasBorders: false,
      lockMovementX: readonly,
      lockMovementY: readonly,
      lockScalingX: readonly,
      lockScalingY: readonly,
    });
  }

  multiSelect(): void {
    const { readonly } = this.props;
    const { canvas } = this.state;
    if (canvas && !readonly) {
      canvas.discardActiveObject();
      const sel = new fabric.ActiveSelection(canvas.getObjects(), {
        canvas: canvas,
      });
      canvas.setActiveObject(sel);
      canvas.requestRenderAll();
    } else {
      console.log('Canvas not defined');
    }
  }

  discardActiveObject(): void {
    const { canvas } = this.state;
    if (canvas) {
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    } else {
      console.log('Canvas not defined');
    }
  }

  keyboardHandler(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (event.defaultPrevented) {
      return;
    }
    let handled = false;
    const key = event.key || event.keyCode;
    if (key === 'Delete' || key === 46) {
      // Handle Delete
      this.deleteShapes();
      handled = true;
    } else if (event.ctrlKey && (key === 65 || key === 'a')) {
      this.multiSelect();
      handled = true;
    }
    if (handled) {
      // Suppress "double action" if event handled
      event.preventDefault();
    }
  }

  render(): JSX.Element {
    const { input, source, showLabel, showButton, id, width, height, readonly } = this.props;
    const renderInputRedux = !!input;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
    let valueForm: any;
    let nameForm = source;
    if (input) {
      const { value, name } = input;
      valueForm = value;
      nameForm = name;
    }

    return (
      <div id="canvas-wrapper">
        {showLabel && <div className="label">{nameForm}</div>}

        <Grid container direction="row" justify="flex-start" alignItems="flex-start">
          <Grid item xs onKeyDown={!readonly ? this.keyboardHandler : undefined} tabIndex={0}>
            <canvas id={id} width={width} height={height} style={{ border: '0px solid #aaa' }} />
          </Grid>
          {showButton && !readonly && (
            <Grid container item xs direction="column" justify="flex-start" alignItems="flex-start">
              <Grid item xs>
                <Button variant="contained" id="addmore" color="primary" onClick={this.addNew}>
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
                  Delete Selected Object
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  variant="contained"
                  id="multiselect"
                  color="primary"
                  onClick={this.multiSelect}
                >
                  Select All
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  variant="contained"
                  id="discard"
                  color="primary"
                  onClick={this.discardActiveObject}
                >
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

export default ReactMultiCrop;
