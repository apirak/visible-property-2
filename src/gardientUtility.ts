import { colorToRgb, rgbToHex } from "./colorUtility";

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

function getGradientStop(stops:ReadonlyArray<ColorStop>):string {
  const colors = stops.map( stop => {
    console.log(stop.position)
    const position = Math.round(stop.position * 100 * 100) / 100
    const color = getGradientStopByAlpha(stop.color);
    return color + " " + position + "%";
  }).join(',\n');
  return colors
}

export function cssGradient(paint: GradientPaint):string {
  console.log("in css Gradient");
  console.log(paint);

  const { gradientTransform, gradientStops } = paint;
  const gradientTransformString = getDegreeForMatrix(gradientTransform);

  const gradientStopString = getGradientStop(gradientStops)


  console.log(gradientStopString);

  return `linear-gradient( ${gradientTransformString},\n${gradientStopString})`;
}