<template>
    <div class="flex flex-col">
        <label class="font-bold">Font</label>
        <select class="p-2" v-model="fontFamily" @change="emit">
            <option value=""></option>
            <option value="Arial">sans-serif</option>
            <option value="serif">serif</option>
            <option value="monospace">monospace</option>
            <option v-for="font in fonts" :value="font">{{font}}</option>
        </select>
    </div>
</template>

<script>
import classes from '@/scripts/tw.classes'
import { mapState } from 'vuex'
export default {
    name: 'TailwindFont',
    data:()=>({
        fontFamily: ''
    }),
    computed:{
        ...mapState ( ['editor'] ),
        fonts(){
            return classes.fontfamily
        }
    },
    mounted(){
        if ( !this.$attrs.stile ) return
        let stile = this.$attrs.stile.split ( ' ' )
        stile.forEach ( st => {
            if ( st.length > 1 ){
                this.fonts.forEach ( ft => {
                    if ( st.indexOf ( ft ) > -1 ){
                        this.fontFamily = ft
                        this.$emit('stile' , 'font-family:\"' + ft + '\"' )
                        this.$emit('clearstile', 'font-family:\"' + ft + '\"' )
                    }
                })
            }
        })
    },
    methods:{
        getFont(font){
            if ( font.split(':') ){
                return font.split(':')[0].replace('+',' ')
            } 
            return font.replace('+',' ')
        },
        emit(){
            this.fontFamily ?
                this.$emit('stile' , 'font-family:\"' + this.fontFamily + '\"' ) :
                    this.$emit('stile' ,'')

        }
    }
}
</script>