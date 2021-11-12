import { fabric } from 'fabric';

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
  objectId: string;
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
  zoomLevel?: number;
  includeDataUrl?: boolean;
  includeHtmlCanvas?: boolean;
  readonly?: boolean;
  borderColor?: string;
  cornerColor?: string;
  cornerSize?: number;
  transparentCorners?: boolean;
  activeObject?: string;
  onHover?(value: IOutputData | null): void;
  onSelect?(value: IOutputData | null): void;
  zoomChanged?(value: number): void;
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
  addNew(): void;
  deleteShapes(): void;
  discardActiveObject(): void;
  multiSelect(): void;
}
