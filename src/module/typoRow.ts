import { addText } from '../utility/textUtility';

function createTypoMainComponent(position: {
  x: number;
  y: number;
}): ComponentNode {
  const component = figma.createComponent();
  component.name = 'Typo';
  component.layoutMode = 'VERTICAL';
  component.itemSpacing = 4;
  component.paddingBottom = 8;
  component.paddingTop = 8;
  component.paddingLeft = 8;
  component.paddingRight = 8;
  component.counterAxisSizingMode = 'FIXED';
  component.resize(150, 100);
  component.primaryAxisSizingMode = 'AUTO';
  component.cornerRadius = 0;
  component.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  component.x = position.x;
  component.y = position.y;

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

async function createText(name: string, text: string, opacity: number) {
  await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
  const textNode = figma.createText();
  textNode.fontName = { family: 'Roboto', style: 'Regular' };
  textNode.fontSize = 12;
  textNode.name = name;
  textNode.characters = text;
  textNode.fills = [
    {
      type: 'SOLID',
      color: { r: 0, g: 0, b: 0 },
      opacity: opacity,
    },
  ];
  return textNode;
}

async function createPropertyMainComponent() {
  const property = figma.createComponent();
  property.name = 'Property';
  property.layoutMode = 'HORIZONTAL';
  property.itemSpacing = 4;
  property.paddingBottom = 0;
  property.paddingTop = 0;
  property.paddingLeft = 0;
  property.paddingRight = 0;
  property.primaryAxisSizingMode = 'AUTO';
  property.counterAxisSizingMode = 'AUTO';

  const propertyName = await createText('Style Name:', 'Name:', 0.5);
  const propertyValue = await createText('Style Value:', 'Value', 1);
  property.appendChild(propertyName);
  property.appendChild(propertyValue);
  return property;
}

function createHorizontalLine(): RectangleNode {
  const line = figma.createRectangle();
  line.resize(25, 1); // Assuming typoMainComponent.width is accessible, otherwise set a fixed width
  line.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 0.3 }]; // Black line
  line.cornerRadius = 0; // Straight line
  return line;
}

async function createTypoWithPropertyMainComponent(): Promise<ComponentNode> {
  const propertyMainComponent = await createPropertyMainComponent();
  const y = propertyMainComponent.height;

  const typoMainComponent = await createTypoMainComponent({ x: 0, y: y + 16 });

  const textFrame = figma.createFrame();
  textFrame.layoutMode = 'VERTICAL';
  textFrame.primaryAxisAlignItems = 'CENTER'; // Center align vertically
  textFrame.counterAxisAlignItems = 'CENTER'; // Center align horizontally
  textFrame.resize(150, 50); // Set size to match textNode
  textFrame.fills = []; // No background fill
  textFrame.primaryAxisSizingMode = 'FIXED';
  textFrame.layoutAlign = 'STRETCH';

  const textNode = figma.createText();
  textNode.fontName = { family: 'Roboto', style: 'Regular' };
  textNode.fontSize = 32;
  textNode.characters = 'H1';
  textNode.name = '#typo';
  textNode.textAlignHorizontal = 'CENTER';
  textNode.textAlignVertical = 'CENTER';
  textFrame.appendChild(textNode);

  typoMainComponent.appendChild(textFrame);

  // Create an auto layout frame for properties
  const propertiesFrame = figma.createFrame();
  propertiesFrame.layoutMode = 'VERTICAL';
  propertiesFrame.paddingTop = 8;
  propertiesFrame.paddingLeft = 4;
  propertiesFrame.paddingRight = 4;
  propertiesFrame.paddingBottom = 4;
  propertiesFrame.itemSpacing = 4;
  propertiesFrame.fills = []; // No background fill
  propertiesFrame.layoutAlign = 'STRETCH';

  const properties = [
    { name: 'Text Case:', property: '#typo.textCase' },
    { name: 'Font:', property: '#typo.font' },
    { name: 'Weight:', property: '#typo.fontWeight' },
    { name: 'Size:', property: '#typo.fontSize' },
    { name: 'Indent:', property: '#typo.paragraphIndent' },
    { name: 'Space:', property: '#typo.paragraphSpace' },
    { name: 'Letter Space:', property: '#typo.letterSpace' },
    { name: 'Line Height:', property: '#typo.lineHeight' },
  ];

  properties.forEach((property) => {
    const propertyInstant = propertyMainComponent.createInstance();
    const propertyName = propertyInstant.children[0] as TextNode;
    propertyName.characters = property.name;
    const propertyValue = propertyInstant.children[1] as TextNode;
    propertyValue.name = property.property;
    propertyValue.characters = '-';
    propertiesFrame.appendChild(propertyInstant);
  });

  typoMainComponent.appendChild(propertiesFrame);

  return typoMainComponent;
}

export { createTypoWithPropertyMainComponent };
