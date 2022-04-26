import { showUI } from '@create-figma-plugin/utilities'

export default function () {
  const options = { width: 260, height: 400 };
  const data = {
    helps: [{
      title: "Color Property",
      list:[
        {label:"fill", value:"#123456 78%"},
        {label:"fillRGB", value:"rgba(123, 456, 789, 0.45)"},
        {label:"fillHSL", value:"hsla(123, 45%, 78%, 0.9)"},
        {label:"fillHSB", value:"hsba(123, 45%, 78%, 0.9)"},
        {label:"fillStyle", value:"DarkBlue"},
        {label:"fillStyleDescription", value:"Description"},
        {label:"stroke", value:"#123456 78%"},
        {label:"strokeRGB", value:"rgba(123, 456, 789, 0.45)"},
        {label:"strokeHSL", value:"hsla(123, 45%, 78%, 0.9)"},
        {label:"strokeHSB", value:"hsba(123, 45%, 78%, 0.9)"},
        {label:"strokeStyle", value:"DarkBlue"},
        {label:"strokeStyleDescription", value:"Description"},
      ]
    },{
      title:"Text Property",
      list:[
        {label:"font", value:"Roboto"},
        {label:"fontWeight", value:"Bold"},
        {label:"fontSize", value:"12"},
        {label:"paragraphIndent", value:"12"},
        {label:"paragraphSpace", value:"12"},
        {label:"letterSpace", value:"12 or 12%"},
        {label:"lineHeight", value:"12 or 12%"},
        {label:"textStyle", value:"Body"},
        {label:"textStyleDescription", value:"Description"}
      ]
    },{
      title:"Size Property",
      list:[
        {label:"height", value:"32"},
        {label:"width", value:"64"}
      ]
    }]
  }

  showUI(options, data);
}


