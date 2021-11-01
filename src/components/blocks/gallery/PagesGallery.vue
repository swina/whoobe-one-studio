<template>
    <div class="pages-gallery bg-white w-screen overflow-hidden max-h-screen h-screen mt-0 inset-0" :key="galleryID">
        <div class="py-1 mt-8 bg-white shadow w-screen z-modal hidden md:flex md:flex-row items-center">
            
            <div class="flex items-center" v-if="dbMode">
                <i-icon icon="mdi:widgets-outline" :class="dbMode?'bg-purple-500 hover:text-white':''" class="icon-button border cursor-pointer text-2xl" @click="getPages()" title="Library"/>
                <m-icon icon="download" css="border icon-button cursor-pointer text-2xl" @click="importDB()" title="Import templates DB"/>
                <m-icon icon="health_and_safety" css="border icon-button cursor-pointer text-2xl" @click="$saveDB()" title="Backup templates"/>
                <div class="border-r h-10 w-1"></div>
            </div>
            <div class="flex items-center pl-2" v-if="!dbMode">
                <select class="mr-2 rounded ring-1 ring-purple-500 bg-gray-200 py-2" v-model="$store.state.desktop.library" @change="setCurrentUIKit()">
                    <option v-for="uikit in $store.state.desktop.uikits" :value="uikit">{{ uikit.name }}</option>
                </select>
                <i-icon icon="bx:bx-import" class="icon-button border cursor-pointer text-2xl" @click="$dialogBus('importUIKit')" title="Upload UI Kit"/>
                <i-icon v-if="$store.state.desktop.library" icon="bx:bx-export" class="icon-button border cursor-pointer text-2xl" @click="$exportCustomLibrary()" title="Export UI Kit"/>

                <m-icon icon="add" css="icon-button cursor-pointer text-2xl border" @click="$dialogBus('createUIKit')" title="Create a new UI Kit"/>
                <div class="border-l h-10 w-1"></div>
            </div>
            <button class="btn btn-blue border-0 rounded" @click="$dialogBus('startEmpty')" title="Create a new template">New Template</button>
            <div class="border-r h-10 w-1"></div>

            <div v-if="!isUIKit" class="absolute right-0 mr-12 flex items-center">
                <label>Category</label> 
                <select v-model="category" class="capitalize bg-white rounded">
                    <option value="" selected>All</option>
                    <option class="px-1 py-1" v-for="cat in categories" :value="cat">{{ cat }}</option>
                </select>
                <label>Search</label>
                <input type="text" v-model="search" @keydown="searchPages($event)" class="mr-2"/>

                {{ skip+1 }} - {{ ((limit+skip) < total ) ? (limit+skip) : total }} of {{ total }}
            </div>
        </div>
        <transition name="fade">
            <div class="absolute inset-0 mt-20 pb-24 min-h-screen flex flex-row flex-wrap px-6 items-center justify-center cursor-pointer overflow-y-auto max-h-screen z-highest transition-all duration-500">
                <template v-for="(page,index) in pages">
                    <div :key="index+skip" class="relative shadow mx-6 my-4 rounded border-t-8 border-gray-500" :title="page.name" >
                        <div class="flex flex-col items-center justify-center w-80 h-80" :title="page.name">
                            <img v-if="page.image" :src="imagePage(page)" class="w-full" :class="getImageInfo(page.image)"/>
                            
                            
                        </div> 
                        <div class="w-full absolute bottom-0 p-1 bg-gray-200 text-black mt-1">{{ page.name }}</div>
                        <div class="absolute inset-0 opacity-0 bg-white hover:bg-opacity-50 hover:opacity-100 flex flex-row items-center justify-around">
                            
                            <button class="btn btn-purple hover:bg-purple-300 rounded border-0 w-24" @click="openPage(page),$dialogBus('closeDialog')">Edit</button>
                            <button class="btn btn-purple hover:bg-purple-300 rounded border-0 w-24" @click="previewPage(page)">Preview</button>
                        </div>
                    </div>
                </template>
                <!-- <div v-if="!filter" class="fixed mt-20 left-0 top-0 w-20 h-screen flex flex-col items-start justify-center z-modal" @click="skip>0?skip=skip-limit:null">
                    <m-icon icon="chevron_left" class="-mt-20 text-6xl"/>
                </div>
                <div v-if="!filter" class="fixed mt-20 right-0 top-0 w-20 h-screen flex flex-col items-end justify-center">
                    <m-icon icon="chevron_right" class="-mt-20 text-6xl" @click="(skip+limit) < total ? skip=skip+limit : null"/>
                </div> -->
                <m-icon icon="chevron_left" class="fixed mt-8 top-1/2 left-0 text-6xl"  @click="skip>0?skip=skip-limit:null"/>
                <m-icon icon="chevron_right" class="fixed mt-8 top-1/2 right-0 text-6xl" @click="(skip+limit) < total ? skip=skip+limit : null"/>
            </div>
        </transition>
        
    </div>
</template>

<script>
import { dialogBus } from '@/main'
export default {
    name: 'PagesGallery',
    data:()=>({
        limit: 10,
        skip: 0,
        search: '',
        dataset: null,
        pages:null,
        total: 0,
        preview: null,
        currentImage: null,
        category: '',
        filter: false,
        kit: false,
        galleryID: null
    }),
    computed:{
        categories(){
            return this.$store.state.editor.settings.categories.sort()//JSON.parse ( window.localStorage.getItem ( 'whoobe-settings') ).categories.sort()
        },
        dbMode(){
            return this.$store.state.desktop.dbmode
        }
    },
    watch:{
        category(c){
            if ( this.dbMode ){
                this.$store.dispatch ( 'galleryFilter' , c )
                this.skip = 0
                this.$getPages(this.category.toLowerCase(),this.limit,this.skip).then ( pages => { this.pages = pages })
            }
            
        },
        skip(value){
            if ( this.dbMode ){
                this.$getPages(this.category.toLowerCase(),this.limit,this.skip).then ( pages => { this.pages = pages })
            }
        },
        '$store.state.desktop.library':function(value){
            this.galleryID = this.$randomID()
            this.importUIKit()
        },
        dbMode(value){
            if ( !value ){
                this.pages = this.$store.state.desktop.library.templates
                this.filter = false
            }
        }
    },
    methods: {
        isUIKit(){
            if ( this.$store.state.desktop.library ){
                this.kit = this.$store.state.desktop.library
            }
            return this.$store.state.desktop.tabs[this.$store.state.desktop.currentTab].label === 'UI Kit' ? true : false
        },
        setCurrentUIKit(){
            this.pages = this.$store.state.editor.library.templates
        },
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
        openPage(page){
            if ( !this.$route.fullPath.includes('mode') ){
                this.$store.dispatch ( 'setPage' , page )
                this.$store.dispatch ( 'document' , page.json.blocks )
            } else {
                if ( !this.$store.state.editor.current ) {
                    this.$eventBus ( 'notification' , 'You need to select a block in order to import a new one' , 'error')
                    return
                }
                let importedBlock = page.json.blocks
                this.$store.state.editor.current.blocks.push ( importedBlock )
            }
            this.$store.dispatch( 'add_tab' , { label: page.name , object: page , type: 'editor'})
            // this.$store.state.desktop.tabs.push ( {
            //     label: page.name,
            //     object: page,
            //     type: 'editor'
            // })
            //this.$dialogBus ( 'closeDialog' )
        },
        previewPage ( page ){
            this.$store.dispatch ( 'setPage' , page )
            this.$store.dispatch ( 'document' , page.json.blocks )
            window.localStorage.setItem ( 'whoobe-preview' , JSON.stringify ( page ))
            this.$dialogBus('pagePreview','fullscreen')
        },
        getPages(){
            this.dbMode = true
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
                this.kit = false
            }
        },
        importUIKit(){
            let kit = this.$store.state.desktop.library
            this.pages = [ ...kit.templates ]
            this.total = kit.templates.length
            this.filter = false
            this.kit = this.$store.state.desktop.library
            this.dbMode = false
            
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
        if ( this.$store.state.desktop.galleryFilter ){
            this.category = this.$store.state.desktop.galleryFilter
        }
        //this.category = this.categories[0]
        

        // if ( !this.dbMode || (this.$store.state.desktop.library && this.$store.state.desktop.library.templates.length) ){
        //     this.importUIKit()
        // } else {
            this.dbMode ?
                this.$getPages(this.category,this.limit,this.skip).then ( pages => { this.pages = pages }) :
                this.$store.state.desktop.library && this.$store.state.desktop.library.templates.length ?
                    this.pages = this.$store.state.desktop.library.templates :
                        this.$dialogBus('createUIKit')

        // }
        this.galleryID = this.$randomID()
    }
}
</script>