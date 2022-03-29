import { VisibleNode } from './visibleNode';
import { colorToHex } from './colorUtillity';
import { ColorFormat, toHsl } from 'figx';

export interface ReferenceNode extends VisibleNode{
  getFill():string;
  getValue(name:string):string;
}

export type HSLColor = { h: number; s: number; l: number };

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
        return this.getRGB("fill");
        break;
      case "fillHSL":
        return this.getHSL("fill");
        break;
      case "fillStyle":
        return this.getFillStyle();
        break;
      case "stroke":
        return this.getStroke();
        break;
      case "strokeRGB":
        return this.getRGB("stroke");
        break;
      case "strokeHSL":
        return this.getHSL("stroke");
        break;
      case "strokeStyle":
        return this.getStrokeStyle();
        break;
      case "description":
        return this.getDescription();
        break;
      case "width":
        return this.getWidth();
        break;
      case "height":
        return this.getHeight();
        break;
      default:
        return "No function"
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

  getRGB(type:string):string{
    const paints = (type == "stroke") ? this.node.strokes : this.node.fills;
    if(this.isSolidPaints(paints)){
      let color = paints[0].color;
      let alpha = paints[0].opacity;
      return "R:" + (color.r*256).toFixed(0) +
        " G:" + (color.g*256).toFixed(0) +
        " B:" + (color.b*256).toFixed(0) +
        ((alpha == 1 || alpha == undefined) ? "" : " A:" + (alpha*100).toFixed(0));
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

  getHSL(type:string):string {
    const paints = (type == "stroke") ? this.node.strokes : this.node.fills;
    if(this.isSolidPaints(paints)){
      const color = paints[0].color;
      let alpha = paints[0].opacity;
      const colorObject = {
        r: color.r*256,
        g: color.r*256,
        b: color.r*256
      };
      const hslObject =  <HSLColor>toHsl(colorObject, ColorFormat.OBJECT);
      return "H:" + (hslObject.h).toFixed(0) +
        " S:" + (hslObject.s).toFixed(0) +
        " L:" + (hslObject.l).toFixed(0) +
        ((alpha == 1 || alpha == undefined) ? "" : " A:" + (alpha*100).toFixed(0));
    } else {
      return "";
    }
  }

  getStrokeStyle():string{
    const componentNode = this.node as ComponentNode;

    if(componentNode.strokeStyleId){
      const styleID = componentNode.strokeStyleId.toString();
      const style = figma.getStyleById(styleID)
      return style ? style.name : "Can't read style";
    }
    return "No Style";
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