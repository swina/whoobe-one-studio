<template>
    <div class="flex flex-col p-4 items-center">
        <input type="file" class="absolute top-0 left-0 right-0 bottom-0 opacity-0"  accept="*.json" @change="loadTextFromFile($event),loading=true"/>
        <button class="btn-blue w-full warning">Select File</button>
        <m-icon v-if="loading" icon="bubble_chart" class="animate-spin text-4xl"/>
    </div>
</template>

<script>
import { eventBus } from '@/main'
export default {
    name: 'ImportFile',
    data:()=>({
        loading: false,
    }),
    methods:{
        loadTextFromFile(ev) {
            this.loading = true
            const file = ev.target.files[0];
            const reader = new FileReader();
            reader.onload = e => { 
                this.loading = true
                let page = e.target.result 
                try {
                    page = JSON.parse(page) 
                    if ( this.$attrs.options.mode === 'page' ){
                        if ( !page.hasOwnProperty('json') ){
                            eventBus.$emit ( 'error' , 'File selected is a block and not a valid page.')
                            //this.$emit ( 'close' )
                            return
                        }
                        delete page.id
                        page.id = 0
                        this.$store.dispatch ( 'setPage' , page )
                        this.$store.dispatch ( 'document' , page.json.blocks )
                        this.loading = false
                    } 
                    if ( this.$attrs.options.mode === 'kit' ){
                        this.$store.dispatch ( 'add_uikit' , page)
                        this.$store.dispatch ( 'library' , page )
                        //this.$dialogBus('pages','kit')
                    }   else {
                        if ( this.$store.state.editor.current ){
                            if ( page.hasOwnProperty('json') ){
                                page = page.json.blocks
                            }
                            this.$store.state.editor.current.blocks.push ( page )
                            this.$store.dispatch ( 'setCurrent' , page )
                            this.loading = false
                        }
                    }
                    this.loading = false
                    this.$emit('close')
                    eventBus.$emit ( 'notification' , 'File imported correctly' )
                } catch ( err ){
                    console.log ( err )
                    this.loading = false
                    eventBus.$emit ( 'error' , 'File not supported' )
                }
            }
            reader.readAsText(file)
        },
    }
}
</script>