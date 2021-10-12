"use strict";
import jp from 'jsonpath';

export default class Block {
    constructor(){
        this.id = 0
        this.blocks_id = this.randomID()
        this.name = 'Block '
        this.description = 'A generic block'
        this.category = 'component'
        this.tags = []
        this.json = {
            build: {
                purgeCSS : null,
                images: null,
                fonts: null,
                plugins:null
            },
            blocks: []
        }
        this.html = null
        this.image = ''
        this.enabled = true
        this.premium = false
        this.stars = 0
        this.favorite = false
    }

    randomID(){
        return 'component-' + Math.random().toString(36).substr(2, 5)
    }

    purge(){
        this.purgeCSS()
        this.purgeImages()
        this.fonts()
        return this
    }

    purgeCSS(){
        let css = jp.query ( this.json.blocks , '$..blocks..css.css' )
            .filter(a=>{ return a })
            .join(',')
            .split(' ')
            .filter(b=> { return b }).join(',').replaceAll(',,',',').split(',')

        let containers = jp.query ( this.json.blocks , '$..blocks..css.container' )
            .filter(c=>{ return c})
            .join(',')
            .split(' ')
            .filter(d=> { return d }).join(',').replaceAll(',,',',').split(',')
        let toPurge = [ ...css , ...containers ]
        this.json.build.purgeCSS = [ ...new Set(toPurge) ].sort()
        return this
    }

    purgeImages(){
        let data = jp.query ( this.json.blocks , '$..blocks..image.url' )
            .filter ( img => { return  img } )

        this.json.build.images = [ ...new Set(data.filter(a=>!a.includes('http'))
            .join(',')
            .split(' ')) ]
            .filter( a=> { return a })
        return this
    }

    fonts(){
        let fonts = jp.query ( this.json.blocks , '$..blocks..style' )
                .filter( s => { return s && s.includes('font-family') } )
                .map ( f => { return  f.replace('font-family:','').replaceAll('\"','').replace(/[^a-z0-9]+/gi,'') }) 
        this.json.build.fonts = [ ...new Set(fonts) ]
        return this
    }
}
