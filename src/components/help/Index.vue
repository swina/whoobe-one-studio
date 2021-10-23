<template>
    
    <div class="grid grid-cols-12 absolute h-screen top-0 left-0 mt-10 w-screen bg-white overflow-y-auto">
        <m-icon :icon="sidebar?'chevron_left':'menu'" class="absolute left-0 top-0 text-3xl" @click="sidebar=!sidebar"/>
        <div class="flex flex-col col-span-3 p-4 pt-10 text-lg cursor-pointer" v-if="sidebar">
            <template v-for="page in pages">
                <div class="w-full p-1 hover:bg-gray-200" @click="context=page.md">{{ page.title }}</div>
            </template>
        </div>
        <div class="flex flex-col p-8" :class="sidebar?'col-span-9':'col-span-12'">
            <vue-markdown :source="helpPage" class="text-base" v-if="helpPage"/>
        </div>
    </div>
</template>

<script>
//import md from '@/assets/help/README.md'
import VueMarkdown from 'vue-markdown-render'
import marked from 'marked'
export default {
    name: 'Help',
    components: { VueMarkdown},
    data:()=>({
        context: 'README',
        helpPage : null,
        sidebar: true,
        pages: [
            { title: 'Main' , md: 'README' },
            { title: 'Editor' , md: 'Editor' }
        ]
    }),
    watch:{
        context(value){
            if ( value ) this.loadMarkdown()
        }
    },
    methods:{
        loadMarkdown ( ){
            fetch ( 'help/' + this.context + '.md' ).then ( res => res.text() ).then ( mdcontent => this.helpPage = mdcontent )    
        },
    },
    mounted(){
        this.$attrs.options.context ? 
            this.context = this.$attrs.options.context : null
        fetch ( 'help/' + this.context + '.md' ).then ( res => res.text() ).then ( mdcontent => this.helpPage = mdcontent )
        
    }
}
</script>