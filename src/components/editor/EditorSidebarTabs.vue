<template>
    <div v-if="$store.state.editor.current" class="pl-1 cursor-pointer text-gray-400">
        <i-icon icon="la:elementor" class="icon-button ml-0 mb-1" :class="iconTab==='elements'?'bg-purple-600 text-white':null" @click="sidebar('elements')" title="Add element"/>
        <i-icon icon="mdi:tailwind" class="icon-button ml-0 mb-1" :class="iconTab==='customize'?'bg-purple-600 text-white':null" @click="sidebar('customize')" title="Tailwind Controls"/>
        <i-icon icon="el:css" class="icon-button ml-0 mb-1" :class="iconTab==='css'?'bg-purple-600 text-white':null" @click="sidebar('css')" title="CSS & Style"/>
        <i-icon icon="ic:outline-edit-attributes" class="text-xl icon-button ml-0 mb-1 cursor-pointer" @click="sidebar('attributes')" title="Attributes" mode="editor"/>
        <i-icon icon="tabler:template" class="icon-button ml-0 mb-1" :class="iconTab==='snippets'?'bg-purple-600 text-white':null" @click="sidebar('snippets')"  title="Snippets"/>
        <i-icon icon="mdi:widgets-outline" class="icon-button ml-0 mb-1" :class="iconTab==='library'?'bg-purple-600 text-white':null" @click="blocksGallery" title="Library"/>
        <m-icon icon="motion_photos_auto" class="icon-button ml-0 mb-1" :class="iconTab==='animation'?'bg-purple-600 text-white':null" @click="sidebar('animation')" title="Animation"/>
        <!-- <m-icon icon="ads_click" class="icon-button ml-0 mb-1" :class="iconTab==='events'?'bg-purple-600 text-white':null" @click="sidebar('events')" title="Events"/> -->
        <i-icon icon="simple-icons:alpinedotjs" class="text-xl icon-button ml-0 mb-1 cursor-pointer" @click="sidebar('alpine')" title="Alpine JS" mode="editor"/>
        
        <!--<m-icon icon="expand_more" @click="extend=!extend" v-if="!$attrs.expand" title="More options"/>
         <span v-if="extend || $attrs.expand"> -->
            <!-- <m-icon icon="extension" class="icon-button ml-0 mb-1" :class="iconTab==='plugins'?'bg-purple-600 text-white':null" @click="sidebar('plugins')" title="plugins"/> -->
            <!-- <m-icon icon="settings" class="icon-button ml-0 mb-1" :class="iconTab==='settings'?'bg-purple-600 text-white':null" @click="sidebar('settings')" title="Settings"/> -->
            <i-icon icon="ic:outline-account-tree" class="icon-button ml-0 mb-1" :class="iconTab==='info'?'bg-purple-600 text-white':null" @click="sidebar('tree')" title="Element Tree"/>
        <!-- </span> -->
    </div>
</template>

<script>
import { eventBus , editorBus , modalBus } from '@/main'
export default {
    name: 'EditorSidebarTabs',
    data:() => ({
        iconTab: 'elements',
        extend:false
    }),
    computed:{
        
    },
    methods:{
        isTab ( tab ){
            return tab === this.iconTab ? 
                    'bg-purple-500 text-white' : 
                        this.$attrs.tab ? this.$attrs.tab === this.iconTab ? 
                            'bg-purple-500 text-white' : 
                                'hover:bg-gray-100' : 
                                    'hover:bg-gray-100'
        },
        sidebar( tab ){
            this.iconTab = tab
            eventBus.$emit ( 'sidebar' , tab )
        },
        blocksGallery (){
            modalBus.$emit ( 'blocksGallery' )
        }
    },
    mounted(){
        editorBus.$on ( 'customizeBlock' , () => {
            this.sidebar ( 'customize' )
        })
        editorBus.$on ( 'addBlock' , () => {
            this.sidebar ( 'elements' )
        })
        editorBus.$on ( 'cssBlock' , () => {
            this.sidebar ( 'css' )
        })
        
        editorBus.$on ( 'animationBlock' , () => {
            this.sidebar ( 'animation' )
        })
        this.$attrs.tab ? this.iconTab = this.$attrs.tab : null
    }
}
</script>

