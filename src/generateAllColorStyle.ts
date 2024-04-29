import { updateAllTextProperty } from './updateText';
import { createPantone } from './module/colorPantone';

function readAllColorStyles(): PaintStyle[][] {
  const styles = figma.getLocalPaintStyles();

  // Initialize an empty object to hold categories of paint styles
  const groupedCategories: { [category: string]: PaintStyle[] } = {};

  // Iterate through each style and group by category
  styles.forEach((style) => {
    if (
      style.paints.length > 0 &&
      (style.paints[0].type === 'SOLID' ||
        style.paints[0].type === 'GRADIENT_LINEAR')
    ) {
      const [category, subCategory] = style.name.split('/');

      // Initialize the category array if it doesn't exist
      if (!groupedCategories[category]) {
        groupedCategories[category] = [];
      }

      // Push the style into its corresponding category
      groupedCategories[category].push(style);
    }
  });

  // Convert the grouped categories object into a 2D array
  const groupedCategoriesArray: PaintStyle[][] =
    Object.values(groupedCategories);
  return groupedCategoriesArray;
}

async function createColorInstance(
  mainComponent: ComponentNode,
  styles2D: PaintStyle[][],
  x: number,
  y: number
) {
  const autoLayoutFrame = figma.createFrame();
  autoLayoutFrame.name = 'Color';
  autoLayoutFrame.layoutMode = 'VERTICAL';
  autoLayoutFrame.itemSpacing = 32; // Adjust the spacing as needed
  autoLayoutFrame.paddingTop = 32; // Adjust padding as needed
  autoLayoutFrame.paddingRight = 32;
  autoLayoutFrame.paddingBottom = 32;
  autoLayoutFrame.paddingLeft = 32;
  autoLayoutFrame.resize(150 * 4 + 32 * 2, 300);
  autoLayoutFrame.primaryAxisSizingMode = 'AUTO';
  // autoLayoutFrame.counterAxisSizingMode = "AUTO";
  autoLayoutFrame.x = x;
  autoLayoutFrame.y = y;

  const whiteFill: SolidPaint = {
    type: 'SOLID',
    color: { r: 1, g: 1, b: 1 },
    opacity: 0.5,
  };
  autoLayoutFrame.fills = [whiteFill];

  styles2D.forEach(async (styles) => {
    const styleGroupFrame = figma.createFrame();
    styleGroupFrame.name = 'Pantone';
    styleGroupFrame.fills = [];
    // styleGroupFrame.itemSpacing = 16;
    styleGroupFrame.layoutMode = 'HORIZONTAL';
    styleGroupFrame.primaryAxisSizingMode = 'FIXED';
    styleGroupFrame.layoutAlign = 'STRETCH';
    styleGroupFrame.counterAxisSizingMode = 'AUTO';
    styleGroupFrame.layoutWrap = 'WRAP';

    styles.forEach((style) => {
      const instance = mainComponent.createInstance();

      let rectangleNode = instance.children[0] as RectangleNode;
      if (rectangleNode.type === 'RECTANGLE') {
        rectangleNode.fillStyleId = style.id;
      }

      styleGroupFrame.appendChild(instance);
    });

    const [category, subCategory] = styles[0].name.split('/');
    if (subCategory) {
      await figma.loadFontAsync({ family: 'Roboto', style: 'Bold' });
      const textNode = figma.createText();
      textNode.fontName = { family: 'Roboto', style: 'Bold' };
      textNode.fontSize = 32;
      textNode.characters = category;
      textNode.name = 'Category';
      autoLayoutFrame.appendChild(textNode);
    }
    autoLayoutFrame.appendChild(styleGroupFrame);
  });
}

export default async function () {
  const componentWidth = 250;
  const styleLocationX = componentWidth * 1.5;

  // Create the main color component with configured properties
  const colorComponent = await createPantone();

  const styles2D = readAllColorStyles();
  createColorInstance(colorComponent, styles2D, styleLocationX, 0);

  finalizePlugin();
}

function finalizePlugin() {
  updateAllTextProperty().then(() => {
    figma.closePlugin('Generated 🎉');
  });
}
