import { addText } from '../utility/textUtility';
// import { FrameNode, ComponentNode, RectangleNode, ComponentSetNode } from "@figma/plugin-typings";

function createColorComponent(): ComponentNode {
  const component = figma.createComponent();
  component.name = 'MainColor';
  component.layoutMode = 'VERTICAL';
  component.itemSpacing = 0;
  component.paddingBottom = 0;
  component.paddingTop = 0;
  component.paddingLeft = 0;
  component.paddingRight = 0;
  component.counterAxisSizingMode = 'FIXED';
  component.resize(150, 100);
  component.primaryAxisSizingMode = 'AUTO';
  component.cornerRadius = 0;
  component.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  component.effects = [
    {
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.1 },
      offset: { x: 0, y: 0 },
      radius: 8,
      visible: true,
      blendMode: 'NORMAL',
    },
  ];
  return component;
}

function addRectangleToComponent(component: FrameNode | ComponentNode): void {
  const rect: RectangleNode = figma.createRectangle();
  rect.x = 0;
  rect.y = 0;
  component.appendChild(rect);
  rect.resize(150, 100);
  rect.layoutSizingHorizontal = 'FILL';
  rect.layoutSizingVertical = 'FIXED';
  rect.name = '#color';
}

async function addPropertyFrameToComponent(
  component: FrameNode | ComponentNode
) {
  const frame = figma.createFrame();
  frame.name = 'Property';
  frame.layoutMode = 'VERTICAL';
  frame.itemSpacing = 4;
  frame.layoutSizingHorizontal = 'HUG';
  frame.layoutSizingVertical = 'HUG';
  frame.paddingBottom = 16;
  frame.paddingLeft = 8;
  frame.paddingRight = 8;
  frame.paddingTop = 8;

  frame.fills = [];

  const name = addText('Style Name', 0, 0, '#color.fillstyle', 'Bold');
  const hex = addText('HEX Color', 0, 0, '#color.fill');
  const rgb = addText('RGB Color', 0, 0, '#color.fillRGB');

  frame.appendChild(await name);
  frame.appendChild(await hex);
  frame.appendChild(await rgb);

  (await name).layoutSizingHorizontal = 'FILL';
  (await hex).layoutSizingHorizontal = 'FILL';
  (await rgb).layoutSizingHorizontal = 'FILL';

  component.appendChild(frame);

  frame.layoutSizingHorizontal = 'FILL';
}

async function createPantone() {
  const colorComponent = createColorComponent();

  addRectangleToComponent(colorComponent);
  await addPropertyFrameToComponent(colorComponent);

  return colorComponent;
}

export { createPantone };
