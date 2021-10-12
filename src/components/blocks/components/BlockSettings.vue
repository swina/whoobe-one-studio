<template>
    <div v-if="$store.state.editor.page" class="flex flex-col p-2 bg-white w-full h-full">
        <label>Name</label>
        <input class="w-full" type="text" v-model="$store.state.editor.page.name"/>
        <label>Description</label>
        <textarea class="w-full h-32" v-model="$store.state.editor.page.description"/>
        <label>Category</label>
        <select class="w-full" v-model="$store.state.editor.page.category">
            <option v-for="category in categories" :value="category">{{ category }}</option>
        </select>
        <label>Tags</label>
        <div class="flex flex-row flex-wrap my-1">
        <template v-for="(tag,index) in $store.state.editor.page.tags">
            <span class="bg-purple-300 px-1 rounded-lg m-1 cursor-pointer" @click="removeTag(index)">{{ tag }}</span>
        </template>
        </div>
        <input type="text" class="w-full bg-white" placeholder="type a new tag and enter" v-model="newTag" @keydown="addTag($event)"/>
        <button class="lg rounded m-1 mt-4 m-auto" @click="$savePage()">SAVE</button>
    </div>
</template>

<script>
export default {
    name: 'BlockPageSettings',
    
    data:()=>({
        newTag: '',
    }),
    computed:{
        categories(){
            return JSON.parse ( window.localStorage.getItem ( 'whoobe-settings') ).categories
        }
    },
    methods:{
        addTag(e){
            if ( e.keyCode === 13 ){
                if ( this.newTag ){
                    if ( !this.$store.state.editor.page.tags ) this.$store.state.editor.page.tags = []
                    this.$store.state.editor.page.tags.push ( this.newTag )
                    this.$store.state.editor.page.tags = [ ...new Set(this.$store.state.editor.page.tags)]
                    this.newTag = ''
                }

            }
        },
        removeTag(index){
            this.$store.state.editor.page.tags.splice(index,1)
        }
    },
    mounted(){
        // this.$api.service ( 'categories' )
        //     .find ( { query: { type: 'block' , $sort: { name: 1 }} } )
        //     .then ( res => {
        //         this.categories = res.data
        //     })
    }
}
</script>