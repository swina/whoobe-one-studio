<template>
    <div ref="blockAction" class="w-40">
        <div class="p-1 bg-gray-200 w-full" @click="$emit('close')">Heading</div>
        <select class="p-1 m-1 w-5/6" v-model="$store.state.editor.current.level">
            <option v-for="n in 6" :value="n">H{{n}}</option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'BlockHeading',
    data:()=>({
        n: 1
    }),
    mounted(){
        let position = this.$refs.blockAction.getBoundingClientRect()
        this.$emit('position',position.height)
    }
}
</script>