(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{296:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){__webpack_require__.d(__webpack_exports__,"parameters",(function(){return parameters}));var _storybook_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(164),_storybook_addon_docs_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(297),parameters={actions:{argTypesRegex:"^on[A-Z].*"}};Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__.addParameters)({docs:{container:_storybook_addon_docs_blocks__WEBPACK_IMPORTED_MODULE_1__.a,page:_storybook_addon_docs_blocks__WEBPACK_IMPORTED_MODULE_1__.b}}),Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__.configure)(__webpack_require__(840),module)}.call(this,__webpack_require__(254)(module))},439:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Default",(function(){return Default}));__webpack_require__(10),__webpack_require__(434);var react=__webpack_require__(0),helpers_typeof=(__webpack_require__(841),__webpack_require__(62),__webpack_require__(18),__webpack_require__(143),__webpack_require__(43),__webpack_require__(36),__webpack_require__(39),__webpack_require__(117),__webpack_require__(41),__webpack_require__(49),__webpack_require__(221)),typeof_default=__webpack_require__.n(helpers_typeof),createClass=__webpack_require__(292),createClass_default=__webpack_require__.n(createClass),assertThisInitialized=__webpack_require__(125),assertThisInitialized_default=__webpack_require__.n(assertThisInitialized),classCallCheck=__webpack_require__(219),classCallCheck_default=__webpack_require__.n(classCallCheck),inherits=__webpack_require__(220),inherits_default=__webpack_require__.n(inherits),possibleConstructorReturn=__webpack_require__(293),possibleConstructorReturn_default=__webpack_require__.n(possibleConstructorReturn),getPrototypeOf=__webpack_require__(167),getPrototypeOf_default=__webpack_require__.n(getPrototypeOf),fabric=(__webpack_require__(42),__webpack_require__(101),__webpack_require__(20),__webpack_require__(842),__webpack_require__(33),__webpack_require__(34),__webpack_require__(9),__webpack_require__(110)),Button=__webpack_require__(882),Grid=__webpack_require__(881),v4=__webpack_require__(883),jsx_runtime=__webpack_require__(40);function _createForOfIteratorHelper(o,allowArrayLike){var it;if("undefined"==typeof Symbol||null==o[Symbol.iterator]){if(Array.isArray(o)||(it=function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(o))||allowArrayLike&&o&&"number"==typeof o.length){it&&(o=it);var i=0,F=function F(){};return{s:F,n:function n(){return i>=o.length?{done:!0}:{done:!1,value:o[i++]}},e:function e(_e){throw _e},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var err,normalCompletion=!0,didErr=!1;return{s:function s(){it=o[Symbol.iterator]()},n:function n(){var step=it.next();return normalCompletion=step.done,step},e:function e(_e2){didErr=!0,err=_e2},f:function f(){try{normalCompletion||null==it.return||it.return()}finally{if(didErr)throw err}}}}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _createSuper(Derived){var hasNativeReflectConstruct=function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function _createSuperInternal(){var result,Super=getPrototypeOf_default()(Derived);if(hasNativeReflectConstruct){var NewTarget=getPrototypeOf_default()(this).constructor;result=Reflect.construct(Super,arguments,NewTarget)}else result=Super.apply(this,arguments);return possibleConstructorReturn_default()(this,result)}}var ReactMultiCrop_CustomFabricRect=function(_fabric$Rect){inherits_default()(CustomFabricRect,_fabric$Rect);var _super=_createSuper(CustomFabricRect);function CustomFabricRect(options){var _this;return classCallCheck_default()(this,CustomFabricRect),(_this=_super.call(this,options)).id=null,_this.objectId="",options&&(_this.id=options.id,_this.objectId=options.objectId),_this}return CustomFabricRect}(fabric.fabric.Rect),ReactMultiCrop_ReactMultiCrop=function(_Component){inherits_default()(ReactMultiCrop,_Component);var _super2=_createSuper(ReactMultiCrop);function ReactMultiCrop(props){var _this2;return classCallCheck_default()(this,ReactMultiCrop),(_this2=_super2.call(this,props)).color=void 0,_this2.opacity=void 0,_this2.REGEXP_ORIGINS=/^(\w+:)\/\/([^:/?#]*):?(\d*)/i,_this2.state={canvas:null,initial:!0},_this2.color=props.cropBackgroundColor||"yellow",_this2.opacity=props.cropBackgroundOpacity||.5,_this2.keyboardHandler=_this2.keyboardHandler.bind(assertThisInitialized_default()(_this2)),_this2.addNew=_this2.addNew.bind(assertThisInitialized_default()(_this2)),_this2.deleteShapes=_this2.deleteShapes.bind(assertThisInitialized_default()(_this2)),_this2.multiSelect=_this2.multiSelect.bind(assertThisInitialized_default()(_this2)),_this2.discardActiveObject=_this2.discardActiveObject.bind(assertThisInitialized_default()(_this2)),_this2}return createClass_default()(ReactMultiCrop,[{key:"componentDidMount",value:function componentDidMount(){this.state.canvas||this.initialCanvas()}},{key:"componentDidUpdate",value:function componentDidUpdate(prevProps){var canvas=this.state.canvas;if(canvas){var _this$props=this.props,zoomLevel=_this$props.zoomLevel,activeObject=_this$props.activeObject;if(prevProps.zoomLevel!==zoomLevel&&zoomLevel&&zoomLevel>0&&(canvas.setZoom(zoomLevel),canvas.renderAll()),prevProps.activeObject!==activeObject&&activeObject){var allSelected=canvas.getObjects().filter((function(obj){return obj.objectId===activeObject}));canvas.discardActiveObject();var _step,_iterator=_createForOfIteratorHelper(allSelected);try{for(_iterator.s();!(_step=_iterator.n()).done;){var objectSelect=_step.value;canvas.setActiveObject(objectSelect)}}catch(err){_iterator.e(err)}finally{_iterator.f()}canvas.requestRenderAll()}}}},{key:"changeImage",value:function changeImage(){var canvas=this.state.canvas;canvas&&(canvas.backgroundImage||this.initialImage())}},{key:"loadImage",value:function loadImage(img){var _this$state=this.state,initial=_this$state.initial,canvas=_this$state.canvas;if(canvas&&canvas.width&&canvas.height&&img.height&&img.width){var zoomLevel=this.props.zoomLevel,ratio=img.height/img.width,newHeight=canvas.width*ratio;canvas.setHeight(newHeight),zoomLevel?canvas.setZoom(zoomLevel):canvas.setZoom(canvas.width/img.width),canvas.setBackgroundImage(img,canvas.renderAll.bind(canvas)),"boolean"==typeof initial&&initial&&this.setState({initial:!1},this.initialObjects.bind(this))}}},{key:"isCrossOriginURL",value:function isCrossOriginURL(url){var parts=url.match(this.REGEXP_ORIGINS);return null!==parts&&(parts[1]!==window.location.protocol||parts[2]!==window.location.hostname||parts[3]!==window.location.port)}},{key:"initialImage",value:function initialImage(){var _this$props2=this.props,record=_this$props2.record,image=_this$props2.image,loadImageNow=this.loadImage.bind(this);if("object"===typeof_default()(record)&&record.image){var options={};this.isCrossOriginURL(record.image)&&(options.crossOrigin="Anonymous"),fabric.fabric.Image.fromURL(record.image,loadImageNow,options)}else if("string"==typeof image){var _options={};this.isCrossOriginURL(image)&&(_options.crossOrigin="Anonymous"),fabric.fabric.Image.fromURL(image,loadImageNow,_options)}}},{key:"initialObjects",value:function initialObjects(){var canvas=this.state.canvas;if(canvas){var _this$props3=this.props,record=_this$props3.record,readonly=_this$props3.readonly,borderColor=_this$props3.borderColor,cornerColor=_this$props3.cornerColor,cornerSize=_this$props3.cornerSize,transparentCorners=_this$props3.transparentCorners;if(record){var inputObject=record.clippings;if(Array.isArray(inputObject)&&inputObject.length>0&&"object"===typeof_default()(inputObject[0])){var _step2,attribute={borderColor:borderColor,cornerColor:cornerColor,cornerSize:cornerSize,transparentCorners:transparentCorners},totalRendered=0,_iterator2=_createForOfIteratorHelper(inputObject);try{for(_iterator2.s();!(_step2=_iterator2.n()).done;){var coord=_step2.value,rect=this.createObject(canvas,coord,attribute,readonly||!1);rect&&(canvas.add(rect),totalRendered+=1)}}catch(err){_iterator2.e(err)}finally{_iterator2.f()}totalRendered>0&&this.setOutput()}}else console.log("Not have any record. Skipped.")}}},{key:"zoom",value:function zoom(options){var canvas=this.state.canvas;if(canvas){var delta=options.e.deltaY,zoom=canvas.getZoom();zoom*=Math.pow(.999,delta),zoom>20&&(zoom=20),zoom<.01&&(zoom=.01),canvas.setZoom(zoom),options.e.preventDefault(),options.e.stopPropagation();var zoomChanged=this.props.zoomChanged;zoomChanged&&zoomChanged(zoom)}}},{key:"mouseHover",value:function mouseHover(options){var onHover=this.props.onHover,converter=this.shapetoStructureData.bind(this),target=options.target;target&&"rect"===target.type&&onHover&&onHover(converter(target))}},{key:"mouseOut",value:function mouseOut(options){var onHover=this.props.onHover,target=options.target;target&&"rect"===target.type&&onHover&&onHover(null)}},{key:"selectionHandler",value:function selectionHandler(options){var onSelect=this.props.onSelect,converter=this.shapetoStructureData.bind(this),target=options.target;target&&"rect"===target.type&&onSelect&&onSelect(converter(target))}},{key:"selectionClearHandler",value:function selectionClearHandler(){var onSelect=this.props.onSelect;onSelect&&onSelect(null)}},{key:"initialCanvas",value:function initialCanvas(){var _this$props4=this.props,id=_this$props4.id,width=_this$props4.width,height=_this$props4.height,readonly=_this$props4.readonly,canvas=new fabric.fabric.Canvas(id||"canvas",{width:width,height:height});if(readonly){canvas.selectionKey=void 0;var mouseHoverHandler=this.mouseHover.bind(this),mouseHoverOutHandler=this.mouseOut.bind(this);canvas.on("mouse:over",mouseHoverHandler),canvas.on("mouse:out",mouseHoverOutHandler)}else{var doubleClickEvent=this.doubleClickEvent.bind(this),objectModifiedEvent=this.setOutput.bind(this);canvas.on("mouse:dblclick",doubleClickEvent),canvas.on("object:modified",objectModifiedEvent)}var zoomHandler=this.zoom.bind(this),selectionObjectHandler=this.selectionHandler.bind(this),selectionObjectClearHandler=this.selectionClearHandler.bind(this);canvas.on("selection:created",selectionObjectHandler),canvas.on("selection:updated",selectionObjectHandler),canvas.on("selection:cleared",selectionObjectClearHandler),canvas.on("mouse:wheel",zoomHandler),canvas.on("mouse:down",(function(opt){var evt=opt.e;!0===evt.altKey&&(this.isDragging=!0,this.selection=!1,this.lastPosX=evt.clientX,this.lastPosY=evt.clientY)})),canvas.on("mouse:move",(function(opt){if(this.isDragging){var e=opt.e,vpt=this.viewportTransform;vpt[4]+=e.clientX-this.lastPosX,vpt[5]+=e.clientY-this.lastPosY,this.requestRenderAll(),this.lastPosX=e.clientX,this.lastPosY=e.clientY}})),canvas.on("mouse:up",(function(){this.setViewportTransform(this.viewportTransform),this.isDragging=!1,this.selection=!0})),this.setState({canvas:canvas},this.initialImage.bind(this))}},{key:"addNew",value:function addNew(){var canvas=this.state.canvas;if(canvas){var _this$props5=this.props,attribute={borderColor:_this$props5.borderColor,cornerColor:_this$props5.cornerColor,cornerSize:_this$props5.cornerSize,transparentCorners:_this$props5.transparentCorners},rect=this.createObject(canvas,{id:null,rect:{x1:0,y1:0,x2:.2,y2:.2}},attribute,!1);rect&&(canvas.add(rect),this.setOutput())}}},{key:"doubleClickEvent",value:function doubleClickEvent(options){var canvas=this.state.canvas;if(canvas){var _this$props6=this.props,readonly=_this$props6.readonly,borderColor=_this$props6.borderColor,cornerColor=_this$props6.cornerColor,cornerSize=_this$props6.cornerSize,transparentCorners=_this$props6.transparentCorners;if(options&&options.target){var left=options.target.left,top=options.target.top,width=options.target.width,height=options.target.height,attribute={left:left+50,top:top+50,width:width*options.target.scaleX,height:height*options.target.scaleY,borderColor:borderColor,cornerColor:cornerColor,cornerSize:cornerSize,transparentCorners:transparentCorners},rect=this.createObjectByAttribute(attribute,readonly||!1);canvas.add(rect),canvas.discardActiveObject(),canvas.setActiveObject(rect),canvas.requestRenderAll(),this.setOutput()}else if(options&&options.pointer){var _attribute={left:options.absolutePointer.x,top:options.absolutePointer.y,width:100,height:100,borderColor:borderColor,cornerColor:cornerColor,cornerSize:cornerSize,transparentCorners:transparentCorners},_rect=this.createObjectByAttribute(_attribute,readonly||!1);canvas.add(_rect),canvas.discardActiveObject(),canvas.setActiveObject(_rect),canvas.requestRenderAll(),this.setOutput()}}}},{key:"createObjectByAttribute",value:function createObjectByAttribute(attribute,readonly){return new ReactMultiCrop_CustomFabricRect({left:attribute.left,top:attribute.top,width:attribute.width,height:attribute.height,borderColor:attribute.borderColor,cornerColor:attribute.cornerColor,cornerSize:attribute.cornerSize,transparentCorners:attribute.transparentCorners,fill:this.color,opacity:this.opacity,id:null,strokeWidth:0,strokeUniform:!0,lockRotation:!0,lockMovementX:readonly,lockMovementY:readonly,lockScalingX:readonly,lockScalingY:readonly,objectId:Object(v4.a)()})}},{key:"shapetoStructureData",value:function shapetoStructureData(element){var canvas=this.state.canvas;if(!canvas||!canvas.backgroundImage)return null;var background=canvas.backgroundImage;if(!(background instanceof fabric.fabric.Image))return null;if(void 0===element.left||void 0===element.top||void 0===element.width||void 0===element.height||void 0===element.scaleX||void 0===element.scaleY||void 0===background.width||void 0===background.height)return null;var _this$props7=this.props,includeDataUrl=_this$props7.includeDataUrl,includeHtmlCanvas=_this$props7.includeHtmlCanvas,x1=element.left/background.width,y1=element.top/background.height,x2=(element.left+element.width*element.scaleX)/background.width,y2=(element.top+element.height*element.scaleY)/background.height,rectangle={x1:x1,y1:y1,x2:x2,y2:y2},coord={id:element.id,objectId:element.objectId,rect:JSON.stringify(rectangle)};if(includeDataUrl){var dataUrl=null;try{dataUrl=background.toDataURL({height:element.getScaledHeight(),width:element.getScaledWidth(),left:element.left,top:element.top,format:"jpeg"})}catch(error){console.error(error)}coord.dataUrl=dataUrl}if(includeHtmlCanvas){var canvasElement=null;try{canvasElement=background.toCanvasElement({height:element.getScaledHeight(),width:element.getScaledWidth(),left:element.left,top:element.top})}catch(error){console.error(error)}coord.canvasElement=canvasElement}var imgWidth=background.width,imgHeight=background.height,x1Px=x1*imgWidth,x2Px=x2*imgWidth,y1Px=y1*imgHeight,y2Px=y2*imgHeight,rectanglePx={x:x1Px,y:y1Px,x2:x2Px,y2:y2Px,w:x2Px-x1Px,h:y2Px-y1Px,boundX:imgWidth,boundY:imgHeight};return coord.crop=JSON.stringify(rectanglePx),coord.deletedAt="-1",coord}},{key:"deleteShapes",value:function deleteShapes(){var readonly=this.props.readonly,canvas=this.state.canvas;canvas&&!readonly&&(canvas.getActiveObjects().forEach((function(element){canvas.remove(element)})),this.setOutput())}},{key:"setOutput",value:function setOutput(){var canvas=this.state.canvas;if(canvas){var shapeToStructureData=this.shapetoStructureData.bind(this),outputValue=[];canvas.getObjects("rect").forEach((function(element){var outputData=shapeToStructureData(element);outputData&&outputValue.push(outputData)}));var input=this.props.input;input&&input.onChange(outputValue)}}},{key:"createObject",value:function createObject(canvas,coor,attribute,readonly){if(!canvas||!canvas.backgroundImage)return null;var rectangle,background=canvas.backgroundImage;if(!(background instanceof fabric.fabric.Image))return null;if(!background.width||!background.height)return null;rectangle="string"==typeof coor.rect?JSON.parse(coor.rect):coor.rect;var left=background.width*rectangle.x1,top=background.height*rectangle.y1,newAttribute={left:left,top:top,width:background.width*rectangle.x2-left,height:background.height*rectangle.y2-top,borderColor:attribute.borderColor,cornerColor:attribute.cornerColor,cornerSize:attribute.cornerSize,transparentCorners:attribute.transparentCorners};return this.createObjectByAttribute(newAttribute,readonly)}},{key:"multiSelect",value:function multiSelect(){var readonly=this.props.readonly,canvas=this.state.canvas;if(canvas&&!readonly){canvas.discardActiveObject();var sel=new fabric.fabric.ActiveSelection(canvas.getObjects(),{canvas:canvas});canvas.setActiveObject(sel),canvas.requestRenderAll()}else console.log("Canvas not defined")}},{key:"discardActiveObject",value:function discardActiveObject(){var canvas=this.state.canvas;canvas?(canvas.discardActiveObject(),canvas.requestRenderAll()):console.log("Canvas not defined")}},{key:"keyboardHandler",value:function keyboardHandler(event){if(!event.defaultPrevented){var handled=!1,key=event.key||event.keyCode;"Delete"===key||46===key?(this.deleteShapes(),handled=!0):!event.ctrlKey||65!==key&&"a"!==key||(this.multiSelect(),handled=!0),handled&&event.preventDefault()}}},{key:"render",value:function render(){var valueForm,_this$props8=this.props,input=_this$props8.input,source=_this$props8.source,showLabel=_this$props8.showLabel,showButton=_this$props8.showButton,id=_this$props8.id,width=_this$props8.width,height=_this$props8.height,readonly=_this$props8.readonly,renderInputRedux=!!input,nameForm=source;input&&(valueForm=input.value,nameForm=input.name);return Object(jsx_runtime.jsxs)("div",{id:"canvas-wrapper",children:[showLabel&&Object(jsx_runtime.jsx)("div",{className:"label",children:nameForm}),Object(jsx_runtime.jsxs)(Grid.a,{container:!0,direction:"row",justify:"flex-start",alignItems:"flex-start",children:[Object(jsx_runtime.jsx)(Grid.a,{item:!0,xs:!0,onKeyDown:readonly?void 0:this.keyboardHandler,tabIndex:0,children:Object(jsx_runtime.jsx)("canvas",{id:id,width:width,height:height,style:{border:"0px solid #aaa"}})}),showButton&&!readonly&&Object(jsx_runtime.jsxs)(Grid.a,{container:!0,item:!0,xs:!0,direction:"column",justify:"flex-start",alignItems:"flex-start",children:[Object(jsx_runtime.jsx)(Grid.a,{item:!0,xs:!0,children:Object(jsx_runtime.jsx)(Button.a,{variant:"contained",id:"addmore",color:"primary",onClick:this.addNew,children:"Add More Shapes"})}),Object(jsx_runtime.jsx)(Grid.a,{item:!0,xs:!0,children:Object(jsx_runtime.jsx)(Button.a,{variant:"contained",id:"deleteselected",color:"primary",onClick:this.deleteShapes,children:"Delete Selected Object"})}),Object(jsx_runtime.jsx)(Grid.a,{item:!0,xs:!0,children:Object(jsx_runtime.jsx)(Button.a,{variant:"contained",id:"multiselect",color:"primary",onClick:this.multiSelect,children:"Select All"})}),Object(jsx_runtime.jsx)(Grid.a,{item:!0,xs:!0,children:Object(jsx_runtime.jsx)(Button.a,{variant:"contained",id:"discard",color:"primary",onClick:this.discardActiveObject,children:"Discard Selection"})})]}),renderInputRedux&&Object(jsx_runtime.jsx)("input",{type:"hidden",value:valueForm})]})]})}}]),ReactMultiCrop}(react.Component);ReactMultiCrop_ReactMultiCrop.defaultProps={id:"canvas",width:800,height:800,input:void 0,source:"react-crop-form",record:{image:void 0,clippings:[]},image:void 0,cropBackgroundColor:"yellow",cropBackgroundOpacity:.5,readonly:!1,borderColor:"black",cornerColor:"black",cornerSize:13,transparentCorners:!0,showLabel:!1,showButton:!1,includeDataUrl:!1,includeHtmlCanvas:!1,zoomChanged:void 0};var src_ReactMultiCrop_ReactMultiCrop=ReactMultiCrop_ReactMultiCrop;try{ReactMultiCrop_ReactMultiCrop.displayName="ReactMultiCrop",ReactMultiCrop_ReactMultiCrop.__docgenInfo={description:"",displayName:"ReactMultiCrop",props:{id:{defaultValue:{value:"canvas"},description:"",name:"id",required:!1,type:{name:"string"}},width:{defaultValue:{value:"800"},description:"",name:"width",required:!1,type:{name:"number"}},height:{defaultValue:{value:"800"},description:"",name:"height",required:!1,type:{name:"number"}},source:{defaultValue:{value:"react-crop-form"},description:"",name:"source",required:!1,type:{name:"string"}},input:{defaultValue:{value:"undefined"},description:"",name:"input",required:!1,type:{name:"IInputProps"}},record:{defaultValue:{value:"{\n      image: undefined,\n      clippings: [],\n    }"},description:"",name:"record",required:!1,type:{name:"IRecordProps"}},image:{defaultValue:{value:"undefined"},description:"",name:"image",required:!1,type:{name:"string"}},cropBackgroundColor:{defaultValue:{value:"yellow"},description:"",name:"cropBackgroundColor",required:!1,type:{name:"string"}},cropBackgroundOpacity:{defaultValue:{value:"0.5"},description:"",name:"cropBackgroundOpacity",required:!1,type:{name:"number"}},showLabel:{defaultValue:{value:"false"},description:"",name:"showLabel",required:!1,type:{name:"boolean"}},showButton:{defaultValue:{value:"false"},description:"",name:"showButton",required:!1,type:{name:"boolean"}},zoomLevel:{defaultValue:null,description:"",name:"zoomLevel",required:!1,type:{name:"number"}},includeDataUrl:{defaultValue:{value:"false"},description:"",name:"includeDataUrl",required:!1,type:{name:"boolean"}},includeHtmlCanvas:{defaultValue:{value:"false"},description:"",name:"includeHtmlCanvas",required:!1,type:{name:"boolean"}},readonly:{defaultValue:{value:"false"},description:"",name:"readonly",required:!1,type:{name:"boolean"}},borderColor:{defaultValue:{value:"black"},description:"",name:"borderColor",required:!1,type:{name:"string"}},cornerColor:{defaultValue:{value:"black"},description:"",name:"cornerColor",required:!1,type:{name:"string"}},cornerSize:{defaultValue:{value:"13"},description:"",name:"cornerSize",required:!1,type:{name:"number"}},transparentCorners:{defaultValue:{value:"true"},description:"",name:"transparentCorners",required:!1,type:{name:"boolean"}},activeObject:{defaultValue:null,description:"",name:"activeObject",required:!1,type:{name:"string"}},onHover:{defaultValue:null,description:"",name:"onHover",required:!1,type:{name:"((value: IOutputData | null) => void)"}},onSelect:{defaultValue:null,description:"",name:"onSelect",required:!1,type:{name:"((value: IOutputData | null) => void)"}},zoomChanged:{defaultValue:{value:"undefined"},description:"",name:"zoomChanged",required:!1,type:{name:"((value: number) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ReactMultiCrop/ReactMultiCrop.tsx#ReactMultiCrop"]={docgenInfo:ReactMultiCrop_ReactMultiCrop.__docgenInfo,name:"ReactMultiCrop",path:"src/ReactMultiCrop/ReactMultiCrop.tsx#ReactMultiCrop"})}catch(__react_docgen_typescript_loader_error){}__webpack_exports__.default={parameters:{storySource:{source:"import React from 'react';\nimport ReactMultiCrop from './ReactMultiCrop';\n\nexport default {\n  title: 'ReactMultiCrop',\n  component: ReactMultiCrop,\n};\n\nconst Template = (args) => <ReactMultiCrop hideLabel {...args} />;\nexport const Default = Template.bind({});\nDefault.args = {\n  image: 'https://picsum.photos/200',\n  showLabel: false,\n  showButton: false,\n  includeDataUrl: false,\n  includeHtmlCanvas: false,\n  cropBackgroundColor: 'yellow',\n  cropBackgroundOpacity: 0.3,\n  input: {\n    onChange(value) {\n      console.log(value);\n    },\n  },\n};\n\nDefault.parameters = {\n  docs: {\n    description: {\n      component: 'Example load an image to cropper',\n    },\n    source: {\n      code: `<ReactMultiCrop image=\"https://picsum.photos/200\" hideLabel />`,\n    },\n  },\n};\n\nDefault.argTypes = {\n  image: {\n    description: 'image url',\n  },\n  hideLabel: {\n    description: 'hide the default label',\n  },\n};\n",locationsMap:{default:{startLoc:{col:17,line:9},endLoc:{col:65,line:9},startBody:{col:17,line:9},endBody:{col:65,line:9}}}}},title:"ReactMultiCrop",component:src_ReactMultiCrop_ReactMultiCrop};var ReactMultiCrop_stories_Template=function Template(args){return Object(jsx_runtime.jsx)(src_ReactMultiCrop_ReactMultiCrop,Object.assign({hideLabel:!0},args))};ReactMultiCrop_stories_Template.displayName="Template";var Default=ReactMultiCrop_stories_Template.bind({});Default.args={image:"https://picsum.photos/200",showLabel:!1,showButton:!1,includeDataUrl:!1,includeHtmlCanvas:!1,cropBackgroundColor:"yellow",cropBackgroundOpacity:.3,input:{onChange:function onChange(value){console.log(value)}}},Default.parameters={docs:{description:{component:"Example load an image to cropper"},source:{code:'<ReactMultiCrop image="https://picsum.photos/200" hideLabel />'}}},Default.argTypes={image:{description:"image url"},hideLabel:{description:"hide the default label"}},Default.parameters=Object.assign({storySource:{source:"(args) => <ReactMultiCrop hideLabel {...args} />"}},Default.parameters)},481:function(module,exports,__webpack_require__){__webpack_require__(482),__webpack_require__(636),__webpack_require__(637),__webpack_require__(856),__webpack_require__(854),__webpack_require__(858),__webpack_require__(857),__webpack_require__(855),__webpack_require__(859),__webpack_require__(835),module.exports=__webpack_require__(851)},549:function(module,exports){},637:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(164)},835:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(16),__webpack_require__(36),__webpack_require__(42),__webpack_require__(836),__webpack_require__(33),__webpack_require__(34),__webpack_require__(837),__webpack_require__(838),__webpack_require__(839);var _home_runner_work_react_multi_crop_react_multi_crop_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(174),_home_runner_work_react_multi_crop_react_multi_crop_node_modules_storybook_client_logger__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(6),_home_runner_work_react_multi_crop_react_multi_crop_packages_react_multi_crop_storybook_preview_js__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(296);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.keys(_home_runner_work_react_multi_crop_react_multi_crop_packages_react_multi_crop_storybook_preview_js__WEBPACK_IMPORTED_MODULE_11__).forEach((function(key){var value=_home_runner_work_react_multi_crop_react_multi_crop_packages_react_multi_crop_storybook_preview_js__WEBPACK_IMPORTED_MODULE_11__[key];switch(key){case"args":case"argTypes":return _home_runner_work_react_multi_crop_react_multi_crop_node_modules_storybook_client_logger__WEBPACK_IMPORTED_MODULE_10__.a.warn("Invalid args/argTypes in config, ignoring.",JSON.stringify(value));case"decorators":return value.forEach((function(decorator){return Object(_home_runner_work_react_multi_crop_react_multi_crop_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_9__.b)(decorator,!1)}));case"loaders":return value.forEach((function(loader){return Object(_home_runner_work_react_multi_crop_react_multi_crop_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_9__.c)(loader,!1)}));case"parameters":return Object(_home_runner_work_react_multi_crop_react_multi_crop_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_9__.d)(function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}({},value),!1);case"argTypesEnhancers":return value.forEach((function(enhancer){return Object(_home_runner_work_react_multi_crop_react_multi_crop_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_9__.a)(enhancer)}));case"globals":case"globalTypes":var v={};return v[key]=value,Object(_home_runner_work_react_multi_crop_react_multi_crop_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_9__.d)(v,!1);default:return console.log(key+" was not supported :( !")}}))},840:function(module,exports,__webpack_require__){var map={"./ReactMultiCrop/ReactMultiCrop.stories.js":439};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=840},847:function(module,exports){},848:function(module,exports){},849:function(module,exports){},851:function(module,exports,__webpack_require__){"use strict";(function(module){(0,__webpack_require__(164).configure)([__webpack_require__(852),__webpack_require__(853)],module,!1)}).call(this,__webpack_require__(199)(module))},852:function(module,exports){function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=function(){return[]},webpackEmptyContext.resolve=webpackEmptyContext,module.exports=webpackEmptyContext,webpackEmptyContext.id=852},853:function(module,exports,__webpack_require__){var map={"./ReactMultiCrop/ReactMultiCrop.stories.js":439};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=853}},[[481,2,3]]]);