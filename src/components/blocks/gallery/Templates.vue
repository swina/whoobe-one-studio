<template>
    <div class="pages-gallery bg-white w-screen overflow-hidden max-h-screen h-screen mt-0 inset-0" :key="galleryID">
        <div class="py-1 mt-8 bg-white shadow w-screen z-modal hidden md:flex md:flex-row items-center">
            
            <div class="flex items-center">
                <i-icon icon="la:elementor" class="bg-purple-500 text-white icon-button border cursor-pointer text-2xl" @click="getPages()" title="Library"/>
                <m-icon icon="download" css="border icon-button cursor-pointer text-2xl" @click="importDB()" title="Import templates DB"/>
                <m-icon icon="health_and_safety" css="border icon-button cursor-pointer text-2xl" @click="$saveDB()" title="Backup templates"/>
                <div class="border-r h-10 w-1"></div>
            </div>
            
            <button class="btn btn-blue border-0 rounded" @click="$dialogBus('startEmpty')" title="Create a new template">New Template</button>
            <div class="border-r h-10 w-1"></div>

            <div class="absolute right-0 mr-12 flex items-center">
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
        <ComponentsGallery v-if="pages" :dbmode="true" :pages="pages" :skip="skip" :limit="limit" @skip="skipPage"/>
        <m-icon icon="chevron_left" class="z-modal fixed mt-8 top-1/2 left-0 text-6xl"  @click="skip>0?skip=skip-limit:null"/>
        <m-icon icon="chevron_right" class="z-modal fixed mt-8 top-1/2 right-0 text-6xl" @click="(skip+limit) < total ? skip=skip+limit : null"/>
    </div>
</template>

<script>
export default {
    name: 'TemplatesGallery',
    components:{
        'ComponentsGallery' : () => import ( './ComponentsGallery.vue')
    },
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
        galleryID: null
    }),
    computed:{
        categories(){
            return this.$store.state.editor.settings.categories.sort()
        },
    },
    watch:{
        category(c){
                this.$store.dispatch ( 'galleryFilter' , c )
                this.skip = 0
                this.$getPages(this.category.toLowerCase(),this.limit,this.skip).then ( pages => { this.pages = pages })
        },
        skip(value){
            this.$getPages(this.category.toLowerCase(),this.limit,this.skip).then ( pages => { this.pages = pages })
        },
    },
    methods:{
        skipPage(skip){
            console.log ( skip )
            this.skip = skip
        },
        getImageInfo (image){
            let img = this.$imageInfo ( image )
            let ratio = img.naturalWidth / img.naturalHeight
            return ratio < 1 ?
                'object-cover object-top h-60' : ratio > 2 ? 'h-20 object-contain' : 'h-80 object-contain'
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
                this.kit = false
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
        if ( this.$store.state.desktop.galleryFilter ){
            this.category = this.$store.state.desktop.galleryFilter
        }
        this.$getPages(this.category,this.limit,this.skip).then ( pages => { this.pages = pages })
        this.galleryID = this.$randomID()
    }
}
</script>