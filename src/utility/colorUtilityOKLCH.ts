import Color from 'colorjs.io';

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

  if (opacity == 1 || opacity == undefined) {
    return `oklch(${cl}%, ${cc}, ${chue})`;
  } else {
    return `oklch(${cl}%, ${cc}, ${chue} / ${opacity * 100}%)`;
  }
}
