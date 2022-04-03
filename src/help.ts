import { showUI } from '@create-figma-plugin/utilities'

export default function () {
  const options = { width: 260, height: 400 };
  const data = {
    helps: [{
      title: "Color Property",
      list:[
        {label:"fill", value:"#123456"},
        {label:"fillRGB", value:"r:123 g:456 b:789"},
        {label:"fillHSL", value:"h:123 s:456 l:789"},
        {label:"fillStyle", value:"DarkBlue"},
        {label:"stroke", value:"#123456"},
        {label:"strokeRGB", value:"r:123 g:456 b:789"},
        {label:"strokeHSL", value:"h:123 s:456 l:789"},
        {label:"strokeStyle", value:"DarkBlue"}
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
        {label:"textStyle", value:"Body"}
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


