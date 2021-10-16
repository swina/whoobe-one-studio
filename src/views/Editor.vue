<template>
    <Editor class="h-screen"/>
</template>

<script>
export default {
    name: 'EditorView',
    components:{
        'Editor'        : () => import ( '@/components/editor/Editor.vue')
    },
    mounted(){
        if ( !this.$store.state.editor.page ) this.$router.push('/')
    }
}
</script>