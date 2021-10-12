<template>
    <div v-if="images" class="z-modal">
        <div class="h-10 w-full p-2 flex flex-row items-center px-16">
            <div v-if="$attrs.options==='manage'">
                <button class="btn">Upload</button>
                <button class="btn btn-red">Pixabay</button>
            </div>
        </div>
        <div class="flex flex-row flex-wrap px-4 items-center justify-center">
            <template v-for="image in images.data">
                <div :key="image.id" class="m-2" :title="image.url" @click="preview=image,currentImage=image.url">
                    <img :src="$imageURL(image)" class="h-32 w-48 object-cover shadow-lg"/>
                </div>
            </template>
        </div>
        <div class="absolute left-0 top-0 w-16 h-screen flex flex-col items-center justify-center">
            <m-icon icon="chevron_left" class="text-6xl" @click="skip>0?skip=skip-limit:null"/>
        </div>
        <div class="absolute right-0 top-0 w-16 h-screen flex flex-col items-center justify-center">
            <m-icon icon="chevron_right" class="text-6xl" @click="(skip+limit)<images.total?skip=skip+limit:null"/>
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
                    <div v-if="!$attrs.options==='manage'">
                    </div>
                    <div class="flex flex-row items-center">
                        <input type="number" class="p-2" min="1" max="5000" v-model="width" @change="setHeight"> x 
                        <input type="number" class="p-2" min="1" max="5000" v-model="height">
                    </div>
                    <button class="lg bg-indigo-500 rounded mt-2" @click="$editorBus('selectedMedia',currentImage)">Select</button>

                    <button v-if="$attrs.options==='manage'" class="lg bg-red-500 rounded mt-2 mr-2">
                        Delete
                    </button>
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
    name: 'Media',
    data:()=>({
        limit: 24,
        skip: 0,
        images:null,
        preview: null,
        currentImage: null,
        
            width: 0,
            height: 0,
        ratio:1
    }),
    methods:{
        media(){
            this.$loading()
            this.$api.service ( 'media' ).find( { query: { $limit: this.limit , $skip: this.skip}} ).then ( res => {
                this.images = res
                this.$loading(false)
            }).catch ( error => {
                this.$loading(false)
                this.$eventBus ( 'notification' , ( 'Error loading media' , 'error') )
            })
        },
        setHeight(){
            this.height = parseInt(this.width/this.ratio)
        }
    },
    watch:{
        skip(v){
            this.media()
        },
        preview(v){
            if ( v ){
                this.width = v.width
                this.height = v.height
                console.log ( v.width , v.height , v.width / v.height )
                this.ratio = v.width / v.height
            }
        },
        
    },
    mounted(){
        this.media()

    }
}
</script>