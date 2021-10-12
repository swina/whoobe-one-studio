<template>
        <div class="flex flex-col overflow-y-auto overflow-x-hidden absolute inset-0">
            <BlockContainer 
                v-if="doc" 
                :doc="doc" 
                :key="doc.id" 
                id="content"/>
        </div>
</template>

<script>
export default {
    name:'PreviewFrame',
    components:{
        'BlockContainer' : () => import ( './BlockContainer.vue')
    },
    computed:{
        doc(){
            
            return JSON.parse(window.localStorage.getItem('whoobe-preview'))
        }
    }
}
</script>