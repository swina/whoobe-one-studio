<template>
    <div v-if="$attrs.slider.blocks.length" class="relative" :class="Object.values($attrs.slider.css).join(' ')" @click="next" x-data="{active:0,index:0}">
        <div :ref="$attrs.slider.id" class="snap overflow-hidden relative flex-no-wrap flex transition-all" x-ref="slider"
        >
            <div v-for="(slide,index) in $attrs.slider.blocks" :key="index" class="w-full flex-shrink-0 overflow-hidden flex items-center justify-center">
            <BlockContainer
                :doc="slide" 
                :key="'slide_' + currentIndex"
                />
                
            </div>
        </div>
        <div class="flex justify-center m-auto w-full bottom-0 absolute z-10 items-center cursor-pointer">
            <div ref="prevBtn" class="flex items-center"><m-icon icon="chevron_left" class="text-3xl"/></div>
            <template v-for="(dot,i) in $attrs.slider.blocks.length">
                <span ref="dots" class="h-3 w-3 rounded-full shadow bg-gray-700 mx-2"></span>
            </template>
            <div ref="nextBtn" class="flex items-center"><m-icon icon="chevron_right" class="text-3xl"/></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BlockSliderPreview',
    components: {
        'BlockContainer' : () => import ( './BlockContainer.vue' )
    },
    data:()=>({
        currentIndex: 0
    }),
    methods:{
        next(){
            this.currentIndex < ( this.$attrs.slider.blocks.length -1 ) ? this.currentIndex++ : this.currentIndex = 0
        }
    },
    mounted(){
        this.$refs[this.$attrs.slider.id].setAttribute ('x-on:scroll.debounce','active = Math.round($event.target.scrollLeft / ($event.target.scrollWidth / ' + this.$attrs.slider.blocks.length +'))')

        this.$refs.prevBtn.setAttribute('x-on:click','$refs.slider.scrollLeft = $refs.slider.scrollLeft - ($refs.slider.scrollWidth / ' + this.$attrs.slider.blocks.length +'),index>0?index--:null')

        this.$refs.nextBtn.setAttribute('x-on:click','$refs.slider.scrollLeft = $refs.slider.scrollLeft + ($refs.slider.scrollWidth / ' + this.$attrs.slider.blocks.length +'),index++')

        this.$attrs.slider.blocks.forEach ( (b,index) =>{
            this.$refs.dots[index].setAttribute ( 'x-bind:class' ,"{'bg-white  animate-pulse':active===" + index + "}")
            
        })
       
    }
}
</script>

<style>
.snap {
  -ms-scroll-snap-type: x mandatory;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  scroll-behavior: smooth
}
</style>