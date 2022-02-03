import Vue from 'vue'


import database from './database'
Vue.use ( database )

import animator from './gsap.js'
Vue.use(animator)

import HotKeys from '@/scripts/hotkeys'
Vue.use(HotKeys)

import editor from '@/scripts/editor'
Vue.use ( editor )

import { eventBus , dialogBus , editorBus } from '@/main'

export default {
    install: function (Vue) {
        
        
        Vue.prototype.$loading = (flag=true) => {
            eventBus.$emit ( 'loading' , flag )
        }

        Vue.prototype.$slugify = (str) => {
            return str.toLowerCase ().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        }

        Vue.prototype.$imageURL = (image) => {
            if ( !image ) return null
            let source = image.url
            if ( !image.hasOwnProperty('url') ){
                source = image
            }
            if ( source.includes ( 'http') ) return source
            return process.env.VUE_APP_API_URL + source.substring(1)
        }

        Vue.prototype.$eventBus =  ( action , e = null ) =>{
            eventBus.$emit ( action , e )
        }

        Vue.prototype.$editorBus =  ( action , e = null ) =>{
            editorBus.$emit ( action , e )
        }

        Vue.prototype.$dialogBus = ( action , e = null ) => {
            dialogBus.$emit ( action , e )
        }
    }
}
