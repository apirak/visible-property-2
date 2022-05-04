import { colorToRgb, rgbToHex , colorToHSL, colorToHSB } from "./colorUtility";
type ColorType = "RGB" | "HSL" | "HSB" | "HEX";

function convertToDegree(matrix:Transform):number {
  const values = [...matrix[0], ...matrix[1]];
  const a = values[0];
  const b = values[1];
  const angle = Number(((Math.atan2(b, a) * (180 / Math.PI)) + 90).toFixed(2));

  return angle <= 0 ? angle + 360 : angle;
}

function getDegreeForMatrix(matrix:Transform):string {
  const degrees = convertToDegree(matrix) || 0;
  return `${degrees}deg`;
}

function getGradientStopByAlpha(color:RGBA):string {
  if (color.a == 1) {
    return rgbToHex(color.r, color.g, color.b);
  } else {
    return colorToRgb(color, color.a);
  }
}

function getPosition(stop:ColorStop):number {
  return Math.round(stop.position * 100 * 100) / 100
}

function getGradientStop(stops:ReadonlyArray<ColorStop>, type:ColorType):string {
  const colors = stops.map( stop => {
    let color = ""
    switch(type) {
      case "RGB":
        color = colorToRgb(stop.color, stop.color.a);
        break;
      case "HSL":
        color = colorToHSL(stop.color, stop.color.a);
        break;
      case "HSB":
        color = colorToHSB(stop.color, stop.color.a);
        break;
      default:
        color = getGradientStopByAlpha(stop.color);
        break;
    }
    return color + " " + getPosition(stop) + "%";
  }).join(',\n');
  return colors
}

export function gradientToString(paint: GradientPaint, type:ColorType):string {
  const { gradientTransform, gradientStops } = paint;
  const gradientTransformString = getDegreeForMatrix(gradientTransform);
  const gradientStopString = getGradientStop(gradientStops, type)
  return `linear-gradient( ${gradientTransformString},\n${gradientStopString} )`;
}
