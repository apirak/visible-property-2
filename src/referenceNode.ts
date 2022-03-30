import { VisibleNode } from './visibleNode';
import { ColorFormat, toHsl, toHex } from 'figx';
import axios from 'axios';

export interface ReferenceNode extends VisibleNode{
  getFill():string;
  getValue(name:string):string;
}

export type HSLColor = { h: number; s: number; l: number };
export type RGB255 = { r: number; g:number; b: number};

const toRGB255 = (color:RGB):RGB255 => {
  return {r: color.r*255, g: color.g*255, b: color.b*255}
}

const toFixedZero = (num:number):string => {
  const numString = num.toString();
  return numString.slice(0, (numString.indexOf(".")))
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
        return this.getHex('fill');
        break;
      case "stroke":
        return this.getHex('stroke');
        break;
      case "fillRGB":
        return this.getRGB("fill");
        break;
      case "strokeRGB":
        return this.getRGB("stroke");
        break;
      case "strokeHSL":
        return this.getHSL("stroke");
        break;
      case "fillHSL":
        return this.getHSL("fill");
        break;
      case "fillStyle":
        return this.getStyle("fill");
        break;
      case "strokeStyle":
        return this.getStyle("stroke");
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

  getHex(type:string):string{
    const paints = (type == "stroke") ? this.node.strokes : this.node.fills;
    if(this.isSolidPaints(paints)){
      return toHex(toRGB255(paints[0].color));
    } else {
      if (paints.length == 0){
        return "No " + type
      }
      return "";
    }
  }

  getRGB(type:string):string{
    const paints = (type == "stroke") ? this.node.strokes : this.node.fills;
    if(this.isSolidPaints(paints)){
      let color = paints[0].color;
      let alpha = paints[0].opacity;
      return "R:" + toFixedZero(color.r*256) +
        " G:" + toFixedZero(color.g*256) +
        " B:" + toFixedZero(color.b*256) +
        ((alpha == 1 || alpha == undefined) ? "" : " A:" + (alpha*100).toFixed(0));
    } else {
      if (paints.length == 0){
        return "No " + type
      }
      return "";
    }
  }

  getStyle(type:string):string{
    const componentNode = this.node as ComponentNode;
    const styleId = (type == "stroke") ? componentNode.strokeStyleId : componentNode.fillStyleId;

    if(styleId){
      const styleID = styleId.toString();
      const style = figma.getStyleById(styleID)
      return style ? style.name : "Can't read style";
    }
    return "No Style";
  }

  getHSL(type:string):string {
    const paints = (type == "stroke") ? this.node.strokes : this.node.fills;
    if(this.isSolidPaints(paints)){
      const colorObject = toRGB255(paints[0].color);
      let alpha = paints[0].opacity;
      const hslObject =  <HSLColor>toHsl(colorObject, ColorFormat.OBJECT);
      return "H:" + (hslObject.h).toFixed(0) +
        " S:" + (hslObject.s).toFixed(0) +
        " L:" + (hslObject.l).toFixed(0) +
        ((alpha == 1 || alpha == undefined) ? "" : " A:" + (alpha*100).toFixed(0));
    } else {
      if (paints.length == 0){
        return "No " + type
      }
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