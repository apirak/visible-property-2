import { h } from "preact";

export interface HelpList {
  label: string;
  value: string;
  api?: string;
}

export interface Help {
  title: string;
  list: HelpList[];
}

const mockupData = (): Help[] => {
  return [
    {
      title: "Fill Property",
      list: [
        { label: "fill", value: "#123456 78%" },
        { label: "fillRGB", value: "rgba(123, 456, 789, 0.45)" },
        { label: "fillHSL", value: "hsla(123, 45%, 78%, 0.9)" },
        { label: "fillHSB", value: "hsba(123, 45%, 78%, 0.9)" },
        { label: "fillStyle", value: "DarkBlue" },
        { label: "fillStyleDescription", value: "Description" },
        { label: "fillOpacity", value: "60%" },
      ],
    },
    {
      title: "Stroke Property",
      list: [
        { label: "stroke", value: "#123456 78%" },
        { label: "strokeRGB", value: "rgba(123, 456, 789, 0.45)" },
        { label: "strokeHSL", value: "hsla(123, 45%, 78%, 0.9)" },
        { label: "strokeHSB", value: "hsba(123, 45%, 78%, 0.9)" },
        { label: "strokeStyle", value: "DarkBlue" },
        { label: "strokeStyleDescription", value: "Description" },
        { label: "strokeOpacity", value: "60%" },
      ],
    },
    {
      title: "Text Property",
      list: [
        { label: "font", value: "Roboto" },
        { label: "fontWeight", value: "Bold" },
        { label: "fontSize", value: "12" },
        { label: "paragraphIndent", value: "12" },
        { label: "paragraphSpace", value: "12" },
        { label: "letterSpace", value: "12 or 12%" },
        { label: "lineHeight", value: "12 or 12%" },
        { label: "textStyle", value: "Body" },
        { label: "textStyleDescription", value: "Description" },
      ],
    },
    {
      title: "Size Property",
      list: [
        { label: "height", value: "32" },
        { label: "width", value: "64" },
      ],
    },
    {
      title: "Reference to Parent Layer",
      list: [
        { label: "##Parent.name", value: "Parent name" },
        { label: "##TopParent.name", value: "TopParent name" },
        { label: "name", value: "Layer name" },
      ],
    },
  ];
};

export { mockupData };
