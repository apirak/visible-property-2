import { updateAllTextProperty } from './updateText';
import { createPantone } from './module/colorPantone';
import { createTypoWithPropertyMainComponent } from './module/typoRow';

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

function createTypoGroupFrame(): FrameNode {
  const frame = figma.createFrame();
  frame.name = 'TypoGroup';
  frame.paddingTop = 0;
  frame.paddingRight = 0;
  frame.paddingBottom = 0;
  frame.paddingLeft = 0;
  frame.itemSpacing = 4;
  frame.fills = [];
  frame.primaryAxisSizingMode = 'AUTO';
  frame.layoutAlign = 'MIN';
  frame.counterAxisSizingMode = 'AUTO';
  return frame;
}

function fetchGroupedTextStyles(): TextStyle[][] {
  const localStyles = figma.getLocalTextStyles();

  // Initialize an empty object to hold categories of text styles
  const categories: { [category: string]: TextStyle[] } = {};

  // Iterate through each style and group by category
  localStyles.forEach((style) => {
    const [category, subCategory] = style.name.split('/');
    categories[category] = categories[category] || [];
    categories[category].push(style);
  });

  return Object.values(categories);
}

async function createTypoInstant(
  mainComponent: ComponentNode
  // styles2D: PaintStyle[][],
  // frame: FrameNode
) {
  // styles2D.forEach(async (styles) => {
  // const styleGroupFrame = createPantoneGroupFrame();
  const instance = mainComponent.createInstance();
  // });
}

async function createAllTextInstant(textStyles: TextStyle[][]) {
  const typoFrame = createAutoLayoutframe('typo', { x: 150, y: 0 });
  const typoMainComponent: ComponentNode =
    await createTypoWithPropertyMainComponent();

  textStyles.forEach(async (styles) => {
    // const typoGroupFrame = createTypoGroupFrame();
    styles.forEach(async (style) => {
      await figma.loadFontAsync(style.fontName);
      const instance = typoMainComponent.createInstance();
      const referenceText = instance.children[0] as TextNode;
      referenceText.characters = style.name;
      referenceText.textStyleId = style.id;
      typoFrame.appendChild(instance);
    });
  });
  figma.currentPage.appendChild(typoFrame);
}

export default async function runPlugin() {
  const componentWidth = 250;
  const xPosition = componentWidth * 1.5;

  const textStyles = fetchGroupedTextStyles();
  console.log(textStyles);

  createAllTextInstant(textStyles).then(() => {
    updateAllTextProperty().then(() => {
      figma.closePlugin('Generated 🎉');
    });
  });
}
