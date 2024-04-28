import { updateAllTextProperty } from './updateText';
import { createPantone } from './module/colorPantone';

export default async function () {
  console.log("in generateAllColorStyle");

  // Create the main color component with configured properties
  const colorComponent = createPantone();

  // Add rectangle to the color component
  const instance = colorComponent.createInstance();
  instance.x = 100;
  instance.y = 100

  // Create and append property frame to the color component
  const propertyFrame = await createPropertyFrame();
  colorComponent.appendChild(propertyFrame);

  // Update text properties and close plugin
  finalizePlugin();
}

function finalizePlugin() {
  updateAllTextProperty().then(() => {
    figma.closePlugin("Generated 🎉");
  });
}
