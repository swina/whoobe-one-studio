<template>
    <div class="p-2 flex flex-col">
        <div>
            <label>Autosave</label>
            <input type="checkbox" v-model="settings.autosave"/> 
        
            <label>Interval</label>
            <input type="text" class="w-12" v-model="settings.autosaveTimeout"/> mins

        </div>
        <div class="flex flex-col">
            <label>Categories</label>
            <div class="flex flex-wrap cursor-pointer">
                <template v-for="(category,index) in settings.categories">
                    <span class="chip bg-purple-300 rounded-lg m-1" @click="removeCategory(index)">{{ category }}</span>
                </template>
            </div>
            <input type="text" v-model="newCategory" placeholder="new category" @keydown="addCategory($event)"/>
            <small>Enter to add a new category</small>
        </div>
        <button class="m-auto mt-4 rounded lg bg-blue-400" @click="saveSettings">Save settings</button>
    </div>
</template>

<script>
export default {
    name: 'Settings',
    data:()=>({
        db: null,
        newCategory: '',
        settings: {
            autosave: false,
            autosaveTimeout: 5
        }
    }),
    
    methods:{
        addCategory ( e ){
            if ( e.keyCode === 13 && this.newCategory ){
                this.settings.categories.push ( this.newCategory )
                this.newCategory = ''
            }
        },
        removeCategory ( i ){
            this.settings.categories.splice ( i , 1 )
        },
        saveSettings(){
            this.$saveSettings(this.settings)
            window.localStorage.setItem ( 'whoobe-settings' , JSON.stringify ( this.settings ) )
        }
    },
    mounted(){
        
        this.$settings().then ( res => {
            console.log ( res )
            if ( !res.length ){
                this.settings.id = 0
            } else {
                this.settings = res[0]
                if ( !this.settings.categories ){
                    this.settings.categories = ['Lead','Landing page','Subscribe page','Header','Footer','Hero','Homepage','Shop' , 'Feature'].sort()
                }
            }
        })
        
    }
}
</script>