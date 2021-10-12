"use strict";
import Element from './ElementsClass'

const templates = {
    'Empty'        : 'empty',
    'Classic Page' : 'classicPage',
    'Blog Homepage': 'blog',
    'Call To Action' : 'cta',
    'Feature'       : 'feature'
}
export default class Template {
    constructor(){
        this.blocks = []
        this.templates = templates
    }


    Build(name){
        return  name === 'empty'        ? this.empty() :
                name === 'classicPage'  ? this.classicPage() : 
                name === 'blog'         ? this.blog() : 
                name === 'cta'          ? this.cta() : 
                name === 'feature'      ? this.feature() : null
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

    cta(){
        let container = new Element().Grid().Cols(12).setCss('h-1/3 w-full')
        let flexbox = new Element().Flexbox({direction:'col',colspan:12}).setCss('w-full items-center justify-center')
        let title = new Element().Heading(2).setContent('Call To Action')
        let payoff = new Element().Heading(4).setContent('Some CTA description')
        let button = new Element().Button()
        container.blocks.push ( flexbox )
        flexbox.blocks.push ( title )
        flexbox.blocks.push ( payoff )
        flexbox.blocks.push ( button )
        this.blocks.push ( container )
        return this
    }

    feature(){
        let container = new Element().Flexbox({direction:'col'}).setCss ( 'justify-center items-center shadow px-6 py-4')
        let icon = new Element().Icon().setContent('home')
        let title = new Element().Heading(4).setContent('Feature')
        let description = new Element().InlineText().setContent('Lore ipsum lore ipsum lore ipsum')
        container.blocks.push ( icon )
        container.blocks.push ( title )
        container.blocks.push ( description )
        this.blocks.push ( container )
        return this
    }
}
