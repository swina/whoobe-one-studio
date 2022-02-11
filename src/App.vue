<template>
  <div id="app" class="bg-white grid w-screen h-screen max-h-screen overflow-x-hidden bg-no-repeat bg-cover bg-center">
    <router-view/>
    <component :is="desktop.component" v-if="desktop.component" class="desktop-component absolute top-0 left-0"/>
  
    <Tabs ref="whoobeTabs"/>
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
    ...mapState ( ['desktop','editor','datastore'] ),
    
  },
  watch:{
    
  },
  beforeMount(){
    window.localStorage.setItem ( 'whoobe-preview-mode' , false )
  },
  mounted(){
    //window.localStorage.setItem  ( 'whoobe-autosave-timeout' , 1000*60*5 )
    const groups = new Element().Groups()
    this.$store.dispatch ( 'elements' , groups )
    //this.$store.dispatch ( 'preview' , false )
    

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
            if ( !settings.categories ){
                settings.categories = ['Lead','Landing page','Subscribe page','Header','Footer','Hero','Homepage','Shop' , 'Feature'].sort()
            }
        }
        this.$store.dispatch ( 'settings' , settings)
    })

    if ( this.datastore.shopify.config.storefrontAccessToken ){
      this.client = this.datastore.shopify
      this.client.collection.fetchAllWithProducts().then((collections) => {
            this.client.collections = collections
            // Do something with the collections
            this.client.product.fetchAll(200).then((products) => {
              this.$store.dispatch ( 'whoobe_store' , products )
              console.log ( products )
            }).catch ( error => console.log(error));
        });
    }

    

    
  }

}
</script>

<style>
body {
  background: rgb(214, 214, 214);
  /* overflow:hidden; */
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