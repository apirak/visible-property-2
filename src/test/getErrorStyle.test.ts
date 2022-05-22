import { ReferenceNode } from "../module/referenceNode";
import { createFigma } from "figma-api-stub";

describe("Empty Style", () => {
  // @ts-ignore
  global.figma = createFigma({
    simulateErrors: true,
  });

  const page = figma.createPage();
  figma.root.appendChild(page);

  const fills1: ReadonlyArray<Paint> = [
    {
      type: "SOLID",
      color: {
        r: 0.9490196108818054,
        g: 0.6000000238418579,
        b: 0.29019609093666077,
      },
      opacity: 1,
      visible: true,
    },
  ];

  const stroke1: ReadonlyArray<Paint> = [
    {
      type: "SOLID",
      color: {
        r: 0.9490196108818054,
        g: 0.7882353067398071,
        b: 0.2980392277240753,
      },
      opacity: 1,
      visible: true,
    },
  ];

  const rect1 = figma.createRectangle();
  rect1.name = "#color";
  rect1.resize(100, 200);
  page.appendChild(rect1);
  const ref = new ReferenceNode(<SceneNode>rect1, "0:0");

  const text1 = figma.createText();
  text1.name = "#text";
  page.appendChild(text1);
  const ref_text = new ReferenceNode(<SceneNode>text1, "0:0");

  it("get style name", () => {
    expect(ref.getStyle("fill")).toBe("No fill style");
    expect(ref.getStyle("stroke")).toBe("No stroke style");
    expect(ref_text.getStyle("fill")).toBe("No fill style");
    expect(ref_text.getStyle("stroke")).toBe("No stroke style");
  });

  it("get style HEX", () => {
    expect(ref.getHex("fill")).toBe("No fill");
    expect(ref.getHex("stroke")).toBe("No stroke");
  });

  it("get style RGB", () => {
    expect(ref.getRGB("fill")).toBe("No fill");
    expect(ref.getRGB("stroke")).toBe("No stroke");
  });

  it("get style HSL", () => {
    expect(ref.getHSL("fill")).toBe("No fill");
    expect(ref.getHSL("stroke")).toBe("No stroke");
  });

  it("get style HSB", () => {
    expect(ref.getHSB("fill")).toBe("No fill");
    expect(ref.getHSB("stroke")).toBe("No stroke");
    expect(ref_text.getHSB("fill")).toBe("No fill");
    expect(ref_text.getHSB("stroke")).toBe("No stroke");
  });

  it("get style Description", () => {
    expect(ref.getStyleDescription("fill")).toBe("No fill style");
    expect(ref.getStyleDescription("stroke")).toBe("No stroke style");
  });
});
