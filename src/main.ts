import { showUI } from '@create-figma-plugin/utilities'
import { Help } from './mockupData';
import { ReferenceNode } from './referenceNode';
import { updateAllTextProperty } from './updateText';
import { once } from '@create-figma-plugin/utilities';

const getComponentData = (ref:ReferenceNode) => {
  return ({
    title:"Component",
    list:[
      {label:"Height", value:ref.getValue("height")},
      {label:"width", value:ref.getValue("width")},
      {label:"name", value:ref.getValue("name")}
    ]
  })
}

const getTextData = (ref:ReferenceNode) => {
  return ({
    title:"Text",
    list:[
      {label:"Font", value:ref.getValue("font")},
      {label:"Weight", value:ref.getValue("fontweight")},
      {label:"Size", value:ref.getValue("fontsize")},
      {label:"Indent", value:ref.getValue("paragraphindent")},
      {label:"Space", value:ref.getValue("paragraphspace")},
      {label:"Letter Space", value:ref.getValue("letterspace")},
      {label:"Line Height", value:ref.getValue("lineheight")},
      {label:"Style", value:ref.getValue("textstyle")},
      {label:"Description", value:ref.getValue("textstyledescription")}
    ]
  });
}

const getStrokeData = (ref:ReferenceNode) => {
  let strokeData = {
    title: "Stroke",
    list:[
      {label:"HEX", value:ref.getValue("stroke").toUpperCase()},
      {label:"RGB", value:ref.getValue("strokergb").toUpperCase()},
      {label:"HSL", value:ref.getValue("strokehsl").toUpperCase()},
      {label:"HSB", value:ref.getValue("strokehsb").toUpperCase()},
      {label:"Style", value:ref.getValue("strokestyle")},
      {label:"Description", value:ref.getValue("strokestyledescription")},
    ]
  };
  const strokeColorName:string = ref.getValue("fillcolorname");
  if (strokeColorName !== "Not match") {
    strokeData.list.push({
      label:"brand",
      value:strokeColorName
    })
  }
  return strokeData;
}

const getFillData = (ref:ReferenceNode) => {
  let fillData = {
    title: "Fill",
    list:[
      {label:"HEX", value:ref.getValue("fill").toUpperCase()},
      {label:"RGB", value:ref.getValue("fillrgb").toUpperCase()},
      {label:"HSL", value:ref.getValue("fillhsl").toUpperCase()},
      {label:"HSB", value:ref.getValue("fillhsb").toUpperCase()},
      {label:"Style", value:ref.getValue("fillstyle")},
      {label:"Description", value:ref.getValue("fillstyledescription")},
    ]
  };
  const fillColorName:string = ref.getValue("fillcolorname");
  if (fillColorName !== "Not match") {
    fillData.list.push({
      label:"brand",
      value:fillColorName
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
      // console.log("update all text property")
      // figma.notify("update");
    })
  })

  figma.ui.onmessage = (message) => {
    console.log("got this from the UI", message)
  }

  // function handleAddTextProperty(data:string) {
    // console.log("data",data);
  // }
  // once('ADDTEXT', handleAddTextProperty);
}
