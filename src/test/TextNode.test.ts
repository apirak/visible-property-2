import { ReferenceNode } from "../module/referenceNode";
import { createFigma } from "figma-api-stub";

describe("Rectangle Reference", () => {
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

  const letterSpace: LetterSpacing = {
    value: 10,
    unit: "PERCENT",
  };

  const letterSpacePixel: LetterSpacing = {
    value: 10,
    unit: "PIXELS",
  };

  const lineHeight: LineHeight = {
    value: 150,
    unit: "PIXELS",
  };

  const lineHeightAuto: LineHeight = {
    unit: "AUTO",
  };

  const textStyle = figma.createTextStyle();
  textStyle.type = "TEXT";
  textStyle.fontSize = 16;
  // textStyle.textDecoration: TextDecoratio
  textStyle.fontName = { family: "Roboto", style: "Regular" };
  textStyle.letterSpacing = letterSpace;
  textStyle.lineHeight = lineHeight;
  textStyle.paragraphIndent = 8;
  textStyle.paragraphSpacing = 12;
  // textStyle.textCase = TextCas

  const text1 = figma.createText();
  text1.fills = fills1;
  text1.name = "#typo";
  // text1.textStyleId = textStyle.id;
  text1.lineHeight = lineHeight;
  text1.letterSpacing = letterSpace;
  text1.resize(200, 100);
  page.appendChild(text1);
  const ref = new ReferenceNode(<SceneNode>text1, "0:0");

  const text2 = figma.createText();
  text2.fills = fills1;
  text2.name = "#typo2";
  text2.lineHeight = lineHeightAuto;
  text2.letterSpacing = letterSpacePixel;
  text2.resize(200, 100);
  page.appendChild(text2);
  const ref2 = new ReferenceNode(<SceneNode>text2, "0:0");

  it("create referenceNode", () => {
    expect(ref.getValue("name")).toBe("#typo");
  });

  it("get HEX", () => {
    expect(ref.getValue("fill")).toBe("#f2994a");
    expect(ref.getValue("stroke")).toBe("No stroke");
  });

  it("get RGB", () => {
    expect(ref.getValue("fillRGB")).toBe("rgba(242, 153, 74, 1)");
    expect(ref.getValue("strokeRGB")).toBe("No stroke");
  });

  it("get HSL", () => {
    expect(ref.getValue("fillHSL")).toBe("hsla(28, 87%, 62%, 1)");
    expect(ref.getValue("strokeHSL")).toBe("No stroke");
  });

  it("get HSB", () => {
    expect(ref.getValue("fillHSB")).toBe("hsba(28, 69%, 95%, 1)");
    expect(ref.getValue("strokeHSB")).toBe("No stroke");
  });

  it("get Dimention", () => {
    expect(ref.getValue("Height")).toBe("100");
    expect(ref.getValue("Width")).toBe("200");
  });

  it("get size", () => {
    expect(ref.getValue("lineHeight")).toBe("150");
    expect(ref.getValue("letterSpace")).toBe("10%");
  });

  it("get size auto", () => {
    expect(ref2.getValue("lineHeight")).toBe("auto");
  });

  it("get letter space in pixel", () => {
    expect(ref2.getValue("letterSpace")).toBe("10");
  });
});
