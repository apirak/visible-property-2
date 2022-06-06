import { ReferenceNode } from "../module/referenceNode";
import { createFigma } from "figma-api-stub";

describe("Rectangle Opacity Reference", () => {
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
      opacity: 0.4,
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
      opacity: 0.4,
      visible: true,
    },
  ];

  const rect1 = figma.createRectangle();
  rect1.fills = fills1;
  rect1.strokes = stroke1;
  rect1.name = "#color";
  rect1.resize(100, 200);
  page.appendChild(rect1);
  const ref = new ReferenceNode(<SceneNode>rect1, "0:0");

  it("create referenceNode", () => {
    expect(ref.getValue("name")).toBe("#color");
  });

  it("return No function when call wrong function", () => {
    expect(ref.getValue("abc")).toBe("No function abc");
  });

  it("get HEX", () => {
    expect(ref.getValue("fill")).toBe("#f2994a 40%");
    expect(ref.getValue("stroke")).toBe("#f2c94c 40%");
  });

  it("get RGB", () => {
    expect(ref.getValue("fillRGB")).toBe("rgba(242, 153, 74, 0.4)");
    expect(ref.getValue("strokeRGB")).toBe("rgba(242, 201, 76, 0.4)");
  });

  it("get HSL", () => {
    expect(ref.getValue("fillHSL")).toBe("hsla(28, 87%, 62%, 0.4)");
    expect(ref.getValue("strokeHSL")).toBe("hsla(45, 86%, 62%, 0.4)");
  });

  it("get HSB", () => {
    expect(ref.getValue("fillHSB")).toBe("hsba(28, 69%, 95%, 0.4)");
    expect(ref.getValue("strokeHSB")).toBe("hsba(45, 69%, 95%, 0.4)");
  });

  it("get Opacity", () => {
    expect(ref.getValue("fillOpacity")).toBe("40%");
    expect(ref.getValue("strokeOpacity")).toBe("40%");
  });
});
