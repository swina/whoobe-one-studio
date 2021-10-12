<template>
    <div class="modal flex flex-col">
        <div class="absolute right-0 top-0 m-1 text-white"><m-icon icon="close" class="text-3xl" @click="$emit('close')"/></div>
        <div class="p-2 bg-indigo-500 text-white">
            <slot name="title"></slot>
        </div>
        
            <slot name="body"></slot>
            <slot name="footer"></slot>
        
    </div>
</template>

<script>
export default {
    name: 'Modal'
}
</script>