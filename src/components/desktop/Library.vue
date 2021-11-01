    <template>
    <div class="flex flex-col">
        <label>UI Kit</label>
        <input class="w-full" type="text" v-model="library.name"/>
        <label>Description</label>
        <textarea  class="w-full" v-model="library.description"/>
        <label>Author</label>
        <input class="w-full" type="text" v-model="library.author"/>
        <!-- <p v-if="message" class="bg-red-500 text-white p-1 my-1 rounded">{{ message }}</p> -->
        <!-- <div class="flex justify-center mt-2">
            <button class="btn btn-blue hover:bg-black rounded mr-2">Create New</button>
            <button class="btn btn-purple border-0 rounded hover:bg-yellow-400" v-if="message" @click="exportAndCreateNewUIKit()">Export current UI Kit and create new</button>
        </div> -->
        <div class="flex my-2 justify-center items-center">
            <button class="btn btn-blue mr-2 rounded border-0" @click="$dialogBus('importUIKit')">Import</button>
            <!--<button class="btn btn-blue mr-2 rounded border-0" @click="saveUserLibrary()">Save</button>-->
            <button class="btn btn-blue rounded border-0" @click="createUserLibrary()">Create New</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserLibrary',
    data:()=>({
        library: {
            name: 'New UI Kit',
            author: 'Whoobe',
            description: '',
            templates: []
        },
        message: ''
    }),
    methods:{
        saveUserLibrary(){
            this.message = ''
            this.$store.dispatch ( 'library' , this.library )
        },
        createUserLibrary(){
            this.library.templates = []
            this.$store.dispatch ( 'add_uikit' , this.library )
            this.$dialogBus('closeDialog')
        },
        exportAndCreateNewUIKit(){
            this.message = ''
            this.$exportCustomLibrary()
            this.$store.dispatch('library',null)
            this.library = {
                name: 'New UI Kit',
                description: '',
                templates: []
            }
        }
    },
    mounted(){
        // if ( this.$store.state.desktop.library ){
        //     this.library = this.$store.state.desktop.library
        //     this.message = 'Warning! Creating a new UI Kit will replace the current one. Save before to continue.'
        // }
    }
}
</script>