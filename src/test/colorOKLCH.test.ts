import { colorToOKLCH } from '../utility/colorUtilityOKLCH';

describe('convert RGB to OKLCH', () => {
  it('convert red color', () => {
    const rgb: RGB = { r: 255 / 255, g: 0, b: 0 }; // Red color
    const result = colorToOKLCH(rgb, undefined);
    expect(result).toBe('oklch(62.80%, 0.26, 29.23)');
  });

  it('convert black color', () => {
    const rgb = { r: 0, g: 0, b: 0 };
    const result = colorToOKLCH(rgb, undefined);
    expect(result).toBe('oklch(0%, 0, 0)');
  });

  it('convert black with opacity 50%', () => {
    const rgb = { r: 0, g: 0, b: 0 };
    const result = colorToOKLCH(rgb, 0.5);
    expect(result).toBe('oklch(0%, 0, 0 / 50%)');
  });

  it('convert rgba(0, 100, 170, 0.75)', () => {
    const rgb = { r: 0, g: 100 / 255, b: 170 / 255 }; // Specific color
    const opacity = 0.75;
    const result = colorToOKLCH(rgb, opacity);
    expect(result).toBe('oklch(49.32%, 0.14, 248.92 / 75%)');
  });

  it('convert rgba(100, 110, 160, 0.25)', () => {
    const rgb = { r: 100 / 255, g: 110 / 255, b: 160 / 255 }; // Specific color
    const opacity = 0.25;
    const result = colorToOKLCH(rgb, opacity);
    expect(result).toBe('oklch(55.06%, 0.08, 274.85 / 25%)');
  });

  it('convert rgba(190, 150, 140, 1)', () => {
    const rgb = { r: 194 / 255, g: 150 / 255, b: 71 / 255 }; // Specific color
    const opacity = 1;
    const result = colorToOKLCH(rgb, opacity);
    expect(result).toBe('oklch(69.91%, 0.11, 79.88)');
  });
});
