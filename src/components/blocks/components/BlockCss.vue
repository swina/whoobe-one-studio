<template>
    <div class="flex flex-col w-full h-full items-start p-2 bg-bluegray-200">
        <label class="font-bold my-1">CSS</label>
        <textarea v-model="$store.state.editor.current.css.css" class="text-sm font-mono w-full h-1/4 bg-white shadow p-1"/>
        <label class="font-bold my-1">Container CSS</label>
        <textarea v-model="$store.state.editor.current.css.container" class="text-sm font-mono w-full h-1/5 bg-white shadow p-1"/>
        <label class="font-bold my-1">Style</label>
        <textarea v-model="$store.state.editor.current.style" class="text-sm font-mono w-full h-1/6 bg-white shadow p-1"/>
        <label class="font-bold my-1">Semantic</label>
        <select v-model="$store.state.editor.current.semantic" class="w-full mr-4">
            <option value=""></option>
            <option v-for="semantic in semantics" :value="semantic">{{ semantic }}</option>
        </select>
    </div>
</template>

<script>
import classes from '@/scripts/tw.classes'
export default {
    name: 'BlockCss',
    data:()=>({
        semantics: null
    }),
    mounted(){
        this.semantics = classes.semantics
    }

}
</script>