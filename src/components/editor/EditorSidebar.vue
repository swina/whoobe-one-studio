<template>
    <div class="relative w-full darkTheme z-modal h-screen overflow-hidden border-r border-white">
        <!-- <div class="top-0 left-0">
            <EditorSidebarTabs/>
        </div> -->
        <div class="p-1 shadow-lg bg-purple-900 text-white capitalize flex flex-row items-center text-base cursor-pointer" @click="$emit('close')">
            <span>{{ tab }}</span>
            <m-icon icon="chevron_right" class="absolute right-0 text-white text-xl"/>
        </div>
        <div class="w-full h-full overflow-y-auto" v-if="editor.current">
            <BlockElements v-if="tab==='elements'"/>
            <BlockCustomize v-if="tab==='customize'" :css="editor.current.css.css" :cid="editor.current.id" :key="editor.current.id"/>
            <BlockCss v-if="tab==='css'"/>
            <BlockLibrary v-if="tab==='wizard'"/>
            <BlockComponents v-if="tab==='library'"/>
            <BlockEvents v-if="tab==='events'"/>
            <BlockAlpine v-if="tab==='alpine'" :element="editor.current" :key="editor.current.id"/>
            <BlockAnimation v-if="tab==='animation'"/>

            <BlockSettings v-if="tab==='settings'"/>
            <BlockTree v-if="tab==='tree'"/>
        </div>
        <div v-else class="flex h-full w-full items-center justify-center text-xl">
            <m-icon icon="chevron_left"/> Select a block 
        </div>
        <!-- <div class="absolute left-0 top-0 w-8 pl-1 shadow z-modal justify-center items-center h-screen bg-gray-300">
            <EditorSidebarTabs/>
        </div> -->
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Element from '@/scripts/ElementsClass'
import { eventBus , dialogBus } from '@/main'

export default {
    name: 'EditorSidebar',
    data:()=>({
        el: null,
        component: 'elements'
    }),
    props: ['tab'],
    components: {
        'EditorSidebarTabs' : () => import ( '@/components/editor/EditorSidebarTabs.vue' ),
        'BlockElements' : () => import ( '@/components/blocks/BlockElements.vue') ,
        'BlockCustomize': () => import ( '@/components/blocks/tailwind/BlockTailwind.vue'),
        'BlockCss'      : () => import ( '@/components/blocks/components/BlockCss.vue'),
        'BlockLibrary'  : () => import ( '@/components/blocks/components/BlockLibrary.vue'),
        'BlockComponents'  : () => import ( '@/components/blocks/components/BlockComponents.vue'),
        'BlockEvents'   : () => import ( '@/components/blocks/components/BlockEvents.vue'),
        'BlockAnimation': () => import ( '@/components/blocks/components/BlockAnimation.vue'),
        'BlockAlpine': () => import ( '@/components/blocks/components/BlockAlpine.vue'),
        'BlockSettings' : () => import ( '@/components/blocks/components/BlockSettings.vue'),
        'BlockTree'     : () => import ( '@/components/blocks/components/BlockTree.vue'),
    },
    computed:{
        ...mapState ( ['editor'] )
    },
    methods:{
    
    },
    watch:{
        tab(v){
            this.component = v
        }
    },
    mounted(){
        this.$editorBus ( 'isSidebar' , true )
        //eventBus.$on('sidebar',(component)=>{
        //     console.log ( component )
        //     this.component = component
        // })
    },
    beforeDestroy(){
        this.$editorBus ( 'closeSidebar' )
    }
}
</script>