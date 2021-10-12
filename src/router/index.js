import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
// import Desktop from '@/components/desktop/desktop.vue' 
import Preview from '@/components/blocks/preview/BlockPreview.vue'
import Editor from '@/components/editor/Editor.vue'
// import Login from '../views/Login.vue'
//import Dashboard from '@/views/Dashboard.vue'
//import Components from '@/views/Components.vue'
//import Moka from '@/views/Moka.vue'
//import Logout from '@/views/Logout.vue'
//import ImageEditor from '@/components/media/editor/whoobe.filerobot'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/editor',
    name: 'Editor',
    component: Editor
  },
  {
    path: '/preview',
    name: 'Preview',
    component: Preview
  },
//   {
//     path: '/login',
//     name: 'Login',
//     component: Login
//   },
//   { 
//     path: '/desktop',
//     name: 'Desktop',
//     component: Desktop
//   },
  {
    path: '/preview/:slug',
    name: 'PreviewSlug',
    component: Preview
  },
  /*
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/components',
    name: 'Components',
    component: Components
  },
  {
    path: '/moka',
    name: 'Moka',
    component: Moka
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/preview',
    name: 'Preview',
    component: Preview
  },
  {
    path: '/imageeditor',
    name: 'Image Editor',
    component: ImageEditor
  },
  {
    path: '/component/:path',
    name: 'Component',
    //component: () => import(/* webpackChunkName: "whoobe"  '../' + path)
  }
  */
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
