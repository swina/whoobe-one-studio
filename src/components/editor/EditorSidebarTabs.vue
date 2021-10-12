<template>
    <div v-if="$store.state.editor.current" class="pl-1">
        <m-icon icon="add" class="icon-button ml-0 mb-1" :class="iconTab==='elements'?'bg-indigo-500 text-white':null" @click="sidebar('elements')" title="Add element"/>
        <m-icon icon="brush" class="icon-button ml-0 mb-1" :class="iconTab==='customize'?'bg-indigo-500 text-white':null" @click="sidebar('customize')" title="Customize"/>
        <m-icon icon="code" class="icon-button ml-0 mb-1" :class="iconTab==='css'?'bg-indigo-500 text-white':null" @click="sidebar('css')" title="CSS & Style"/>
        <m-icon icon="auto_fix_high" class="icon-button ml-0 mb-1" :class="iconTab==='wizard'?'bg-indigo-500 text-white':null" @click="sidebar('wizard')"  title="One click template"/>
        <m-icon icon="widgets" class="icon-button ml-0 mb-1" :class="iconTab==='library'?'bg-indigo-500 text-white':null" @click="$dialogBus('pages','block')" title="Library"/>
        <m-icon icon="motion_photos_auto" class="icon-button ml-0 mb-1" :class="iconTab==='animation'?'bg-indigo-500 text-white':null" @click="sidebar('animation')" title="Animation"/>
        <m-icon icon="ads_click" class="icon-button ml-0 mb-1" :class="iconTab==='events'?'bg-indigo-500 text-white':null" @click="sidebar('events')" title="Events"/>
        <IconifyIcon icon="simple-icons:alpinedotjs" class="text-xl icon-button ml-0 mb-1 cursor-pointer" @click="sidebar('alpine')" title="Alpine JS" mode="editor"/>
        <!--<m-icon icon="expand_more" @click="extend=!extend" v-if="!$attrs.expand" title="More options"/>
         <span v-if="extend || $attrs.expand"> -->
            <m-icon icon="extension" class="icon-button ml-0 mb-1" :class="iconTab==='plugins'?'bg-indigo-500 text-white':null" @click="sidebar('plugins')" title="plugins"/>
            <m-icon icon="settings" class="icon-button ml-0 mb-1" :class="iconTab==='settings'?'bg-indigo-500 text-white':null" @click="sidebar('settings')" title="Settings"/>
            <m-icon icon="account_tree" class="icon-button ml-0 mb-1" :class="iconTab==='info'?'bg-indigo-500 text-white':null" @click="sidebar('tree')" title="Element Tree"/>
        <!-- </span> -->
    </div>
</template>

<script>
import { eventBus , editorBus } from '@/main'
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
                    'bg-indigo-500 text-white' : 
                        this.$attrs.tab ? this.$attrs.tab === this.iconTab ? 
                            'bg-indigo-500 text-white' : 
                                'hover:bg-gray-200' : 
                                    'hover:bg-gray-200'
        },
        sidebar( tab ){
            this.iconTab = tab
            eventBus.$emit ( 'sidebar' , tab )
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

