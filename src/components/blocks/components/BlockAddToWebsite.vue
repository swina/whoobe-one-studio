<template>
    <div class="flex flex-col" v-if="editor && project">
        <h6>Site: {{ project.name }}</h6>
        <div class="flex flex-row">
            <div class="w-1/4 border-r">
                <h6>Page: {{ editor.page.name }}</h6>
                <div class="flex flex-col">
                    
                    
                 
                    <label>Slug</label>
                    <input type="text" v-model="slug" @keydown="slugify"/>
                    <label>Title</label>
                    <input type="text" v-model="editor.page.name"/>
                    <label>Description</label>
                    <input type="text" v-model="editor.page.description"/>
                    <label>Export as</label>
                    <select class="w-full" v-model="type" title="Export as header, page or footer">
                        <option v-for="semantic in semantics" :value="semantic">{{ semantic }}</option>
                    </select>
                    <div class="p-2 bg-gray-200" v-if="found">
                        This page is already part of the website project. 
                    </div>
                    <button class="m-auto btn mt-4 rounded lg bg-blue-400" @click="save">{{ found ? 'Update' : 'Save' }}</button>
                </div>
            </div>
            <div class="w-3/4 pl-2 flex flex-col">
                <div class="bg-purple-500 text-white p-1 w-full">Pages/components</div>
                <div class="mt-1 flex flex-row flex-grow ">
                <div v-if="project.header" class="flex flex-col" :title="project.header.title">
                    
                    <img :src="project.header.preview" class="w-40 h-40 object-contain"/>
                    <div class="chip bg-purple-400 flex flex-row items-center"><m-icon icon="menu"/>Header</div>
                    <div class="truncate">{{ project.header.title.substring(0,20) }}</div>
                </div>
                <template v-for="page in Object.keys( project.pages )">
                    <div class="flex flex-col relative" :title="project.pages[page].title">
                        <img :src="project.pages[page].preview" class="w-40 h-40 object-cover"/>
                        <div class="chip bg-blue-400 items-center flex flex-row" :title="'slug : ' + page"><m-icon icon="article"/>{{ page }}</div>
                        {{ project.pages[page].title }}
                        <div class="absolute top-0 right-0 flex flex-row items-center bg-white p-1 w-6 h-6" title="Remove" @click="removePage(page)">
                            <m-icon icon="delete"/>
                        </div>
                    </div>
                </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import jp from 'jsonpath'

export default {
    name: 'AddToWebsite',
    data:()=>({
        project: null,
        slug: null,
        title: null,
        description: null,
        type: 'page'
    }),
    computed:{
        ...mapState ( ['editor'] ),
        found(){
            console.log ( Object.keys ( this.editor.project.pages ).length )
            if ( !Object.keys ( this.editor.project.pages ).length ){
                this.slug = this.$slugify ( this.editor.page.name )
                return false
            }
            let isPage = Object.keys ( this.editor.project.pages ).filter ( p => p.blocks_id === this.editor.page.blocks_id )
            return isPage
        },
        semantics(){
            return [ 'header' , 'page' , 'footer' ]
            //return [ ...new Set ( jp.query ( this.editor.page.json , '$..blocks..semantic' ) ) ]
        },
        
    },
    methods:{
        slugify(evt){
            this.slug = this.$slugify ( this.slug )
        },
        save(){
            let exportPage = this.$exportPage ( this.$attrs.options.html )
            exportPage.slug = this.slug
            exportPage.id = this.editor.current.blocks_id
            this.type === 'page' ?
                this.project.pages[this.slug] = exportPage :
                    this.project[this.type] = exportPage
            this.$store.dispatch ( 'project' , this.project )
            window.localStorage.setItem ( 'whoobe-project' , JSON.stringify( this.project ) )
        },
        removePage(page){
            console.log ( page )
            delete this.project.pages[page]
            
            this.$store.dispatch ( 'project' , this.project )
            window.localStorage.setItem ( 'whoobe-project' , JSON.stringify( this.project ) )
        }
    },
    mounted(){
        let project = window.localStorage.getItem ( 'whoobe-project' )
        if ( project ){
            this.$store.dispatch ( 'project' , JSON.parse ( project ) )
            this.project = JSON.parse ( project )
        }
        this.slug = this.$slugify ( this.editor.page.name )
    }
}
</script>
