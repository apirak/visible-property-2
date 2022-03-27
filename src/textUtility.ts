export async function setText(text:TextNode, newCharacters:string) {
  let font = <FontName> text.fontName;
  console.log(text.characters);
  await figma.loadFontAsync({ family:font.family, style:font.style });
  text.characters = newCharacters;
  console.log("xxx");
  console.log(text.characters);
}