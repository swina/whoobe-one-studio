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
        <div :class="navigationClass" class="slider-navigation cursor-pointer">
            <div ref="prevBtn" class="flex items-center"><m-icon :icon="iconLeft" class="text-5xl"/></div>
            <template v-for="(dot,i) in $attrs.slider.blocks.length">
                <span ref="dots" class="h-3 w-3 rounded-full shadow bg-gray-700 m-2"></span>
            </template>
            <div ref="nextBtn" class="flex items-center"><m-icon :icon="iconRight" class="text-5xl"/></div>
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
        currentIndex: 0,
        iconLeft: 'chevron_left',
        iconRight: 'chevron_right'
    }),
    computed:{
        navigationClass(){
            if ( !this.$attrs.slider && !this.$attrs.slider.data && !this.$attrs.slider.data.slider ) return
            let position = this.$attrs.slider.data.slider.navigation.position
            position === 'left' || position === 'right' ? 
                ( this.iconLeft = 'expand_less' , this.iconRight = 'expand_more' ) : null
            return position === 'bottom' ?
                'flex justify-center m-auto w-full bottom-0 absolute z-10 items-center' :
                    position === 'left' ?
                        'flex flex-col h-full absolute top-0 left-0 justify-center items-center z-modal' :
                            position === 'right' ?
                                'flex flex-col h-full absolute top-0 right-0 justify-center items-center z-modal' : 
                                position === 'top' ?
                                    'flex justify-center m-auto w-full top-0 absolute z-10 items-center' :
                                        'flex justify-center m-auto w-full bottom-0 absolute z-10 items-center' 
        }
    },
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
            this.$refs.dots[index].setAttribute ( 'x-bind:class' ,"{'bg-blue-100  animate-pulse':active===" + index + "}")
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