<template>
    <div class="pages-gallery bg-white w-screen overflow-hidden max-h-screen h-screen mt-0 inset-0" :key="galleryID">
        <div class="py-1 mt-8 bg-white shadow w-screen z-modal hidden md:flex md:flex-row items-center">
            <div class="flex items-center pl-2">
                <button class="mr-2 rounded btn-purple py-1 px-2 absolute right-0" @click="freeKits=!freeKits" title="Load Whoobe UI Kits">Whoobe UI Kits</button>
                <select class="mr-2 rounded ring-1 ring-purple-500 bg-gray-200 py-2" v-model="$store.state.desktop.library" @change="importUIKit()">
                    <option v-for="uikit in $store.state.desktop.uikits" :value="uikit">{{ uikit.name }}</option>
                </select>
                <i-icon icon="bx:bx-import" class="icon-button border cursor-pointer text-2xl" @click="$dialogBus('importUIKit')" title="Upload UI Kit"/>
                <i-icon v-if="$store.state.desktop.library" icon="bx:bx-export" class="icon-button border cursor-pointer text-2xl" @click="$exportCustomLibrary()" title="Export UI Kit"/>

                <m-icon icon="add" css="icon-button cursor-pointer text-2xl border" @click="$dialogBus('createUIKit')" title="Create a new UI Kit"/>
                <div class="border-l h-10 w-1"></div>
                <button class="btn btn-blue border-0 rounded" @click="$dialogBus('startEmpty')" title="Create a new template">New Template</button>
            </div>
            <div v-if="freeKits && whoobeKits" class="absolute right-0 top-0 mt-20 ml-2 w-64 shadow flex flex-col p-2 bg-white z-modal cursor-pointer border">
                <template v-for="kit in whoobeKits">
                    <div class="hover:bg-purple-500 hover:text-white p-1" @click="loadUIKit(kit.url)">{{kit.name}}</div>    
                </template>
                <!-- <div class="hover:bg-purple-500 hover:text-white p-1" @click="loadUIKit('https://whoobe-one-studio.vercel.app/kits/Landing-Pages-UI-Kit.json')">Landing Pages</div>
                <div class="hover:bg-purple-500 hover:text-white p-1" @click="loadUIKit('https://whoobe-one-studio.vercel.app/kits/Leading-UI-Kit.json')">Leading</div>
                <div class="hover:bg-purple-500 hover:text-white p-1" @click="loadUIKit('https://whoobe-one-studio.vercel.app/kits/CTA-UI-Kit.json')">CTA</div>
                <div class="hover:bg-purple-500 hover:text-white p-1" @click="loadUIKit('https://whoobe-one-studio.vercel.app/kits/Form-UI-Kit.json')">Form</div>
                <div class="hover:bg-purple-500 hover:text-white p-1" @click="loadUIKit('https://whoobe-one-studio.vercel.app/kits/Hero-UI-Kit.json')">Hero</div>
                <div class="hover:bg-purple-500 hover:text-white p-1" @click="loadUIKit('https://whoobe-one-studio.vercel.app/kits/Navigation-UI-Kit.json')">Navigation</div> -->
            </div>
        </div>
        <ComponentsGallery v-if="pages" :dbmode="false" :pages="pages" :skip="skip" :limit="limit"/>
    </div>
</template>

<script>
import Template from '@/scripts/templates'
export default {
    name: 'UIKits',
    components:{
        'ComponentsGallery' : () => import ( './ComponentsGallery.vue')
    },
    data:()=>({
        limit: 0,
        skip:0,
        pages : null,
        total: 0,
        galleryID: null,
        freeKits: false,
        whoobeKits: null
    }),
    watch:{
        '$store.state.desktop.library':function(value){
            this.galleryID = this.$randomID()
            this.importUIKit()
        },
    },
    methods:{
        loadUIKit(kit){
            this.$loading(true)
            try {
                fetch ( kit ).then ( res => res.json() ).then ( data => {
                    this.$store.dispatch ( 'add_uikit' , data)
                    this.$store.dispatch ( 'library' , data )
                })
            } catch ( err ){
                console.log ( err )
            } 
            this.$loading()
            this.freeKits = false
        },
        importUIKit(){
            let kit = this.$store.state.desktop.library
            this.pages = [ ...kit.templates ]
            this.total = kit.templates.length
            this.kit = this.$store.state.desktop.library
        },
    },
    mounted(){
        this.whoobeKits = new Template().kits()
        this.$store.state.desktop.library && this.$store.state.desktop.library.templates.length ?
            this.pages = this.$store.state.desktop.library.templates :
                this.$dialogBus('createUIKit')
        this.galleryID = this.$randomID()
    }
}
</script>