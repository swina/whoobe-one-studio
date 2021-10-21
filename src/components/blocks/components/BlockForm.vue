<template>
    <div ref="blockAction" class="flex flex-col p-2 pr-20">
        <label>Name</label>
        <input type="text" v-model="$store.state.editor.current.data.attributes.name"/>
        <label>ID</label>
        <input type="text" v-model="$store.state.editor.current.data.attributes.id"/>
        <label>Action</label>
        <input type="text" v-model="$store.state.editor.current.data.attributes.action"/>
        <label>Method</label>
        <input type="text" v-model="$store.state.editor.current.data.attributes.method"/>
    </div>
</template>

<script>
export default {
    name: 'BlockForm',
}
</script>