<template>
    <div v-if="$store.state.desktop.library">
        <label>UI Kit</label>
        <select class="mr-2 rounded ring-1 ring-purple-500 bg-gray-200 py-2" v-model="$store.state.desktop.library">
            <option v-for="uikit in $store.state.desktop.uikits" :value="uikit">{{ uikit.name }}</option>
        </select> 
        <div class="font-bold text-lg">{{ $store.state.desktop.library.name }}</div>
        <label>Save as </label>
        <div class="flex">
            <input type="text" v-model="$store.state.editor.page.name"/>
            <button class="btn btn-blue" @click="printPage()">Save</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddToLibrary',
    
    methods:{
         addToUKit(){
            let library = this.$store.state.desktop.library
            library.templates.forEach ( ( template , index  ) => {
                if ( template.blocks_id === this.$store.state.editor.page.blocks_id ){
                    library.templates.splice(index,1)
                }
            })
            library.templates.push ( this.$store.state.editor.page )
            this.$store.dispatch ( 'library' , library )
            window.localStorage.setItem ( 'whoobe-ui-kit' , JSON.stringify( library) )
            this.$dialogBus ( 'closeDialog' )
            this.$editorBus('editorMessage','Saved to ' + library.name)
            this.addToCustom = false
        },
        async printPage() {
            this.$loading()
            this.$store.dispatch ( 'setCurrent' , null )
            let el , options
            el = document.querySelector('#BlockEditor')
            options = { type: "dataURL" , useCORS: true , scale: 0.50 }
            let screenshot = await this.$html2canvas(el, options)
            this.printScreen = screenshot
            this.$store.state.editor.page.image = screenshot
            //this.$savePage()
            this.$loading()
            this.addToUKit()
        },
    },
    mounted(){
        if ( !this.$store.state.desktop.library ){
            this.$dialogBus ( 'closeDialog' )
            this.$dialogBus ( 'customLibrary' )
        }
    }

}
</script>