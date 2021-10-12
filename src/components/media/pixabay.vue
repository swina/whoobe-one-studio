<template>
    <div class="px-8 w-full" v-if="apikey">
        <div class="flex flex-row items-center w-full mb-4 p-2 relative">
            <img src="https://pixabay.com/static/img/logo.png" class="rounded bg-white p-2 w-32 opacity-50 mr-2"/>
            <input type="text" v-model="search" placeholder="search" class="dark mr-2"/>
            <Radio :options="options" @option="setOption" classe="text-gray-600"/>
            <!-- <input type="radio" class="text-3xl mx-2" name="type" v-model="type" value="all"> All
            <input type="radio" class="mx-2" name="type" v-model="type" value="photo"> Photo
            <input type="radio" class="mx-2" name="type" v-model="type" value="illustration"> Illustration
            <input type="radio" class="mx-2" name="type" v-model="type" value="vector"> Vector
            <input type="radio" class="mx-2" name="type" v-model="type" value="video"> Video -->
            <template v-if="!preview">
                <m-icon v-if="images && page > 1" @click="page--,pixabayQry(search)" class="text-5xl rounded-full ml-6 center-vertical left-0" icon="chevron_left"/>
                <m-icon v-if="images" @click="page++,pixabayQry(search)" class="text-5xl rounded-full mr-1 center-vertical right-0" icon="chevron_right"/>
                <m-icon icon="close" @click="$emit('close')" class="absolute right-0 mr-4 text-3xl"/>
            </template>
        </div>
        <div class="flex flex-row flex-wrap items-center justify-center mx-auto" v-if="images">
            <section v-for="(image,i) in images.hits">
                <div class="flex flex-col mb-2 mx-1" title="click to preview" :data-tool-tip="image.downloads > 1000 ? 'Downloads: ' +  parseInt(image.downloads/1000) + 'K' : 'Downloads ' + image.downloads">
                    <img v-if="type!='video'" :src="image.previewURL" class="cursor-pointer object-cover w-48 h-32" @click="preview=image,index=i"/>
                    <img v-else :src="'https://i.vimeocdn.com/video/' + image.picture_id + '_295x166.jpg'" class="cursor-pointer object-cover w-48 h-32" @click="preview=image,index=i"/>
                    <!-- <video class="object-cover w-48 h-32">
                        <source :src="image.videos.tiny.url"/>
                    </video> -->
                    <div class="text-xs text-gray-400 flex flex-row items-center">
                        <m-icon icon="file_download"/> {{ image.downloads > 1000 ? parseInt(image.downloads/1000) + 'K' : image.downloads }}
                        <m-icon class="ml-4" icon="favorite"/> {{ image.favorites }}
                    </div>
                </div>
            </section>
            <!--<navigation class="fixed bottom-0 left-0"/>-->
        </div>
        <div class="modal z-modal w-3/4 p-4 bg-black" v-if="preview">
            <m-icon icon="close" class="absolute right-0 top-0 m-1 text-white text-2xl" @click="preview=null"/>
            <div class="flex">
                <div class="w-5/6">
                    <img :src="preview.webformatURL"/>
                </div>
                <div class="w-1/6 flex flex-col text-gray-400">
                    <!-- <template v-for="key in Object.keys ( preview )">
                        <div>{{ key }} : {{ preview[key] }}</div>
                    </template> -->
                    <div>Width: {{ preview.imageWidth}}</div>
                    <div>Height: {{ preview.imageHeight}}</div>
                    <div>URL: <input type="text" :value="preview.imageURL"/></div>
                </div>
            </div>
        </div>
        <!-- <div class="absolute bottom-0" v-if="images">
            <button @click="page++,pixabay(search)">Next</button>
        </div> -->
        <!-- <dialog
            size="full"
            v-if="preview"
            @close="preview=null">
            <div slot="title">Preview {{index}}</div>
            <div slot="content" class="flex flex-col items-end justify-start relative transition-container duration-700 h-90">
                
                <img v-if="type!='video'" :src="preview.largeImageURL" class="w-10/12 h-4/5 object-contain mx-auto pixabay-preview" @click="index<20?index++:index=0,preview=images.hits[index]"/>
                <iframe v-if="type==='video'" :src="preview.videos.medium.url" class="h-4/5 mx-auto w-full inset-0 absolute"/>
                <div v-if="preview" class="fixed items-center flex flex-col justify-center w-full bottom-0 p-2 z-2xtop">
                    <div class="flex flex-row">
                        <input type="text" v-model="preview.name" placeholder="save as " class="w-64 mr-2"/>
                        <button @click="downloadImage">Save</button> 
                    </div>
                    <div v-if="!preview">Loading ...</div>

                    <div>
                        {{ filename }}
                    </div>
                        Downloads: {{ preview.downloads > 1000 ? parseInt(preview.downloads/1000) + 'K' : preview.downloads }} - 
                        Original {{ preview.imageWidth}} x {{ preview.imageHeight }}px</br>
                    <span class="text-gray-600">Max download width 1920px</span>
                </div>

                <m-icon v-if="type!='video' && preview && images && index > 0" @click="preview=null,$loading(true),index>0?index--:index=0,preview=images.hits[index]" class="text-5xl rounded-full p-1 m-2 center-vertical left-0 z-highest" icon="chevron_left"/>
                <m-icon v-if="type!='video' && preview && images && index < 19" @click="preview=null,$loading(true),index<20?index++:index=0,preview=images.hits[index]" class="text-5xl rounded-full p-1 m-2 center-vertical right-0 z-highest" :icon="preview?'chevron_right':'menu'"/>
                
            </div>
             
        </dialog> -->
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'WhoobePixabayPlugin',
    data:()=>({
        apikey: null,
        search: '',
        images: null,
        page: 0,
        preview: null,
        index: null,
        type: 'all',
        pixabayUser: null,
        apikey: null,
        options: [
            { label: 'All' , value: 'all' },
            { label: 'Photo' , value: 'photo' },
            { label: 'Illustration' , value: 'illustration' },
            { label: 'Vector' , value: 'vector' },
            { label: 'Video' , value: 'video' },
        ]

    }),
    computed:{
        filename(){
            return this.preview.hasOwnProperty('previewURL') ? 
                this.preview.previewURL.split('/')[this.preview.previewURL.split('/').length-1] : 'video'
        }
    },
    watch:{
        search(v){
            if ( v && v.length > 2) {
                if (this.page === 0 ) {
                    this.page = 1
                }
                this.pixabayQry(v)
            }

        },
        preview(v){
            //if ( v ) this.$loading()
            window.localStorage.setItem ( 'whoobe-image-preview' , v )
            this.$dialogBus ( 'imagePreview' )
        },
        type(v){
            this.page = 1
            this.pixabayQry(this.search)
        },
        pixabayUser(v){
            this.pixabayQry()
        }
    },
   
    methods:{
        setOption(option){
            this.type = option
        },
        async pixabayQry(search){
            this.$loading(true)
            let usr, imgType, url 
            this.pixabayUser ?
                usr = '&user=' + this.pixabayUser : usr = ''
            this.type === 'video' ?
                imgType = '' : imgType = '&image_type=' + this.type
            this.type === 'video' ?
                url = 'videos' : url = ''
            axios.get ( 
                'https://pixabay.com/api/' + url + '?key=' + this.apikey + 
                '&q=' + search + 
                usr +
                imgType + 
                '&page=' + this.page).then ( res => {
                if ( res.data ){
                    this.images = res.data
                    
                }
                this.$loading()
            }).catch ( error => {
                this.$loading()
                this.$message ( 'Request error')
            })
        },
        downloadImage(){
            if (!this.preview.name ){
                this.preview.name = 'whoobe-' + this.$randomID()
            } else {
                this.uploadImage()
            }
        },
        async uploadImage() {

            this.$loading(true)
            this.$api.service('upload/file').create({
                name: this.preview.name,
                url: this.preview.largeImageURL
            }).then ( response => {
                this.$loading()
                this.preview = false
                this.$message ( 'Media uploaded!')
                this.$emit('uploaded')
            })
            
        }
    },
    mounted(){
       this.apikey = process.env.VUE_APP_PIXABAY_APIKEY
    }
}
</script>