<template>
  <div id="app" class="bg-white grid w-screen min-h-screen overflow-x-hidden bg-no-repeat bg-cover bg-center">
    <router-view/>
    <component :is="desktop.component" v-if="desktop.component" class="absolute top-0 left-0 w-screen h-screen mt-8"/>
  
    <Tabs ref="whoobeTabs" v-if="!$store.state.editor.preview"/>
    <DesktopSidebarLeft v-if="sidebarLeft"/>
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
    options: null,
    component: null
  }),
  components: {
    'PagePreview'   : () => import ( '@/components/blocks/preview/BlockPreview.vue'),
    'Tabs'          : () => import ( '@/components/desktop/Tabs.vue' ),
    'Events'        : () => import ( '@/components/common/Events.vue' ),
    'DesktopSidebarLeft' : () => import ( '@/components/desktop/DesktopSidebarLeft.vue'),
    'Notification'  : () => import ( '@/components/common/Notification.vue' ),
  },
  computed:{
    ...mapState ( ['desktop','editor'] ),
    
  },
  watch:{
    // '$store.state.desktop.tabs':function(tabs){
    //   if ( !tabs.length ) return
    //   if ( tabs.length ){
    //     if ( this.desktop.currentTab > -1 ){
    //       if ( tabs[this.desktop.currentTab].type === 'component' ){
    //         this.component = tabs[this.desktop.currentTab].object
    //       }
    //     }
    //   }
    // }
  },
  mounted(){
    //window.localStorage.setItem  ( 'whoobe-autosave-timeout' , 1000*60*5 )
    const groups = new Element().Groups()
    this.$store.dispatch ( 'elements' , groups )


    eventBus.$on ( 'desktopSidebarLeft' , () => {
      this.sidebarLeft =! this.sidebarLeft
    })

    eventBus.$on ( 'loading' , () => {
      this.loading =! this.loading
    })

    eventBus.$on ( 'confirmYesNo' , ( context  ) => {
      console.log ( context  )
      // if ( context === 'importDB' && confirm ){
      //   this.$importDB()
      // }
      dialogBus.$emit ( 'closeDialog' )
    })

    let settings = {
      id: 0,
      autosave: false,
      autosaveTimeout: 5,
      categories: ['Lead','Landing page','Subscribe page','Header','Footer','Hero','Homepage','Shop' , 'Feature'].sort()
    }

    this.$settings().then ( res => {
        if ( res.length ){
            settings = res[0]
            if ( settings.categories ){
                settings.categories = ['Lead','Landing page','Subscribe page','Header','Footer','Hero','Homepage','Shop' , 'Feature'].sort()
            }
        }
        window.localStorage.setItem ( 'whoobe-settings' , settings )
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