import { updateAllTextProperty } from "./updateText";
import { createPantone } from "./module/colorPantone";

function readAllColorStyles(): PaintStyle[][] {
  const styles = figma.getLocalPaintStyles();

  // Initialize an empty object to hold categories of paint styles
  const groupedCategories: { [category: string]: PaintStyle[] } = {};

  // Iterate through each style and group by category
  styles.forEach((style) => {
    if (
      style.paints.length > 0 &&
      (style.paints[0].type === "SOLID" ||
        style.paints[0].type === "GRADIENT_LINEAR")
    ) {
      console.log(`Name: ${style.name}`);
      const [category, subCategory] = style.name.split("/");

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
  autoLayoutFrame.layoutMode = "HORIZONTAL"; // or 'HORIZONTAL'
  autoLayoutFrame.itemSpacing = 32; // Adjust the spacing as needed
  autoLayoutFrame.paddingTop = 32; // Adjust padding as needed
  autoLayoutFrame.paddingRight = 32;
  autoLayoutFrame.paddingBottom = 32;
  autoLayoutFrame.paddingLeft = 32;
  autoLayoutFrame.primaryAxisSizingMode = "AUTO";
  autoLayoutFrame.counterAxisSizingMode = "AUTO";
  autoLayoutFrame.x = x;
  autoLayoutFrame.y = y;

  styles2D.forEach((styles) => {
    const styleGroupFrame = figma.createFrame();
    styleGroupFrame.layoutMode = "VERTICAL"; // or 'VERTICAL'
    styleGroupFrame.itemSpacing = 16; // Adjust the spacing as needed
    styleGroupFrame.fills = []; // Set to empty array or any background if needed
    styleGroupFrame.primaryAxisSizingMode = "AUTO";
    styleGroupFrame.counterAxisSizingMode = "AUTO";
    styleGroupFrame.clipsContent = false;

    styles.forEach((style) => {
      const instance = mainComponent.createInstance();

      let rectangleNode = instance.children[0] as RectangleNode;
      if (rectangleNode.type === "RECTANGLE") {
        rectangleNode.fillStyleId = style.id;
      }

      styleGroupFrame.appendChild(instance);
    });
    autoLayoutFrame.appendChild(styleGroupFrame);
  });
}

export default async function () {
  console.log("in generateAllColorStyle");

  const componentWidth = 250;
  const styleLocationX = componentWidth * 1.5;

  // Create the main color component with configured properties
  const colorComponent = await createPantone();

  const styles2D = readAllColorStyles();
  console.log(styles2D);

  createColorInstance(colorComponent, styles2D, styleLocationX, 0);
  // Add rectangle to the color component
  // const instance = colorComponent.createInstance();
  // instance.x = styleLocationX;
  // instance.y = 0

  // Update text properties and close plugin
  finalizePlugin();
}

function finalizePlugin() {
  updateAllTextProperty().then(() => {
    figma.closePlugin("Generated 🎉");
  });
}
