<template>
<div class="fixed top-0 bg-gray-700 text-white p-2 w-full z-modal cursor-pointer right-0">
    
        <div class="flex flex-row justify-start">
            <div>
                <div class="flex items-center mb-4">
                    Current 
                    <div class="h-8 w-8 rounded-full ml-2" :class="$attrs.context?$attrs.css.replace('text-','bg-').replace('hover:',''):''"></div>
                </div>
                <div class="flex flex-row m-auto mb-2">
                    
                    <i class="material-icons border border-black text-xl font-bold rounded-full h-6 w-6 mr-2 bg-transparent text-red-500 flex items-center justify-center" title="transparent" @click="$emit('color','','')">clear</i>
                    <div class="border border-black rounded-full  w-6 h-6 mr-2 bg-white" title="white" @click="$emit('color','white','')"></div>
                    <div class="border border-black rounded-full  w-6 h-6 mr-2 bg-black" title="black" @click="$emit('color','black','')"></div>
                </div>
        
                <div class="m-auto">
                    
                    <div v-for="(colore,c) in colors">
                        
                        <div :key="'color_' + c" class="flex flex-row mb-2">

                            <div 
                                :key="density + '_' + colore + '_' + n" 
                                v-for="n in 10" 
                                :title="colore + '-' +  n===1?n*50:n*100"
                                :class="getColor(n,colore) + ' rounded-full border border-black  w-5 h-5 mr-1'" @click="$emit('color',colore,n*100)">
                            </div>
                        </div>            
                    </div>
                </div>
                <!--
                <div class="m-auto text-sm">
                    Opacity <input type="range" min="0" max="100" step="25" class="text-gray-300" v-model="opacity"/> {{getopacity()}}
                </div>
                -->
            </div>
            <div v-if="$attrs.field">
                Image <i class="material-icons text-white text-sm border rounded-full" v-if="!$attrs.field.image" @click="$emit('media')">add</i>
                <img :src="$attrs.field.image.url" v-if="$attrs.field.image" @click="$emit('media')"/>
                <span v-if="$attrs.field.image" class="text-xs" @click="remove">Remove</span>
            </div>
        
    </div>
    <!--
    <div>Class</div>
    <input type="text" placeholder="custom class" class="text-xs text-gray-600 p-1 w-full" @input="setCSS" v-model="$attrs.css"/>
    -->
    <button class="mt-1 xs" @click="$emit('close')">OK</button>
</div>
</template>

<script>
import classes from '@/scripts/tw.classes'
export default {
    name: 'Palette',
    data:()=>({
        neutral: [ 'transparent' , 'white' , 'black' ],
        //colors: [ 'gray' , 'bluegray' , 'brown' , 'red', 'orange' , 'yellow' , 'green' , 'lime' , 'teal' , 'blue' , 'indigo' , 'purple' , 'pink' ],
        density: {
            extralight : 100 ,
            verylight : 200 ,
            mediumlight: 300 ,
            light: 400 ,
            normal: 500 ,
            mediumdark: 600 ,
            dark: 700 ,
            verydark: 800 ,
            extradark: 900 
        },
        css: '',
        opacity: 100
    }),
    computed:{
        colors(){
            return classes['colors']
        }
    },
    mounted(){
        this.css = this.$attrs.css
    },
    watch: {
        opacity(v){
            this.$emit ( 'opacity' , v )
        }
    },
    methods:{
        setCSS(){
            this.$emit('classe',this.$attrs.css)
        },
        remove(){
            console.log('remove image')
            this.$emit('removeimage')
        },
        getColor(n,color){
            return n === 1 ? 'bg-' + color + '-50' : 'bg-' + color + '-' + (n-1)*100
        }
    }
}
</script>