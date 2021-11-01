<template>
    <div class="absolute inset-0 mt-20 pb-24 min-h-screen flex flex-row flex-wrap px-6 items-center justify-center cursor-pointer overflow-y-auto max-h-screen z-highest transition-all duration-500">
        <template v-for="(page,index) in pages">
            <div :key="$randomID()" class="relative shadow mx-6 my-4 rounded border-t-8 border-gray-500" :title="page.name" >
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
        
    </div>
</template>

<script>
import { dialogBus } from '@/main'
export default {
    name: 'ComponentsGallery',
    data:()=>({
        preview: null,
        currentImage: null,
    }),
    props: ['dbmode'],
    computed:{
        pages(){
            return this.$attrs.pages
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
        },
        previewPage ( page ){
            this.$store.dispatch ( 'setPage' , page )
            this.$store.dispatch ( 'document' , page.json.blocks )
            window.localStorage.setItem ( 'whoobe-preview' , JSON.stringify ( page ))
            this.$dialogBus('pagePreview','fullscreen')
        },
    },
}
</script>