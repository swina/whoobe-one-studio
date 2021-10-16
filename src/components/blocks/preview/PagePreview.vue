<template>
<div class="w-screen -mt-10">
    <div class="flex flex-col overflow-y-auto absolute inset-0 laptop-view">
        <BlockContainer 
            v-if="doc" 
            :doc="doc" 
            :key="doc.id" 
            id="content"/>
    </div>
</div> 
</template>

<script>
export default {
    name: 'PagePreview',
    components: {
        'BlockContainer' : () => import ( '@/components/blocks/preview/BlockContainer.vue')
    },
    computed:{
        doc(){
            return JSON.parse ( window.localStorage.getItem ( 'whoobe-preview' ) ).json.blocks 
        }
    },
    mounted(){
        console.log ( this.$refs )
    }
}
</script>


