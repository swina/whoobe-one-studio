<template>
    <div class="w-64 flex flex-col p-2" v-if="slider && slider.data && slider.data.slider">
        <label>Navigation</label>
        <input type="checkbox" v-model="slider.data.slider.navigation.enable"/>
        <label>Arrows</label>
        <!-- <input type="checkbox" v-model="slider.data.slider.navigation.arrows"/>
        <label>Dots indicators</label> -->
        <input type="checkbox" v-model="slider.data.slider.navigation.dots"/>
        <label>Position</label>
        <select v-model="slider.data.slider.navigation.position">
            <option value="bottom">bottom</option>
            <option value="side">side</option>
            <option value="left">left</option>
            <option value="right">right</option>
            <option value="top">top</option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'BlockSliderControls',
    data:()=>({
        slider: null,
        sliderControls: {
            navigation: {
                enable: true,
                dots: true,
                arrows: true,
                position: 'bottom'
            }
        }
    }),
    mounted(){
        this.slider = this.$store.state.editor.current
        if ( !this.slider.data.hasOwnProperty('slider') ){
            this.slider.data.slider = this.sliderControls
        }
    }
}
</script>
