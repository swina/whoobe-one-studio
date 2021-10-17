<template>
    <div class="bg-gray-800 w-screen h-screen max-h-screen">
        
        <div class="modal w-5/6" v-if="!preview">
            <div class="w-full md:w-1/2 lg:w-1/3 py-10 m-auto cursor-pointer relative flex flex-col items-center justify-center p-4 text-white rounded-lg shadow-xl" style="font-family:'Barlow Condensed'">
                <h1 class="m-auto">whoobe<span class="text-purple-500 font-bold">One</span>  <m-icon icon="bubble_chart" class="text-3xl text-yellow-500"/></h1>
                <div class="text-base text-gray-400 -mb-8">component builder for TailwindCSS</div>
            </div>
            <transition name="fade">
                <Dashboard v-if="start"/>
            </transition>
        </div>
        <BlockPreview v-if="preview"/>
        <div v-if="!start" class="flex flex-col p-4 m-auto w-1/2 bg-gray-600 mt-20 text-white text-base justify-center items-center text-center rounded-lg">
            <div class="p-4">Templates library not found.</br>Do you want to install the default WhoobeOne library?</div>
            <div class="flex justify-around w-full">
                <button class="lg bg-purple-500 btn" @click="$importDB()">Load library</button>
                <button class="lg bg-blue-400 btn" @click="start=!start">Proceed</button>
            </div>
        </div>
        
    </div>
</template>


<script>
import { eventBus } from '@/main'
export default {
    name: 'Main',
    components:{
        'BlockPreview' : () => import ( '@/components/blocks/preview/BlockPreview.vue' ),
        'Dashboard' : () => import ( '@/components/desktop/Dashboard.vue' )
    },
    data:()=>({
        start: true
    }),
    computed:{
        preview (){
            if ( !window.localStorage.getItem ( 'whoobe-preview-mode') ) return false
            return window.localStorage.getItem ( 'whoobe-preview-mode' ) 
        }
    },
    methods:{
        pages(){
            this.$dialogBus('pages')
        }
    },
    mounted(){
        eventBus.$on ( 'dbImported' , ()=>{
            this.start = true
        })
        
        this.$dbCount().then ( res => {
            console.log ( res )
            !res ? this.start = false : this.start = true
        })
    }
}
</script>