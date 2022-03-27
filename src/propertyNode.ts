import { VisibleNode } from './visibleNode';
import { ReferenceNode } from './referenceNode';

export interface PropertyNode extends VisibleNode{
  tryReferencePath(referenceNode: ReferenceNode):any;
  updateValue():any;
}

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
    if(this.referenceNode) {
      console.log("Color "+ this.referenceNode.getFill());
    }
  }

  debug(){
    console.log("#PerpertyNode");
    console.log("Reference: " + this.referenceName);
    console.log("Depth: " + this.depth);
    super.debug();
  }
}