import { showUI } from '@create-figma-plugin/utilities'

export default function () {
  const options = { width: 260, height: 400 };

  showUI(options);

  figma.on('selectionchange', () => {

    const selection = figma.currentPage.selection
    let nodeId = ""
    if (typeof selection !== "undefined" && selection.length > 0){
      nodeId = selection[0].id
    }

    let selectedProperties = () => {
      return ({
        helps: [{
          title: "Fill",
          list:[
            {label:"HEX", value:"#123456 78%"},
            {label:"RGB", value:"rgba(123, 456, 789, 0.45)"},
            {label:"HSL", value:"hsla(123, 45%, 78%, 0.9)"},
            {label:"HSB", value:"hsba(123, 45%, 78%, 0.9)"},
            {label:"Style", value:"DarkBlue"},
            {label:"Description", value:"Description adslkfajl asdfka slja sdf aslkdf asf "},
          ]
        },{
          title: "Stroke",
          list:[
            {label:"HEX", value:"#123456 78%"},
            {label:"RGB", value:"rgba(123, 456, 789, 0.45)"},
            {label:"HSL", value:"hsla(123, 45%, 78%, 0.9)"},
            {label:"HSB", value:"hsba(123, 45%, 78%, 0.9)"},
            {label:"Style", value:"DarkBlue"},
            {label:"Description", value:"Description"},
          ]
        },{
          title:"Font",
          list:[
            {label:"Font", value:"Roboto"},
            {label:"Weight", value:"Bold"},
            {label:"Size", value:"12"},
            {label:"Indent", value:"12"},
            {label:"Space", value:"12"},
            {label:"Letter Space", value:"12 or 12%"},
            {label:"Line Height", value:"12 or 12%"},
            {label:"Style", value:"Body"},
            {label:"Description", value:"Description"}
          ]
        },{
          title:"Component",
          list:[
            {label:"Height", value:"32"},
            {label:"width", value:"64"},
            {label:"name", value:"Layer name"}
          ]
        }]
      })
    }

    const selectedNode = {
      nodeId: nodeId,
      properties: selectedProperties()
    }

    figma.ui.postMessage(selectedNode);
  })
}
