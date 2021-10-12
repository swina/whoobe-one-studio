<template>
    <Editor/>
</template>

<script>
export default {
    name: 'EditorView',
    components:{
        'Editor'        : () => import ( '@/components/editor/Editor.vue')
    }
}
</script>