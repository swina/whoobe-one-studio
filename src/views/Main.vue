<template>
    <div class="bg-gray-800 w-screen h-screen max-h-screen">
        <!-- <div class="h-10 w-screen bg-bluegray-200 flex flex-row items-center" v-if="start">
            <m-icon icon="menu" css="icon-button z-modal" @click="$eventBus('desktopSidebarLeft','main')" title="Main menu"/>
            <div class="ml-6 flex flex-row items-center">
                WhoobeOne <m-icon icon="bubble_chart"/>
            </div>
        </div> -->
        <div class="modal w-5/6" v-if="!$store.state.editor.preview">
            <div class="w-full md:w-1/2 lg:w-1/3 py-10 m-auto cursor-pointer relative flex flex-col items-center justify-center p-4 text-white rounded-lg shadow-xl" style="font-family:'Barlow Condensed'">
                <h1 class="m-auto">whoobe<span class="text-purple-500 font-bold">One</span>  <m-icon icon="bubble_chart" class="text-3xl text-yellow-500"/></h1>
                <div class="text-base text-gray-400 -mb-8">no-code page builder</div>
            </div>
            <transition name="fade">
                <Dashboard v-if="start"/>
            </transition>
        </div>
        <BlockPreview v-if="$route.query && $route.query.preview"/>
        <div v-if="!start" class="flex flex-col p-4 m-auto w-1/2 bg-gray-600 mt-20 text-white text-base justify-center items-center text-center rounded-lg">
            <div class="p-4">No templates loaded.</br>Do you want to install the default WhoobeOne library?</div>
            <div class="flex justify-around w-full">
                <button class="lg bg-purple-500" @click="$importDB()">Load library</button>
                <button class="lg bg-blue-400" @click="start=!start">Proceed</button>
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
    methods:{
        pages(){
            this.$dialogBus('pages')
        }
    },
    mounted(){
        eventBus.$on ( 'dbImported' , ()=>{
            this.start = true
        })

    }
}
</script>