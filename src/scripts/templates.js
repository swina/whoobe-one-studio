"use strict";
import Element from './ElementsClass'

const templatesIcons = {
    'Empty'             : { icon: 'highlight_alt' , template: 'empty'},
    'Navbar'            : { icon: 'more_horiz' , template: 'navbar' },
    'Call To Action'    : { icon: 'call_to_action' , template: 'cta'},
    'Call To Action Hor': { icon: 'call_to_action' , template: 'ctaHorizontal' },
    'Info Card'         : { icon: 'feed' , template: 'infoCard' },  
    'Feature'           : { icon: 'featured_video' , template: 'feature'},
    'Pricing Box'       : { icon: 'price_change' , template : 'pricing' },
    'Hero'              : { icon: 'art_track' , template: 'hero' },
    'Slider'            : { icon: 'view_carousel' , template: 'slider' },
    'Team'              : { icon: 'account_box' , template: 'team'},
    'Simple form'       : { icon: 'call_to_action' , template: 'simpleForm' },
    'Rounded Input'     : { icon: 'input' , template: 'roundedInput'},
    'Input Icon'        : { icon: 'input' , template: 'inputIcon' },
    'Input Icon(R)'     : { icon: 'input' , template: 'inputIconR' },
    'Article'           : { icon: 'article' , template: 'article'},
    'Classic Page'      : { icon: 'web' , template: 'classicPage'},
    'Blog Homepage'     : { icon: 'web' , template: 'blog' }
}

const templates = {
    'Empty'             : 'empty',
    'Navbar'            : 'navbar',
    'Call To Action'    : 'cta',
    'Call To Action Hor': 'ctaHorizontal',
    'Info Card'         : 'infoCard',  
    'Feature'           : 'feature',
    'Team'              : 'team',
    'Slider'            : 'slider',
    'Simple form'       : 'simpleForm',
    'Rounded Input'     : 'roundedInput',
    'Input Icon'        : 'inputIcon',
    'Input Icon(R)'     : 'inputIconR',
    'Article'           : 'article',
    'Classic Page'      : 'classicPage',
    'Blog Homepage'     : 'blog'
}
export default class Template {
    constructor(){
        this.blocks = []
        this.templates = templates
        this.templatesIcon = templatesIcons
    }


    Build(name){

        
        return  name === 'empty'        ? this.empty() :
                name === 'article'      ? this.article() :
                name === 'classicPage'  ? this.classicPage() : 
                name === 'blog'         ? this.blog() : 
                name === 'navbar'       ? this.navbar() :
                name === 'infoCard'     ? this.infoCard() :
                name === 'hero'         ? this.hero() :
                name === 'slider'       ? this.slider() :
                name === 'cta'          ? this.cta() : 
                name === 'ctaHorizontal'? this.ctaHorizontal() : 
                name === 'feature'      ? this.feature() :
                name === 'pricing'      ? this.pricing() :
                name === 'team'         ? this.team() : 
                name === 'simpleForm'   ? this.simpleForm() : 
                name === 'roundedInput' ? this.roundedInput() : 
                name === 'inputIcon'    ? this.inputIcon() :
                name === 'inputIconR'    ? this.inputIconRight() :null
    }   

    empty(){
        this.blocks.push ( new Element().Flexbox({direction:'col',colspan:1}) )
        return this
    }

    blog(){
        let container = new Element().Grid().Cols(12).setCss('min-h-screen w-full')
        let sidebar = new Element().Flexbox({direction:'col',colspan:3})
        let body = new Element().Flexbox({direction:'col',colspan:9})
        container.blocks.push ( sidebar )
        container.blocks.push ( body )
        this.blocks.push ( container )
        return this
    }

    classicPage(){
        let header = new Element().Grid().Cols(3)
        let body = new Element().Grid().Cols(1).setCss('h-3/4')
        let footer = new Element().Grid().Cols(2)
        header.setSemantic('Header')
        body.setSemantic('Main')
        footer.setSemantic('Footer')
        header.blocks.push (
            new Element().Flexbox({direction:'row',colspan:1})
        )
        header.blocks.push ( 
            new Element().Flexbox({direction:'row',colspan:2})
        )
        header.blocks[0].blocks.push ( new Element().Heading(1).setContent('Logo/Name') )

        body.blocks.push (
            new Element().Flexbox()
        )
        body.blocks[0].blocks.push ( 
                new Element().Paragraph().setCss('w-full')
        )
        
        footer.blocks.push ( new Element().Flexbox() )
        footer.blocks.push ( new Element().Flexbox() )
        this.blocks.push(header)
        this.blocks.push(body)
        this.blocks.push(footer)
        return this
    }

    navbar(){
        let container = new Element().Grid().Cols(12).setCss('w-full bg-white shadow-lg')
        let logo = new Element().Flexbox({direction:'col',colspan:3}).setCss('items-center justify-center')
        let title = new Element().Heading(2).setContent('Title')
        logo.blocks.push ( title )
        let menu = new Element().Flexbox({direction:'row',colspan:9}).setCss('items-center justify-center')
        for ( var n=0 ; n < 3 ; n++ ){
            let menu_item = new Element().InlineText().setCss('border-b border-transparent hover:border-black mx-6').setContent('Item_' + (parseInt(n)+1))
            menu.blocks.push ( menu_item )
        }
        container.blocks.push ( logo )
        container.blocks.push ( menu )
        this.blocks.push ( container )
        return this
    }

    cta(){
        let container = new Element().Grid().Cols(12).setCss('w-full bg-white shadow-lg')
        let flexbox = new Element().Flexbox({direction:'col',colspan:12}).setCss('w-full items-center justify-center')
        let title = new Element().Heading(2).setContent('Call To Action')
        let payoff = new Element().Heading(4).setContent('Some CTA description')
        let button = new Element().Button().setCss ( 'px-4 py-2 bg-blue-500')
        container.blocks.push ( flexbox )
        flexbox.blocks.push ( title )
        flexbox.blocks.push ( payoff )
        flexbox.blocks.push ( button )
        this.blocks.push ( container )
        return this
    }

    ctaHorizontal(){
        let container = new Element().Grid().Cols(12).setCss('w-full bg-white shadow-lg')
        let flexboxL = new Element().Flexbox({direction:'col',colspan:8}).setCss('w-full items-center justify-center')
        let flexboxR = new Element().Flexbox({direction:'col',colspan:4}).setCss('w-full items-center justify-center')
        let title = new Element().Heading(2).setContent('Call To Action')
        let payoff = new Element().Heading(4).setContent('Some CTA description')
        let button = new Element().Button().setCss ( 'px-4 py-2 bg-blue-500')
        container.blocks.push ( flexboxL )
        container.blocks.push ( flexboxR )
        flexboxL.blocks.push ( title )
        flexboxL.blocks.push ( payoff )
        flexboxR.blocks.push ( button )
        this.blocks.push ( container )
        return this
    }

    card(){
        let container = new Element().Flexbox({direction:'col'}).setCss ( 'w-64 justify-center items-center shadow')
        let content = new Element().Flexbox({direction:'col'}).setCss ( 'w-full p-4 justify-start')
        container.blocks.push ( content )
        return container
    }

    _iconInput(iconName='mi:home',type='text',name=''){
        let container = new Element().Flexbox({direction:'row'})
        let inputField
        if ( type === 'text')
            inputField = new Element().InputText().setCss('rounded-r-lg outline-none focus:ring-1 ring-blue-400')
        if ( type === 'email' )
            inputField = new Element().InputEmail().setCss('rounded-r-lg  outline-none focus:ring-1 ring-blue-400')

        let icon = new Element().Iconify().setCss('rounded-l-lg w-10 h-10 flex justify-center items-center text-2xl text-gray-400 border border-r-0')
        icon.data.icon = iconName
        name ? inputField.data.attributes.name =  name : null
        container.blocks.push ( icon )
        container.blocks.push ( inputField )
        return container
    }

    article(){
        let container = new Element().Flexbox({direction:'col'}).setCss ( 'justify-start items-start')
        let title = new Element().Heading(1)
        let subtitle = new Element().InlineText().setCss ( 'italic text-sm' )
        let content = new Element().Paragraph().setCss ( 'my-4 px-4')
        container.blocks = [ title , subtitle , content ]
        this.blocks.push ( container )
        return this
    }

    simpleForm(){
        let container = new Element().Flexbox({direction:'col'}).setCss ( 'justify-center items-center shadow')
        container.data.attributes = {
            name: 'form',
            id: 'form-id',
            action: '',
            method:'post'
        }
        container.semantic = 'form'
        let content = new Element().Flexbox({direction:'col'}).setCss ( 'w-full p-4 justify-start')
        let btn = new Element().Button().setCss('px-4 py-2 rounded bg-blue-400 text-white hover:bg-blue-700 my-4').setContent('Send')

        content.blocks.push ( new Element().InlineText().setContent('Name') )
        let name = this._iconInput('wpf:name')
        content.blocks.push ( name )

        content.blocks.push ( new Element().InlineText().setContent('Address') )
        let address = this._iconInput('entypo:address')
        content.blocks.push ( address )

        content.blocks.push ( new Element().InlineText().setContent('Email') )
        let email = this._iconInput('mi:email','email')
        content.blocks.push ( email )

        content.blocks.push ( btn )
        container.blocks.push ( content )
        this.blocks.push ( container )
        return this
    }

    infoCard(){
        let container = new Element().Flexbox({direction:'col'}).setCss ( 'w-64 justify-center items-center shadow')
        let content = new Element().Flexbox({direction:'col'}).setCss ( 'w-full p-4 justify-start')
        let img = new Element().Image().setCss ( 'w-full h-auto object-cover' )
        img.image.url = 'https://res.cloudinary.com/moodgiver/image/upload/v1633344243/adventure_woman_rujic1.webp'
        let title = new Element().Heading(4).setContent('Info Card').setCss('border-b-2')
        let description = new Element().Paragraph()
        let btn = new Element().Button().setCss ( 'my-4 px-4 py-2 bg-blue-500').setContent('Read more')
        container.blocks.push ( img )
        content.blocks.push ( title )
        content.blocks.push ( description )
        content.blocks.push ( btn )
        container.blocks.push ( content )
        this.blocks.push ( container )
        return this
    }

    hero(){
        let grid = new Element().Grid().Cols(2).setCss('w-full p-2 md:p-20')
        let flexLeft = new Element().Flexbox({direction:'col'}).setCss('h-1/2 p-4 items-start justify-center')
        let flexRight = new Element().Flexbox({direction:'col'}).setCss('h-1/2 bg-contain bg-no-repeat bg-center')
        let title = new Element().Heading(1).setContent('I am a Hero').setCss('font-bold')
        let description = new Element().Paragraph().setCss('text-lg my-2')
        let cta = new Element().Button().setContent('Click Me').setCss('px-4 py-2 rounded bg-blue-400 text-white hover:bg-blue-700 my-4')
        flexRight.image.url = 'https://res.cloudinary.com/moodgiver/image/upload/v1617306150/Web_design_SVG_tsvcpl.svg'
        flexLeft.blocks = [ title, description , cta]
        grid.blocks = [ flexLeft , flexRight ]
        this.blocks.push ( grid )
        return this
    }

    feature(){
        let container = new Element().Flexbox({direction:'col'}).setCss ( 'w-full md:w-56 justify-center items-center shadow px-6 py-4')
        let icon = new Element().Iconify().setCss('text-3xl')
        icon.data.icon = 'mi:laptop'
        let title = new Element().Heading(4).setContent('Feature').setCss('my-8')
        let description = new Element().Paragraph().setCss ( 'text-center' )
        container.blocks.push ( icon )
        container.blocks.push ( title )
        container.blocks.push ( description )
        this.blocks.push ( container )
        return this
    }

    pricing(){
        let container = new Element().Flexbox({direction:'col'}).setCss ( 'w-full md:w-56 justify-center items-center shadow px-6 py-4')
        let price = new Element().Heading(3).setContent('<small>$</small> <b>99</b>.<small>00</small>')
        let title = new Element().Heading(4).setContent('Basic').setCss('mb-4 border-t')
        let description = new Element().Paragraph().setCss ( 'my-4' ).setContent('<ul></ul><li>Unlimited users</li><li>Unlimited Bandwidth</li><li>Free Plugins</li></ul>')
        let button = new Element().Button().setContent('Buy now').setCss('bg-blue-400 text-base text-white px-4 py-2 rounded hover:bg-blue-700')
        container.blocks.push ( price )
        container.blocks.push ( title )
        container.blocks.push ( description )
        container.blocks.push ( button )
        this.blocks.push ( container )
        return this
    }

    

    team(){
        let container = new Element().Flexbox({direction:'col'}).setCss ( 'w-56 justify-center items-center shadow px-6 py-4')
        let img = new Element().Image().setCss ( 'rounded-full h-40 w-40 object-cover' )
        img.image.url = 'https://res.cloudinary.com/moodgiver/image/upload/v1608198254/thumbnail_fashion_1_d66f5610d2.jpg'
        let title = new Element().Heading(4).setContent('Sara Doe').setCss('mt-8 border-b-2')
        let description = new Element().InlineText().setCss ( 'text-center capitalize' ).setContent ( 'CEO' )
        container.blocks.push ( img )
        container.blocks.push ( title )
        container.blocks.push ( description )
        this.blocks.push ( container )
        return this
    }

    roundedInput(){
        let container = new Element().Flexbox({direction:'row'})
        let inputField = new Element().InputText().setCss('rounded-l-lg  outline-none focus:ring-1 ring-blue-400')
        let btn = new Element().Button().setCss('rounded-r-lg bg-blue-400 px-2')
        container.blocks.push ( inputField )
        container.blocks.push ( btn )
        this.blocks.push ( container )
        return this
    }

    inputIcon(){
        let container = new Element().Flexbox({direction:'row'})
        let inputField = new Element().InputText().setCss('rounded-r-lg outline-none focus:ring-1 ring-blue-400')
        let icon = new Element().Iconify().setCss('rounded-l-lg w-10 h-10 flex justify-center items-center text-2xl text-gray-400 border border-r-0')
        icon.data.icon = 'mi:email'
        container.blocks.push ( icon )
        container.blocks.push ( inputField )
        this.blocks.push ( container )
        return this
    }

    inputIconRight(){
        let container = new Element().Flexbox({direction:'row'})
        let inputField = new Element().InputText().setCss('rounded-l-lg outline-none focus:ring-1 ring-blue-400')
        let icon = new Element().Iconify().setCss('rounded-r-lg w-10 h-10 flex justify-center items-center text-2xl text-gray-400 border border-l-0')
        icon.data.icon = 'mi:email'
        container.blocks.push ( inputField )
        container.blocks.push ( icon )
        this.blocks.push ( container )
        return this
    }

    slider(){
        let slider = new Element().Slider().setCss('h-auto')
        let grid = new Element().Grid().Cols(2).setCss('w-full p-2 md:p-20')
        let flexLeft = new Element().Flexbox({direction:'col'}).setCss('h-1/2 p-4 items-start justify-center')
        let flexRight = new Element().Flexbox({direction:'col'}).setCss('h-1/2 bg-contain bg-no-repeat bg-center')
        let title = new Element().Heading(1).setContent('I am a Hero').setCss('font-bold')
        let description = new Element().Paragraph().setCss('text-lg my-2')
        let cta = new Element().Button().setContent('Click Me').setCss('px-4 py-2 rounded bg-blue-400 text-white hover:bg-blue-700 my-4')
        flexRight.image.url = 'https://res.cloudinary.com/moodgiver/image/upload/v1617306150/Web_design_SVG_tsvcpl.svg'
        flexLeft.blocks = [ title, description , cta]
        grid.blocks = [ flexLeft , flexRight ]
        slider.blocks.push ( grid )
        this.blocks.push ( slider )
        return this
    }
}
