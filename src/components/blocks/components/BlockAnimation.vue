<template>
    <div class="p-2 flex flex-col">
        <strong>Animation</strong>
        <label>Name</label>
        <select class="p-1 bg-gray-100 w-full" v-model="$store.state.editor.current.gsap.animation">
            <option value="">none</option>
            <option v-for="animation in animations.gsapEffects" :value="animation">{{ animation }}</option>
        </select>
        <label>Ease</label>
        <select class="p-1 bg-gray-100 w-full" v-model="$store.state.editor.current.gsap.ease">
            <option v-for="ease in animations.gsapEase" :value="ease">{{ ease }}</option>
        </select>
        <label>Duration (ms)</label>
        <input class="p-1 bg-gray-100 w-full" type="text" min="1" v-model="$store.state.editor.current.gsap.duration"/>
        <label>Delay (ms)</label>
        <input class="p-1 bg-gray-100 w-full" type="text" min="0" v-model="$store.state.editor.current.gsap.delay"/>
        <p class="text-xs text-gray-300 absolute bottom-0 mb-20"><b>Animations require GSAP as animation engine.</b>.<br><br>Using whoobe-one-vite to deploy your template will automatically include the animation engine based on GSAP (GreenSock)</p>
    </div>
</template>

<script>
import gsapEffects from '@/scripts/animations'
import gsapEase from '@/scripts/animations'
export default {
    name: 'BlockAnimation',
    computed:{
        animations(){
            return gsapEffects
        }
    }
}
</script>