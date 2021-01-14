"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("react"),e=require("fabric"),i=require("@material-ui/core/Button"),o=require("@material-ui/core/Grid");function a(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var r=a(t),n=a(i),s=a(o);function l(t){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}
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
***************************************************************************** */var c=function(t,e){return(c=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(t,e)};function d(t,e){function i(){this.constructor=t}c(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}var h=function(t){function e(e){var i=t.call(this,e)||this;return i.id=null,e&&(i.id=e.id),i}return d(e,t),e}(e.fabric.Rect),u=function(t){function i(e){var i=t.call(this,e)||this;return i.REGEXP_ORIGINS=/^(\w+:)\/\/([^:/?#]*):?(\d*)/i,i.state={canvas:null,initial:!0},i.color=e.cropBackgroundColor||"yellow",i.opacity=e.cropBackgroundOpacity||.5,i.strokeColor=e.cropOutlineColor||"yellow",i.strokeWidth=e.cropOutlineWidth||5,i.strokeDashArray=[5,5],i.keyboardHandler=i.keyboardHandler.bind(i),i.addNew=i.addNew.bind(i),i.deleteShapes=i.deleteShapes.bind(i),i.multiSelect=i.multiSelect.bind(i),i.discardActiveObject=i.discardActiveObject.bind(i),i}return d(i,t),i.prototype.componentDidMount=function(){this.state.canvas||this.initialCanvas()},i.prototype.componentDidUpdate=function(){},i.prototype.changeImage=function(){var t=this.state.canvas;t&&(t.backgroundImage||this.initialImage())},i.prototype.loadImage=function(t){var e=this.state,i=e.initial,o=e.canvas;o&&o.width&&o.height&&t.height&&t.width&&(o.setBackgroundImage(t,o.renderAll.bind(o),{scaleX:o.width/t.width,scaleY:o.height/t.height}),"boolean"==typeof i&&i&&this.setState({initial:!1},this.initialObjects.bind(this)))},i.prototype.isCrossOriginURL=function(t){var e=t.match(this.REGEXP_ORIGINS);return null!==e&&(e[1]!==location.protocol||e[2]!==location.hostname||e[3]!==location.port)},i.prototype.initialImage=function(){var t=this.props,i=t.record,o=t.image,a=this.loadImage.bind(this);if("object"===l(i)&&i.image){var r={};this.isCrossOriginURL(i.image)&&(r.crossOrigin="Anonymous"),e.fabric.Image.fromURL(i.image,a,r)}else if("string"==typeof o){r={};this.isCrossOriginURL(o)&&(r.crossOrigin="Anonymous"),e.fabric.Image.fromURL(o,a,r)}},i.prototype.initialObjects=function(){var t=this.state.canvas;if(t){var e=this.props,i=e.record,o=e.readonly;if(i){var a=this.setOutput.bind(this),r=this.setState.bind(this),n=i.clippings,s=this.createObject.bind(this);Array.isArray(n)&&n.length>0&&"object"===l(n[0])&&n.forEach((function(e){var i=s(t,e,o||!1);i&&t.add(i)})),t.renderAll(),r({canvas:t},a)}else console.log("Not have any record. Skipped.")}},i.prototype.zoom=function(t){var e=this.state.canvas;if(e){var i=t.e.deltaY,o=e.getZoom();(o*=Math.pow(.999,i))>20&&(o=20),o<.01&&(o=.01),e.setZoom(o),t.e.preventDefault(),t.e.stopPropagation()}},i.prototype.mouseHover=function(t){var e=this.props.onHover,i=this.shapetoStructureData.bind(this),o=t.target;o&&"rect"===o.type&&e&&e(i(o))},i.prototype.mouseOut=function(t){var e=this.props.onHover,i=t.target;i&&"rect"===i.type&&e&&e(null)},i.prototype.selectionHandler=function(t){var e=this.props.onSelect,i=this.shapetoStructureData.bind(this),o=t.target;o&&"rect"===o.type&&e&&e(i(o))},i.prototype.selectionClearHandler=function(){var t=this.props.onSelect;t&&t(null)},i.prototype.initialCanvas=function(){var t=this.props,i=t.id,o=t.width,a=t.height,r=t.readonly,n=new e.fabric.Canvas(i||"canvas",{width:o,height:a});if(n.uniScaleTransform=!0,r){n.selectionKey=void 0;var s=this.mouseHover.bind(this),l=this.mouseOut.bind(this),c=this.selectionHandler.bind(this),d=this.selectionClearHandler.bind(this);n.on("mouse:over",s),n.on("mouse:out",l),n.on("selection:created",c),n.on("selection:updated",c),n.on("selection:cleared",d)}else{var h=this.doubleClickEvent.bind(this),u=this.setOutput.bind(this);n.on("mouse:dblclick",h),n.on("object:modified",u)}var p=this.zoom.bind(this);n.on("mouse:wheel",p),n.on("mouse:down",(function(t){var e=t.e;!0===e.altKey&&(this.isDragging=!0,this.selection=!1,this.lastPosX=e.clientX,this.lastPosY=e.clientY)})),n.on("mouse:move",(function(t){if(this.isDragging){var e=t.e,i=this.viewportTransform;i[4]+=e.clientX-this.lastPosX,i[5]+=e.clientY-this.lastPosY,this.requestRenderAll(),this.lastPosX=e.clientX,this.lastPosY=e.clientY}})),n.on("mouse:up",(function(){this.setViewportTransform(this.viewportTransform),this.isDragging=!1,this.selection=!0}));var f=this.initialImage.bind(this);this.setState({canvas:n},f)},i.prototype.addNew=function(){var t=this.state.canvas;if(t){var e=this.createObject(t,{id:null,rect:{x1:0,y1:0,x2:.2,y2:.2}},!1);e&&(t.add(e),t.renderAll(),this.setState({canvas:t},this.setOutput))}},i.prototype.doubleClickEvent=function(t){var e=this.state.canvas;if(e)if(t&&t.target){var i=t.target.left,o=t.target.top,a=t.target.width,r=t.target.height,n={left:i+50,top:o+50,width:a*t.target.scaleX,height:r*t.target.scaleY},s=this.createObjectByAttribute(n);e.add(s),e.renderAll(),this.setState({canvas:e},this.setOutput)}else if(t&&t.pointer){n={left:i=t.absolutePointer.x,top:t.absolutePointer.y,width:100,height:100},s=this.createObjectByAttribute(n);e.add(s),e.renderAll(),this.setState({canvas:e},this.setOutput)}},i.prototype.createObjectByAttribute=function(t){return new h({left:t.left,top:t.top,width:t.width,height:t.height,fill:this.color,opacity:this.opacity,id:null,strokeDashArray:this.strokeDashArray,stroke:this.strokeColor,strokeWidth:this.strokeWidth,lockRotation:!0})},i.prototype.shapetoStructureData=function(t){var i=this.state.canvas;if(!i)return null;if(void 0===t.left||void 0===t.top||void 0===t.width||void 0===t.height||void 0===t.scaleX||void 0===t.scaleY||void 0===i.width||void 0===i.height)return null;var o=this.props,a=o.includeDataUrl,r=o.includeHtmlCanvas,n=t.left/i.width,s=t.top/i.height,l=(t.left+t.width*t.scaleX)/i.width,c=(t.top+t.height*t.scaleY)/i.height,d={x1:n,y1:s,x2:l,y2:c},h={id:t.id,rect:JSON.stringify(d)};if(i.backgroundImage&&i.backgroundImage instanceof e.fabric.Image){var u=i.backgroundImage;if(a){var p=null;try{p=u.toDataURL({height:t.getScaledHeight(),width:t.getScaledWidth(),left:t.left,top:t.top,format:"jpeg"})}catch(t){console.log(t)}h.dataUrl=p}if(r){var f=null;try{f=u.toCanvasElement({height:t.getScaledHeight(),width:t.getScaledWidth(),left:t.left,top:t.top})}catch(t){console.log(t)}h.canvasElement=f}if(u.width&&u.height){var v=u.width,y=u.height,g=n*v,m=l*v,b=s*y,w=c*y,O={x:g,y:b,x2:m,y2:w,w:m-g,h:w-b,boundX:v,boundY:y};h.crop=JSON.stringify(O)}}return h.deletedAt="-1",h},i.prototype.deleteShapes=function(){var t=this.props.readonly,e=this.state.canvas;e&&!t&&(e.getActiveObjects().forEach((function(t){e.remove(t)})),this.setState({canvas:e},this.setOutput))},i.prototype.setOutput=function(){var t=this.state.canvas;if(t){var e=this.shapetoStructureData.bind(this),i=[];t.getObjects("rect").forEach((function(t){var o=e(t);o&&i.push(o)}));var o=this.props.input;o&&o.onChange(i)}},i.prototype.createObject=function(t,e,i){if(!t)return null;if(!t.width||!t.height)return null;var o;o="string"==typeof e.rect?JSON.parse(e.rect):e.rect;var a=t.width*o.x1,r=t.height*o.y1,n=t.width*o.x2,s=t.height*o.y2;return new h({left:a,top:r,width:n-a,height:s-r,fill:this.color,opacity:this.opacity,id:e.id,strokeDashArray:this.strokeDashArray,stroke:this.strokeColor,strokeWidth:this.strokeWidth,lockRotation:!0,lockMovementX:i,lockMovementY:i,lockScalingX:i,lockScalingY:i})},i.prototype.multiSelect=function(){var t=this.props.readonly,i=this.state.canvas;if(i&&!t){i.discardActiveObject();var o=new e.fabric.ActiveSelection(i.getObjects(),{canvas:i});i.setActiveObject(o),i.requestRenderAll()}else console.log("Canvas not defined")},i.prototype.discardActiveObject=function(){var t=this.state.canvas;t?(t.discardActiveObject(),t.requestRenderAll()):console.log("Canvas not defined")},i.prototype.keyboardHandler=function(t){if(!t.defaultPrevented){var e=!1,i=t.key||t.keyCode;"Delete"===i||46===i?(this.deleteShapes(),e=!0):!t.ctrlKey||65!==i&&"a"!==i||(this.multiSelect(),e=!0),e&&t.preventDefault()}},i.prototype.render=function(){var t,e=this.props,i=e.input,o=e.source,a=e.showLabel,l=e.showButton,c=e.id,d=e.width,h=e.height,u=e.readonly,p=!!i,f=o;i&&(t=i.value,f=i.name);return r.default.createElement("div",{id:"canvas-wrapper"},a&&r.default.createElement("div",{className:"label"},f),r.default.createElement(s.default,{container:!0,direction:"row",justify:"flex-start",alignItems:"flex-start"},r.default.createElement(s.default,{item:!0,xs:!0,onKeyDown:u?void 0:this.keyboardHandler,tabIndex:0},r.default.createElement("canvas",{id:c,width:d,height:h,style:{border:"0px solid #aaa"}})),l&&!u&&r.default.createElement(s.default,{container:!0,item:!0,xs:!0,direction:"column",justify:"flex-start",alignItems:"flex-start"},r.default.createElement(s.default,{item:!0,xs:!0},r.default.createElement(n.default,{variant:"contained",id:"addmore",color:"primary",onClick:this.addNew}," ","Add More Shapes")),r.default.createElement(s.default,{item:!0,xs:!0},r.default.createElement(n.default,{variant:"contained",id:"deleteselected",color:"primary",onClick:this.deleteShapes}," ","Delete Selected Object"," ")),r.default.createElement(s.default,{item:!0,xs:!0},r.default.createElement(n.default,{variant:"contained",id:"multiselect",color:"primary",onClick:this.multiSelect}," ","Select All"," ")),r.default.createElement(s.default,{item:!0,xs:!0},r.default.createElement(n.default,{variant:"contained",id:"discard",color:"primary",onClick:this.discardActiveObject}," ","Discard Selection"))),p&&r.default.createElement("input",{type:"hidden",value:t})))},i.defaultProps={id:"canvas",width:800,height:800,input:null,source:"react-crop-form",record:{image:null,clippings:[]},image:null,cropBackgroundColor:"yellow",cropBackgroundOpacity:.5,cropOutlineColor:"yellow",cropOutlineWidth:5,readonly:!1,showLabel:!1,showButton:!1,includeDataUrl:!1,includeHtmlCanvas:!1},i}(t.Component);exports.ReactMultiCrop=u;
