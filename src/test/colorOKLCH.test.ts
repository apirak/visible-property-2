import { colorToOKLCH } from "../utility/colorUtilityOKLCH";

describe("convert RGB to OKLCH", () => {
  it("convert red color", () => {
    const rgb: RGB = { r: 255, g: 0, b: 0 }; // Red color
    const result = colorToOKLCH(rgb, undefined);
    expect(result).toBe("oklch(62.80%, 25.77, 29.23)");
  });

  it("convert black color", () => {
    const rgb = { r: 0, g: 0, b: 0 };
    const result = colorToOKLCH(rgb, undefined);
    expect(result).toBe("oklch(0%, 0, 0)");
  });

  it("convert black with opacity 50%", () => {
    const rgb = { r: 0, g: 0, b: 0 };
    const result = colorToOKLCH(rgb, 0.5);
    expect(result).toBe("oklch(0%, 0, 0 / 50%)");
  });

  it("convert rgba(1, 100, 170, 0.75)", () => {
    const rgb = { r: 0, g: 101, b: 176 }; // Specific color
    const opacity = 0.75;
    const result = colorToOKLCH(rgb, opacity);
    expect(result).toBe("oklch(49.96%, 14.23, 250.24 / 75%)");
  });

  it("convert rgba(100, 110, 160, 0.25)", () => {
    const rgb = { r: 111, g: 176, b: 125 }; // Specific color
    const opacity = 0.25;
    const result = colorToOKLCH(rgb, opacity);
    expect(result).toBe("oklch(69.96%, 10.01, 150.03 / 25%)");
  });

  it("convert rgba(190, 150, 140, 1)", () => {
    const rgb = { r: 194, g: 150, b: 71 }; // Specific color
    const opacity = 1;
    const result = colorToOKLCH(rgb, opacity);
    expect(result).toBe("oklch(69.91%, 11, 79.88)");
  });
});
