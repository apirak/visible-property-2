// import { useMode, modeOklch } from 'culori/fn';
// import { converter } from 'culori';

function truncateToTwoDecimals(num: number): number {
  return Math.floor(num * 100) / 100;
}

function formatNumber(num: number): string {
  let num2 = truncateToTwoDecimals(num);
  // Check if the number is an integer
  if (num2 % 1 === 0) {
    return num2.toString(); // Convert the whole number to a string
  } else {
    return num.toFixed(2); // Format the number to two decimal places and it's already a string
  }
}

// Define color type
interface RGB {
  r: number;
  g: number;
  b: number;
}

// Define OKLCH color type
interface OKLCH {
  l: number;
  c: number;
  h: number;
}

interface XYZ {
  x: number;
  y: number;
  z: number;
}

interface LMS {
  l: number;
  m: number;
  s: number;
}

// **Step 1: RGB to XYZ**
function rgbToXyz(r: number, g: number, b: number): XYZ {
  r /= 255;
  g /= 255;
  b /= 255;

  // Apply adjustments for better color representation
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  // Apply matrix transformation (values from D65 standard)
  let x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
  let y = r * 0.2126729 + g * 0.7151522 + b * 0.072175;
  let z = r * 0.0193339 + g * 0.119192 + b * 0.9503041;

  return { x: x, y: y, z: z };
}

// **Step 2: XYZ to LMS**
function xyzToLms(x: number, y: number, z: number): LMS {
  let l = 0.7328 * x + 0.4296 * y - 0.1624 * z;
  let m = -0.7036 * x + 1.6975 * y + 0.0061 * z;
  let s = 0.003 * x + 0.0136 * y + 0.9834 * z;

  return { l: l, m: m, s: s };
}

// **Step 3: LMS to OKLCH**
function lmsToOklch(l: number, m: number, s: number): OKLCH {
  const epsilon = 0.000001;

  // Compute chroma, C
  let c = Math.sqrt(m * m + s * s);

  // Compute lightness, L
  let l_ = Math.cbrt(l); // Cube root

  // Compute hue, H
  let h_ = Math.atan2(s, m);
  let h = h_ < 0 ? h_ + 2 * Math.PI : h_; // Wrap hue angle to [0, 2*PI]

  return { l: l_, c: c, h: h };
}

export function colorToOKLCH(color: RGB, opacity: number = 1): string {
  // let oklch = converter('oklch');

  // let oklch = useMode(modeOklch);
  // let oklchColor = oklch(`rgb(${color.r}, ${color.g}, ${color.b})`);

  const xyz = rgbToXyz(color.r, color.g, color.b);
  const lms = xyzToLms(xyz.x, xyz.y, xyz.z);
  const lch = lmsToOklch(lms.l, lms.m, lms.s);

  if (lch) {
    let cl = formatNumber(lch.l * 100);
    let cc = formatNumber(lch.c * 100);
    let chue = '0';

    if (lch.h !== undefined && !Number.isNaN(lch.h)) {
      chue = formatNumber(lch.h);
    }

    if (opacity === undefined || opacity === 1) {
      return `oklch(${cl}%, ${cc}, ${chue})`;
    } else {
      return `oklch(${cl}%, ${cc}, ${chue} / ${opacity * 100}%)`;
    }
  } else {
    return 'oklch(0%, 0, 0)';
  }
}
