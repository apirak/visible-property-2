import { updateAllTextProperty } from './updateText';
import { createPantone } from './module/colorPantone';

function fetchGroupedColorStyles(): PaintStyle[][] {
  const localStyles = figma.getLocalPaintStyles();

  // Initialize an empty object to hold categories of paint styles
  const categories: { [category: string]: PaintStyle[] } = {};

  // Iterate through each style and group by category
  localStyles.forEach((style) => {
    if (
      style.paints.length > 0 &&
      (style.paints[0].type === 'SOLID' ||
        style.paints[0].type === 'GRADIENT_LINEAR')
    ) {
      const [category, subCategory] = style.name.split('/');
      categories[category] = categories[category] || [];
      categories[category].push(style);
    }
  });

  return Object.values(categories);
}

function createAutoLayoutframe(
  name: string,
  position: { x: number; y: number }
): FrameNode {
  const frame = figma.createFrame();
  Object.assign(frame, {
    name,
    layoutMode: 'VERTICAL',
    itemSpacing: 32, // Adjust the spacing as needed
    paddingTop: 32, // Adjust padding as needed
    paddingRight: 32,
    paddingBottom: 32,
    paddingLeft: 32,
    x: position.x,
    y: position.y,
  });
  frame.resize(150 * 4 + 32 * 2, 300);
  frame.primaryAxisSizingMode = 'AUTO';

  const whiteFill: SolidPaint = {
    type: 'SOLID',
    color: { r: 1, g: 1, b: 1 },
    opacity: 0.5,
  };
  frame.fills = [whiteFill];
  return frame;
}

function createPantoneGroupFrame(): FrameNode {
  const frame = figma.createFrame();
  frame.fills = [];
  frame.layoutMode = 'HORIZONTAL';
  frame.primaryAxisSizingMode = 'FIXED';
  frame.layoutAlign = 'STRETCH';
  frame.counterAxisSizingMode = 'AUTO';
  frame.layoutWrap = 'WRAP';
  return frame;
}

async function createColorInstance(
  mainComponent: ComponentNode,
  styles2D: PaintStyle[][],
  frame: FrameNode
) {
  styles2D.forEach(async (styles) => {
    const styleGroupFrame = createPantoneGroupFrame();
    const [category, subCategory] = styles[0].name.split('/');

    styles.forEach((style) => {
      const instance = mainComponent.createInstance();

      let rectangleNode = instance.children[0] as RectangleNode;
      rectangleNode.fillStyleId = style.id;
      styleGroupFrame.appendChild(instance);
    });

    if (subCategory) {
      await figma.loadFontAsync({ family: 'Roboto', style: 'Bold' });
      const textNode = figma.createText();
      textNode.fontName = { family: 'Roboto', style: 'Bold' };
      textNode.fontSize = 32;
      textNode.characters = category;
      textNode.name = 'Category';
      frame.appendChild(textNode);
    }
    frame.appendChild(styleGroupFrame);
  });
}

export default async function runPlugin() {
  const componentWidth = 250;
  const xPosition = componentWidth * 1.5;

  const colorComponent = await createPantone();
  const colorStyles = fetchGroupedColorStyles();
  const frame = createAutoLayoutframe('Color', { x: xPosition, y: 0 });

  createColorInstance(colorComponent, colorStyles, frame);

  finalizePlugin();
}

// Handles the finalizing actions for the plugin
function finalizePlugin() {
  updateAllTextProperty().then(() => figma.closePlugin('Generated 🎉'));
}
