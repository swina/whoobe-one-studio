<template>
    <div class="overflow-hidden max-h-screen min-h-screen mt-0 inset-0 website bg-gray-100 pt-8" style="max-height:100vh;margin:0;">
        <div class="flex flex-row w-full bg-gray-100"> 
            <div class="w-1/6 flex flex-col border text-lg">
                <div class="px-2 py-4 border-b text-gray-400 cursor-pointer text-xs">
                    <div class="flex flex-row justify-around text-2xl">
                        <m-icon icon="save" class="text-2xl" title="Save project" @click="saveSettings"/>
                        <m-icon icon="file_download" class="text-2xl" title="Download project" @click="saveProjectAs"/>
                        <m-icon icon="file_upload" class="text-2xl" title="Upload project" @click="importProject"/>
                        <i-icon icon="mdi:web" class="text-2xl" title="Export to builder" @click="exportProject"/>
                    </div>
                </div>
                <div class="px-2 py-4 border-b hover:bg-white cursor-pointer" @click="currentTab('settings')" :class="tabClass('settings')">
                    Settings
                </div>
                <div class="px-2 py-4 border-b hover:bg-white cursor-pointer" @click="currentTab('header')" :class="tabClass('header')">
                    Header
                </div>
                <div class="px-2 py-4 border-b hover:bg-white cursor-pointer" @click="currentTab('homepage')" :class="tabClass('homepage')">
                    Homepage
                </div>
                <div class="px-2 py-4 border-b hover:bg-white cursor-pointer" @click="currentTab('pages')"  :class="tabClass('pages')">
                    Pages
                </div>
                <div class="px-2 py-4 border-b hover:bg-white cursor-pointer" @click="currentTab('footer')" :class="tabClass('footer')">
                    Footer
                </div>
                
                <div class="px-2 py-4 border-b text-gray-400 cursor-pointer text-xs">
                    Whoobe Website is a tool to export pages and components to other frameworks in order to build static websites
                </div>
            </div>
            <div class="w-5/6 flex flex-col">
                
                <h5 class="bg-white border-b p-4 capitalize" @click="tab!='settings'?kits=!kits:null">{{tab}}</h5>

                <div class="flex flex-col p-4" v-if="tab==='settings'">
                    <label>Framework</label>
                    <select v-model="project.framework">
                        <option value="sveltekit" selected>Whoobe for SvelteKit</option>
                    </select>
                    <label>Project Name</label>
                    <input type="text" v-model="project.name"/>
                    <label>Website Title</label>
                    <input type="text" v-model="project.title"/>
                    <label>Description</label>
                    <textarea class="w-full" v-model="project.description"/>
                    <label>Analytics</label>
                    <input type="text" v-model="project.analytics" placeholder="GA-xxxxx"/>
                    <label>Demo Website URL</label>
                    <input type="text" class="w-full" v-model="project.devServer" placeholder="http://localhost:3000"/>
                    
                </div>

                <div class="flex flex-col p-4 w-8/12 ml-5 " v-if="tab != 'pages' && project[tab] && tab != 'settings'">
                    <div class="relative p-4 text-center flex-col flex items-center justify-center border" id="previewTemplate">
                        
                        <img :src="project[tab].preview" v-if="project[tab].preview"  :class="tab==='homepage'?'w-1/2 h-1/2 object-cover object-top':'w-full h-24 object-contain object-center'" @click="html=true"/>
                        <m-icon icon="edit" class="text-4xl text-gray-400 absolute left-0 top-0" title="Editor HTML" @click="html=!html"/>
                        
                    </div>
                    <transition name="fade">
                        <div class="modal z-modal w-3/4 h-3/4 bg-white shadow-lg" v-if="html && tab != 'pages'">
                            <h5 class="bg-blue-400 text-white p-1">Editor HTML</h5>
                            <codemirror v-model="project[tab].html" v-if="project[tab]" class="m-auto h-auto" :options="{lang:'htmlmixed',lineNumbers:true,lineWrapping: true, mode: 'xml', theme: 'ambiance',}"></codemirror>
                            <m-icon icon="close" class="absolute top-0 right-0 m-2 text-2xl text-white" @click="html=null"/>
                            
                        </div>
                    </transition>
                </div>


                <div class="flex flex-col p-4 w-8/12 ml-5" v-if="tab === 'pages' && project.pages">
                    <div class="p-4 text-center border" id="previewTemplate">
                        
                        <div class="flex flex-row flex-grow pages-container">
                            <template v-for="(page,index) in Object.keys(project.pages)">
                                <div class="flex flex-col mr-2" :title="'Slug: /' + page" :id="'page_' + index">
                                    <img :src="project.pages[page].preview" class="w-40 h-40 object-top"  @click="html=page"/>
                                    <span class="chip bg-black text-white p-1">{{ page }}</span>
                                    <div class="flex justify-around">
                                        <m-icon icon="edit" class="text-xl text-gray-400" title="Editor HTML" @click="html=page"/>
                                        <m-icon icon="delete" class="text-xl text-gray-400" title="Remove Page" @click="removeDocument(page,'page',index)"/>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                    <transition name="fade">
                        <div class="modal z-modal w-3/4 h-3/4 bg-white shadow-lg" v-if="html && tab === 'pages'">
                            <h5 class="bg-blue-400 text-white p-1">Editor HTML</h5>
                            <codemirror v-model="project.pages[html].html" class="m-auto h-auto" :options="{lang:'htmlmixed',lineNumbers:true,lineWrapping: true, mode: 'xml', theme: 'ambiance',}"></codemirror>
                            <m-icon icon="close" class="absolute top-0 right-0 m-2 text-white text-2xl" @click="html=null"/>
                        </div>
                    </transition>
                </div>

            </div>
            <transition name="slideright">
                <div class="w-1/4 fixed bg-white p-2 border-l right-0 top-0 h-screen pt-10 overflow-y-auto" v-if="tab!='settings' && desktop.uikits">
                    <div class="fixed right-0 w-1/4 -mt-2 p-2 bg-gray-100">
                        <div class="flex flex-row items-center">
                            <div>UIKits</div> 
                            <m-icon icon="file_upload" class="text-2xl text-gray-400" title="Upload UIKit" @click="$dialogBus('importUIKit')"/>
                        </div>
                        <select v-model="kit" class="w-full p-1 border-purple-600 rounded border">
                            <option v-for="row,index in desktop.uikits" :value="index+1">{{ row.name }}</option>
                            
                        </select>
                    </div>
                    <div class="mt-20" v-if="kit">
                        <template v-for="comp,n in desktop.uikits[kit-1].templates">
                            <img :src="comp.image" class="mt-4 h-30 object-contain border shadow-lg project-page" :position="kit-1" :index="n"  :data-page="n" :data-kit="kit-1" :title="comp.name + '\n' + comp.description"/>
                            
                            <div class="text-xs mb-4 z-2xtop text-gray-400 text-center p-1 m-auto w-full">{{ comp.name }}</div>
                        </template>
                    </div>
                    
                </div>
                
            </transition>
            
        </div>
        <BlockContainerPrvw 
                v-if="newPage" 
                :doc="newPage.json.blocks" 
                :key="newPage.blocks_id"
                ref="content"
                class="hidden"
                id="content"
                @preview="previewLoaded()"/> 
            
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { codemirror } from 'vue-codemirror-lite'
import dragula from 'dragula'

export default {
    name: 'WebsiteProject',
    data:()=>({
        tab: 'settings',
        framework: '',
        project: {
            name: '',
            framework: '',
            pages:{}, 
            homepage: {},
            header: {},
            footer: {},
            fonts:null,
            animations:null,
            analytics:null,
            title: 'My website',
            description: 'A website created with whoobe',
            analytics: '',
            devServer: 'http://localhost:3000'
        },
        kits: false,
        kit: null,
        newPage: null,
        preview: null,
        edit: false,
        html: '',
        current: {}, 
        currentNode: null,
        changeTitle: null,
        newRoute: false,
        changeSlug: null,
        nodes: null,
        treeDisplayData: null
    }),
    components:{
        codemirror ,
        'BlockContainerPrvw'    : () => import ( '@/components/blocks/preview/BlockContainer.vue'),
    },

    computed:{
        ...mapState ( ['editor','desktop'] ),
        
    },
    watch:{
        '$store.state.editor.project' : function(value){
            if ( !value ) return
            this.project = value
        },
        project (value){
            this.currentTab ( this.tab )
        }
    },
    methods: {
        
        currentTab(tab){
            this.tab = tab
            this.newPage = null
        },
        tabClass ( tab ){
            return this.tab === tab ? 'bg-white' : ''
        },
        projectTree(){
            let nodes = []
            if ( this.project && this.project.pages ){
                let pages = Object.keys(this.project.pages)
                const pagesNodes= pages.map ( slug => { 
                        if ( slug ){
                            return { 
                                slug: this.project.pages[slug].slug , 
                                text: this.project.pages[slug].title , 
                                preview: this.project.pages[slug].preview  ,
                                title: this.project.pages[slug].title 
                            }
                        } else {
                            return {
                                slug: slug,
                                text: 'new page (drag here)',
                                preview: null,
                                title: 'new page'
                            }
                        }
                    })
                nodes = [
                            { 
                                text: 'Header ' ,
                                nodes : this.project.header ? [ {text:this.project.header.title,preview:this.project.header.preview , type: 'header'}] : [],
                                type: 'header',
                                status: false 
                            },
                            { 
                                text: 'pages' , 
                                nodes: pagesNodes,
                                status: false,
                                type: 'page'
                            },
                            { text: 'Footer ' , 
                                nodes: this.project.footer ? [ { text: this.project.footer.title , preview: this.project.footer.preview , type: 'footer'} ] : [] ,
                                status: false,
                                type: 'footer'
                            },
                    
                ]
            }
            this.nodes = nodes
            this.treeDisplayData = nodes
        },
        setNodeStatus(n){
            this.nodes[n].status = !this.nodes[n].status
        },
        isOpen(node){
            console.log ( this.current[node] )
            return false
        },
        saveSettings(){
            window.localStorage.setItem ( 'whoobe-project' , JSON.stringify (this.project) )
            this.$store.dispatch ( 'project' , this.project )
            this.$eventBus ( 'notification' ,'Project saved' )
            this.projectTree()   
        },
        saveProjectAs(){
            this.$saveProjectAs()
        },
        importProject(){
            this.$dialogBus ( 'importProject' )
        },
        exportProject(){
            this.$exportProject()
        },
        addComp ( template ){
            console.log ( template )
            this.newPage = template
            //     if ( this.tab != 'pages' ){
            //         let page = document.getElementById('content')
            //         try {
            //             let html = page.innerHTML
            //             html = html.replaceAll ( 'http://localhost:3030/' , '' )
            //             html =  this.$beautify ( html.replaceAll('<!---->','').replaceAll('[object Object]','') )
            //             let exportPage = this.$exportPage ( html, template )
            //             this.project[this.tab] = exportPage
            //         } catch ( error ) {
            //             console.log ( error )
            //         }
            //         console.log ( this.project )
            //     } else {
            //         let slug = this.$slugify ( template.name )
            //         let page = document.getElementById('content')
            //         try {
            //             let html = page.innerHTML
            //             html = html.replaceAll ( 'http://localhost:3030/' , '' )
            //             html =  this.$beautify ( html.replaceAll('<!---->','').replaceAll('[object Object]','') )
            //             let exportPage = this.$exportPage ( html , template )
            //             this.project.pages[slug] = exportPage
            //             console.log ( this.project )
            //         } catch ( error ){
            //             console.log ( error )
            //         }
            //     }

            // this.saveSettings()
        },
        previewLoaded(){
            console.log ( 'Preview loaded' )
            let page = document.getElementById('content')
            try {
                let html = page.innerHTML
                html = html.replaceAll ( 'http://localhost:3030/' , '' )
                html =  this.$beautify ( html.replaceAll('<!---->','').replaceAll('[object Object]','') )
                let exportPage = this.$exportPage ( html, this.newPage )
                if ( this.tab != 'pages' ){
                    this.project[this.tab] = exportPage
                    this.saveSettings()
                } else {
                    let slug = this.$slugify ( this.newPage.name )
                    this.project.pages[slug] = exportPage
                    this.saveSettings()
                }
            } catch ( error ) {
                console.log ( error )
            }
        },
        addRoute(){
            if ( !this.changeSlug ){
                this.project.pages['home'] = {}
            } else {
                this.project.pages[this.changeSlug] = {}
            }
            this.newRoute = false
            this.saveSettings()
        },
        addDocument(target){
            let exportPage = this.$exportPage ( this.editor.html )
            let slug = this.$slugify ( exportPage.title )
            exportPage.slug = slug
            target === 'page' ?
                this.project.pages[slug] = exportPage :
                    this.project[target] = exportPage
            this.saveSettings()  
                          
        },
        removeDocument ( slug , target , index ){
            console.log ( 'remove=>' , slug , target , index )
            if ( target === 'page' ){
                let el = document.querySelector ( '#page_' + index )
                el.classList.add ( 'hidden' )
                if ( !slug ){
                    delete this.project.pages.home
                } else {
                    delete this.project.pages[slug]
                }
            } else {
                this.project[target] = {}
            }
            this.preview = null
            this.saveSettings()
        },
        updatePage(slug){
            let oldPage = this.project.pages[slug]
            if ( !this.changeSlug ){
                this.project.pages['home'] = oldPage
                this.project.pages['home'].slug = 'home'
            } else {
                this.project.pages[this.changeSlug] = oldPage
                this.project.pages['home'].slug = this.changeSlug
                delete this.project.pages[slug]
            }
            this.saveSettings()
        }
    },
    mounted(){
        let  target = document.querySelector('#previewTemplate') 
        if ( target ){
            target.addEventListener ( 'change' , (e) => {
                if ( e ) console.log ( 'changed' )
            })
        }
        let project = window.localStorage.getItem ( 'whoobe-project' ) 
        if ( project ){
            this.project = JSON.parse ( project ) 
            this.$store.dispatch ( 'project' , JSON.parse ( project ) )
            this.projectTree()
        }
        //if ( this.$attrs.options ){
            var drake = dragula([document.querySelectorAll('.project-pages'),document.querySelector('.project-page')])
            console.log ( drake.containers )
            let vm = this
            var drake = dragula({
                isContainer: function (el) {
                    if ( el.classList.contains ( 'project-page') ){
                        return true
                    }
                },
                copy: true,
                copySortSource: false
            });
            // let vm = this
            drake.on ( 'drop' , (el,target,source,sibling) => {
                console.log ( el )
                if ( el.classList.contains ( 'project-page' ) ){
                    console.log ( el.getAttribute ( 'data-page' ) , el.getAttribute ( 'data-kit') )
                    let page = vm.desktop.uikits[el.getAttribute('data-kit')].templates[el.getAttribute('data-page')]
                    target.appenChild ( el )
                    vm.addComp ( page )
                }
            })
        //}
    }

}
</script>

<style>
.CodeMirror {
    height: 30rem;
}
</style>