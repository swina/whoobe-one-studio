<template>
    <div class="flex flex-col p-4 items-center">
        <input type="file" class="absolute top-0 left-0 right-0 bottom-0 opacity-0"  accept="*.json" @change="loadTextFromFile"/>
        <button class="w-full warning">Select File</button>
        <m-icon v-if="loading" icon="bubble_chart" class="animate-spin text-4xl"/>
    </div>
</template>

<script>
import { eventBus } from '@/main'
export default {
    name: 'ImportDatabase',
    data:()=>({
        loading: false,
    }),
    methods:{
        loadTextFromFile(ev) {
            
            const file = ev.target.files[0];
            this.$importDB ( file )

            // const reader = new FileReader();
            // reader.onload = e => { 
            //     this.loading = true
            //     let db = e.target.result 
            // }
            // reader.readAsText(file)
        },
    }
}
</script>