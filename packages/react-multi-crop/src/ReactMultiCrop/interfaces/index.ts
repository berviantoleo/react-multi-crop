import { fabric } from 'fabric';
import CSS from 'csstype';

export interface IRecordProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clippings: Array<any>;
}

export interface IOutputData extends ICoord {
  crop?: string;
  deletedAt?: string;
  dataUrl?: string | null;
  canvasElement?: HTMLCanvasElement | null;
  objectId: string;
}

export interface IInputProps {
  /**
   * Give output each changes in the canvas, might be moved to root props.
   * @param value Output value
   */
  onChange(value: Array<IOutputData>): void;
}

export interface IReactMultiCropProps {
  addButton?: JSX.Element;
  activeObject?: string;
  borderColor?: string;
  cornerColor?: string;
  cornerSize?: number;
  cropBackgroundColor?: string;
  cropBackgroundOpacity?: number;
  deleteButton?: JSX.Element;
  disableZoom?: boolean;
  discardButton?: JSX.Element;
  height?: number;
  id?: string;
  image?: string;
  includeDataUrl?: boolean;
  includeHtmlCanvas?: boolean;
  input?: IInputProps;
  onHover?(value: IOutputData | null): void;
  onSelect?(value: IOutputData | null): void;
  readonly?: boolean;
  record?: IRecordProps;
  showButton?: boolean;
  style?: CSS.Properties;
  transparentCorners?: boolean;
  width?: number;
  zoomChanged?(value: number): void;
  zoomLevel?: number;
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
  left?: number;
  top?: number;
  height?: number;
  width?: number;
  borderColor?: string;
  cornerColor?: string;
  cornerSize?: number;
  transparentCorners?: boolean;
}

export interface ICustomFabricRect extends fabric.IRectOptions {
  id: string | null;
  objectId: string;
}

export class CustomFabricRect extends fabric.Rect {
  public id: string | null = null;
  public objectId = '';
  constructor(options?: ICustomFabricRect) {
    super(options);
    if (options) {
      this.id = options.id;
      this.objectId = options.objectId;
    }
  }
}

export interface IActionComponentProps {
  addButton?: JSX.Element;
  addNew(): void;
  deleteButton?: JSX.Element;
  deleteShapes(): void;
  discardActiveObject(): void;
  discardButton?: JSX.Element;
}
