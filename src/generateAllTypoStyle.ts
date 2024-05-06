import { updateAllTextProperty } from "./updateText";
import { createTypoWithPropertyMainComponent } from "./module/typoRow";

function createAutoLayoutframe(
  name: string,
  position: { x: number; y: number }
): FrameNode {
  const frame = figma.createFrame();
  Object.assign(frame, {
    name,
    layoutMode: "HORIZONTAL",
    itemSpacing: 32, // Adjust the spacing as needed
    paddingTop: 32, // Adjust padding as needed
    paddingRight: 32,
    paddingBottom: 32,
    paddingLeft: 32,
    x: position.x,
    y: position.y,
  });
  frame.resize(150 * 4 + 32 * 2, 300);
  frame.primaryAxisSizingMode = "AUTO";

  const whiteFill: SolidPaint = {
    type: "SOLID",
    color: { r: 1, g: 1, b: 1 },
    opacity: 0.5,
  };
  frame.fills = [whiteFill];
  return frame;
}

function fetchGroupedTextStyles(): TextStyle[][] {
  const localStyles = figma.getLocalTextStyles();

  // Initialize an empty object to hold categories of text styles
  const categories: { [category: string]: TextStyle[] } = {};

  // Iterate through each style and group by category
  localStyles.forEach((style) => {
    const [category, subCategory] = style.name.split("/");
    categories[category] = categories[category] || [];
    categories[category].push(style);
  });

  return Object.values(categories);
}

async function createAllTextInstant(textStyles: TextStyle[][]): Promise<void> {
  const typoFrame = createAutoLayoutframe("typo", { x: 200, y: 0 });
  const typoMainComponent: ComponentNode =
    await createTypoWithPropertyMainComponent();

  const allPromises = textStyles.map(async (styles) => {
    return Promise.all(
      styles.map(async (style) => {
        await figma.loadFontAsync(style.fontName);
        const instance = typoMainComponent.createInstance();
        const textFrame = instance.children[0] as FrameNode;
        const referenceText = textFrame.children[0] as TextNode;
        referenceText.characters = style.name;
        referenceText.textStyleId = style.id;
        typoFrame.appendChild(instance);
      })
    );
  });
  await Promise.all(allPromises);
  figma.currentPage.appendChild(typoFrame);
}

export default async function runPlugin() {
  const textStyles = fetchGroupedTextStyles();
  await createAllTextInstant(textStyles);
  await updateAllTextProperty();
  figma.closePlugin("Generated 🎉");
}
