<template>
    <div>
        <div class="text-xs">Whoobe Website is a tool to export pages and components to other frameworks in order to build static websites</div>
        <div class="p-2 flex flex-row w-full bg-gray-100">
            <div class="w-1/4 flex flex-col">
                
                <label>Framework</label>
                <select v-model="project.framework">
                    <option value="sveltekit">Whoobe for SvelteKit</option>
                    <option value="nuxt">Whoobe for NuxtJS</option>
                </select>
                <label>Project Name</label>
                <input type="text" v-model="project.name"/>
                <label>Website Title</label>
                <input type="text" v-model="project.title"/>
                <label>Description</label>
                <input type="text" class="w-full" v-model="project.description"/>
                <div class="flex flex-row">
                    <button class="m-auto btn mt-4 rounded lg bg-blue-400" @click="saveSettings">Save project</button>
                    <button class="m-auto btn mt-4 rounded lg bg-blue-400" @click="exportProject">Export</button>
                </div>
            </div>
            <div class="w-3/4 pl-2 flex flex-col bg-white" v-if="editor.project">
                <div class="bg-purple-500 text-white p-1 w-full">Pages/components</div>
                <div class="grid grid-cols-2 cursor-pointer" v-if="treeDisplayData">
                    <ul class="m-0 p-0">
                    <template v-for="node,n in treeDisplayData">
                        <li class="flex items-center w-10 p-0 list-none capitalize" @click="setNodeStatus(n)">
                            <m-icon icon="folder"/> {{ node.text }}
                        </li>
                        <transition name="fade">
                        <ul class="m-0 p-0 ml-6" v-if="nodes[n].status">
                            <li class="flex items-center pt-0 m-0 list-none hover:bg-gray-100" v-for="child in node.nodes" @click="preview=child.preview" :class="preview===child.preview?'bg-blue-200':''">
                            <m-icon icon="article"/> {{ child.text }} 
                                <span v-if="nodes[n].type==='page'"> [/{{child.slug}}]</span>
                            </li>
                        </ul>
                        </transition>
                    </template>
                    </ul>
                    <div>
                        <img :src="preview" v-if="preview"/>
                    </div>
                </div>
                <!-- <div class="bg-purple-500 text-white p-1 w-full">Pages/components</div>
                <div class="flex flex-row flex-grow justify-between">
                    <div v-if="editor.project.header" class="flex flex-col" :title="editor.project.header.title">
                            
                        <img :src="editor.project.header.preview" class="w-40 h-40 object-contain"/>
                        <div class="chip bg-purple-400 flex flex-row items-center"><m-icon icon="menu"/>Header</div>
                        <div class="truncate">{{ editor.project.header.title.substring(0,20) }}</div>
                    </div>
                    <template v-for="page in Object.keys( editor.project.pages )">
                        <div class="flex flex-col">
                            <img :src="editor.project.pages[page].preview" class="w-40 h-40 object-cover"/>
                            <div class="chip bg-blue-400 flex flex-row items-center"><m-icon icon="web"/>{{ editor.project.pages[page].title }}</div>
                        </div>
                    </template>
                    <div v-if="editor.project.footer" class="flex flex-col" :title="editor.project.footer.title">
                        <img :src="editor.project.footer.preview" class="w-40 h-40 object-contain"/>
                        <div class="chip bg-purple-400 flex flex-row items-center"><m-icon icon="menu"/>Footer</div>
                        <div class="truncate">{{ editor.project.footer.title.substring(0,20) }}</div>
                    </div>
                </div> -->
            </div>
            
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'WebsiteProject',
    data:()=>({
        framework: '',
        project: {
            name: '',
            framework: '',
            pages:{}, 
            fonts:null,
            animations:null,
            analytics:null,
            title: 'My website',
            description: 'A website created with whoobe'
        },
        preview: null,
        current: {}, 
        nodes: null
    }),
    

    computed:{
        ...mapState ( ['editor'] ),
        treeDisplayData(){
            let nodes = []
            if ( this.project ){
                let pages = Object.keys(this.project.pages)
                let pagesNodes = pages.map ( slug => { 
                    return { slug: this.project.pages[slug].slug , text: this.project.pages[slug].title , preview: this.project.pages[slug].preview  }
                })
                nodes = [
                            { 
                                text: 'Header ' ,
                                nodes : [ {text:this.project.header.title,preview:this.project.header.preview , type: 'header'}],
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
                                nodes: [ { text: this.project.footer.title , preview: this.project.footer.preview , type: 'footer'} ] ,
                                status: false,
                                type: 'footer'
                            },
                    
                ]
            }
            this.nodes = nodes
            return nodes
        }
    },
    methods: {
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
        },
        exportProject(){
            this.$exportProject()
        }
    },
    mounted(){
        let project = window.localStorage.getItem ( 'whoobe-project' ) 
        if ( project ){
            this.project = JSON.parse ( project ) 
            this.$store.dispatch ( 'project' , JSON.parse ( project ) )
        }
    }

}
</script>