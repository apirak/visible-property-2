export type HSLColor = { h: number; s: number; l: number };

export const colorNumberToHex = (color:number):string => {
  const hex = Math.round(color * 255).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r:number, g:number, b:number):string {
  return "#" + colorNumberToHex(r) + colorNumberToHex(g) + colorNumberToHex(b)
}

export function colorToHex(color:RGB, opacity:number|undefined):string{
  const a = (opacity == 1 || opacity == undefined) ? "" : " " +Number((opacity*100).toFixed(0)) + "%";
  return rgbToHex(color["r"], color["g"], color["b"]) + a;
}

export function rgbToHsl(r:number, g:number, b:number) {
  var min, max, i, l, s, maxcolor, h, rgb = [];
  rgb[0] = r;
  rgb[1] = g;
  rgb[2] = b;
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

export function colorToHslObject(color:RGB):HSLColor{
  return rgbToHsl(color["r"], color["g"], color["b"]);
}

export function colorToHsl(color:RGB, opacity:number|undefined):string{
  const hsl:HSLColor = colorToHslObject(color);
  const hue = Number(hsl.h.toFixed(0));
  const sat = Number(hsl.s.toFixed(2));
  const lightness = Number(hsl.l.toFixed(2));
  const a = (opacity == 1 || opacity == undefined) ? "1" : Number(opacity.toFixed(2));

  return "hsla(" + hue + ", " + Math.round(sat * 100) + "%, " + Math.round(lightness * 100) + "%, " + a + ")";
}

const toFixedZero = (num:number):string => {
  const numString = num.toString();
  const fixedNumber = numString.slice(0, (numString.indexOf(".")))
  return (fixedNumber != "") ? fixedNumber : "0";
}

export function colorToRgb(color:RGB, opacity:number|undefined):string{
  const r = color.r ? toFixedZero(color.r*256) : "0";
  const g = color.g ? toFixedZero(color.g*256) : "0";
  const b = color.b ? toFixedZero(color.b*256) : "0";
  const a = (opacity == 1 || opacity == undefined) ? "1" : Number(opacity.toFixed(2));

  return  "rgba(" + r + ", "+ g + ", " + b + ", " + a + ")";
}