<template>
  <div id="app" class="bg-white grid w-screen min-h-screen overflow-x-hidden bg-no-repeat bg-cover bg-center">
    <router-view/>
    
    <Tabs ref="whoobeTabs" v-if="!$store.state.editor.preview"/>
    <DesktopSidebarLeft v-if="sidebarLeft"/>
    
    <!-- <Dialog v-if="dialogComponent" :width="width" @close="dialogComponent=null">
      <div slot="title">{{title}}</div>
      <div slot="content">
        <component :is="dialogComponent" @close="dialogComponent=null" :options="options"></component>
      </div>
    </Dialog> -->
    <Dialog/>
    <Notification/>
    <Modal/>
    <Events/>
    <Loading v-if="loading"/>
  </div>
</template>

<script>
import Element from '@/scripts/ElementsClass'
import { mapState } from 'vuex'
import { eventBus , dialogBus , editorBus } from './main'
import Block from '@/scripts/BlocksClass'
import tw from 'tailwindcss/stubs/defaultConfig.stub'
import pages from '@/assets/pages' 
export default {
  name: 'App',
  data:()=>({
    dialogComponent: null,
    title: '',
    width: 'w-1/4',
    sidebarLeft: false,
    loading: false,
    options: null
  }),
  components: {
    'Tabs'          : () => import ( '@/components/desktop/Tabs.vue' ),
    'Events'        : () => import ( '@/components/common/Events.vue' ),
    'DesktopSidebarLeft' : () => import ( '@/components/desktop/DesktopSidebarLeft.vue'),
    'Notification'  : () => import ( '@/components/common/Notification.vue' ),
  },
  computed:{
    ...mapState ( ['editor'] ),
    
  },
  methods:{
    
  },
  mounted(){
    console.log ( this.$route )
    window.localStorage.setItem  ( 'whoobe-autosave-timeout' , 1000*60*5 )
    const groups = new Element().Groups()
    this.$store.dispatch ( 'elements' , groups )


    eventBus.$on ( 'desktopSidebarLeft' , () => {
      this.sidebarLeft =! this.sidebarLeft
    })

    eventBus.$on ( 'loading' , () => {
      this.loading =! this.loading
    })

    editorBus.$on ( 'createPage' , (document) => {
        let page = new Block()
        const block = new Element().Flexbox({direction:'col'}).setIcon('dashboard').setTag('document')
        page.json.blocks = block
        page.name = 'A new page'
        this.$store.dispatch ( 'setPage' , page )
        this.$store.dispatch ( 'setCurrent' , block )
        this.$store.dispatch ( 'document' , block )
        this.$dialogBus ( 'settingsPage' )
        this.$router.push ( 'editor' )
    })


    // editorBus.$on ( 'savePage' , () => {
    //     if ( this.editor.page && this.editor.document ){
            
    //         //this.editor.page.json.blocks = Object.assign ( {} , this.editor.document )

    //         let page = new Block()
    //         page.json.blocks = this.editor.document
    //         console.log ( page.json.blocks )
    //         page.purge()

    //         let json = {
    //             blocks : this.editor.document,
    //             build: page.json.build
    //         }
    //         this.editor.page.json = JSON.stringify(json)
    //         delete this.editor.page.blocks_id
    //         if ( !this.editor.page.id ){
    //             this.$api.service ( 'pages' )
    //                 .create ( this.editor.page )
    //                 .then ( res => {
    //                     this.editor.page = res
    //                     this.$eventBus ('notification' , 'Page saved successfully' )
                        
    //                 })
    //                 .catch ( error => {
    //                 this.$eventBus ( 'notification' , ('Error saving page','error') )
    //                 console.log ( error )
    //             })
    //         } else {
    //             this.$api.service ( 'pages' )
    //                 .patch ( this.editor.page.id , this.editor.page )
    //                 .then ( res => {
    //                     this.$eventBus ('notification' , 'Page updated successfully' )
    //                     console.log ( res )
    //                 })
    //                 .catch ( error => {
    //                     this.$eventBus ( 'notification' , ('Error saving page','error') )
    //                     console.log ( error )
    //                 })
    //         }
    //     } else {
    //         this.$eventBus ( 'notification' , 'No page to save')
    //     }
    // })

    
  }

}
</script>

<style>
body {
  background: rgb(214, 214, 214);
  overflow:hidden;
}

::-webkit-scrollbar {
    width: 4px;
    height: 5px;
  }
  ::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }
  ::-webkit-scrollbar-thumb {
    background: #9e9d9d;
    border: 0px none #ffffff;
    border-radius: 50px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #d8d8d8;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #444343;
  }
  ::-webkit-scrollbar-track {
    background: #d8d8d8;
    border: 0px none #ffffff;
    border-radius: 0px;
  }
  ::-webkit-scrollbar-track:hover {
    background: #9e9d9d;
  }
  ::-webkit-scrollbar-track:active {
    background: #706f6f;
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
</style>