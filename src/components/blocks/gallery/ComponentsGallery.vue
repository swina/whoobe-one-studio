<template>
    <div class="relative">
        <div class="ml-12 py-2 w-screen">
            <button @click="$editorBus('createPage')">Create new</button>
            <label>Category</label> 
            <select v-model="category" class="capitalize bg-white rounded">
                <option v-for="cat in categories" :value="cat">{{ cat }}</option>
            </select>
        </div>
        <div class="absolute inset-0 min-h-screen my-20 pb-64 flex flex-row flex-wrap px-6 items-center justify-center cursor-pointer overflow-y-auto" v-if="category">
            <template v-for="(page,index) in pages">
                <div v-if="index < (limit+skip) && index >= skip" :key="$randomID()" class="shadow p-2 m-2" :title="page"  @click="openPage(page),$dialogBus('closeDialog'),$router.push('editor')">
                    <div class="flex flex-col">
                        <img :src="imagePage(page)" class="w-80 h-80 border object-contain object-center"/>
                        {{ page }}
                    </div>
                    <!-- <img v-if="image.image" :src="$imageURL(image.image)" class="h-32 w-48 object-cover shadow-lg"/>
                    <div v-if="!image.image" class="flex flex-col items-center h-32 w-48 shadow-lg">{{ image.name }}</div> -->
                </div>
            </template>
        </div>
        <div class="absolute left-0 top-0 w-20 h-screen flex flex-col items-center justify-center">
            <m-icon icon="chevron_left" class="text-6xl" @click="skip>0?skip=skip-limit:null"/>
        </div>
        <div class="absolute right-0 top-0 w-20 h-screen flex flex-col items-center justify-center">
            <m-icon icon="chevron_right" class="text-6xl" @click="(skip+limit)<images.data.length?skip=skip+limit:null"/>
        </div>
        <Modal v-if="preview" class="bg-white shadow w-3/4 h-auto" @close="preview=null">
            <div slot="title">{{ preview.name }}</div>
            <div slot="body" class="relative flex flex-row">
                <div class="w-3/4">
                    <img :src="$imageURL(preview)" class="w-full h-auto object-contain" style="max-height:600px"/>
                </div>
                <div class="p-2 flex flex-col">
                    <label>{{ preview.name }}</label>
                    <label>Dimension</label>
                    <label>{{ preview.width }} x {{ preview.height }} - {{ ( preview.size/1000 ).toFixed(2) }} KB</label>
                    
                    <select class="p-2" v-model="currentImage" v-if="preview.formats">
                        <!-- <option v-if="!preview.formats" :value="preview.url">{{ preview.width }}x{{preview.height}} {{preview.size/1000}}KB</option> -->
                        <option v-for="size in Object.keys(preview.formats)" :value="preview.formats[size].url">{{ preview.formats[size].width }} x {{ preview.formats[size].height }} - {{ parseInt(preview.formats[size].size/1000) }}KB</option>
                    </select>
                    <button class="lg bg-indigo-500 rounded mt-2" @click="$editorBus('selectedMedia',currentImage)">Select</button>
                </div>
            </div>
            <!-- <div slot="footer" v-if="preview.formats" class="flex flex-row justify-between w-3/4">
                <template v-for="size in Object.keys(preview.formats)">
                    <div class="flex flex-col">
                        <img :src="$imageURL(preview.formats[size])" class="h-20 object-cover mr-2" :title="size" @click="currentImage=preview.formats[size],$editorBus('mediaSelected',preview.formats[size])"/>
                        <span class="text-xs"> {{ preview.formats[size].width }} x {{ preview.formats[size].height }} - {{ parseInt(preview.formats[size].size/1000) }}KB</span>
                    </div>
                </template>
            </div> -->
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'ComponentsGallery',
    data:()=>({
        limit: 12,
        skip: 0,
        pages:null,
        preview: null,
        currentImage: null,
        category: null
    }),
    computed:{
        categories(){
            return Object.keys ( this.$store.state.datastore.dataset.pages )
        }
    },
   
    methods:{
        imagePage(page){
            return require('@/assets/pages/' + page + '.jpg')
        },
        media(){
            console.log ( this.$store.state.datastore.dataset.pages )
            // this.$loading()
            // this.$api.service ( 'pages' )
            //     .find( { query: { $limit: this.limit , $skip: this.skip} } )
            //     .then ( res => {
            //         this.images = res
                    
            //         if ( !this.$store.state.datastore.dataset.components ){
            //             fetch ( 'https://whoobe-server-demo.herokuapp.com/components?$limit=200'  )
            //                 .then ( res => res.json() )
            //                 .then ( data => {
            //                     console.log ( data )
            //                     this.images.data = [ ...this.images.data , ...data.data ]
            //                     this.$store.dispatch ( 'dataset' , {table: 'components' , data : data})
            //                     this.$loading(false)
            //                 })
            //         } else {
            //             this.images.data = [ ...this.images.data , ...this.$store.state.datastore.dataset.components.data ]
            //             this.$loading(false)
            //         }
            //     })
            //     .catch ( error => {
            //         this.$loading(false)
            //         this.$eventBus ( 'notification' , ( 'Error loading media' , 'error') )
            //     })
        },
        openPage(page){
            let pg = require ( '@/assets/pages/' + page + '.json' )
            this.$store.dispatch ( 'setPage' , pg )
            this.$store.dispatch ( 'document' , pg.json.blocks )

            // if ( typeof page.json === 'string' ){
            //     let pg = JSON.parse ( page.json )
            //     this.$store.dispatch ( 'setPage' , page )
            //     this.$store.dispatch ( 'document' , JSON.parse ( page.json ).blocks )
            // } else {
            //     this.$store.dispatch ( 'setPage' , page )
            //     if ( page.json.hasOwnProperty('tag') ){
            //         this.$store.dispatch ( 'document' , page.json )
            //     } else {
            //         this.$store.dispatch ( 'document' , page.json.blocks )
            //     }
            // }
        }
    },
     watch:{
        category(c){
            console.log ( c )
            if ( c ){
                console.log ( this.$store.state.datastore.dataset.pages[c] )
                this.pages = this.$store.state.datastore.dataset.pages[c]
            }
        }
    },
    mounted(){
        //this.media()
        this.category = this.categories[0]
            
    }
}
</script>