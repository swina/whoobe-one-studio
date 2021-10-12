<template>
    <div v-if="templates">
        <template v-for="template in Object.keys(templates)">
            <div class="p-2 bg-gray-200 hover:bg-indigo-500 hover:text-white cursor-pointer border-b" @click="library(templates[template])">{{template}}</div>
        </template>
    </div>
</template>

<script>
import Element from '@/scripts/ElementsClass'
import Template from '@/scripts/templates'

export default {
    name: 'BlockLibrary',
    data:()=>({
        template: null
    }),
    computed:{
        templates(){
            return new Template().templates
        }
    },
    methods:{
        library(name){
            this.template =  new Template().Build(name)
            if ( !this.template ) return 
            this.template.blocks.forEach ( block => {
                 this.$store.state.editor.document.blocks.push ( block )
            })
            // if ( template === 'classicPage' ){
                
            //     let header = new Element().Grid().Cols(3)
            //     let body = new Element().Grid().Cols(1).setCss('h-3/4')
            //     let footer = new Element().Grid().Cols(2)
            //     header.setSemantic('Header')
            //     body.setSemantic('Main')
            //     footer.setSemantic('Footer')
            //     header.blocks.push (
            //         new Element().Flexbox({direction:'row',colspan:1})
            //     )
            //     header.blocks.push ( 
            //         new Element().Flexbox({direction:'row',colspan:2})
            //     )
            //     header.blocks[0].blocks.push ( new Element().Heading(1).setContent('Logo/Name') )

            //     body.blocks.push (
            //         new Element().Flexbox()
            //     )
            //     body.blocks[0].blocks.push ( 
            //           new Element().Paragraph().setCss('w-full')
            //     )
                
            //     footer.blocks.push ( new Element().Flexbox() )
            //     footer.blocks.push ( new Element().Flexbox() )

            //     this.$store.state.editor.document.blocks.push ( header )
            //     this.$store.state.editor.document.blocks.push ( body )
            //     this.$store.state.editor.document.blocks.push ( footer )
            // }
        }
    },
}
</script>