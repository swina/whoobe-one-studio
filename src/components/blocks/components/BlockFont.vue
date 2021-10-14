<template>
    <div ref="blockAction" class="w-56 bg-white p-1 flex flex-col" v-if="$store.state.editor.current">
        <label>Font</label>
        <select v-model="$store.state.editor.current.font" class="w-full">
            <option value=""></option>
            <option value="Arial">sans-serif</option>
            <option value="serif">serif</option>
            <option value="monospace">monospace</option>
            <option v-for="font in fonts" :value="font">{{ font.replace('+',' ') }}</option>
        </select>
        <label>Size {{ oldFontSize }}</label>
        <select v-model="fontSize" class="w-full">
            <option value=""></option>
            <option v-for="size in sizes" :value="size">{{size.replace('text-','')}}</option>
        </select>
        <!-- <TailwindTextFont :stile="$store.state.editor.current.style" @stile="setStyle" @clearStile="clearStyle"/> -->
    </div>
</template>

<script>
import classes from '@/scripts/tw.classes'
export default {
    name: 'BlockFont',
    data:()=>({
        fontSelected: '',
        fontSize: '',
        entryCss: [],
        oldFontSize: ''
    }),
    computed: {
        fonts(){
            return process.env.VUE_APP_FONT_FAMILIES.split('|')
        },
        sizes(){
            return classes.textSize
        },
    },
    watch: {
        fontSelected(fnt){
            console.log ( fnt )
        },
        fontSize(size){
            this.entryCss.push ( size )
            this.$store.state.editor.current.css.css = this.entryCss.join ( ' ' )
            this.oldFontSize = ''
        }
    },
    mounted(){
        let position = this.$refs.blockAction.getBoundingClientRect()
        this.$emit('position',position.height)
        let cls = this.$store.state.editor.current.css.css
        if ( cls ){
            let a = cls.split(' ').filter ( a => { return a })
            let b = []
            a.map ( cl => {
                if ( !this.sizes.includes ( cl ) ) {
                    b.push ( cl )
                } else {
                    this.oldFontSize = cl.replace('text-','')
                }
            })
            this.entryCss = b
        }
        
    }
   
}
</script>