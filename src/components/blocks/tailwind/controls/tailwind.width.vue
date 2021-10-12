<template>
    <div class="flex flex-col">
        {{ $attrs.title }} 
        <select class="w-full nodark" v-model="model" @change="$emit('input',model),$emit('css',model)">
            <option value=""></option>
            <option v-for="opt in options" :value="opt.value">{{ opt.label }}</option>
        </select>
    </div>
</template>

<script>
import classes from '@/scripts/tw.classes'
export default {
    data:()=>({
        model: '',
        /*
        options: [ 
            { label: 'auto', value: 'w-auto' }, 
            { label: '0' , value: 'w-0' } , 
            { label: '1' , value: 'w-1' } , 
            { label: '2' , value: 'w-2' } , 
            { label: '3' , value: 'w-3' } , 
            { label: '4' , value: 'w-4' } , 
            { label: '5' , value: 'w-5' } , 
            { label: '6' , value: 'w-6' } , 
            { label: '8' , value: 'w-8' } , 
            { label: '10', value: 'w-10'}, 
            { label: '12', value: 'w-12'} , 
            { label: '16', value: 'w-16'} , 
            { label: '20', value: 'w-20'} ,
            { label: '24', value: 'w-24'} , 
            { label: '32', value: 'w-32'} , 
            { label: '40', value: 'w-40'} , 
            { label: '48', value: 'w-48'} , 
            { label: '56', value: 'w-56'} , 
            { label: '64', value: 'w-64'} ,
            { label: '8%' , value: 'w-1/12'} , 
            { label: '16%' , value: 'w-1/6'} , 
            { label: '20%' , value: 'w-1/5' },
            { label: '25%' , value: 'w-1/4'}, 
            { label: '33%' , value: 'w-1/3'} , 
            { label: '40%' , value: 'w-2/5'} , 
            { label: '50%' , value: 'w-1/2'} , 
            { label: '60%' , value: 'w-3/5'} , 
            { label: '66%' , value: 'w-2/3'} ,
            { label: '75%' , value: 'w-3/4'} , 
            { label: '80%' , value: 'w-4/5'} ,
            { label: '83%' , value: 'w-5/6'} , 
            { label: '90%' , value: 'w-11/12'} , 
            { label: '100%', value: 'w-full'} ,
            { label: 'screen', value: 'w-screen'} 
        ],
        */
    }),
    computed:{
        options(){
            return classes[this.$attrs.attr]
        }
    },
    props: [ 'css' ],
    mounted(){
        if ( !this.css.length ) return
        let classes = this.css.split(' ')
        classes.forEach ( cl => {
            this.options.forEach ( opt => {
                if ( this.$clean(cl) === opt.value  ){
                    this.model = cl
                    this.$emit('input',cl)
                    this.$emit('css',cl)
                }
            })
        })
    }

}
</script>