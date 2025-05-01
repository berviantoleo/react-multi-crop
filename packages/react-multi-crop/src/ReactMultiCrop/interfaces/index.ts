import { Canvas } from 'fabric';

export interface ICropStyle {
  borderColor?: string;
  cornerColor?: string;
  cornerSize?: number;
  cropBackgroundColor?: string;
  cropBackgroundOpacity?: number;
  transparentCorners?: boolean;
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
  objectId?: string;
}

export interface ICropProps extends ICoord {
  rectPx?: IRectCoord | string | object;
  style?: ICropStyle;
}

export interface IRecordProps {
  clippings: Array<ICropProps>;
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
  activeObject?: string;
  disableZoom?: boolean;
  id?: string;
  image?: string;
  includeDataUrl?: boolean;
  includeHtmlCanvas?: boolean;
  input?: IInputProps;
  onHover?(value: IOutputData | null): void;
  onSelect?(value: IOutputData | null): void;
  readonly?: boolean;
  record?: IRecordProps;
  height?: number;
  width?: number;
  tabIndex?: number;
  zoomChanged?(value: number): void;
  zoomLevel?: number;
  /** @deprecated use borderColor in record */
  borderColor?: string;
  /** @deprecated use cornerColor in record */
  cornerColor?: string;
  /** @deprecated use cornerSize in record */
  cornerSize?: number;
  /** @deprecated use cropBackgroundColor in record */
  cropBackgroundColor?: string;
  /** @deprecated use cropBackgroundOpacity in record */
  cropBackgroundOpacity?: number;
  /** @deprecated use transparentCorners in record */
  transparentCorners?: boolean;
  /** @deprecated avoid to use this props */
  style?: React.CSSProperties;
}

export interface IReactMultiCropStates {
  canvas: Canvas | null;
  initial: boolean;
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
  cropBackgroundColor?: string;
  cropBackgroundOpacity?: number;
}