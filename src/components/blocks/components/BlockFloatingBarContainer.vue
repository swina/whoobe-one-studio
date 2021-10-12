<template>
     <div v-if="$store.state.editor.current"  class="fixed z-10 top-0 left-0 h-6 flex items-center justify-center bg-white text-black shadow text-xs pr-2" :style="stile">
        <small class="ml-2">{{ $store.state.editor.current.tag }} </small>
        <m-icon v-if="$store.state.editor.current.tag != 'document'" class="floating-icon text-xl" icon="expand_less" @click="$editorBus('moveBlock',1)"/>
        <m-icon v-if="$store.state.editor.current.tag != 'document'" class="floating-icon text-xl" icon="content_copy" @click="$editorBus('duplicateBlock')"/>
        <!-- <m-icon class="floating-icon text-xl" icon="content_paste" @click="$editorBus('pasteBlock','block')"/> -->
        <m-icon class="floating-icon" icon="format_color_text" @click="$editorBus('BlockTextColor',)"/>
        <m-icon class="floating-icon" icon="format_color_fill" @click="$editorBus('formatBgColor')"/>
        <m-icon class="floating-icon" icon="photo" @click="$editorBus('imageURL')"/>
        <m-icon class="floating-icon" icon="brush" @click="$editorBus('customizeBlock')"/>
        <m-icon class="floating-icon" icon="link" @click="$editorBus('linkBlock')"/>
        <m-icon v-if="$store.state.editor.current.tag != 'document'" class="floating-icon" icon="delete" @click="$editorBus('deleteBlock')"/>
        <m-icon class="floating-icon" icon="expand_more" @click="$editorBus('contextMenuBlock',$event)"/>
    </div>
</template>

<script>
export default {
    name: 'BlockFloatingBarContainer',
    computed: {
        stile(){
           return `top:${this.$attrs.coords.top}px;left:${this.$attrs.coords.left}px;`
        }
    }
}
</script>