import { VisibleNode } from './visibleNode';
import { colorToHex } from './colorUtillity';

export interface ReferenceNode extends VisibleNode{
  getFill():string;
}

export class ReferenceNode extends VisibleNode {

  isSolidPaints(fills: readonly Paint[] | PluginAPI['mixed']): fills is SolidPaint[] {
    if (fills as Paint[] != undefined){
      if ((fills as Paint[]).length != 0){
        return (fills as SolidPaint[])[0].color != undefined;
      }
    }
    return false;
  }

  getFill():string{
    if(this.isSolidPaints(this.node.fills)){
      return colorToHex(this.node.fills[0].color).toUpperCase();
    } else {
      return "";
    }
  }

  debug(){
    console.log("#ReferenceNode");
    super.debug();
  }
}