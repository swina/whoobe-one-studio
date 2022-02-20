<template>
    <div class="flex flex-col p-2 text-sm">
        Svelte Transition
        Type
        <select v-model="transition.name">
            <option v-for="t in transitions" :value="t">{{ t }}</option>
        </select>
        Delay <input type="number" v-model="transition.delay" min="0" max="1000000"/>
        Duration <input type="number" v-model="transition.duration" min="0" max="1000000"/>
        Easing 
        <select v-model="transition.easing">
            <option v-for="ease in easing" :value="ease">{{ ease }}</option>
        </select>

        transition:{{ transition.name }} , duration:{{transition.duration}} , delay:{{transition.delay}} easing:{{transition.easing}}InOut
    </div>
</template>

<script>
export default {
    name: 'Svelte',
    data:()=>({
        current: {
            transition: '',
            delay: 0,
            easing: 'linear'
        },
        transitions: [
            'fade',
            'blur',
            'fly',
            'slide',
            'scale',
            'draw',
            'crossfade'
        ],
        transition: {
            name: 'fade',
            delay: 0,
            duration: 0,
            easing: ''
        },
        easing: [
            'ease',
            'back',
            'bounce',
            'circ',
            'cubic',
            'elastic',
            'expo',
            'quad',
            'quart',
            'quint',
            'sine'
        ]
    })
}
</script>