<template>
    <div ref="imageURL" class="z-highest border bg-white shadow absolute flex flex-col items-start" :style="stile" v-if="$attrs.coords && $store.state.editor.current">
        <div class="p-1 bg-gray-200 w-full" @click="$emit('close')">Image URL</div>
        <div class="flex items-center p-1 justify-around w-full">
            <m-icon icon="photo"/>
            <input v-if="$store.state.editor.current" class="ml-2 p-1 w-3/4 rounded text-lg" v-model="$store.state.editor.current.image.url"/>
            <m-icon icon="keyboard_return" class="bg-indigo-500 text-white p-1 rounded ml-1" @click="$emit('close')" title="Accept image"/>
            <m-icon icon="close" class="bg-red-500 text-white p-1 rounded ml-1" @click="$store.state.editor.current.image.url=null,$emit('close')" title="Remove image"/>
            
        </div>
        <div class="flex flex-col pb-2"  v-if="$store.state.editor.current.element==='img'" >
            <label>Caption</label>
            <input class="p-1 w-full mx-1 text-sm" v-model="$store.state.editor.current.image.caption" placeholder="caption"/>
            <label>Alternative text</label>
            <input class="p-1 w-full mx-1 text-sm" v-model="$store.state.editor.current.image.alt" placeholder="alt"/>
        </div>
        
        <div class="w-full flex flex-col p-1 items-center">
                       
            <img v-if="$store.state.editor.current.image.url" class="w-64 h-auto" :src="$imageURL($store.state.editor.current.image)"/>
            
            <!-- <button class="rounded mr-1" @click="$dialogBus('pixabay')">Pixabay</button>
            <button class="rounded mr-1">Cloudinary</button> -->
        </div>
        <div class="flex flex-row w-full p-1 justify-between bg-gray-200">
            <!-- <button class="rounded mx-2" @click="$dialogBus('media')">Media</button> -->
            <!-- <button class="rounded mx-2 btn btn-purple" @click="unsplash=!unsplash">Unsplash</button> -->
            <input type="text" v-model="search" class="p-1 py-1 text-sm w-full" placeholder="unsplash search" @keydown="unsplashSearch($event)"/> <m-icon class="p-1 ml-1 text-2xl" icon="search" title="Search again"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BlockImageUrl',
    data:()=>({
        unsplash: false,
        search: ''
    }),
    computed:{
        stile(){
            return ''
            return 'top:' + this.$attrs.coords.top + 'px;left:' + this.$attrs.coords.left + 'px;resize:both;'
        }
    },
    methods:{
        unsplashSearch(e){
            if ( e.keyCode === 13 && this.search.length > 2 ){
                this.$store.state.editor.current.image.url = 'https://source.unsplash.com/featured/?' + this.search 
            }
        }
    },
    mounted(){
        // if ( this.$store.state.editor.current  ){
        //     let coords = this.$refs.imageURL.getBoundingClientRect()
        //     if ( coords.right > window.innerWidth - 300 ){
        //         this.$refs.imageURL.style.left = coords.left - 100 + 'px'
        //     }
        // }
    }
}
</script>