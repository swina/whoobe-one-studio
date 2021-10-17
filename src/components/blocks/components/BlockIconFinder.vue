<template>
    <div ref="blockAction" class="">
        <input class="p-2" placeholder="search icon ..." type="text" v-model="search" @keydown="searchIcon($event)"/>
        <div v-if="icons" class="z-modal w-full overflow-y-auto bg-white shadow flex flex-row flex-wrap bg-white cursor-pointer">
            <template v-for="icon in icons">
                <div class="w-auto h-8 m-2 text-center hover:bg-gray-200" @click="setIcon(icon)">
                    <i class="iconify text-2xl" :data-icon="icon"></i>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'BlockIconify',
    data:()=>({
        search: '',
        icons: null
    }),
    computed:{
        ...mapState(['editor'])
    },
    methods: {
        searchIcon(e){
            if ( e.keyCode === 13 && e.target.value.length > 2){
                this.icons = null
                this.$icons ( e.target.value ).then ( res => {
                    this.icons = res.icons
                })
            }
        },
        setIcon(icon){
            //this.$emit('icon',icon)
            this.editor.current.data.icon = icon
            this.editor.current.content = icon
            this.$emit('close')
            this.icons = null
        }
    },
    mounted(){
        let position = this.$refs.blockAction.getBoundingClientRect()
        this.$emit('position',position.height)
    }
}
</script>