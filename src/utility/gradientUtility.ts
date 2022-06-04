import { colorToRgb, rgbToHex, colorToHSL, colorToHSB } from "./colorUtility";
type ColorType = "RGB" | "HSL" | "HSB" | "HEX";
type Point = { x: number; y: number };

function convertToDegree(matrix: Transform): number {
  const values = [...matrix[0], ...matrix[1]];
  const a = values[0];
  const b = values[1];
  const angle = Number((Math.atan2(b, a) * (180 / Math.PI) + 90).toFixed(2));

  return angle <= 0 ? angle + 360 : angle;
}

function getDegreeForMatrix(matrix: Transform): string {
  const degrees = convertToDegree(matrix) || 0;
  return `${degrees}deg`;
}

function getGradientStopByAlpha(color: RGBA): string {
  if (color.a == 1) {
    return rgbToHex(color.r, color.g, color.b);
  } else {
    return colorToRgb(color, color.a);
  }
}

function getPointStartStop(matrix: Transform): [Point, Point] {
  // Tring
  const start: Point = { x: matrix[0][0], y: matrix[0][1] };
  const stop: Point = { x: matrix[1][1], y: matrix[1][0] };

  return [start, stop];
}

function getPosition(stop: ColorStop, matrix: Transform): number {
  const values = [...matrix[0], ...matrix[1]];
  const a = values[0];
  const b = values[1];
  const angle = Math.atan2(b, a) * (180 / Math.PI);

  const w = 1;

  // for testing
  // const [pStart, pStop] = getPointStartStop(matrix);

  // console.log("PStart")
  // console.log(pStart);

  // console.log("PStop")
  // console.log(pStop)

  // console.log("matrix");
  // console.log(matrix)

  // console.log(`cos(angle) = ${Math.cos(angle)}`);

  // const l = Math.sin(angle) * (w + Math.cos(angle) * w)

  // console.log(`l = ${l}`);

  // console.log(`Angle = ${angle}`)

  // console.log("in get position");
  // console.log(stop)

  return Math.round(stop.position * 100 * 100) / 100;
}

export function gradientString(paint: GradientPaint, colorToString:Function):string {
  const { gradientTransform, gradientStops } = paint;
  const gradientTransformString = getDegreeForMatrix(gradientTransform);
  const gradientStopString = gradientStops.map((stop) => {
    let color = "";
    color = colorToString(stop.color, stop.color.a);
    return color + " " + getPosition(stop, gradientTransform) + "%";
  }).join(",\n");
  return `linear-gradient( ${gradientTransformString},\n${gradientStopString} )`;
}
