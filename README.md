# whoobe-one-studio

WhoobeOne Studio is a component visual builder for TailwindCSS (required 2.0 min). 

## Features

- full in browser app, desktop app ready
- create and design components based on TailwindCSS with no code
- add/edit any TailwindCSS utility adding/updating css/style of any element created
- realtime preview (laptop, tablet and smartphone)
- copy&paste component blocks
- duplicate component blocks
- AlpineJS directives support integrated in the component designer
- GSAP animation support
- export/import components as JSON files
- save in browser DB (IndexedDB)
- create your own library DB (IndexedDB)
- ready to use templates library
- one click preset components templates tool
- export single page/component for build tool whoobe-one-vite

## Editor tools

<img src="https://res.cloudinary.com/moodgiver/image/upload/v1634145505/whoobe-one-editor-01_f4bnjw.jpg" width="600" style="margin:auto;"/>

### Editor Dashboard

Clicking on any element created you have access to a floating bar set in the up left corner of the element. Controls available are :

- move element one position up
- add element to the current one (apply only to containers like grid and flexbox)
- edit element content
- set font family and font size
- font color (hover included)
- background color (over included)
- image (requires an image url); if the current element is not an image the source will used as background
- link to add a link to the element
- import elements or block of elements
- export current element
- remove element ( Alt + D)

### Sidebar
- **Elements**: add HTML elements to your dashboard/editor like
    - Grid : comes with a helper to set a grid layout (cols and colspans)
    - Flexbox
    - Text Elements: Heading, Paragraph, Inline text, Span, Quote, Code
    - Media: Image, Slider, Video, Youtube Video, Vimeo Video, Material Icon, Iconify icon, Download
    - Form: Input text, Input Email, Input number, Input hidden, Checkbox, Textarea, Submit, Reset and Button
    - Grouped: these are preset templates that you can add to the editor with just a click. Presets are defined in ./src/scripts/templates


- **Customize**: access to TailwindCSS utilities with simple controls
    - Box Align/Justify
    - Position
    - Dimension
    - Typography
    - Background
    - Gradient
    - Padding
    - Margin
    - Border
    - Rounded / Shadow / more
    - CSS Animation
    - Transition
    - Transform
    - Spacing



- **CSS / Style**: access to CSS and style of any element created and assign specific semantic


- **Wizard** : one click presets to add to the editor


- **Library**: access to the templates Library


- **Animation**: 15 GSAP animations ready to use. Requires building of the component with whoobe-one-vite


- **AlpineJS** : directives controls you can assign to any element


- **Tree** : document/element DOM tree



### Topbar

After the template name and category

- template settings
- preview

### Toolbar (bottom)

- Template settings
- Save template
- Save as (create a copy)
- Import template (overwrite the current template). Requires a valid whoobe JSON template format
- Export template to JSON format
- Delete template (remove template from the library)

## Demo

[Demo](https://whoobe-one-studio.vercel.app/)


## Getting Started

- Clone repository

- Create .env file and add the following

```
VUE_APP_FONT_FAMILIES=Alfa+Slab+One|Asap+Condensed|Abel|Alice|Alegreya|Amethysta|Archivo+Black|Barlow|Barlow+Condensed|Bungee+Inline|Expletus+Sans|Lora|Montserrat|Nunito+Sans|Oi|Open+Sans|PT+Sans|Roboto|Roboto+Condensed|Quattrocento|Raleway|Ultra|Yatra+One
```

- Dev command

```
npm run serve
```

- Build

```
npm run build
```
## Requirements

In order to build a full static web page you need to install the repo: 

whoobe-one-vite

## Vite Build Static Page

Using the Build option from the preview of any page, save the file in the src folder of whoobe-one-vite installation. The static page will be available in the dist folder of whoobe-one-vite 

## Info

This repo is still in alpha version and under development. Please follow all changes

