import { VisibleNode } from './visibleNode';
import { colorToHex } from './colorUtillity';

export interface ReferenceNode extends VisibleNode{
  getFill():string;
}

export class ReferenceNode extends VisibleNode {
  basicNode: ComponentNode | RectangleNode | any;



  getFill():string{

    console.log(this.node.type)

    this.basicNode = <RectangleNode>this.node;
    let x = this.basicNode.fills[0];

    // console.log(this.node as ComponentNode);

    console.log(x.color);

    // if ((this.node as ComponentNode).fills){
    //   return colorToHex((this.node as ComponentNode).fills?[0].color).toUpperCase();
    // } else {
    //   return "";
    // }
    return "a";
  }

  debug(){
    console.log("#ReferenceNode");
    super.debug();
  }
}