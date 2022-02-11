# whoobe-one-studio

WhoobeOne Studio is a free and opensource component visual builder for TailwindCSS (required 2.0 min).

You can create simple or strtuctured components or even complete pages without coding but using the blocks criteria. Elements can be nested as per your design requirement.


## Online app 

[WhoobeOne Studio](https://whoobe-one-studio.vercel.app/)

No login or email required. Free and opensource.

Landing page created with WhoobeOne 
[WhoobeOne](https://whoobeone.vercel.app)


## New features

- Added Project manager to export a complete website for SvelteKit (using whoobe-one-sveltekit)

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
- create UI Kits to group similar components on your local file system (import/export)
- ready to use UI Kits created by Whoobe
- export/import components as JSON files
- save in browser DB (IndexedDB). Remember to backup your DB.
- create your own library DB (IndexedDB)
- ready to use templates library
- one click preset components templates tool
- export single page/component to whoobe-one-vite in order to deploy a full static purged page/component

## Dashboard

![](https://res.cloudinary.com/moodgiver/image/upload/v1635571292/whoobe-one-dashboard_hbzbjq.jpg)

From the dashboard you can start using WhoobeOne.

## Empty Editor

This option open the editor with an empty document (template). When you create an empty template WhoobeOne will ask you if you want to add a snippet. Snippets are pre-defined elements that will create automatically the block based on your choice.

## Templates 

Templates are a default database of components organized by category. They are installed at first run if you selected the Load Library option. Since the default templates library is created in the browser data (IndexedDB) if you delete your browser data, WhoobeOne will ask you to reload the library at the next run.

**Remember that only the default templates library is loaded. If you changed any template from the library and saved you need to export the library and import it if you want the default library updated with your changes. For this reason I suggest to use the UI Kits to manage your custom components.**


## UI Kit

This options gives you the possibility to create your own UI Kits, save to your local file system and use them as your libraries. You can create as many UI Kits you need and you can import them in your WhoobeOne session as well.

**Since UI Kits are based on your local file system (or even remote URL) they are not persistent. You have to import them in order to load in WhoobeOne. For this reason always save (export) your UI Kits**

### Benefits of using UI Kits

UI Kits have been developed for 2 main reasons:

- portability of components
- no dependency on database (local or remote)

WhoobeOne is like a desktop application that works locally (it can works online too) that uses JSON files to create and render web components based on TailwindCSS. Web components are intended as simple HTML, CSS and JS.

### Free UI Kits by WhoobeOne

WhoobeOne comes with some free UI Kit that you can import and use as you want. You can use them as a starting point to create your custom kits. The free UI Kits are: 

- [Landing Pages UI Kit](https://whoobe-one-studio.vercel.app/kits/Landing-Pages-UI-Kit.json)
- [Lead Components UI Kit](https://whoobe-one-studio.vercel.app/kits/Leading-UI-Kit.json)
- [CTA UI Kit](https://whoobe-one-studio.vercel.app/kits/CTA-UI-Kit.json)
- [Form UI Kit](https://whoobe-one-studio.vercel.app/kits/Form-UI-Kit.json)
- [Hero UI Kit](https://whoobe-one-studio.vercel.app/kits/Hero-UI-Kit.json)
- [Navigation UI Kit](https://whoobe-one-studio.vercel.app/kits/Navigation-UI-Kit.json)

**You can add your custom components to any UI Kit. Remember to save (export) your updated kits before to close WhoobeOne session**

## Getting Started

- Clone repository

- Create .env file and add the following

```
VUE_APP_FONT_FAMILIES=Alfa+Slab+One|Asap+Condensed|Abel|Alice|Alegreya|Amethysta|Archivo+Black|Barlow|Barlow+Condensed|Bungee+Inline|Expletus+Sans|Lora|Montserrat|Nunito+Sans|Oi|Open+Sans|PT+Sans|Roboto|Roboto+Condensed|Quattrocento|Raleway|Ultra|Yatra+One
VUE_APP_GA=YOUR_GA_ID
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

If you plan to create a full static page based on any of your component you need to build and purge the CSS. Otherwise you will have a page/component that will have very poor performance.

If you are not using any PostCSS or other system you can use the repo based on ViteJS: 

[whoobe-one-vite](https://github.com/swina/whoobe-one-vite)


### Vite Build Static Page

Using the Build option from the editor preview of any page, save the file as **whoobe.js** in the **./src** folder of whoobe-one-vite installation. 
The static page will be deployed in the **./dist** folder.

### tailwind.config.js

WhoobeOne extends some utility-first TailwindCSS with some extra classes and colors. If you plan to customize WhoobeOne, copy the **theme -> extend** section of **./tailwind.config.js** to ViteJS root folder.

### Dev preview

```
npm run dev
```

or

```
yarn dev
```

### Build

```
npm run build
```

or

```
yarn build
```


## Info

This repo is still in alpha version and under development. Please follow all changes and updates

## License

This project is licensed under the terms of the MIT license.
