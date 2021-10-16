<template>
    <button class="flex items-center pl-1 justify-around relative" :class="$attrs.css" @click="$emit('click')">{{ $attrs.text }} <m-icon :icon="$attrs.icon" class="text-lg ml-2" @click="$emit('close')"/></button>
</template>