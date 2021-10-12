<template>
    <div>
        <div v-html="$attrs.options.html"/>
        <button class="lg bg-red-500 mr-2 rounded" @click="$router.push('/'),$emit('close')">Close</button>
        <button class="lg bg-blue-500 rounded" @click="$savePage(),$router.push('/'),$emit('close')">Save</button>
    </div>
</template>