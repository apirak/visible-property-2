import { VisibleNode } from './visibleNode';
import { colorToHex, colorToHSL, colorToRgb, colorToHSB } from './colorUtility';
import { colorName } from './colorName';
import { gradientToString } from './gradientUtility';

export interface ReferenceNode extends VisibleNode{
  getFill():string;
  getValue(name:string):string;
}

export type Space = { unit: string; value:number};

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
    const textFunction = new Set<string>(['font', 'fontWeight', 'fontSize', 'paragraphIndent', 'paragraphSpace']);
    if(textFunction.has(name)){
      return this.getText(name);
    }
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
      case "strokeHSB":
        return this.getHSB("stroke");
        break;
      case "fillHSL":
        return this.getHSL("fill");
        break;
      case "fillHSB":
        return this.getHSB("fill");
        break;
      case "fillStyle":
        return this.getStyle("fill");
        break;
      case "strokeStyle":
        return this.getStyle("stroke");
        break;
      case "textStyle":
        return this.getStyle("text");
        break;
      case "fillStyleDescription":
        return this.getStyleDescription("fill");
        break;
      case "strokeStyleDescription":
        return this.getStyleDescription("stroke");
        break;
      case "textStyleDescription":
        return this.getStyleDescription("text");
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
      case "letterSpace":
        return this.getTextSpace("letter space");
        break;
      case "lineHeight":
        return this.getTextSpace("line height");
        break;
      case "fillColorName":
        return this.getColorName("fill");
        break;
      case "strokeColorName":
        return this.getColorName("stroke");
        break;
      default:
        return "No function"
        break;
    }
  }

  getHex(type:string):string{
    const paints = (type == "stroke") ? this.node.strokes : this.node.fills;
    if(this.isSolidPaints(paints)){
      return colorToHex(paints[0].color, paints[0].opacity)
    } else {
      if (paints[0].type == "GRADIENT_LINEAR") {
        return gradientToString(paints[0], "HEX")
      }
      if (paints.length == 0){
        return "No " + type
      }
      return "";
    }
  }

  getRGB(type:string):string{
    const paints = (type == "stroke") ? this.node.strokes : this.node.fills;
    if(this.isSolidPaints(paints)){
      return colorToRgb(paints[0].color, paints[0].opacity);
    } else {
      if (paints[0].type == "GRADIENT_LINEAR") {
        return gradientToString(paints[0], "RGB")
      }
      if (paints.length == 0){
        return "No " + type
      }
      return "";
    }
  }

  getHSL(type:string):string {
    const paints = (type == "stroke") ? this.node.strokes : this.node.fills;
    if(this.isSolidPaints(paints)){
      return colorToHSL(paints[0].color, paints[0].opacity);
    } else {
      if (paints[0].type == "GRADIENT_LINEAR") {
        return gradientToString(paints[0], "HSL")
      }
      if (paints.length == 0){
        return "No " + type
      }
      return "";
    }
  }

  getHSB(type:string):string {
    const paints = (type == "stroke") ? this.node.strokes : this.node.fills;
    if(this.isSolidPaints(paints)){
      return colorToHSB(paints[0].color, paints[0].opacity);
    } else {
      if (paints[0].type == "GRADIENT_LINEAR") {
        return gradientToString(paints[0], "HSB")
      }
      if (paints.length == 0){
        return "No " + type
      }
      return "";
    }
  }

  getStyle(type:string):string{
    let styleId:string = "";

    switch(type){
      case "stroke":
        styleId = (this.node as ComponentNode).strokeStyleId.toString();
        break;
      case "fill":
        styleId = (this.node as ComponentNode).fillStyleId.toString();
        break;
      case "text":
        styleId = (this.node as TextNode).textStyleId.toString();
        break;
    }

    if(styleId){
      const style = figma.getStyleById(styleId)
      if(style){
        return style.name.split(/ *\/ */).join('/');
      } else {
        return "Can't read style";
      }
    }
    return "No Style";
  }

  getStyleDescription(type:string):string{
    let styleId:string = "";

    switch(type){
      case "stroke":
        styleId = (this.node as ComponentNode).strokeStyleId.toString();
        break;
      case "fill":
        styleId = (this.node as ComponentNode).fillStyleId.toString();
        break;
      case "text":
        styleId = (this.node as TextNode).textStyleId.toString();
        break;
    }

    if(styleId){
      const style = figma.getStyleById(styleId)
      if (style) {
        if (style.description) {
          return style.description;
        } else {
          return "No description";
        }
      } else {
        return "Can't read style";
      }
    }
    return "No Style";
  }

  getTextSpace(type:string):string {
    if(this.node.type == "TEXT") {
      let space:Space = { unit: "", value: 0};
      switch(type) {
        case "line height":
          space = this.node.lineHeight;
          break;
        case "letter space":
          space = this.node.letterSpacing;
          break;
        default:
          return "No function";
          break;
      }

      if(space.unit == "PERCENT") {
        return "" + parseFloat(space.value.toFixed(2)) + "%";
      } else {
        return "" + parseFloat(space.value.toFixed(2));
      }
    } else {
      return "Not a text";
    }
  }

  getText(type:string):string {
    if(this.node.type == "TEXT") {
      switch(type) {
        case "font":
          return this.node.fontName.family;
          break;
        case "fontWeight":
          return this.node.fontName.style;
          break;
        case "fontSize":
          return this.node.fontSize.toString();
          break;
        case "paragraphSpace":
          return this.node.paragraphSpacing.toString();
          break;
        case "paragraphIndent":
          return this.node.paragraphIndent.toString();
          break;
        default:
          return "No function";
          break;
      }
    } else {
      return "Not a text";
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

  getColorName(type:string):string {
    const paints = (type == "stroke") ? this.node.strokes : this.node.fills;
    if(this.isSolidPaints(paints)){
      return colorName(colorToHex(paints[0].color, undefined));
    } else {
      if (paints.length == 0){
        return "No " + type
      }
      return "";
    }
  }
}