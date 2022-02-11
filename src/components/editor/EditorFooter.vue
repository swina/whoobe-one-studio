<template>
    <div class="w-screen bg-white shadow z-modal h-10 flex items-center fixed bottom-0 px-2 cursor-pointer border-t">
        <!-- <label>CSS</label>
        <input v-if="editor.current" type="text" class="editor-input" v-model="editor.current.css.css"/>
        <label>Container</label>
        <input v-if="editor.current" type="text" class="editor-input" v-model="editor.current.css.container"/> 
        <m-icon icon="edit" css="icon-button"/>
        -->
        <!-- <m-icon icon="menu" css="icon-button" @click="confirmClose" title="Main menu"/> 
        <div class="border-r h-10 mx-1"></div>
        <m-icon icon="auto_fix_high" css="icon-button" @click="$editorBus('createPage','page')" title="Create empty page"/>  -->
        <!-- <div class="border-r h-10 mx-1"></div> -->
        <!-- <m-icon icon="laptop" css="icon-button" @click="$editorBus('preview','fullscreen')" title="Laptop  preview"/>
        <m-icon icon="tablet" css="icon-button" @click="$editorBus('preview','tablet')" title="Tablet Preview"/>
        <m-icon icon="smartphone" css="icon-button" @click="$editorBus('preview','smartphone')" title="Smartphone Preview"/> -->
        <div class="border-r h-10 mx-1"></div>
        <i-icon icon="carbon:settings" class="icon-button" @click="$dialogBus('settingsPage')"/>
        <i-icon icon="bx:bx-save" class="icon-button" @click="savePage()" title="Save template"/>
        <i-icon icon="codicon:save-as" class="icon-button" title="Save as" @click="saveAs()"/>
        <i-icon icon="ant-design:download-outlined" class="icon-button" @click="$editorBus('importPage','page')" title="Import template"/>
        <i-icon icon="ant-design:upload-outlined" class="icon-button" @click="$exportDocument()" title="Export template"/>
        <div class="border-r h-10 mx-1"></div>
        <span class="text-gray-300">+</span><i-icon icon="mdi:widgets-outline" class="icon-button" :class="hasCustomLibrary?'animate-pulse':''" @click="$dialogBus('addToUIKit')" title="Add to current kit"/>
        <span v-if="$store.state.desktop.library && $store.state.desktop.library.name" class="chip ring-2 ring-purple-500 mr-2">{{ $store.state.desktop.library.name }}</span>
        <i-icon icon="bx:bx-export" v-if="hasCustomLibrary" class="icon-button" @click="$exportCustomLibrary()" title="Save UI Kit"/>
        <!-- <span v-if="hasCustomLibrary" class="animate-pulse ring-2 ring-purple-500 chip bg-black text-xs text-white mr-2 cursor-pointer" title="Save UI Kit" @click="$exportCustomLibrary()">Export</span> -->
        <div class="border-r h-10 mx-1"></div>
        <i-icon icon="ci:trash-empty" class="icon-button" @click="$deletePage()" title="Delete template"/>
        <div class="border-r h-10 mx-1 border-white"></div>
        <i-icon icon="grommet-icons:help-option" class="icon-button" @click="$dialogBus('help','Editor')" title="Documentation"/>
        <div class="border-r h-10 mx-1"></div>
        <m-icon icon="highlight_alt"/>
        <div class="px-2" v-if="editor.current">
            <span v-if="editor.component" class="font-bold cursor-pointer" title="Block settings" @click="$dialogBus('settingsComponent')">{{ editor.component.name }}</span>  <span class="chip bg-gray-200 p-1">{{ editor.current.semantic }} {{ editor.current.element }}</span> #{{editor.current.id}} 
            <span v-if="editor.current.coords">
                [ w:{{parseInt(editor.current.coords.width)}} x h:{{parseInt(editor.current.coords.height)}} ] - x:{{ parseInt(editor.current.coords.x )}} - y:{{parseInt(editor.current.coords.y)}} 
            </span>
        </div>
        <div class="border-r h-10 mx-1"></div>
        <div class="font-light flex absolute right-0 items-center mr-10">
            <span class="mr-2 border rounded pl-1" @click="$dialogBus('settings')">Autosave <span v-if="$store.state.editor.settings.autosave" class="chip bg-green-400 py-1 uppercase" :title="$store.state.editor.settings.autosaveTimeout">on</span> <span v-if="!$store.state.editor.settings.autosave" class="chip bg-red-500 py-1 uppercase">off</span></span>
            <div class="bg-blue-400 h-10 text-white px-2 flex justify-center items-center animate-pulse" v-if="message">
                <m-icon icon="notifications" class=""/><span class="">{{ message }}</span>
            </div>
            <button class="text-xs flex font-light items-center h-10 btn btn-purple" @click="$editorBus('preview','fullscreen')" title="Full preview"><i-icon icon="codicon:open-preview" class="text-2xl mr-2 icon-button" @click="$editorBus('preview','fullscreen')" title="Preview"/>Preview</button> 
            <!-- <span>whoobe-studio</span> <m-icon icon="bubble_chart" class="mx-2 animate-spin"/> -->
        </div>

        <!-- <modal v-if="addToCustom" title="Add to custom library">
            <div slot="content" class="flex flex-col">
                <label>Save to custom library as </label>
                <label>Name</label>
                <div class="flex">
                    <input type="text" v-model="$store.state.editor.page.name"/>
                    <button class="btn btn-blue" @click="addToCustomLibrary()">Add</button>
                </div>
            </div>
        </modal> -->
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { editorBus, modalBus } from '@/main'
export default {
    name: 'EditorFooter',
    data:()=>( {
        newcss: '',
        message: '',
        autosave: true,
        addToCustom: false,
        hasCustomLibrary: false
    }),
    components:{
        'EditorSidebarTabs' : () => import ( './EditorSidebarTabs.vue' )
    },
    computed:{
        ...mapState ( ['editor' ] ),
    },
    methods: {
        confirmClose(){
            modalBus.$emit ( 'confirm' )
        },
        saveAs(){
            this.editor.page.name = this.editor.page.name + ' COPY'
            this.editor.page.id = 0
            modalBus.$emit ( 'blockSettings')
            
        },
        async savePage(){
            this.$loading()
            this.$store.dispatch ( 'setCurrent' , null )
            let el , options
            el = document.querySelector('#BlockEditor')
            options = { type: "dataURL" , useCORS: true , scale: 0.50 }
            let screenshot = await this.$html2canvas(el, options)
            this.printScreen = screenshot
            this.$store.state.editor.page.image = screenshot
            this.$savePage()
            this.$loading()
        },
        // savePage(){
        //     this.$savePage().then ( res => {
        //         console.log ( res )
        //         this.$eventBus ( 'notification' , 'Page saved')
        //     })
        // },
    },
    mounted(){
        editorBus.$on ( 'editorMessage' , (msg,type='info') => {
            this.message = msg
            window.setTimeout( ()=> {
                this.message = ''
            },4000)
        })
        if ( this.$store.state.desktop.library ){
            this.hasCustomLibrary = true
        }
    }
}
</script>