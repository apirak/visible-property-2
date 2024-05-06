import Color from 'colorjs.io';

export interface OKLCH {
  lightness: number;
  chroma: number;
  hue: number;
}

const rgbToXyz = ({ r, g, b }: RGB): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  return [
    r * 0.4124564 + g * 0.3575761 + b * 0.1804375,
    r * 0.2126729 + g * 0.7151522 + b * 0.072175,
    r * 0.0193339 + g * 0.119192 + b * 0.9503041,
  ];
};

// Helper function to convert XYZ to Lab
const xyzToLab = (
  x: number,
  y: number,
  z: number
): [number, number, number] => {
  const Xn = 0.95047,
    Yn = 1.0,
    Zn = 1.08883;
  x /= Xn;
  y /= Yn;
  z /= Zn;
  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
};

// Convert Lab to OKLCH and return as an object
const labToOklch = (l: number, a: number, b: number): OKLCH => {
  const chroma = Math.sqrt(a * a + b * b);
  const hue = Math.atan2(b, a) * (180 / Math.PI);
  return {
    lightness: l,
    chroma: chroma,
    hue: hue,
  };
};

function formatNumber(num: number): string {
  // Check if the number is an integer
  if (num % 1 === 0) {
    return num.toString(); // Convert the whole number to a string
  } else {
    return num.toFixed(2); // Format the number to two decimal places and it's already a string
  }
}

export function colorToOKLCH(color: RGB, opacity: number | undefined): string {
  let c = new Color('sRGB', [color.r, color.g, color.b], opacity);

  let cl = formatNumber(c.oklch.l);
  let cc = formatNumber(c.oklch.c);
  let chue = '0';
  if (!Number.isNaN(c.oklch.hue)) {
    chue = formatNumber(c.oklch.hue);
  }

  console.log('lightness: ' + cl);
  console.log('chroma: ' + cc);
  console.log('hue: ' + chue);

  if (opacity == 1 || opacity == undefined) {
    return `oklch(${cl}%, ${cc}, ${chue})`;
  } else {
    return `oklch(${cl}%, ${cc}, ${chue} / ${opacity * 100}%)`;
  }
}
