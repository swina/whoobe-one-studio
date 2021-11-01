<template>
    <div class="flex flex-col" v-if="blocks">
        <template v-for="(block,index) in blocks">
            <div class="flex items-center text-lg hover:bg-purple-800 hover:text-white cursor-pointer px-1" @click="openPage(block)">{{ index+1 }}. {{ block.name }} <span class="absolute right-0 mr-2 chip text-sm bg-gray-200">{{ block.category }}</span></div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'CustomLibrary',
    data:()=>({
        blocks: null
    }),
    methods:{
        openPage(page){
            page.id = 0
            this.$store.dispatch ( 'setPage' , page )
            this.$store.dispatch ( 'document' , page.json.blocks )
            this.$store.dispatch( 'add_tab' , { label: page.name , object: page , type: 'editor'})
            this.$dialogBus ( 'closeDialog' )
        }
    },
    mounted(){
        this.blocks = JSON.parse ( window.localStorage.getItem ( 'whoobe-custom-library') )

    }
}
</script>