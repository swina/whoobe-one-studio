# whoobe-one-studio

WhoobeOne Studio is a component visual builder for TailwindCSS (required 2.0 min).

You can create simple or strtuctured components or even complete pages without coding but using the blocks criteria. Elements can be nested as per your design requirement.

## Serverless App

WhoobeOne Studio doesn't require any server or database, as long as you can use without install it but just using the online version that is full working and that you can install on your desktop.
All data are in browser and refer to the url (http://localhost:8080) by default, thus means that if you clear all browser data or you switch to another browser, or you change the port when you open WhoobeStudio it will ask you to install the Library as it would be a first run.

### Important ###
**Always export the templates database if you want to have portability of your data. Deleting browser data will erase WhoobeOne Studio data**



## Features

- full in browser app, desktop app ready
- no server or database required
- create and design components based on TailwindCSS with no code
- add/edit any TailwindCSS utility adding/updating css/style of any element created
- realtime preview (laptop, tablet and smartphone)
- copy&paste component blocks
- duplicate component blocks
- add custom JS
- AlpineJS directives support
- GSAP animation support
- export/import components as JSON files
- save in browser DB (IndexedDB). Remember to backup your DB.
- create your own library DB (IndexedDB)
- ready to use templates library
- one click preset components templates tool
- export single page/component to whoobe-one-vite in order to deploy a full static purged page/component

## Editor tools

<img src="https://res.cloudinary.com/moodgiver/image/upload/v1634145505/whoobe-one-editor-01_f4bnjw.jpg" width="600" style="margin:auto;"/>

### Editor Dashboard

Clicking on any element created you have access to a floating bar set in the up left corner of the element. Controls available are :

- move element one position up
- add element to the current one (apply only to containers like grid and flexbox)
- switch flex box from row to column direction (apply only to flexbox)
- edit element content
- set icon (apply only to Iconify elements)
- set font family and font size
- font color (hover included)
- background color (over included)
- image (requires an image url); if the current element is not an image the source will used as background
- link to add a link/anchor to the element
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
    - Snippets: preset templates that you can add to the editor with just a click. Presets are defined in **./src/scripts/templates** using the Blocks and Elements classes


- **Customize**: access to TailwindCSS utilities with simple controls
    - Box Align/Justify
    - Position
    - Dimension
    - Typography
    - Background
    - Gradient with random generator
    - Padding
    - Margin
    - Border
    - Rounded / Shadow / more
    - CSS Animation
    - Transition
    - Transform (clipping are still unstable)
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

## Purge CSS

In order to build a full static web page/component with purged CSS you need to install the repo: 

[whoobe-one-vite](https:/github.com/swina/whoobe-one-vite)


### Vite Build Static Page

Using the Build option from the editor preview of any page, save the file as **whoobe.js** in the **./src** folder of whoobe-one-vite installation. 
The static page will be deployed in the **./dist** folder.

#### Dev preview

```
npm run dev
```

or

```
yarn dev
```

#### Build

```
npm run build
```

or

```
yarn build
```


## Info

This repo is still in alpha version and under development. Please follow all changes

