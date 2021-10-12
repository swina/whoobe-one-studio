<template>
    <div class="p-2">
        <strong>Event Bus</strong>
        <template v-for="event in Object.keys($store.state.editor.current.events)">
            <div :key="event" class="">@{{ event }}</div>
            <input type="text" class="p-1 bg-gray-100 w-full" v-model="$store.state.editor.current.events[event]"/>
        </template>
    </div>
</template>