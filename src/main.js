import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import '@/assets/tailwind.css'

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

// //Vue.use(vueCustomElement);
// if ( !window.localStorage.getItem('whoobe-cms') ){
//   window.localStorage.setItem('whoobe-cms' , process.env.VUE_APP_API_URL )
//   window.localStorage.setItem('whoobe-mode' , process.env.VUE_APP_LOCAL )
//}

//import './registerServiceWorker'

import Loading from '@/components/common/Loading.vue'
Vue.component ( 'Loading' , Loading )

import Dialog from '@/components/dialog/Dialog.vue'
Vue.component ( 'Dialog' , Dialog )

import Modal from '@/components/dialog/Modal.vue'
Vue.component ( 'Modal' , Modal )

import MaterialIcon from '@/components/common/MaterialIcon.vue'
Vue.component ( 'MIcon' , MaterialIcon )

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

import Iconify from '@iconify/iconify';
Iconify.enableCache('all', false);

import VueHtml2Canvas from "vue-html2canvas";
Vue.use(VueHtml2Canvas);

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
