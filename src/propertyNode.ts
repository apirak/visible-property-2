import { VisibleNode } from './visibleNode';
import { ReferenceNode } from './referenceNode';
import { setText } from './textUtility';

export interface PropertyNode extends VisibleNode{
  tryReferencePath(referenceNode: ReferenceNode):any;
  updateValue():any;
}

async function loadFont(text:TextNode) {
  let font = <FontName>text.fontName;
  await figma.loadFontAsync({family:font.family, style:font.style});
};

export class PropertyNode extends VisibleNode {
  referenceNode?: ReferenceNode;
  depth: number | null = null;

  tryReferencePath(referenceNode: ReferenceNode){
    // console.log("in: try");
    this.path.forEach( (pPath, pIndex) => {
       referenceNode.path.forEach ( (rPath, rIndex) => {
         //  console.log("pPath: " + pPath + " rPath: " + rPath);
         //  console.log("pIndex: " + pIndex + " depth: " + this.depth);
         if (pPath == rPath && (this.depth == null || pIndex < this.depth )) {
          //  console.log("Assign");
           this.depth = pIndex;
           this.referenceNode = referenceNode;
         }
       })
    })
    // console.log("out: try");
  }

  updateValue(){
    if(this.referenceNode && this.node.type == "TEXT") {
      loadFont(this.node).then(() => {
        this.node.characters = this.referenceNode?.getFill();
      }) ;
    }
  }

  debug(){
    console.log("#PerpertyNode");
    console.log("Reference: " + this.referenceName);
    console.log("Depth: " + this.depth);
    super.debug();
  }
}