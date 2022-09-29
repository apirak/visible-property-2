import { showUI } from "@create-figma-plugin/utilities";
import { Help } from "./module/mockupData";
import { ReferenceNode } from "./module/referenceNode";
import { updateAllTextProperty } from "./updateText";
import { addTextNearSelected } from "./utility/textUtility";

const getComponentData = (ref: ReferenceNode) => {
  return {
    title: "Component",
    list: [
      { label: "Height", value: ref.getValue("height"), api: "Height" },
      { label: "width", value: ref.getValue("width"), api: "Width" },
      { label: "name", value: ref.getValue("name"), api: "Name" },
    ],
  };
};

const getTextData = (ref: ReferenceNode) => {
  return {
    title: "Text",
    list: [
      { label: "Font", value: ref.getValue("font"), api: "font" },
      { label: "Weight", value: ref.getValue("fontweight"), api: "fontWeight" },
      { label: "Size", value: ref.getValue("fontsize"), api: "fontSize" },
      {
        label: "Indent",
        value: ref.getValue("paragraphindent"),
        api: "paragraphIndent",
      },
      {
        label: "Space",
        value: ref.getValue("paragraphspace"),
        api: "paragraphSpace",
      },
      {
        label: "Letter Space",
        value: ref.getValue("letterspace"),
        api: "letterSpace",
      },
      {
        label: "Line Height",
        value: ref.getValue("lineheight"),
        api: "lineHeight",
      },
      {
        label: "Text Case",
        value: ref.getValue("textcase"),
        api: "textCase",
      },
      { label: "Style", value: ref.getValue("textstyle"), api: "textStyle" },
      {
        label: "Description",
        value: ref.getValue("textstyledescription"),
        api: "textStyleDescription",
      },
    ],
  };
};

const getStrokeData = (ref: ReferenceNode) => {
  let strokeData = {
    title: "Stroke",
    list: [
      {
        label: "HEX",
        value: ref.getValue("stroke"),
        api: "stroke",
      },
      {
        label: "RGB",
        value: ref.getValue("strokergb"),
        api: "strokeRGB",
      },
      {
        label: "HSL",
        value: ref.getValue("strokehsl"),
        api: "strokeHSL",
      },
      {
        label: "HSB",
        value: ref.getValue("strokehsb"),
        api: "strokeHSB",
      },
      {
        label: "Style",
        value: ref.getValue("strokestyle"),
        api: "strokeStyle",
      },
      {
        label: "Description",
        value: ref.getValue("strokestyledescription"),
        api: "strokeStyleDescription",
      },
    ],
  };
  const strokeColorName: string = ref.getValue("fillcolorname");
  if (strokeColorName !== "Not match") {
    strokeData.list.push({
      label: "Brand",
      value: strokeColorName,
      api: "strokeColorName",
    });
  }
  return strokeData;
};

const getFillData = (ref: ReferenceNode) => {
  let fillData = {
    title: "Fill",
    list: [
      { label: "HEX", value: ref.getValue("fill"), api: "fill" },
      {
        label: "RGB",
        value: ref.getValue("fillrgb"),
        api: "fillRGB",
      },
      {
        label: "HSL",
        value: ref.getValue("fillhsl"),
        api: "fillHSL",
      },
      {
        label: "HSB",
        value: ref.getValue("fillhsb"),
        api: "fillHSB",
      },
      { label: "Style", value: ref.getValue("fillstyle"), api: "fillstyle" },
      {
        label: "Description",
        value: ref.getValue("fillstyledescription"),
        api: "fillStyleDescription",
      },
    ],
  };
  const fillColorName: string = ref.getValue("fillcolorname");
  if (fillColorName !== "Not match") {
    fillData.list.push({
      label: "Brand",
      value: fillColorName,
      api: "fillColorName",
    });
  }
  return fillData;
};

const setSelectedProperties = (nodeId: string): [Help[], string] => {
  const selectedNode = <SceneNode>figma.getNodeById(nodeId);
  const referenceNode = new ReferenceNode(selectedNode, figma.currentPage.id);
  referenceNode.matchName();

  let help: Help[] = [];
  referenceNode.hasFill() && help.push(getFillData(referenceNode));
  referenceNode.hasStroke() && help.push(getStrokeData(referenceNode));
  referenceNode.isText() && help.push(getTextData(referenceNode));
  help.push(getComponentData(referenceNode));

  return [help, referenceNode.referenceName];
};

const preparePropertyForUI = (): {
  nodeId: string;
  nodeType: string;
  refDescription: string;
  properties: Help[];
} => {
  const selection = figma.currentPage.selection;
  if (typeof selection !== "undefined" && selection.length > 0) {
    const [help, nodeName] = setSelectedProperties(selection[0].id);

    return {
      nodeId: nodeName ? `#${nodeName}` : selection[0].id,
      nodeType: selection[0].type,
      refDescription: nodeName ? "Reference by Name" : "Reference by ID",
      properties: help,
    };
  }
  return {
    nodeId: "",
    nodeType: "DEFAULT",
    refDescription: "",
    properties: [],
  };
};

const updateAllValue = () => {
  figma.ui.postMessage(preparePropertyForUI());
  updateAllTextProperty();
};

export default function () {
  const options = { width: 260, height: 400 };
  showUI(options);
  updateAllValue();

  figma.on("selectionchange", () => {
    updateAllValue();
  });

  figma.ui.onmessage = (message, payload: any) => {
    const selection = figma.currentPage.selection;

    if (typeof selection !== "undefined" && selection.length > 0) {
      const [help, nodeName] = setSelectedProperties(selection[0].id);
      const text = nodeName ? `#${nodeName}` : `#[${selection[0].id}]`;
      addTextNearSelected(
        selection[0],
        message.data.value,
        `${text}.${message.data.api}`
      );
    }
  };
}
