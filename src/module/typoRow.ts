import { addText } from '../utility/textUtility';

function createTypoMainComponent(position: {
  x: number;
  y: number;
}): ComponentNode {
  const component = figma.createComponent();
  component.name = 'Typo';
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
  property.itemSpacing = 0;
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

async function createTypoWithPropertyMainComponent(): Promise<ComponentNode> {
  const propertyMainComponent = await createPropertyMainComponent();
  const y = propertyMainComponent.height;

  const typoMainComponent = await createTypoMainComponent({ x: 0, y: y + 16 });

  const propertyInstant = propertyMainComponent.createInstance();
  typoMainComponent.appendChild(propertyInstant);

  return typoMainComponent;
}

export { createTypoWithPropertyMainComponent };
