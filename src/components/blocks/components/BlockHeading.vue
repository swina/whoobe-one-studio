<template>
    <div ref="blockAction">
        <select class="p-1" v-model="$store.state.editor.current.level">
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