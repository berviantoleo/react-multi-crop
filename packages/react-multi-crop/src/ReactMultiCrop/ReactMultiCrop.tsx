import React, { Component } from 'react';
import { Canvas, FabricImage, Rect } from 'fabric';
import { v4 as uuidv4 } from 'uuid';
import {
  IAttribute,
  ICoord,
  IOutputData,
  IReactMultiCropProps,
  IReactMultiCropStates,
} from './interfaces';
import Container from './components/Container';
import { IRecordProps } from '..';

class ReactMultiCrop extends Component<IReactMultiCropProps, IReactMultiCropStates> {
  public static defaultProps: IReactMultiCropProps = {
    borderColor: 'black',
    cornerColor: 'black',
    cornerSize: 13,
    cropBackgroundColor: 'yellow',
    cropBackgroundOpacity: 0.5,
    disableZoom: false,
    height: 800,
    id: 'canvas',
    image: undefined,
    includeDataUrl: false,
    includeHtmlCanvas: false,
    input: undefined,
    readonly: false,
    record: {
      clippings: [],
    },
    transparentCorners: true,
    width: 800,
    zoomChanged: undefined,
  };

  private REGEXP_ORIGINS = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;

  constructor(props: IReactMultiCropProps) {
    super(props);

    this.state = {
      canvas: null,
      initial: true,
    };

    this.keyboardHandler = this.keyboardHandler.bind(this);
    this.addNew = this.addNew.bind(this);
    this.deleteShapes = this.deleteShapes.bind(this);
    this.discardActiveObject = this.discardActiveObject.bind(this);
  }

  componentDidMount(): void {
    const { canvas } = this.state;
    if (!canvas) {
      this.initialCanvas();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentDidUpdate(prevProps: any): void {
    // this.changeImage();
    const { canvas } = this.state;
    if (canvas) {
      const {
        zoomLevel,
        activeObject,
        height,
        width,
        borderColor,
        cornerColor,
        cornerSize,
        transparentCorners,
        cropBackgroundColor,
        cropBackgroundOpacity,
        record,
        disableZoom = false,
      } = this.props;
      const {
        zoomLevel: prevZoomLevel,
        activeObject: prevActive,
        height: prevHeight,
        width: prevWidth,
        borderColor: prevBorderColor,
        cornerColor: prevCornerColor,
        cornerSize: prevCornerSize,
        transparentCorners: prevTransparentCorners,
        cropBackgroundColor: prevCropBackgroundColor,
        cropBackgroundOpacity: prevCropBackgroundOpacity,
        record: prevRecord,
      } = prevProps;
      let shouldRender = false;
      if (prevZoomLevel !== zoomLevel && zoomLevel && zoomLevel > 0) {
        canvas.setZoom(zoomLevel);
        shouldRender = true;
      }

      // prev active object
      if (prevActive !== activeObject && activeObject) {
        const dataObjects = canvas.getObjects();
        const allSelected = dataObjects.filter((obj) => obj.objectId === activeObject);
        canvas.discardActiveObject();
        for (const objectSelect of allSelected) {
          canvas.setActiveObject(objectSelect);
        }
        shouldRender = true;
      }

      // ensuring the previous handler is off
      // TODO: need to be optimized
      canvas.off('mouse:wheel');
      if (!disableZoom) {
        const zoomHandler = this.zoom.bind(this);
        canvas.on('mouse:wheel', zoomHandler);
      }

      if (height && height !== prevHeight) {
        canvas.height = height;
        shouldRender = true;
      }

      if (width && width !== prevWidth) {
        canvas.width = width;
        shouldRender = true;
      }

      // handle crop elements
      // TODO: remove this later
      if (
        borderColor !== prevBorderColor ||
        cornerColor !== prevCornerColor ||
        cornerSize !== prevCornerSize ||
        transparentCorners !== prevTransparentCorners ||
        cropBackgroundColor !== prevCropBackgroundColor ||
        cropBackgroundOpacity !== prevCropBackgroundOpacity
      ) {
        const attribute: IAttribute = {
          borderColor,
          cornerColor,
          cornerSize,
          transparentCorners,
          cropBackgroundColor,
          cropBackgroundOpacity,
        };
        this.updateCropAttributes(canvas, attribute);
        shouldRender = true;
      }

      // handle check each crops
      // Experimental to check each clips
      const previousRecord = prevRecord as IRecordProps;
      if (Array.isArray(previousRecord.clippings) && record && Array.isArray(record?.clippings)) {
        // populate different props
        const differentObjects = record.clippings.filter((clip) => {
          const prevClip = previousRecord.clippings.find(
            (prev) => prev.id === clip.id || (prev.objectId && prev.objectId === clip.objectId),
          );
          if (!prevClip) {
            return false;
          }
          return (
            clip.style?.borderColor !== prevClip.style?.borderColor ||
            clip.style?.cornerColor !== prevClip.style?.cornerColor ||
            clip.style?.cornerSize !== prevClip.style?.cornerSize ||
            clip.style?.transparentCorners !== prevClip.style?.transparentCorners ||
            clip.style?.cropBackgroundColor !== prevClip.style?.cropBackgroundColor ||
            clip.style?.cropBackgroundOpacity !== prevClip.style?.cropBackgroundOpacity
          );
        });
        // take canvas objects
        const canvasObjects = canvas.getObjects('rect');
        if (Array.isArray(canvasObjects) && canvasObjects.length > 0) {
          let affectedObj = 0;
          // iterate each diff props
          differentObjects.forEach((difObj) => {
            const affectedObject = canvasObjects.find((obj) => {
              return obj.id === difObj.id || obj.objectId === difObj.objectId;
            });
            if (!affectedObject) {
              return;
            }
            affectedObject.borderColor = difObj.style?.borderColor || '';
            affectedObject.cornerColor = difObj.style?.cornerColor || '';
            affectedObject.cornerSize = difObj.style?.cornerSize || 0;
            affectedObject.transparentCorners = difObj.style?.transparentCorners || false;
            affectedObject.opacity = difObj.style?.cropBackgroundOpacity || 1;
            affectedObject.set('fill', difObj.style?.cropBackgroundColor);
            affectedObj += 1;
          });
          // check actual difference
          if (affectedObj > 0) {
            shouldRender = true;
          }
        }
      }

      if (shouldRender) {
        canvas.requestRenderAll();
      }
    }
  }

  updateCropAttributes(canvas: Canvas, attribute: IAttribute) {
    const objects = canvas.getObjects('rect');
    if (Array.isArray(objects) && objects.length > 0) {
      objects.forEach((object) => {
        object.borderColor = attribute.borderColor || '';
        object.cornerColor = attribute.cornerColor || '';
        object.cornerSize = attribute.cornerSize || 0;
        object.transparentCorners = attribute.transparentCorners || false;
        object.opacity = attribute.cropBackgroundOpacity || 1;
        object.set('fill', attribute.cropBackgroundColor);
      });
    }
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

  loadImage(img: FabricImage): void {
    const { initial, canvas } = this.state;
    if (!canvas) {
      return;
    }
    if (!canvas.width || !canvas.height || !img.height || !img.width) {
      return;
    }
    const { zoomLevel } = this.props;
    // detect ratio
    const ratio = img.height / img.width;
    const newHeight = canvas.width * ratio;
    canvas.height = newHeight;
    if (zoomLevel) {
      canvas.setZoom(zoomLevel);
    } else {
      canvas.setZoom(canvas.width / img.width);
    }
    canvas.backgroundImage = img;
    if (initial) {
      this.setState({ initial: false }, this.initialObjects.bind(this));
    }
  }

  isCrossOriginURL(url: string): boolean {
    const parts = url.match(this.REGEXP_ORIGINS);
    return (
      parts !== null &&
      (parts[1] !== window.location.protocol ||
        parts[2] !== window.location.hostname ||
        parts[3] !== window.location.port)
    );
  }

  initialImage(): void {
    const { image } = this.props;
    const loadImageNow = this.loadImage.bind(this);
    if (typeof image === 'string') {
      const isCrossOrigin = this.isCrossOriginURL(image);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options: any = {};
      if (isCrossOrigin) {
        options.crossOrigin = 'Anonymous';
      }
      FabricImage.fromURL(image, options).then((result) => {
        loadImageNow(result);
      });
    }
  }

  initialObjects(): void {
    const { canvas } = this.state;
    if (!canvas) {
      return;
    }
    const {
      record,
      readonly,
      borderColor,
      cornerColor,
      cornerSize,
      transparentCorners,
      cropBackgroundColor,
      cropBackgroundOpacity,
    } = this.props;
    if (record) {
      const inputObject = record.clippings;
      if (
        Array.isArray(inputObject) &&
        inputObject.length > 0 &&
        typeof inputObject[0] === 'object'
      ) {
        const attribute: IAttribute = {
          borderColor,
          cornerColor,
          cornerSize,
          transparentCorners,
          cropBackgroundColor,
          cropBackgroundOpacity,
        };
        let totalRendered = 0;
        for (const coord of inputObject) {
          if (coord.style) {
            if (coord.style.cropBackgroundColor) {
              attribute.cropBackgroundColor = coord.style.cropBackgroundColor;
            }
            if (coord.style.cropBackgroundOpacity) {
              attribute.cropBackgroundOpacity = coord.style.cropBackgroundOpacity;
            }
            if (coord.style.borderColor) {
              attribute.borderColor = coord.style.borderColor;
            }
            if (coord.style.cornerColor) {
              attribute.cornerColor = coord.style.cornerColor;
            }
            if (coord.style.cornerSize) {
              attribute.cornerSize = coord.style.cornerSize;
            }
            if (coord.style.transparentCorners) {
              attribute.transparentCorners = coord.style.transparentCorners;
            }
          }
          const rect = this.createObject(canvas, coord, attribute, readonly || false);
          if (rect) {
            canvas.add(rect);
            totalRendered += 1;
          }
        }
        if (totalRendered > 0) {
          this.setOutput();
        }
      }
    } else {
      console.log('Not have any record. Skipped.');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    const { zoomChanged } = this.props;
    if (zoomChanged) {
      zoomChanged(zoom);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mouseHover(options: any): void {
    const { onHover } = this.props;
    const converter = this.shapetoStructureData.bind(this);
    const target = options.target;
    if (target && target.type === 'rect' && onHover) {
      const data = converter(target);
      onHover(data);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mouseOut(options: any): void {
    const { onHover } = this.props;
    const target = options.target;
    if (target && target.type === 'rect' && onHover) {
      onHover(null);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectionHandler(options: any): void {
    const { onSelect } = this.props;
    const converter = this.shapetoStructureData.bind(this);
    const selectedList = options.selected;
    if (!Array.isArray(selectedList)) {
      // can't be processed
      return;
    } else if (selectedList.length == 0) {
      return;
    }
    // get first element only
    const target = selectedList[0];
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
    const canvas = new Canvas(id || 'canvas', {
      width: width,
      height: height,
    });
    if (readonly) {
      // readonly mode
      canvas.selectionKey = undefined;
      const mouseHoverHandler = this.mouseHover.bind(this);
      const mouseHoverOutHandler = this.mouseOut.bind(this);
      canvas.on('mouse:over', mouseHoverHandler);
      canvas.on('mouse:out', mouseHoverOutHandler);
    } else {
      // edit mode
      const doubleClickEvent = this.doubleClickEvent.bind(this);
      const objectModifiedEvent = this.setOutput.bind(this);
      canvas.on('mouse:dblclick', doubleClickEvent);
      canvas.on('object:modified', objectModifiedEvent);
    }
    const selectionObjectHandler = this.selectionHandler.bind(this);
    const selectionObjectClearHandler = this.selectionClearHandler.bind(this);
    canvas.on('selection:created', selectionObjectHandler);
    canvas.on('selection:updated', selectionObjectHandler);
    canvas.on('selection:cleared', selectionObjectClearHandler);
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
    this.setState({ canvas }, this.initialImage.bind(this));
  }

  addNew(): void {
    const { canvas } = this.state;
    if (!canvas) {
      return;
    }
    const {
      borderColor,
      cornerColor,
      cornerSize,
      transparentCorners,
      cropBackgroundColor,
      cropBackgroundOpacity,
    } = this.props;
    const coor: ICoord = {
      id: null,
      rect: { x1: 0, y1: 0, x2: 0.2, y2: 0.2 },
    };
    const attribute: IAttribute = {
      borderColor,
      cornerColor,
      cornerSize,
      transparentCorners,
      cropBackgroundColor,
      cropBackgroundOpacity,
    };
    const rect = this.createObject(canvas, coor, attribute, false);
    if (!rect) {
      return;
    }
    canvas.add(rect);
    this.setOutput();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  doubleClickEvent(options: any): void {
    const { canvas } = this.state;
    if (!canvas) {
      return;
    }
    const {
      readonly,
      borderColor,
      cornerColor,
      cornerSize,
      transparentCorners,
      cropBackgroundColor,
      cropBackgroundOpacity,
    } = this.props;
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
        borderColor,
        cornerColor,
        cornerSize,
        transparentCorners,
        cropBackgroundColor,
        cropBackgroundOpacity,
      };
      const rect = this.createObjectByAttribute(null, attribute, readonly || false);
      canvas.add(rect);
      canvas.discardActiveObject();
      canvas.setActiveObject(rect);
      canvas.requestRenderAll();
      this.setOutput();
    } else if (options && options.pointer) {
      const left = options.absolutePointer.x;
      const top = options.absolutePointer.y;
      const attribute: IAttribute = {
        left: left,
        top: top,
        width: 100,
        height: 100,
        borderColor,
        cornerColor,
        cornerSize,
        transparentCorners,
        cropBackgroundColor,
        cropBackgroundOpacity,
      };
      const rect = this.createObjectByAttribute(null, attribute, readonly || false);
      canvas.add(rect);
      canvas.discardActiveObject();
      canvas.setActiveObject(rect);
      canvas.requestRenderAll();
      this.setOutput();
    }
  }

  createObjectByAttribute(
    existingId: string | null,
    attribute: IAttribute,
    readonly: boolean,
  ): Rect {
    const rect = new Rect({
      left: attribute.left,
      top: attribute.top,
      width: attribute.width,
      height: attribute.height,
      borderColor: attribute.borderColor,
      cornerColor: attribute.cornerColor,
      cornerSize: attribute.cornerSize,
      transparentCorners: attribute.transparentCorners,
      fill: attribute.cropBackgroundColor,
      opacity: attribute.cropBackgroundOpacity,
      id: existingId,
      strokeWidth: 0,
      strokeUniform: true,
      lockRotation: true,
      lockMovementX: readonly,
      lockMovementY: readonly,
      lockScalingX: readonly,
      lockScalingY: readonly,
      objectId: uuidv4(),
    });
    rect.setControlsVisibility({
      mtr: false,
    });
    return rect;
  }

  private convertLeftTop(element: Rect): { left: number; top: number } {
    if (
      element.left === undefined ||
      element.top === undefined ||
      element.group?.left === undefined ||
      element.group?.top === undefined ||
      element.group?.width === undefined ||
      element.group?.height === undefined
    ) {
      return {
        left: 0,
        top: 0,
      };
    }
    return {
      left: element.left + element.group.left + element.group.width / 2,
      top: element.top + element.group.top + element.group.height / 2,
    };
  }

  shapetoStructureData(element: Rect): IOutputData | null {
    const { canvas } = this.state;
    if (!canvas || !canvas.backgroundImage) {
      return null;
    }
    const background = canvas.backgroundImage;
    if (!(background instanceof FabricImage)) {
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
    const dataLeftTop = element.group
      ? this.convertLeftTop(element)
      : { left: element.left, top: element.top };
    const x1 = dataLeftTop.left / background.width;
    const y1 = dataLeftTop.top / background.height;
    const x2 = (dataLeftTop.left + element.width * element.scaleX) / background.width;
    const y2 = (dataLeftTop.top + element.height * element.scaleY) / background.height;
    const rectangle = { x1: x1, y1: y1, x2: x2, y2: y2 };
    const coord: IOutputData = {
      id: element.id,
      objectId: element.objectId,
      rect: JSON.stringify(rectangle),
    };
    // dataUrl
    if (includeDataUrl) {
      let dataUrl: string | null = null;
      try {
        dataUrl = background.toDataURL({
          height: element.getScaledHeight(),
          width: element.getScaledWidth(),
          left: dataLeftTop.left,
          top: dataLeftTop.top,
          format: 'jpeg',
        });
      } catch (error) {
        console.error(error);
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
          left: dataLeftTop.left,
          top: dataLeftTop.top,
        });
      } catch (error) {
        console.error(error);
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
      this.setOutput();
    }
  }

  setOutput(): void {
    const { canvas } = this.state;
    if (!canvas) {
      return;
    }
    const shapeToStructureData = this.shapetoStructureData.bind(this);
    const outputValue: Array<IOutputData> = [];
    const cropCoords = canvas.getObjects('rect');
    cropCoords.forEach(function (element) {
      const data = element as Rect;
      const outputData = shapeToStructureData(data);
      if (outputData) {
        outputValue.push(outputData);
      }
    });
    const { input } = this.props;
    if (input) {
      input.onChange(outputValue);
    }
  }

  createObject(
    canvas: Canvas | null,
    coor: ICoord,
    attribute: IAttribute,
    readonly: boolean,
  ): Rect | null {
    if (!canvas || !canvas.backgroundImage) {
      return null;
    }
    const background = canvas.backgroundImage;
    if (!(background instanceof FabricImage)) {
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
    const newAttribute: IAttribute = {
      left: left,
      top: top,
      width: width,
      height: height,
      borderColor: attribute.borderColor,
      cornerColor: attribute.cornerColor,
      cornerSize: attribute.cornerSize,
      transparentCorners: attribute.transparentCorners,
      cropBackgroundColor: attribute.cropBackgroundColor,
      cropBackgroundOpacity: attribute.cropBackgroundOpacity,
    };
    return this.createObjectByAttribute(coor.id, newAttribute, readonly);
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
    }
    if (handled) {
      // Suppress "double action" if event handled
      event.preventDefault();
    }
  }

  render(): React.JSX.Element {
    const { height, id, readonly, style, width, tabIndex } = this.props;

    return (
      <div id="canvas-wrapper" style={style}>
        <Container row width={width} height={height}>
          <div onKeyDown={!readonly ? this.keyboardHandler : undefined} tabIndex={tabIndex ?? 0}>
            <canvas id={id} height={height} style={{ border: '0px solid #aaa' }} width={width} />
          </div>
        </Container>
      </div>
    );
  }
}

export default ReactMultiCrop;
