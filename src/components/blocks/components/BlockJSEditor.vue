<template>
    <div id="editorContainer" class="">
        <codemirror v-model="$store.state.editor.page.json.blocks.data[$attrs.options.lang]" class="h-full" :options="options" v-if="$attrs.options.lang==='javascript'"></codemirror>
        <codemirror v-model="options.content" class="h-full" :options="options" v-if="$attrs.options.lang==='html'"></codemirror>
    </div>
</template>

<script>
import { codemirror } from 'vue-codemirror-lite'
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/vue/vue')
require('codemirror/mode/xml/xml')
require('codemirror/mode/css/css')
require('codemirror/mode/htmlmixed/htmlmixed')

require('codemirror/addon/hint/show-hint.js')
require('codemirror/addon/hint/show-hint.css')
require('codemirror/addon/hint/javascript-hint.js')

export default {
    name: 'BlockJSEditor',
    components: { codemirror },
    data:()=>({
        options: null,
        code: '/*Place your code here*/'
    }),
    mounted(){
        if ( !this.$store.state.editor.page.json.blocks.data.hasOwnProperty(this.$attrs.options.lang) ){
            this.$store.state.editor.page.json.blocks.data[this.$attrs.options.lang] = ''
        }
        this.options = {
            content: this.$attrs.options.content || '',
            mode: this.$attrs.options.lang ,
            lineNumbers: true,
            extraKeys: {'Ctrl-Space': 'autocomplete'}
        }
    }
}
</script>