<template>
    <iframe 
        v-if="el.content" 
        :src="el.src + el.content" 
        :class="Object.values(el.css).join(' ')" 
        :style="el.style"
        :autoplay="el.hasOwnProperty('options')?el.options.autoplay:true" 
        :controls="el.hasOwnProperty('options')?el.options.controls:true"
        :loop="el.hasOwnProperty('options')?el.options.loop:true">
    </iframe>
</template>


<script>
var gsap
export default {
    name: 'IFrameElement',
    props: [ 'el' ],
    computed:{
    },
   
    mounted(){
        gsap = this.$animation(this.el,this.el.id,this.$refs)
    },

    beforeDestroy(){
        if ( gsap ) gsap.timeline().kill()
    }
}
</script>