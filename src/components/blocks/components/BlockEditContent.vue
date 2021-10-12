<template>
    <div id="contentEditor" ref="contentEditor" class="z-highest border bg-white shadow absolute top-0 left-0 flex flex-col items-start justify-around flex-col w-1/3 p-1" :style="stile" v-if="$store.state.editor.current">
        <textarea v-if="$store.state.editor.current.element != 'p' && $store.state.editor.current && $store.state.editor.current.element!='img'" class="p-1 h-40 rounded w-full  text-base" v-model="$store.state.editor.current.content"/>
        <!-- <button class="m-2" v-if="$store.state.editor.current.element === 'p'">Advanced Editor</button> -->
        <!-- <BlockTipTap v-if="$store.state.editor.current.element === 'p'" v-model="$store.state.editor.current.content"></BlockTipTap> -->
    </div>
</template>

<script>
export default {
    name: 'BlockEditContent',
    components: {
        'BlockTipTap' : () => import ( '@/components/blocks/components/BlockTipTap.vue' )
    },
    computed:{
        stile(){
            return 'top:' + this.$attrs.coords.top + 'px;left:' + this.$attrs.coords.left + 'px;resize:both;'
        }
    },
    mounted(){
        let coords = this.$refs.contentEditor.getBoundingClientRect()
        if ( coords.right > window.innerWidth - 300 ){
            this.$refs.contentEditor.style.left = coords.left - 200 + 'px'
        }
        if ( this.$store.state.editor.current.element === 'p' ){
            this.$dialogBus ( 'TipTapEditor')
        }
        // if ( this.$store.state.editor.current ){
        //     let el = document.getElementById('contentEditor')
        //     let coords = el.getBoundingClientRect()
        //     console.log ( coords )
        // }
    }
}
</script>