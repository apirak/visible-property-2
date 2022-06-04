import { ReferenceNode } from "../module/referenceNode";
import { createFigma } from "figma-api-stub";

describe("Rectangle has both fill and stroke", () => {
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

  const style1: PaintStyle = figma.createPaintStyle();
  style1.type = "PAINT";
  style1.name = "Fill style 1";
  style1.paints = fills1;
  style1.description = "This is style 1";

  const style2: PaintStyle = figma.createPaintStyle();
  style2.type = "PAINT";
  style2.name = "Stroke style 2";
  style2.paints = stroke1;
  style2.description = "This is style 2";

  const rect1 = figma.createRectangle();
  rect1.fillStyleId = style1.id;
  rect1.fills = style1.paints;

  rect1.strokeStyleId = style2.id;
  rect1.strokes = style2.paints;

  rect1.name = "#color";
  rect1.resize(100, 200);
  page.appendChild(rect1);
  const ref = new ReferenceNode(<SceneNode>rect1, "0:0");

  it("create style", () => {
    expect(style1.id.length).toEqual(43);
  });

  it("get style name", () => {
    expect(ref.getStyle("fill")).toBe("Fill style 1");
    expect(ref.getStyle("stroke")).toBe("Stroke style 2");
    expect(ref.getStyle("abc")).toBe("No Style");
  });

  it("get style HEX", () => {
    expect(ref.getHex("fill")).toBe("#f2994a");
    expect(ref.getHex("stroke")).toBe("#f2c94c");
  });

  it("get style HEX", () => {
    expect(ref.getStyleDescription("fill")).toBe("This is style 1");
    expect(ref.getStyleDescription("stroke")).toBe("This is style 2");
  });
});
