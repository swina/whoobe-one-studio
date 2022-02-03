import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import '@/assets/tailwind.css'


import './registerServiceWorker'

import scripts from '@/scripts'
Vue.use(scripts)

//create an eventBus
export const eventBus = new Vue();

//create a dialogBus
export const dialogBus = new Vue();

//create an modalBus
export const modalBus = new Vue();

//create an editorBus (events)
export const editorBus = new Vue();

//create an error eventBus
export const errorBus = new Vue();

import Iconify from '@iconify/iconify';
Iconify.enableCache('all',false);

import { disableCache } from '@iconify/vue2';
// disable caching 
disableCache('all');

import Loading from '@/components/common/Loading.vue'
Vue.component ( 'Loading' , Loading )

import Dialog from '@/components/dialog/Dialog.vue'
Vue.component ( 'Dialog' , Dialog )

import Modal from '@/components/dialog/Modal.vue'
Vue.component ( 'Modal' , Modal )

import MaterialIcon from '@/components/common/MaterialIcon.vue'
Vue.component ( 'MIcon' , MaterialIcon )

import IIcon from '@/components/common/Iconify.vue'
Vue.component ( 'IIcon' , IIcon )

import IconifyIcon from '@/components/common/IconifyIcon.vue'
Vue.component ( 'IconifyIcon' , IconifyIcon )

import IconButton from '@/components/common/IconButton.vue'
Vue.component ( 'IconButton' , IconButton )

import Palette from '@/components/common/Palette.vue'
Vue.component ( 'Palette' , Palette )

import Radio from '@/components/common/Radio.vue'
Vue.component ( 'Radio' , Radio )

import Slider from '@/components/blocks/components/BlockSlider.vue'
Vue.component ( 'Slider' , Slider )



import VueHtml2Canvas from "vue-html2canvas";
Vue.use(VueHtml2Canvas);

import Tree from "vue-tree-list"
Vue.component( 'Tree' , Tree )
// import IconifyIcon from '@iconify/vue';
// Vue.component ( 'IconifyIcon' , IconifyIcon )
 


Vue.config.productionTip = false
new Vue({
  store,
  router,
  eventBus,
  errorBus,
  editorBus,
  render: h => h(App)
}).$mount('#app')
