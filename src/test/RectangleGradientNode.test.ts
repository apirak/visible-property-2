import { ReferenceNode } from "../module/referenceNode";
import { createFigma } from "figma-api-stub";

describe("Rectangle Reference", () => {
  // @ts-ignore
  global.figma = createFigma({
    simulateErrors: true,
  });

  const page = figma.createPage();
  figma.root.appendChild(page);

  const gradientTransform1: Transform = [
    [6.123234262925839e-17, 1, 0],
    [-1, 6.123234262925839e-17, 1],
  ];

  const gradientStop1: ReadonlyArray<ColorStop> = [
    {
      color: {
        r: 0.4791666567325592,
        g: 0.1098090410232544,
        b: 0.1636737585067749,
        a: 0.4791666269302368,
      },
      position: 0,
      boundVariables: {}
    },
    {
      color: {
        r: 0.7291666865348816,
        g: 0.5773361325263977,
        b: 0.4405381977558136,
        a: 1,
      },
      position: 0.5,
      boundVariables: {}
    },
    {
      color: {
        r: 1,
        g: 0.936211347579956,
        b: 0.7250000238418579,
        a: 1,
      },
      position: 1,
      boundVariables: {}
    },
  ];

  const fillsGradient: ReadonlyArray<GradientPaint> = [
    {
      type: "GRADIENT_LINEAR",
      gradientTransform: gradientTransform1,
      gradientStops: gradientStop1,
      opacity: 1,
      visible: true,
    },
  ];

  const strokeGradient: ReadonlyArray<Paint> = [
    {
      type: "GRADIENT_LINEAR",
      gradientTransform: gradientTransform1,
      gradientStops: gradientStop1,
      opacity: 1,
      visible: true,
    },
  ];

  const rect1 = figma.createRectangle();
  rect1.fills = fillsGradient;
  rect1.strokes = strokeGradient;
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
    expect(ref.getValue("fill")).toBe(
      "linear-gradient( 180deg,\nrgba(122, 28, 41, 0.48) 0%,\n#ba9370 50%,\n#ffefb9 100% )"
    );
    expect(ref.getValue("stroke")).toBe(
      "linear-gradient( 180deg,\nrgba(122, 28, 41, 0.48) 0%,\n#ba9370 50%,\n#ffefb9 100% )"
    );
  });

  it("get RGB", () => {
    expect(ref.getValue("fillRGB")).toBe(
      "linear-gradient( 180deg,\nrgba(122, 28, 41, 0.48) 0%,\nrgb(186, 147, 112) 50%,\nrgb(255, 239, 185) 100% )"
    );
    expect(ref.getValue("strokeRGB")).toBe(
      "linear-gradient( 180deg,\nrgba(122, 28, 41, 0.48) 0%,\nrgb(186, 147, 112) 50%,\nrgb(255, 239, 185) 100% )"
    );
  });

  it("get HSL", () => {
    expect(ref.getValue("fillHSL")).toBe(
      "linear-gradient( 180deg,\nhsla(351, 63%, 29%, 0.48) 0%,\nhsl(28, 35%, 58%) 50%,\nhsl(46, 100%, 86%) 100% )"
    );
    expect(ref.getValue("strokeHSL")).toBe(
      "linear-gradient( 180deg,\nhsla(351, 63%, 29%, 0.48) 0%,\nhsl(28, 35%, 58%) 50%,\nhsl(46, 100%, 86%) 100% )"
    );
  });

  it("get HSB", () => {
    expect(ref.getValue("fillHSB")).toBe(
      "linear-gradient( 180deg,\nhsba(351, 77%, 48%, 0.48) 0%,\nhsb(28, 40%, 73%) 50%,\nhsb(46, 27%, 100%) 100% )"
    );
    expect(ref.getValue("strokeHSB")).toBe(
      "linear-gradient( 180deg,\nhsba(351, 77%, 48%, 0.48) 0%,\nhsb(28, 40%, 73%) 50%,\nhsb(46, 27%, 100%) 100% )"
    );
  });
});
