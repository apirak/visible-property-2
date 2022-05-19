import { ReferenceNode } from "../referenceNode";
import { createFigma } from "figma-api-stub";

describe("Rectangle Reference", () => {
  // @ts-ignore
  global.figma = createFigma({
    simulateErrors: true
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
      visible: true
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
      visible: true
    },
  ];

  const rect1 = figma.createRectangle();
  rect1.fills = fills1;
  rect1.strokes = stroke1;
  rect1.name = "#color";
  page.appendChild(rect1);

  it('create referenceNode', () => {
    const ref = new ReferenceNode(<SceneNode>rect1, "0:0")
    expect(ref.getValue("name")).toBe("#color");
  });

  it('get HEX', () => {
    const ref = new ReferenceNode(<SceneNode>rect1, "0:0")
    expect(ref.getValue("fill")).toBe("#f2994a");
    expect(ref.getValue("stroke")).toBe("#f2c94c");
  });

  it('get RGB', () => {
    const ref = new ReferenceNode(<SceneNode>rect1, "0:0");
    expect(ref.getValue("fillRGB")).toBe("rgba(242, 153, 74, 1)");
    expect(ref.getValue("strokeRGB")).toBe("rgba(242, 201, 76, 1)");
  });

  it('get HSL', () => {
    const ref = new ReferenceNode(<SceneNode>rect1, "0:0");
    expect(ref.getValue("fillHSL")).toBe("hsla(28, 87%, 62%, 1)");
    expect(ref.getValue("strokeHSL")).toBe("hsla(45, 86%, 62%, 1)");
  });

  it('get HSB', () => {
    const ref = new ReferenceNode(<SceneNode>rect1, "0:0");
    expect(ref.getValue("fillHSB")).toBe("hsba(28, 69%, 95%, 1)");
    expect(ref.getValue("strokeHSB")).toBe("hsba(45, 69%, 95%, 1)");
  });
});
