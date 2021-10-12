import Vue from 'vue'
import Vuex from 'vuex'
import desktop from './modules/desktop'
import datastore from './modules/datastore'
import editor from './modules/editor'
import user from './modules/user'
import generator from './modules/generator'
//import moka from './modules/components'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    desktop,
    datastore,
    editor,
    user,
    //generator
    //moka,
  }
})
