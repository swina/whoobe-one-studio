<template>
    <div class="flex flex-row">
        <div v-for="(radio,i) in options" class="flex flex-row items-center text-base m-2" :key="i">
            <div class="flex flex-row items-center text-black bg-transparent border-0 hover:bg-transparent" @click="setOption(radio.value,i,$event)">
            <m-icon :icon="icon(i)" :css="classe"/>
            <span class="ml-1" :class="classe">{{ radio.label }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Radio',
    props: [ 'options' ],
    data:()=>({
        index:0,
        option: null
    }),
    computed:{
        classe(){
            return this.$attrs.classe ? this.$attrs.classe : ''
        }
    },
    methods:{
        icon(i){
            return i === this.index ? 'radio_button_checked' : 'radio_button_unchecked'
        },
        setOption(value,i,e){
            e.preventDefault()
            this.index = i
            this.$emit('option',value)
        }
    }
}
</script>