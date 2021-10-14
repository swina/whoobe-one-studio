<template>
    <div class="w-screen" @contextmenu="contextmenu($event)">
        <div class="absolute top-0 h-10 w-screen text-center text-gray-300 border-b">
            <m-icon icon="laptop" class="text-3xl mr-4" @click="mode='fullscreen'"/>
            <m-icon icon="tablet" class="text-3xl mr-4" @click="mode='tablet'"/>
            <m-icon icon="smartphone" class="text-3xl  mr-4" @click="mode='smartphone'"/>
            <m-icon v-if="mode!='fullscreen'" icon="flip_camera_android" class="m-auto text-3xl" @click="orientation=!orientation"/>
        </div>
        <div class="flex flex-col overflow-y-auto absolute inset-0 mt-10 laptop-view" v-if="mode==='fullscreen'">
            <BlockContainer 
                v-if="doc" 
                :doc="doc" 
                :key="doc.id" 
                id="content"/>
        </div>
        <div :class="mode==='fullscreen'?'hidden':''" v-if="mode!='fullscreen'" class="text-center text-gray-300">
            <!-- <m-icon icon="laptop" class="text-3xl" @click="mode='fullscreen'"/>
            <m-icon icon="tablet" class="text-3xl" @click="mode='tablet'"/><m-icon icon="smartphone" class="text-3xl" @click="mode='smartphone'"/>
            <m-icon icon="flip_camera_android" class="m-auto text-3xl" @click="orientation=!orientation"/> -->
            <iframe :style="previewFrame" src="'/?preview=true'" class="m-auto border-8 overflow-x-hidden border-black rounded-xl">
            </iframe>
        </div>
        <div ref="contextMenu" class="fixed z-highest shadow bg-white shadow absolute flex flex-col w-64 cursor-pointer" :class="classe" @mouseleave="display=!display">
            <div class="p-1 text-white bg-gray-800 flex items-center" @click="display=!display">
                Options
                <div class="absolute right-0 mr-1 flex items-center">
                    <m-icon icon="close" @click="display=!display"/>
                </div>
            </div>
            <div class="p-1 hover:bg-gray-200 flex items-center" @click="print()">
                Save
                <div  class="absolute right-0 flex items-center pr-1">
                    <m-icon icon="save"/>
                </div>
            </div>

            <div class="p-1 hover:bg-gray-200 flex items-center" @click="pageSettings">
                Page settings
                <div class="absolute right-0 flex items-center pr-1">
                    <m-icon icon="settings"/>
                </div>
            </div>
            
            <div class="p-1 hover:bg-gray-200 flex items-center" @click="viewHTML">
                HTML
                <div  class="absolute right-0 flex items-center pr-1">
                    <m-icon icon="code"/>
                </div>
            </div>
            <div class="p-1 hover:bg-gray-200 flex items-center" @click="buildPage">
                Build Page
                <div  class="absolute right-0 flex items-center pr-1">
                    <m-icon icon="build"/>
                </div>
            </div>
            
        </div>
        <Modal v-if="modal" title="Preview" :topbar="true" component="blocks/components/BlockHtml.vue" @close="modal=!modal" :options="options"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import jp from 'jsonpath'
import { modalBus } from '@/main'
export default {
    name: 'BlockWindowPreview',
    data:()=>({
        doc:null,
        showContextMenu: false,
        showHtml: false,
        printScreen: false,
        editScreenshot: true,
        orientation: false,
        display: false,
        modal: false,
        options: null,
        mode:'xs'
    }),
    components: {
        //WhoobePreviewContextMenu , MokaEditorPreview , WhoobePreviewHtml , WhoobePreviewPrintscreen ,
        //'block-preview-context-menu'    : () => import ( './window/block.preview.context.menu.vue'),
        'BlockContainer'    : () => import ( '@/components/blocks/preview/BlockContainer.vue'),
        // 'block-preview-html'            : () => import ( './window/block.preview.html.vue' ),
        // 'block-slider'                  : () => import ( '@/components/blocks/preview/components/moka.slider.vue'),
        // 'block-preview-printscreen'     : () => import ( './window/block.preview.printscreen.vue')
    },
    computed: {
        ...mapState ( ['editor'] ),
        devMode(){
            
             if ( typeof webpackHotUpdate === 'undefined' ) {
                 
                 return true //false
             }
             
             return true
        },
        classe(){
            return this.display ? 'visible' : 'hidden'
        },
        previewFrame(){
            let scale = window.innerHeight < 900 ? .6 : 1
            if ( this.mode === 'smartphone' ){
                
                return this.orientation ? "width:800px;height:375px;" : "width:375px;height:80vh;"
            }
            if ( this.mode === 'tablet' ){
                
                return this.orientation ? "width:" + 768*scale + "px;height:" + 1024*scale +"px;" : "width:" + 1024*scale + "px;height:" + 768*scale + "px;"
            }
        }
    },
    methods:{
        
        contextmenu(e){
            e.preventDefault()
            this.display = true
            this.$refs.contextMenu.style.top = e.clientY + 'px'
            this.$refs.contextMenu.style.left = e.clientX + 'px'
        },
        pageSettings(){
            modalBus.$emit ( 'blockSettings')
        },
        viewHTML(){
            let page = document.getElementById('content')
            let html = page.outerHTML
            html = html.replaceAll ( 'http://localhost:3030/' , '' )
            html =  this.$beautify ( html.replaceAll('<!---->','').replaceAll('[object Object]','') )
            modalBus.$emit ( 'viewHTML' , html )
        },
        buildPage(){
            let page = document.getElementById('content')
            let html = page.outerHTML
            html = html.replaceAll ( 'http://localhost:3030/' , '' )
            html =  this.$beautify ( html.replaceAll('<!---->','').replaceAll('[object Object]','') ) 
            this.$exportBuild ( html )
        },
        async print() {
            //this.$loading()
            let el , options
            el = document.querySelector('#content')
            options = { type: "dataURL" , useCORS: true , scale: 0.50 }
            let screenshot = await this.$html2canvas(el, options)
            this.printScreen = screenshot
            this.editor.page.image = screenshot
            this.$savePage()
            //this.$addPageImage(screenshot)
            //this.$exportImage ( screenshot )
            //this.$loading(false)
        },
        isprinted(){
            this.printScreen = false  
        },
        componentPrint(){
            this.$loading(true)
            this.showContext = false
            this.$message ( 'Print screen setup ...' )
            this.printScreen = true
        },
        hideContextMenu(){
            this.$refs.contextMenu.style.opacity = 0
            this.$refs.contextMenu.style.left = '-1000px'
        },
        showContext(e){
            console.log ( e.clientY , e.clientX , screen.availWidth )
            e.preventDefault()
            if ( e.clientX < (screen.availWidth - 300) ) {
                this.$refs.contextMenu.style.left = (e.clientX - 20) + 'px'
            } else {
                this.$refs.contextMenu.style.left = ( e.clientX - 300 - 20) + 'px'
            }
            this.$refs.contextMenu.style.top = (window.pageYOffset + e.clientY) + 'px'
            this.$refs.contextMenu.style.opacity = 1
        },
        closeMe(){
            window.close()
        },
        size(s){
            window.screen.width = s
        },
        save(screenshot){
            let component = JSON.parse(window.localStorage.getItem('whoobe-component'))
            if ( screenshot ){
                component.image_uri = screenshot.replace('.jpg','.webp')
                component.image = screenshot.replace('.jpg','.webp')
                this.$api.service ( 'components' ).patch ( component._id , component ).then ( res => {
                    console.log ( 'saved component => ' , component , res )
                    this.$action()
                })
            }

                // filerobot image editor -> to be implemented
                // window.localStorage.setItem('whoobe-image-url',this.$imageURL(screenshot) )
                // this.editScreenshot ? 
                //     this.$action ( 'filerobot' ) :
                //         this.$api.service ( 'components' ).patch ( component._id , component ).then ( res => {
                //             console.log ( 'saved component => ' , component , res )
                //             this.$action()
                //         })
            
        },
        //screenshot print
        saveprint(){
            if ( !this.devMode ){
                this.$message('This option is available only in development mode')
                return
            }
            this.$loading(true)
            this.printMe()
        },
        //print action
        async printMe(block='content') {
            
            if ( !this.devMode ){
                this.$message('This option is available only in development mode')
                return
            }
            let el , options
            el = document.querySelector('#' + block)
            if (!el){
                document.querySelector(block)
            }
            options = { type: "dataURL" , useCORS: true , scale: 0.30  }
            let screenshot = await this.$html2canvas(el, options)
            
            this.srcToFile ( screenshot ,  'w-preview-' + this.$mapState().editor.component.name.replaceAll(' ','') + '.jpg' , 'image/jpg' ).then ( resp => { 
                //console.log ( 'src to file => ' , resp )
                let formData = new FormData()

                formData.append("file", resp )
                formData.append("folder","preview")
                formData.append("isPreview",true)
                formData.append('thumbs',0)
                formData.append('url','/uploads/preview/w-preview-' + this.$mapState().editor.component.name.replaceAll(' ','') + '.jpg')
                this.$http.post("upload/file", 
                    formData ,
                    {   
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                }).then ( response => {
                    console.log ( response )
                    screenshot = response.data.url
                    this.save(screenshot)
                    this.$loading()
                    return screenshot
                }).catch ( error => {
                    this.$loading()
                    this.$message ( 'An error occured. Check your console log')
                    //console.log ( error )
                })
            })

        }, 
        async srcToFile(src, fileName, mimeType){
            return (fetch(src)
                .then(function(res){return res.arrayBuffer();})
                .then(function(buf){return new File([buf], fileName, {type:mimeType});})
            );
        },
        
    },
    mounted(){
        this.$store.dispatch ( 'preview' , true )
        // if ( this.$route.params.slug ){
        //     this.$api.service ( 'articles' ).find ( { query : { slug : this.$route.params.slug }} ).then ( res => {
        //         let mydoc = res.data[0].blocks.json
        //         this.$mapState().editor.current = mydoc
        //         this.$mapState().editor.component = JSON.parse(window.localStorage.getItem('whoobe-component'))
        //         this.doc = mydoc
        //     })
        // } else {
        //     this.doc = JSON.parse(window.localStorage.getItem('whoobe-preview'))
        // }
        // let width = window.localStorage.getItem ( 'whoobe-preview-mode' )
        // if ( width ){
        //     window.resizeTo (width ? width : window.screen.availWidth , window.screen.availHeight)
            
        // }
        this.doc = this.$store.state.editor.document
        document.title = 'whoobe'
        document.addEventListener('keydown', (e) => {
            if ( e.key === 'Escape') this.$dialogBus('closeDialog')
        })
        this.mode = this.$attrs.options.mode
        //this.$eventBus ( 'notification' , 'Press Escape to close the preview')
    }
}
</script>