import { VisibleNode } from './visibleNode';
import { colorToHex } from './colorUtillity';

export interface ReferenceNode extends VisibleNode{
  getFill():string;
  getValue(name:string):string;
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

  getValue(name:string):string {
    switch(name) {
      case "fill":
        return this.getFill();
        break;
      case "fillRGB":
        return this.getFillRGB();
        break;
      case "fillStyle":
        return this.getFillStyle();
        break;
      case "stroke":
        return this.getStroke();
        break;
      case "description":
        return this.getDescription();
        break;
      case "width":
        return this.getWidth();
        break;
      case "height":
        return this.getWidth();
        break;
      default:
        return ""
        break;
    }
  }

  getFill():string{
    if(this.isSolidPaints(this.node.fills)){
      return colorToHex(this.node.fills[0].color).toUpperCase();
    } else {
      return "";
    }
  }

  getFillRGB():string{
    if(this.isSolidPaints(this.node.fills)){
      let color = this.node.fills[0].color;
      return "R:" + (color.r*256).toFixed(0) +
        " G:" + (color.g*256).toFixed(0) +
        " B:" + (color.b*256).toFixed(0);
    } else {
      return "";
    }
  }

  getFillStyle():string{
    const componentNode = this.node as ComponentNode;

    if(componentNode.fillStyleId){
      const styleID = componentNode.fillStyleId.toString();
      const style = figma.getStyleById(styleID)
      return style ? style.name : "Can't read style";
    }
    return "No Style";
  }

  getStroke():string{
    if(this.isSolidPaints(this.node.strokes)){
      return colorToHex(this.node.strokes[0].color).toUpperCase();
    } else {
      return "";
    }
  }

  getDescription():string {
    if(this.node.type == "COMPONENT") {
      return this.node.description;
    } else {
      return "";
    }
  }

  getWidth():string{
    if(this.node.width != undefined){
      return String(this.node.width);
    } else {
      return "";
    }
  }

  getHeight():string{
    if(this.node.height != undefined){
      return String(this.node.height);
    } else {
      return "";
    }
  }

  debug(){
    console.log("#ReferenceNode");
    super.debug();
  }
}