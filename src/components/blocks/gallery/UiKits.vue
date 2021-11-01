<template>
    <div class="pages-gallery bg-white w-screen overflow-hidden max-h-screen h-screen mt-0 inset-0" :key="galleryID">
        <div class="py-1 mt-8 bg-white shadow w-screen z-modal hidden md:flex md:flex-row items-center">
            <div class="flex items-center pl-2">
                <select class="mr-2 rounded ring-1 ring-purple-500 bg-gray-200 py-2" v-model="$store.state.desktop.library" @change="setCurrentUIKit()">
                    <option v-for="uikit in $store.state.desktop.uikits" :value="uikit">{{ uikit.name }}</option>
                </select>
                <i-icon icon="bx:bx-import" class="icon-button border cursor-pointer text-2xl" @click="$dialogBus('importUIKit')" title="Upload UI Kit"/>
                <i-icon v-if="$store.state.desktop.library" icon="bx:bx-export" class="icon-button border cursor-pointer text-2xl" @click="$exportCustomLibrary()" title="Export UI Kit"/>

                <m-icon icon="add" css="icon-button cursor-pointer text-2xl border" @click="$dialogBus('createUIKit')" title="Create a new UI Kit"/>
                <div class="border-l h-10 w-1"></div>
                <button class="btn btn-blue border-0 rounded" @click="$dialogBus('startEmpty')" title="Create a new template">New Template</button>
            </div>
        </div>
        <ComponentsGallery v-if="pages" :dbmode="false" :pages="pages" :skip="skip" :limit="limit" @skip="skipPage"/>
    </div>
</template>

<script>
export default {
    name: 'UIKits',
    components:{
        'ComponentsGallery' : () => import ( './ComponentsGallery.vue')
    },
    data:()=>({
        pages : null,
        total: 0,
        galleryID: null
    }),
    watch:{
        '$store.state.desktop.library':function(value){
            this.galleryID = this.$randomID()
            this.importUIKit()
        },
    },
    methods:{
        importUIKit(){
            let kit = this.$store.state.desktop.library
            this.pages = [ ...kit.templates ]
            this.total = kit.templates.length
            this.kit = this.$store.state.desktop.library
        },
    },
    mounted(){
        this.$store.state.desktop.library && this.$store.state.desktop.library.templates.length ?
            this.pages = this.$store.state.desktop.library.templates :
                this.$dialogBus('createUIKit')
        this.galleryID = this.$randomID()
    }
}
</script>