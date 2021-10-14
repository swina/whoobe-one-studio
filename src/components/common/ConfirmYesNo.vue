<template>
    <div>
        <div v-html="$attrs.options.html" class="py-10"/>
        <button class="lg bg-red-500 mr-2 rounded" @click="$eventBus('confirmYesNo',($attrs.options.context,false))">Cancel</button>
        <button class="lg bg-blue-500 rounded" @click="$eventBus('confirmYesNo',($attrs.options.context,true))">OK</button>
    </div>
</template>