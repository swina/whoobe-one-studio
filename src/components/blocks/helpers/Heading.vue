<template>
    <div :class="$attrs.options?$attrs.options.css:'text-center'">
        Heading 
        <select v-if="!update" v-model="level" @change="createHeading" class="h-8">
            <option v-for="n in 6" :value="n">H{{n}}</option>
        </select>
        <select v-if="update" v-model="$store.state.editor.current.level" class="h-8">
            <option v-for="n in 6" :value="n">H{{n}}</option>
        </select>
    </div>
</template>

<script>
import Element from '@/scripts/ElementsClass'
export default {
    name: 'HeadingHelper',
    data:()=>({
        n: 1,
        level: null,
        update: null
    }),
    methods:{
        createHeading(){
            if ( this.level && this.$store.state.editor.current ){
                let heading = new Element().createElement('Heading',this.level)
                this.$store.state.editor.current.blocks.push ( heading )
                this.$emit('close')
            }
        }
    },
    mounted(){
        this.$attrs && this.$attrs.options ?
            this.$attrs.options.update ? this.update = true : null : null
    }

}
</script>