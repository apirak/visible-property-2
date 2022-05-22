import { VisibleNode } from "./visibleNode";
import { ReferenceNode } from "./referenceNode";

export interface PropertyNode extends VisibleNode {
  tryReferencePath(referenceNode: ReferenceNode): any;
  updateValue(): any;
}

async function loadFont(text: TextNode) {
  const font = <FontName>text.fontName;
  await figma.loadFontAsync({ family: font.family, style: font.style });
}

export class PropertyNode extends VisibleNode {
  referenceNode?: ReferenceNode;
  depth?: number;

  tryReferencePath(referenceNode: ReferenceNode) {
    this.path.forEach((pPath, pIndex) => {
      referenceNode.path.forEach((rPath, rIndex) => {
        if (pPath == rPath && (this.depth == null || pIndex < this.depth)) {
          this.depth = pIndex;
          this.referenceNode = referenceNode;
        }
      });
    });
  }

  async updateValue() {
    if (this.referenceNode && this.node.type == "TEXT") {
      await loadFont(this.node).then(() => {
        this.node.characters = this.referenceNode?.getValue(this.propertyName);
      });
    }
  }
}
