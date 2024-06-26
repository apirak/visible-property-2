export async function addText(
  text: string,
  x: number,
  y: number,
  name: string,
  fontStyle: string = "Regular"
): Promise<TextNode> {
  await figma.loadFontAsync({ family: "Roboto", style: fontStyle });
  const textNode = figma.createText();
  textNode.fontName = { family: "Roboto", style: fontStyle };
  textNode.fontSize = 12;
  textNode.x = x;
  textNode.y = y;
  textNode.characters = text;
  textNode.name = name;
  return textNode;
}

export async function addTextNearSelected(
  node: SceneNode,
  text: string,
  name: string
) {
  let elementNode = <RectangleNode>node;
  const textNode = addText(
    text,
    elementNode.x,
    elementNode.y + elementNode.height + 20,
    name
  );
  (await textNode).name = name;
  if (elementNode.parent) {
    elementNode.parent.appendChild(await textNode);
  }
}
