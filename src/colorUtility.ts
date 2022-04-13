import { HSLColor } from "./referenceNode";

export const colorNumberToHex = (color:number):string => {
  const hex = Math.round(color * 255).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r:number, g:number, b:number):string {
  return "#" + colorNumberToHex(r) + colorNumberToHex(g) + colorNumberToHex(b)
}

export function colorToHex(color:RGB):string{
  return rgbToHex(color["r"], color["g"], color["b"]);
}

export function rgbToHsl(r:number, g:number, b:number) {
  var min, max, i, l, s, maxcolor, h, rgb = [];
  rgb[0] = r / 255;
  rgb[1] = g / 255;
  rgb[2] = b / 255;
  min = rgb[0];
  max = rgb[0];
  maxcolor = 0;
  for (i = 0; i < rgb.length - 1; i++) {
    if (rgb[i + 1] <= min) {min = rgb[i + 1];}
    if (rgb[i + 1] >= max) {max = rgb[i + 1];maxcolor = i + 1;}
  }
  if (maxcolor == 0) {
    h = (rgb[1] - rgb[2]) / (max - min);
  }
  if (maxcolor == 1) {
    h = 2 + (rgb[2] - rgb[0]) / (max - min);
  }
  if (maxcolor == 2) {
    h = 4 + (rgb[0] - rgb[1]) / (max - min);
  }
  if ((typeof h !== 'number') || isNaN(h)) {
    h = 0;
  } else {
    h = h * 60;
  }
  if (h < 0) {h = h + 360; }
  l = (min + max) / 2;
  if (min == max) {
    s = 0;
  } else {
    if (l < 0.5) {
      s = (max - min) / (max + min);
    } else {
      s = (max - min) / (2 - max - min);
    }
  }
  s = s;
  return {h : h, s : s, l : l};
}

export function colorToHsl(color:RGB):HSLColor{
  return rgbToHsl(color["r"], color["g"], color["b"]);
}

export function colorToHslString(color:RGB):string{
  const hsl:HSLColor = colorToHsl(color);
  return "h:" + hsl['h'] +
    "s: " + hsl['s'] +
    "l: " + hsl['l'];
}