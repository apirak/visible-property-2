import { VisibleNode } from "./visibleNode";
import {
  colorToHex,
  colorToHSL,
  colorToRgb,
  colorToHSB,
} from "../utility/colorUtility";
import { colorName } from "../utility/colorName";
import { gradientToString } from "../utility/gradientUtility";

export interface ReferenceNode extends VisibleNode {
  getFill(): string;
  getValue(name: string): string;
}

export type Space = { unit: string; value: number };

export class ReferenceNode extends VisibleNode {
  isSolidPaints(
    fills: readonly Paint[] | PluginAPI["mixed"]
  ): fills is SolidPaint[] {
    if ((fills as Paint[]) != undefined) {
      if ((fills as Paint[]).length != 0) {
        return (fills as SolidPaint[])[0].color != undefined;
      } else {
        return false;
      }
    }
    return false;
  }

  getValue(name: string): string {
    const lowerCaseName: string = name.toLowerCase();
    const textFunction = new Set<string>([
      "font",
      "fontweight",
      "fontsize",
      "paragraphindent",
      "paragraphspace",
    ]);
    if (textFunction.has(lowerCaseName)) {
      return this.getText(lowerCaseName);
    }
    switch (lowerCaseName) {
      case "fill":
        return this.getHex("fill");
        break;
      case "stroke":
        return this.getHex("stroke");
        break;
      case "fillrgb":
        return this.getRGB("fill");
        break;
      case "strokergb":
        return this.getRGB("stroke");
        break;
      case "strokehsl":
        return this.getHSL("stroke");
        break;
      case "strokehsb":
        return this.getHSB("stroke");
        break;
      case "fillhsl":
        return this.getHSL("fill");
        break;
      case "fillhsb":
        return this.getHSB("fill");
        break;
      case "fillstyle":
        return this.getStyle("fill");
        break;
      case "strokestyle":
        return this.getStyle("stroke");
        break;
      case "textstyle":
        return this.getStyle("text");
        break;
      case "fillstyledescription":
        return this.getStyleDescription("fill");
        break;
      case "strokestyledescription":
        return this.getStyleDescription("stroke");
        break;
      case "textstyledescription":
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
      case "letterspace":
        return this.getTextSpace("letterspace");
        break;
      case "lineheight":
        return this.getTextSpace("lineheight");
        break;
      case "fillcolorname":
        return this.getColorName("fill");
        break;
      case "strokecolorname":
        return this.getColorName("stroke");
        break;
      case "name":
        return this.getLayerName();
        break;
      default:
        return "No function";
        break;
    }
  }

  hasFill(): boolean {
    return this.node.fills.length > 0 ? true : false;
  }

  hasStroke(): boolean {
    return this.node.strokes.length > 0 ? true : false;
  }

  isText(): boolean {
    return this.node.type == "TEXT" ? true : false;
  }

  hasPaints(paints: Paint[], type: string): [boolean, string] {
    if (paints === undefined || paints.length == 0) {
      return [false, `No ${type}`];
    }
    return [true, ""];
  }

  getHex(type: string): string {
    const paints = type == "stroke" ? this.node.strokes : this.node.fills;
    if (this.isSolidPaints(paints)) {
      return colorToHex(paints[0].color, paints[0].opacity);
    } else {
      let [isPaints, feedback] = this.hasPaints(paints, type);

      if (isPaints && paints[0].type == "GRADIENT_LINEAR") {
        return gradientToString(paints[0], "HEX");
      } else {
        return feedback;
      }
      return "";
    }
  }

  getRGB(type: string): string {
    const paints = type == "stroke" ? this.node.strokes : this.node.fills;
    if (this.isSolidPaints(paints)) {
      return colorToRgb(paints[0].color, paints[0].opacity);
    } else {
      let [isPaints, feedback] = this.hasPaints(paints, type);
      if (isPaints && paints[0].type == "GRADIENT_LINEAR") {
        return gradientToString(paints[0], "RGB");
      } else {
        return feedback;
      }
    }
  }

  getHSL(type: string): string {
    const paints = type == "stroke" ? this.node.strokes : this.node.fills;
    if (this.isSolidPaints(paints)) {
      return colorToHSL(paints[0].color, paints[0].opacity);
    } else {
      let [isPaints, feedback] = this.hasPaints(paints, type);
      if (isPaints && paints.length == 0) {
        return "No " + type;
      } else {
        return feedback;
      }
    }
  }

  getHSB(type: string): string {
    const paints = type == "stroke" ? this.node.strokes : this.node.fills;
    if (this.isSolidPaints(paints)) {
      return colorToHSB(paints[0].color, paints[0].opacity);
    } else {
      let [isPaints, feedback] = this.hasPaints(paints, type);
      if (isPaints && paints.length == 0) {
        return "No " + type;
      } else {
        return feedback;
      }
    }
  }

  getStyle(type: string): string {
    let styleId: string = "";
    const cNode = this.node as ComponentNode;

    switch (type) {
      case "stroke":
        if (cNode.strokeStyleId !== undefined) {
          styleId = (this.node as ComponentNode).strokeStyleId.toString();
        } else {
          return "No stroke style";
        }
        break;
      case "fill":
        if (cNode.fillStyleId !== undefined) {
          styleId = (this.node as ComponentNode).fillStyleId.toString();
        } else {
          return "No fill style";
        }
        break;
      case "text":
        const tNode = this.node as TextNode;
        styleId = (this.node as TextNode).textStyleId.toString();
        break;
    }

    if (styleId) {
      const style = figma.getStyleById(styleId);
      if (style) {
        return style.name.split(/ *\/ */).join("/");
      } else {
        return "Can't read style";
      }
    }
    return "No Style";
  }

  getStyleDescription(type: string): string {
    let styleId: string = "";
    const cNode = this.node as ComponentNode;

    switch (type) {
      case "stroke":
        if (cNode.strokeStyleId !== undefined) {
          styleId = cNode.strokeStyleId.toString();
        } else {
          return "No stroke style";
        }
        break;
      case "fill":
        if (cNode.fillStyleId !== undefined) {
          styleId = cNode.fillStyleId.toString();
        } else {
          return "No fill style";
        }
        break;
      case "text":
        styleId = (this.node as TextNode).textStyleId.toString();
        break;
    }

    if (styleId) {
      const style = figma.getStyleById(styleId);
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

  getTextSpace(type: string): string {
    if (this.node.type == "TEXT") {
      let space: Space = { unit: "", value: 0 };
      switch (type) {
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

      if (space.unit == "PERCENT") {
        return "" + parseFloat(space.value.toFixed(2)) + "%";
      } else {
        return "" + parseFloat(space.value.toFixed(2));
      }
    } else {
      return "Not a text";
    }
  }

  getText(type: string): string {
    if (this.node.type == "TEXT") {
      switch (type) {
        case "font":
          return this.node.fontName.family;
          break;
        case "fontweight":
          return this.node.fontName.style;
          break;
        case "fontsize":
          return this.node.fontSize.toString();
          break;
        case "paragraphspace":
          return this.node.paragraphSpacing.toString();
          break;
        case "paragraphindent":
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

  getDescription(): string {
    if (this.node.type == "COMPONENT") {
      return this.node.description;
    } else {
      return "";
    }
  }

  getWidth(): string {
    if (this.node.width != undefined) {
      return String(this.node.width);
    } else {
      return "";
    }
  }

  getHeight(): string {
    if (this.node.height != undefined) {
      return String(this.node.height);
    } else {
      return "";
    }
  }

  getColorName(type: string): string {
    const paints = type == "stroke" ? this.node.strokes : this.node.fills;
    if (this.isSolidPaints(paints)) {
      return colorName(colorToHex(paints[0].color, undefined));
    } else {
      if (paints.length == 0) {
        return "No " + type;
      }
      return "";
    }
  }

  getLayerName(): string {
    return this.node.name;
  }
}
