# Elements

Elements you can add to any components are grouped by type as follow:

- **Containers** 
- **Text**
- **Media**
- **Form**
- **Snippets**

## Containers

### Grid

<ICON:grid_on>

Select the grid pseudo element WhoobeOne has a basic grid builder helper. Just select the number of columns and the layout you desire and the app will create a container with all elements for the grids.


If you have selected 3 columns with a layout 1 + 2 WhoobeOne will create the following HTML



```&lt;div class="flex flex-col md:grid md:grid-cols-3"&gt;<br>```
```&nbsp;&lt;div class="flex"&gt;&lt;/div&gt;<br>```
```&nbsp;&lt;div class="flex col-span-2"&gt;&lt;/div&gt:<br>```
```&lt;/div&gt;```


### Flexbox

<ICON:highlight_alt>

Add an element as follows

```&lt;div class="flex"&gt;&lt;/div&gt;```

## Text

Available elements: 

- **Heading** (H1-H6)
- **Paragraph** (p)
- **Inline Text** (div)
- **Span** (span)
- **Blockquote** (blockquote)
- **Code** (code)



## Media


Elements to create tipical media components.

- **Image**: requires an image URL. Unsplash search available. SVG supported.
- **Slider**: a custom element to create carousels of any component create with WhoobeOne
- **Video**: requires a valid video URL (all HTML video formats supported)
- **Youtube Video**: a Youtube video URL is required
- **Vimeo Video**: a Vimeo video URL is required
- **MIcon** : material icons by Google
- **Iconify** : access to almost 80000 icons with the WhoobeOne searc features
- **Download** : add a download URL for an external resource

## Form

- **Form** : creates a form element as a container of input elements. 
- **Input Text**
- **Input Email**
- **Input Number**
- **Checkbox**
- **Textarea**
- **Submit** 
- **Reset**
- **Button**: create a standar button element

## Snippets

Snippets are pre-built templates accessible with a simple click. All snippets are defined in

```./src/scripts/templates.js```


All snippets use the classes 


```./src/scripts/BlocksClass.js```


```./src/scripts/ElementsClass.js```


