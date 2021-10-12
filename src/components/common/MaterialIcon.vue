<template>
    <i class="material-icons" :class="$attrs.css" @click="$emit('click')">{{$attrs.icon}}</i>
</template>