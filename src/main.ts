import { showUI } from '@create-figma-plugin/utilities'
import { Help } from './mockupData';
import { ReferenceNode } from './referenceNode';
import { updateAllTextProperty } from './updateText';
import { once } from '@create-figma-plugin/utilities';
import { addTextNearSelected } from './textUtility';

const getComponentData = (ref:ReferenceNode) => {
  return ({
    title:"Component",
    list:[
      {label:"Height", value:ref.getValue("height"), api:"Height"},
      {label:"width", value:ref.getValue("width"), api:"Width"},
      {label:"name", value:ref.getValue("name"), api:"Name"}
    ]
  })
}

const getTextData = (ref:ReferenceNode) => {
  return ({
    title:"Text",
    list:[
      {label:"Font", value:ref.getValue("font"), api:"font"},
      {label:"Weight", value:ref.getValue("fontweight"), api:"fontWeight"},
      {label:"Size", value:ref.getValue("fontsize"), api:"fontSize"},
      {label:"Indent", value:ref.getValue("paragraphindent"), api:"paragraphIndent"},
      {label:"Space", value:ref.getValue("paragraphspace"), api:"paragraphSpace"},
      {label:"Letter Space", value:ref.getValue("letterspace"), api:"letterSpace"},
      {label:"Line Height", value:ref.getValue("lineheight"), api:"lineHeight"},
      {label:"Style", value:ref.getValue("textstyle"), api:"textStyle"},
      {label:"Description", value:ref.getValue("textstyledescription"), api:"textStyleDescription"}
    ]
  });
}

const getStrokeData = (ref:ReferenceNode) => {
  let strokeData = {
    title: "Stroke",
    list:[
      {label:"HEX", value:ref.getValue("stroke").toUpperCase(), api:"stroke"},
      {label:"RGB", value:ref.getValue("strokergb").toUpperCase(), api:"strokeRGB"},
      {label:"HSL", value:ref.getValue("strokehsl").toUpperCase(), api:"strokeHSL"},
      {label:"HSB", value:ref.getValue("strokehsb").toUpperCase(), api:"strokeHSB"},
      {label:"Style", value:ref.getValue("strokestyle"), api:"strokeStyle"},
      {label:"Description", value:ref.getValue("strokestyledescription"), api:"strokeStyleDescription"},
    ]
  };
  const strokeColorName:string = ref.getValue("fillcolorname");
  if (strokeColorName !== "Not match") {
    strokeData.list.push({
      label:"brand",
      value:strokeColorName,
      api:"fillColorName"
    })
  }
  return strokeData;
}

const getFillData = (ref:ReferenceNode) => {
  let fillData = {
    title: "Fill",
    list:[
      {label:"HEX", value:ref.getValue("fill").toUpperCase(), api:"fill"},
      {label:"RGB", value:ref.getValue("fillrgb").toUpperCase(), api:"fillRGB"},
      {label:"HSL", value:ref.getValue("fillhsl").toUpperCase(), api:"fillHSL"},
      {label:"HSB", value:ref.getValue("fillhsb").toUpperCase(), api:"fillHSB"},
      {label:"Style", value:ref.getValue("fillstyle"), api:"fillstyle"},
      {label:"Description", value:ref.getValue("fillstyledescription"),api:"fillStyleDescription"}
    ]
  };
  const fillColorName:string = ref.getValue("fillcolorname");
  if (fillColorName !== "Not match") {
    fillData.list.push({
      label:"brand",
      value:fillColorName,
      api:"fillColorName"
    })
  }
  return fillData;
}

const setSelectedProperties = (nodeId:string): [Help, string] => {
  const selectedNode = <SceneNode>figma.getNodeById(nodeId);
  const referenceNode = new ReferenceNode(selectedNode, figma.currentPage.id)
  referenceNode.matchName();

  // console.log("reference Name", referenceNode.referenceName);
  // console.log("reference Name", referenceNode.propertyName);

  let help:Help = {helps:[]}
  referenceNode.hasFill() && help.helps.push(getFillData(referenceNode));
  referenceNode.hasStroke() && help.helps.push(getStrokeData(referenceNode));
  referenceNode.isText() && help.helps.push(getTextData(referenceNode));
  help.helps.push(getComponentData(referenceNode));

  return [help, referenceNode.referenceName];
}

export default function() {

  const options = { width: 260, height: 400 };

  showUI(options);

  figma.on('selectionchange', () => {
    const selection = figma.currentPage.selection
    if (typeof selection !== "undefined" && selection.length > 0){
      const [help, nodeName] = setSelectedProperties(selection[0].id)

      const selectedNode = {
        nodeId: nodeName? `#${nodeName}` : selection[0].id,
        refDescription: nodeName ? "reference by name" : "reference by ID",
        properties: help
      }
      figma.ui.postMessage(selectedNode);
    } else {
      const selectedNode = {
        nodeId: "",
        refDescription: "",
        properties: null
      }
      figma.ui.postMessage(selectedNode);
    }

    updateAllTextProperty().then(() => {
      console.log("on selection change: update all text property")
    })
  })

  figma.ui.onmessage = (message, payload:any) => {
    console.log("payload", payload);
    console.log("type", message.type);
    console.log("data", message.data.name);
    console.log("api", message.data.api)
    console.log("value", message.data.value)

    const selection = figma.currentPage.selection

    if (typeof selection !== "undefined" && selection.length > 0){
      const [help, nodeName] = setSelectedProperties(selection[0].id)
      const text = nodeName? `#${nodeName}` : `#[${selection[0].id}]`
      addTextNearSelected(selection[0], message.data.value, `${text}.${message.data.api}`);
    }

  }

  // function handleAddTextProperty(data:string) {
    // console.log("data",data);
  // }
  // once('ADDTEXT', handleAddTextProperty);
}
