<template>
    <div ref="blockAction" class="flex flex-col p-2 pr-20">
        
        <label>Name</label>
        <input type="text" v-model="$store.state.editor.current.data.attributes.name"/>
        <label>ID</label>
        <input type="text" v-model="$store.state.editor.current.data.attributes.id"/>
        <label>Options</label>
        <textarea class="w-full h-48" v-model="options">

        </textarea>
        <small>Set an option on a single line</small>
        <button class="btn-blue rounded border-0" @click="applyOptions()">Apply</button>
    </div>
</template>

<script>
export default {
    name: 'BlockInput',
    data:()=>({
        options: null
    }),
    methods:{
        applyOptions(){
            let opts = this.options.split('\n')
            console.log ( opts )
            let current = this.$store.state.editor.current
            current.data.options = [ ...opts]
            let el = document.getElementById( current.id ) 
            for ( var i=el.options.length ; i>=0 ; i--){
                el.remove(i)
            }
            opts.forEach ( option => {
                let selectOption = document.createElement('option')
                selectOption.value = option
                selectOption.text = option
                el.add ( selectOption )
            })
            this.$store.dispatch ( 'setCurrent' , current )
        }
    },
    mounted(){
        this.options = this.$store.state.editor.current.data.options.join('\n')
    }
}
</script>