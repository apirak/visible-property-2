export type HSLColor = { h: number; s: number; l: number };
export type HSBColor = { h: number; s: number; b: number };

export const colorNumberToHex = (color: number): string => {
  const hex = Math.round(color * 255).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + colorNumberToHex(r) + colorNumberToHex(g) + colorNumberToHex(b);
}

export function colorToHex(color: RGB, opacity: number | undefined): string {
  const a =
    opacity == 1 || opacity == undefined
      ? ""
      : " " + Number((opacity * 100).toFixed(0)) + "%";
  return rgbToHex(color["r"], color["g"], color["b"]) + a;
}

export function rgbToHSB(r: number, g: number, b: number) {
  let v = Math.max(r, g, b),
    c = v - Math.min(r, g, b);
  let h =
    c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
  return { h: 60 * (h < 0 ? h + 6 : h), s: v && c / v, b: v };
}

export function rgbToHSL(r: number, g: number, b: number) {
  let v = Math.max(r, g, b),
    c = v - Math.min(r, g, b),
    f = 1 - Math.abs(v + v - c - 1);
  let h =
    c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
  return { h: 60 * (h < 0 ? h + 6 : h), s: f ? c / f : 0, l: (v + v - c) / 2 };
}

export function colorToHSLObject(color: RGB): HSLColor {
  return rgbToHSL(color["r"], color["g"], color["b"]);
}

export function colorToHSBObject(color: RGB): HSBColor {
  return rgbToHSB(color["r"], color["g"], color["b"]);
}

export function colorToHSL(color: RGB, opacity: number | undefined): string {
  const hsl: HSLColor = colorToHSLObject(color);
  const hue = Number(hsl.h.toFixed(0));
  const sat = Number(hsl.s.toFixed(2));
  const lightness = Number(hsl.l.toFixed(2));
  const a =
    opacity == 1 || opacity == undefined ? "1" : Number(opacity.toFixed(2));

  return a == 1
    ? `hsl(${hue}, ${Math.round(sat * 100)}%, ${Math.round(lightness * 100)}%)`
    : `hsla(${hue}, ${Math.round(sat * 100)}%, ${Math.round(
        lightness * 100
      )}%, ${a})`;
}

export function colorToHSB(color: RGB, opacity: number | undefined): string {
  const hsb: HSBColor = colorToHSBObject(color);
  const hue = Number(hsb.h.toFixed(0));
  const sat = Number(hsb.s.toFixed(2));
  const brightness = Number(hsb.b.toFixed(2));
  const a =
    opacity == 1 || opacity == undefined ? "1" : Number(opacity.toFixed(2));

  return a == 1
    ? `hsb(${hue}, ${Math.round(sat * 100)}%, ${Math.round(brightness * 100)}%)`
    : `hsba(${hue}, ${Math.round(sat * 100)}%, ${Math.round(
        brightness * 100
      )}%, ${a})`;
}

const toFixedZero = (num: number): string => {
  if (Number.isInteger(num)) {
    return (num - 1).toString();
  }
  const numString = num.toString();
  const indexOfDot = numString.indexOf(".");
  const fixedNumber = numString.slice(0, indexOfDot);
  return fixedNumber != "" ? fixedNumber : "0";
};

export function colorToRgb(color: RGB, opacity: number | undefined): string {
  const r = color.r ? toFixedZero(color.r * 256) : "0";
  const g = color.g ? toFixedZero(color.g * 256) : "0";
  const b = color.b ? toFixedZero(color.b * 256) : "0";
  const a =
    opacity == 1 || opacity == undefined ? "1" : Number(opacity.toFixed(2));

  return a == 1
    ? "rgb(" + r + ", " + g + ", " + b + ")"
    : "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}
