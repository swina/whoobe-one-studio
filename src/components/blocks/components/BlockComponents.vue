<template>
    <div class="flex flex-col relative h-screen">
        <div class="absolute inset-0 overflow-y-auto w-full cursor-pointer bg-gray-100">
        <template v-for="component in $store.state.datastore.dataset.components.data">
            
            <div class="p-1 border-b">{{ component.name }} </div>

        </template>
        </div>
    </div>
</template>