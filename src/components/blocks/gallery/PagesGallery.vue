<template>
    <div v-if="pages" class="relative">
        <div class="ml-16 py-2 mb-2 w-screen flex items-center">
            <m-icon icon="add" css="icon-button cursor-pointer text-2xl border" @click="$editorBus('createPage')" 
            title="Create a new page"/>
            <m-icon icon="download" css="border icon-button cursor-pointer text-2xl" @click="importDB()" title="Import Pages"/>
            <m-icon icon="health_and_safety" css="border icon-button cursor-pointer text-2xl" @click="$saveDB()" title="Backup Pages"/>
            <!-- <button @click="$editorBus('createPage')">Create new</button> -->
            <label>Category</label> 
            <select v-model="category" class="capitalize bg-white rounded">
                <option v-for="cat in categories" :value="cat">{{ cat }}</option>
            </select>
            <label>Search</label>
            <input type="text" v-model="search" @keydown="searchPages($event)"/>

            <div class="absolute right-0 mr-12 flex items-center">
                
                {{ skip+1 }} - {{ ((limit+skip) < total ) ? (limit+skip) : total }} of {{ total }}</div>
        </div>
        <transition name="fade">
            <div class="absolute inset-0 min-h-screen my-12 pb-64 flex flex-row flex-wrap px-6 items-center justify-center cursor-pointer overflow-y-auto">
                <template v-for="(page,index) in pages">
                    <div :key="index+skip" class="relative shadow mx-6 my-4 rounded border-t-8 border-gray-500" :title="page"  @click="openPage(page),$dialogBus('closeDialog'),$router.push('editor')">
                        <div class="flex flex-col items-center justify-center w-80 h-80" :title="page.name">
                            <img v-if="page.image" :src="imagePage(page)" class="w-full" :class="getImageInfo(page.image)"/>
                            <!-- <img v-if="!page.image" src="no-image.png" class="w-20 h-20 object-center"/> -->
                            
                        </div> 
                        <div class="w-full absolute bottom-0 p-1 bg-gray-200 text-black mt-1">{{ page.name }}</div>
                        <!-- <img v-if="image.image" :src="$imageURL(image.image)" class="h-32 w-48 object-cover shadow-lg"/>
                        <div v-if="!image.image" class="flex flex-col items-center h-32 w-48 shadow-lg">{{ image.name }}</div> -->
                    </div>
                </template>
            </div>
        </transition>
        <div v-if="!filter" class="absolute left-0 top-0 w-20 h-screen flex flex-col items-start justify-center">
            <m-icon icon="chevron_left" class="text-6xl" @click="skip>0?skip=skip-limit:null"/>
        </div>
        <div v-if="!filter" class="absolute right-0 top-0 w-20 h-screen flex flex-col items-end justify-center">
            <m-icon icon="chevron_right" class="text-6xl" @click="(skip+limit) < total ? skip=skip+limit : null"/>
        </div>
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
        filter: false
    }),
    computed:{
        categories(){
            //let data =  [ ...new Set ( this.dataset.map ( a => { return a.category } ) ) ]
            //this.category = data[0]
           return ['','Lead','Landing page','Subscribe page','Header','Footer','Hero','Homepage','Shop' , 'Feature']
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
            // const img = new Image();

            // img.src = image;

            // img.onload = function() {
            //     const imgWidth = img.naturalWidth;
            //     const imgHeight = img.naturalHeight;
            //     return  
            // };
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
            if ( !this.$attrs.options.mode ){
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
            this.$store.state.desktop.tabs.push ( {
                label: page.name,
                object: page,
                type: 'editor'
            })
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
        this.category = this.categories[0]
        this.$getPages(this.category,this.limit,this.skip).then ( pages => { this.pages = pages })
        
    }
}
</script>