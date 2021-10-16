<template>
    <div v-if="pages" class="absolute inset-0 mt-10 bg-white">
        <div class="py-2 mb-2 bg-gray-200 w-screen z-modal hidden md:flex md:flex-row items-center">
            <!-- <m-icon icon="add" css="icon-button cursor-pointer text-2xl border" @click="$editorBus('createPage')" 
            title="Create a new page"/>
            <m-icon icon="download" css="border icon-button cursor-pointer text-2xl" @click="importDB()" title="Import Pages"/>
            <m-icon icon="health_and_safety" css="border icon-button cursor-pointer text-2xl" @click="$saveDB()" title="Backup Pages"/> -->
            <label>Category</label> 
            <select v-model="category" class="capitalize bg-white rounded">
                <option value="" selected>All</option>
                <option class="px-1 py-1" v-for="cat in categories" :value="cat">{{ cat }}</option>
            </select>
            <label>Search</label>
            <input type="text" v-model="search" @keydown="searchPages($event)"/>

            <!-- <div class="absolute right-0 mr-12 flex items-center">
                
                {{ skip+1 }} - {{ ((limit+skip) < total ) ? (limit+skip) : total }} of {{ total }}</div> -->
        </div>
        <transition name="fade">
            <div class="w-full h-full pb-20 flex flex-row flex-wrap p-2 px-8 items-start justify-center cursor-pointer overflow-y-auto">
                <template v-for="(page,index) in pages">
                    <div :key="index+skip" class="relative shadow mx-2 my-1 w-40 h-50 rounded border-t-8 border-gray-500" :title="page.name" @click="addBlock(page)">
                        <div class="flex flex-col items-center justify-center" :title="page.name">
                            <img v-if="page.image" :src="imagePage(page)" class="w-40 h-40 w-full object-contain"/>
                            <!-- <img v-if="!page.image" src="no-image.png" class="w-20 h-20 object-center"/> -->
                            
                        </div> 
                        <div class="w-full absolute bottom-0 p-1 bg-gray-200 text-black mt-1 truncate">{{ page.name }}</div>
                        <!-- <img v-if="image.image" :src="$imageURL(image.image)" class="h-32 w-48 object-cover shadow-lg"/>
                        <div v-if="!image.image" class="flex flex-col items-center h-32 w-48 shadow-lg">{{ image.name }}</div> -->
                        <!-- <div class="absolute inset-0 opacity-0 bg-black hover:bg-opacity-50 hover:opacity-100 flex flex-row items-center justify-around">
                            <button class="btn btn-purple rounded" @click="openPage(page),$dialogBus('closeDialog')">Edit</button>
                            <button class="btn btn-purple rounded" @click="previewPage(page)">Preview</button>
                        </div> -->
                    </div>
                </template>
            </div>
        </transition>
        <div v-if="!filter" class="absolute mt-20 left-0 top-0 w-20 h-screen flex flex-col items-start justify-center">
            <m-icon icon="chevron_left" class="-mt-20 text-6xl" @click="skip>0?skip=skip-limit:null"/>
        </div>
        <div v-if="!filter" class="absolute mt-20 right-0 top-0 w-20 h-screen flex flex-col items-end justify-center">
            <m-icon icon="chevron_right" class="-mt-20 text-6xl" @click="(skip+limit) < total ? skip=skip+limit : null"/>
        </div>
    </div>
</template>

<script>
import { dialogBus } from '@/main'
export default {
    name: 'PagesGallery',
    data:()=>({
        limit: 6,
        skip: 0,
        search: '',
        dataset: null,
        pages:null,
        total: 0,
        preview: null,
        currentImage: null,
        category: '',
        filter: false
    }),
    computed:{
        categories(){
            return this.$store.state.editor.settings.categories.sort()//JSON.parse ( window.localStorage.getItem ( 'whoobe-settings') ).categories.sort()
        }
    },
    watch:{
        category(c){
           
                this.skip = 0
                
                this.$getPages(this.category.toLowerCase(),this.limit,this.skip).then ( pages => { this.pages = pages })
            
        },
        skip(value){
            this.$getPages(this.category.toLowerCase(),this.limit,this.skip).then ( pages => { this.pages = pages })
        }
    },
    methods: {
        getImageInfo (image){
            let img = this.$imageInfo ( image )
            let ratio = img.naturalWidth / img.naturalHeight
            return ratio < 1 ?
                'object-cover object-top h-60' : ratio > 2 ? 'h-20 object-contain' : 'h-80 object-contain'
        },
        imagePage(page){
            if ( page.image ) {
                return page.image
            }
            return 'no-image.png'
        },
        addBlock(page){
            let block = page.json.blocks.blocks[0]
            console.log ( block )
            if ( !this.$store.state.editor.current ){
                this.$store.state.editor.document.blocks.push ( block )
            } else {
                this.$store.state.editor.current.blocks.push ( block )
            }
            this.$emit('close')
            //this.$dialogBus ( 'closeDialog' )
        },
        previewPage ( page ){
            window.localStorage.setItem ( 'whoobe-preview' , JSON.stringify ( page ))
            this.$dialogBus('pagePreview','fullscreen')
        },
        getPages(){
            this.$getPages(this.category,this.limit,this.skip).then ( pages => { this.pages = pages })
        },
        searchPages(e){
            if ( e.keyCode === 13 ){
                if ( this.search ){
                    this.$searchPages ( this.search ).then ( res => { 
                        this.pages = res 
                        this.total = this.pages.length
                        this.filter = true
                    })
                } else {
                    this.skip = 0 
                    this.filter = false
                    this.getPages()
                }
            }
        },
        importDB(){
            let confirm = window.confirm( 'Importing will be overwrite the current database. Continue?')
            if ( confirm ){
                dialogBus.$emit('importDatabase','common/ImportDatabase.vue')
            } else {
                return
            }
            
        }
    },
    mounted(){
        this.$dbCount().then ( res => {
            this.total = res
        })
        //this.category = this.categories[0]
        this.$getPages(this.category,this.limit,this.skip).then ( pages => { this.pages = pages })
        
    }
}
</script>