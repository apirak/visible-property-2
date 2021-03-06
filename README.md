# Visible Property

![alt text](https://github.com/apirak/visible-property-2/blob/main/doc/images/github_cover_art.png?raw=true)

Visible Property 2 let you use layer's name to connect the Element's property
and the text's value that will speed-up your design system process. This plugin
will update the text follow reference's properties whenever it is modified.

# How it works:

[![Visible Property 2 tutorial](http://img.youtube.com/vi/PEC56gILBMA/0.jpg)](http://www.youtube.com/watch?v=PEC56gILBMA "Visible Property 2 Tutorial")

1. Define reference element by add "#" in front of layer name. For example
   #color
2. Defile text element you want to update (#reference + . + method) For example
   #color.fill, #color.fillRGB, #color.height etc.
3. call plugin by "cmd + /" -> "visible property 2"

# Properties:

### Fill

- fill -> #123456 78%
- fillRGB -> rgba(123, 456, 789, 1)
- fillHSL -> hsla(123, 456, 789, 0.1)
- fillHSB -> hsba(123, 456, 789, 0.1)
- fillStyle -> DarkBlue
- fillStyleDescription -> The Description

### Stroke

- stroke -> #123456
- strokeRGB -> rgba(123, 456, 789, 1)
- strokeHSL -> hsla(123, 456, 789, 0.1)
- strokeHSB -> hsba(123, 456, 789, 0.1)
- strokeStyle -> DarkBlue
- strokeStyleDescription -> The Description

### Text

- font -> Roboto
- fontWeight -> Bold
- fontSize -> 12
- paragraphIndent -> 12
- paragraphSpace -> 12
- letterSpace -> 12 or 12%
- lineHeight -> 12 or 12%
- textStyle -> Body
- textStyleDescription -> The Description

### Size

- height -> 32
- width -> 64

### Component

- description

# Build the plugin

To build the plugin:

```
$ npm run build
```

This will generate a [`manifest.json`](https://figma.com/plugin-docs/manifest/)
file and a `build/` directory containing the JavaScript bundle(s) for the
plugin.

To watch for code changes and rebuild the plugin automatically:

```
$ npm run watch
```

### Install the plugin

1. In the Figma desktop app, open a Figma document.
2. Search for and run `Import plugin from manifest…` via the Quick Actions
   search bar.
3. Select the `manifest.json` file that was generated by the `build` script.

### Debugging

Use `console.log` statements to inspect values in your code.

To open the developer console, search for and run `Open Console` via the Quick
Actions search bar.

### See also

- [Create Figma Plugin docs](https://yuanqing.github.io/create-figma-plugin/)
- [`yuanqing/figma-plugins`](https://github.com/yuanqing/figma-plugins#readme)

Official docs and code samples from Figma:

- [Plugin API docs](https://figma.com/plugin-docs/)
- [`figma/plugin-samples`](https://github.com/figma/plugin-samples#readme)
