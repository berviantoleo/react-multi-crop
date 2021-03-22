import React, { Component } from 'react';
import { fabric } from 'fabric';
export interface IRecordProps {
    image?: string;
    clippings: Array<any>;
}
export interface IOutputData extends ICoord {
    crop?: string;
    deletedAt?: string;
    dataUrl?: string | null;
    canvasElement?: HTMLCanvasElement | null;
}
export interface IInputProps {
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
}
export declare class CustomFabricRect extends fabric.Rect {
    id: string | null;
    constructor(options?: ICustomFabricRect);
}
declare class ReactMultiCrop extends Component<IReactMultiCropProps, IReactMultiCropStates> {
    static defaultProps: IReactMultiCropProps;
    private color;
    private opacity;
    private REGEXP_ORIGINS;
    constructor(props: IReactMultiCropProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    changeImage(): void;
    loadImage(img: fabric.Image): void;
    isCrossOriginURL(url: string): boolean;
    initialImage(): void;
    initialObjects(): void;
    zoom(options: any): void;
    mouseHover(options: any): void;
    mouseOut(options: any): void;
    selectionHandler(options: any): void;
    selectionClearHandler(): void;
    initialCanvas(): void;
    addNew(): void;
    doubleClickEvent(options: any): void;
    createObjectByAttribute(attribute: IAttribute, readonly: boolean): CustomFabricRect;
    shapetoStructureData(element: CustomFabricRect): IOutputData | null;
    deleteShapes(): void;
    setOutput(): void;
    createObject(canvas: fabric.Canvas | null, coor: ICoord, attribute: IAttribute, readonly: boolean): CustomFabricRect | null;
    multiSelect(): void;
    discardActiveObject(): void;
    keyboardHandler(event: React.KeyboardEvent<HTMLDivElement>): void;
    render(): JSX.Element;
}
export default ReactMultiCrop;
