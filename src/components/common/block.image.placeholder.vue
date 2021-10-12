<template>
    <div class="object-fit cursor-pointer flex flex-col justify-center items-center relative m-auto">
        <img v-if="$attrs.image && $attrs.image.hasOwnProperty('url') && $attrs.image.url" :src="getImage($attrs.image)" :class="'m-auto mb-2 ' + size" @click="$dialogBus('media')" :title="$attrs.image.url"/>
        <!--<img v-else :src="getImage($attrs.image) && $at" :class="'m-auto mb-2 ' + size" @click="$emit('media')"/>-->
        <i class="material-icons text-5xl" v-if="editor && editor.current && editor.current.hasOwnProperty('type') && editor.current.type==='audio'">audiotrack</i>
        <div v-if="editor && editor.current && editor.current.hasOwnProperty('type') && editor.current.type === 'file' && editor.current.hasOwnProperty('link') && editor.current.link">
            <i class="material-icons text-5xl">file_present</i>
        </div>
        <div v-if="$attrs.image && $attrs.image.name && $attrs.image.size" class="w-full text-xs">
            <!-- {{ $attrs.image.name}} <br>-->
            <span v-if="$attrs.image.size">{{ $attrs.image.width }}x{{$attrs.image.height}} - {{ Math.round(parseFloat($attrs.image.size/1000),2) }} Kb</span>
        </div>
        <button v-if="!$attrs.image || !editor.current.image.url" @click="$dialogBus('media')">Select Media</button>
        <div :id="$randomID()" v-if="$attrs.image && ( $attrs.image.url || editor.current.link )" class="flex flex-row">
            <button @click="editor.current.image.url=null" title="Remove image"><m-icon icon="delete"/></button>
            <button @click="imageURL=!imageURL" title="Edit image"><m-icon icon="edit"/></button>
            <button @click="$action('image_preview')"><m-icon icon="link" title="Open preview"/></button>
        </div>
        <div v-if="imageURL" class="relative p-2 w-full">
            <textarea class="p-1 w-full h-32" v-model="editor.current.image.url"/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'MokaImagePlaceHolder',
    data:()=>({
        mediaURL: '',
        imageURL : false
    }),
    components:{
        'BlockImageUrl' : () => import ( '@/components/blocks/components/BlockImageUrl.vue')
    },
    watch:{
        mediaURL(v){
            let image = {
                url : v
            }
            this.$attrs.image = image
        }
    },
    computed:{
        ...mapState ( [ 'editor' ]),
        size(){
            return this.$attrs.size ?
            this.$attrs.size === 'xs' ? 'h-12 w-20 ' : 
                this.$attrs.size === 'sm' ? 'h-20 w-30 ' : 
                    this.$attrs.size === 'md' ? 'h-32 ' : 'h-32 ' : 'h-32 '
        },
    },
    methods:{
        imageSize(img){
            if ( parseFloat(img.size) < 1000 ){
                return img.size + ' 0.' + parseInt(img.size) + ' Kb'
            } else {
                Math.round ( parseFloat(img.size)/1000 , 2 ) + ' Kb'
            }
        },
        getImage( img ){
            return img.url.includes('http') ? 
                    img.url : (window.localStorage.getItem('moka-strapiurl') || process.env.VUE_APP_API_URL ) + img.url.substring(1)
        },
        imageEditor(img){
            window.localStorage.setItem('whoobe-image-url',this.$imageURL(img.url))
            this.$action ( 'image_editor' )

        }
    }
}
</script>