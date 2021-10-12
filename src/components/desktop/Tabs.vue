<template>
    <div class="fixed top-0 left-0 h-8 items-center bg-purple-900 w-screen flex flex-wrap" v-if="$store.state.desktop.tabs" :class="isPreview">
        <m-icon icon="home" class="h-8 w-8 items-center justify-center flex text-white" @click="home"/>
        <template v-for="(tab,index) in $store.state.desktop.tabs">
            <div :class="activeTab(index)" class="hover:bg-purple-400 text-white px-2 flex items-center cursor-pointer h-8">
                <span  @click="openTab(tab,index)">{{ tab.label }}</span> <m-icon icon="close" class="ml-2" @click="removeTab(index)"/>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'Tabs',
    computed:{
        isPreview(){
            console.log ( this.$route.path )
            return this.$route.path.includes( 'preview' ) ? 'hidden' : ''
        }
    },
    watch:{
        '$store.state.desktop.tabs':function(value){
            if ( value.length ){
                this.$store.dispatch ( 'currentTab' , value.length - 1)
                this.$store.dispatch ( 'setPage' , value[value.length-1].object )
                this.$store.dispatch ( 'document' , value[value.length-1].object.json.blocks )
            } else {
                this.home()
            }
            this.$dialogBus ( 'closeDialog' )
        }
    },
    methods:{
        home(){
            this.$store.dispatch ( 'currentTab' , -1 )
            this.$router.push ( '/' )
        },
        activeTab(index){
            return index === this.$store.state.desktop.currentTab ? 'bg-gray-200 text-black' : 'bg-purple-900'
        },
        openTab ( tab , index ){
            this.$store.dispatch ( 'currentTab' , index )
            this.$store.dispatch ( 'setPage' , tab.object )
            this.$store.dispatch ( 'document' , tab.object.json.blocks )
            if ( this.$route.path === '/' ){
                this.$router.push ( 'editor')
            }
        },
        removeTab(index){
            this.$store.dispatch ( 'removeTab' , index )
        }
    }
}
</script>