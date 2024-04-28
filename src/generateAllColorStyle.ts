import { addText } from "./utility/textUtility";
import { updateAllTextProperty } from './updateText';

export default async function () {
  console.log("in generateAllColorStyle");

  // Create the main color component with configured properties
  const colorComponent = createColorComponent();

  // Add rectangle to the color component
  addRectangleToComponent(colorComponent);

  // Create and append property frame to the color component
  const propertyFrame = await createPropertyFrame();
  colorComponent.appendChild(propertyFrame);

  // Update text properties and close plugin
  finalizePlugin();
}

function createColorComponent() {
  const component = figma.createComponent();
  component.name = "Color";
  component.layoutMode = "HORIZONTAL";
  component.itemSpacing = 8;
  component.paddingBottom = 8;
  component.paddingTop = 8;
  component.paddingLeft = 8;
  component.paddingRight = 8;
  component.primaryAxisSizingMode = 'AUTO';
  component.counterAxisSizingMode = 'AUTO';
  component.cornerRadius = 4;
  component.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  component.effects = [
    {
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.25 },
      offset: { x: 0, y: 2 },
      radius: 4,
      visible: true,
      blendMode: 'NORMAL'
    }
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

async function createPropertyFrame() {
  const frame = figma.createFrame();
  frame.name = "Property";
  frame.layoutMode = "VERTICAL";
  frame.itemSpacing = 8;
  frame.layoutSizingHorizontal = 'HUG';
  frame.layoutSizingVertical = 'HUG';
  frame.fills = [];

  const name = addText("Style Name", 0, 0, "#gcolor.fillstyle");
  const hex = addText("HEX Color", 0, 0, "#gcolor.fill");
  const rgb = addText("RGB Color", 0, 0, "#gcolor.fillRGB");

  frame.appendChild(await name);
  frame.appendChild(await hex);
  frame.appendChild(await rgb);

  return frame;
}

function finalizePlugin() {
  updateAllTextProperty().then(() => {
    figma.closePlugin("Generated 🎉");
  });
}
