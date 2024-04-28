import { addText } from "../utility/textUtility";
// import { FrameNode, ComponentNode, RectangleNode, ComponentSetNode } from "@figma/plugin-typings";

function createColorComponent(): ComponentNode {
  const component = figma.createComponent();
  component.name = "MainColor";
  component.layoutMode = "HORIZONTAL";
  component.itemSpacing = 8;
  component.paddingBottom = 8;
  component.paddingTop = 8;
  component.paddingLeft = 8;
  component.paddingRight = 8;
  component.primaryAxisSizingMode = "FIXED";
  component.resize(250, 100);
  component.counterAxisSizingMode = "AUTO";
  component.cornerRadius = 4;
  component.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  component.effects = [
    {
      type: "DROP_SHADOW",
      color: { r: 0, g: 0, b: 0, a: 0.25 },
      offset: { x: 0, y: 2 },
      radius: 8,
      visible: true,
      blendMode: "NORMAL",
    },
  ];
  return component;
}

function addRectangleToComponent(component: FrameNode | ComponentNode): void {
  const rect: RectangleNode = figma.createRectangle();
  rect.x = 48;
  rect.y = 48;
  rect.name = "#gcolor";
  component.appendChild(rect);
}

async function createPropertyFrame(): Promise<FrameNode> {
  const frame = figma.createFrame();
  frame.name = "Property";
  frame.layoutMode = "VERTICAL";
  frame.itemSpacing = 8;
  frame.layoutSizingHorizontal = "HUG";
  frame.layoutSizingVertical = "HUG";
  frame.fills = [];

  const name = addText("Style Name", 0, 0, "#gcolor.fillstyle", "Bold");
  const hex = addText("HEX Color", 0, 0, "#gcolor.fill");
  const rgb = addText("RGB Color", 0, 0, "#gcolor.fillRGB");

  frame.appendChild(await name);
  frame.appendChild(await hex);
  frame.appendChild(await rgb);

  return frame;
}

async function createPantone() {
  const colorComponent = createColorComponent();

  addRectangleToComponent(colorComponent);

  const propertyFrame = await createPropertyFrame();
  colorComponent.appendChild(propertyFrame);

  return colorComponent;
}

export { createPantone };
