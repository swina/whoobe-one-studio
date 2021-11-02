<template>
    <div class="fixed top-0 left-0 h-8 items-center bg-purple-900 w-screen z-modal flex flex-wrap" v-if="$store.state.desktop.tabs" :class="isPreview">
        <m-icon icon="menu" class="h-8 w-8 items-center justify-center flex text-white" @click="home"/>
        <template v-for="(tab,index) in $store.state.desktop.tabs">
            <div :class="activeTab(index)" class="relative border-l border-r border-purple-600 rounded-t hover:bg-black text-white px-2 flex items-center cursor-pointer h-8 w-32" :title="tab.label">
                <span  @click="openTab(tab,index)" class="w-24 truncate ml-1">{{ tab.label }}</span> <m-icon icon="close" class="absolute right-0 mr-2" @click="removeTab(index)"/>
            </div>
        </template>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Tabs',
    computed:{
        ...mapState ( ['desktop'] ),
        isPreview(){
            return this.$route.path.includes( 'preview' ) ? 'hidden' : ''
        }
    },
    watch:{
        '$store.state.desktop.tabs':function(value){
            if ( value.length ){
                if ( value[value.length - 1].type === 'editor' ){
                    this.$store.dispatch ( 'setPage' , value[value.length-1].object )
                    this.$store.dispatch ( 'document' , value[value.length-1].object.json.blocks )
                    this.$store.dispatch ( 'component' , ()=>import('@/components/editor/Editor.vue') )
                } 
                if ( value[value.length - 1].type === 'component' ){
                    this.$store.dispatch ( 'component' , value[value.length-1].object )
                }
                this.$store.dispatch ( 'currentTab' , value.length-1 )
            } else {
                this.$store.dispatch ( 'component' , null )
                this.home()
            }
            this.$dialogBus ( 'closeDialog' )
        },
        '$store.state.desktop.currentTab':function(index){
            if ( index < 0 ) return
            let tab = this.desktop.tabs[index]
            if ( tab.type === 'editor' ){
                this.$store.dispatch ( 'setPage' , tab.object )
                this.$store.dispatch ( 'document' , tab.object.json.blocks )
                this.$store.dispatch ( 'component' , ()=>import('@/components/editor/Editor.vue') )
            }
            if ( tab.type === 'component' ){
                this.$store.dispatch ( 'component' , tab.object )
            }
        },
        // '$store.state.editor.page.name':function(value){
        //     this.$store.state.editor.current ?
        //         this.$store.state.desktop.tabs[this.$store.state.desktop.currentTab].label = value : null
        // }
    },
    methods:{
        home(){
            //this.$store.dispatch ( 'currentTab' , -1 )
            //this.$router.push ( '/' )
            this.$eventBus ( 'desktopSidebarLeft' )
            // this.$store.dispatch ( 'component' , null )
        },
        activeTab(index){
            return index === this.$store.state.desktop.currentTab ? 'bg-white text-gray-400' : 'bg-purple-900'
        },
        switchTab(){
            if ( value[value.length - 1].type === 'editor' ){
                    this.$store.dispatch ( 'currentTab' , value.length - 1)
                    this.$store.dispatch ( 'setPage' , value[value.length-1].object )
                    this.$store.dispatch ( 'document' , value[value.length-1].object.json.blocks )
                    this.$store.dispatch ( 'component' , ()=>import('@/components/editor/Editor.vue') )
                } 
                if ( value[value.length - 1].type === 'component' ){
                    console.log  ( 'loading component ...')
                    this.$store.dispatch ( 'component' , value[value.length-1].object )
                }
        },
        openTab ( tab , index ){
            this.$store.dispatch ( 'currentTab' , index )
            // this.$store.dispatch ( 'currentTab' , index )
            // this.$store.dispatch ( 'setPage' , tab.object )
            // this.$store.dispatch ( 'document' , tab.object.json.blocks )
            // if ( this.$route.path === '/' ){
            //    this.$router.push ( 'editor')
            // }
        },
        removeTab(index){
            this.$store.dispatch ( 'removeTab' , index )
        }
    }
}
</script>