<template>
    <div class="w-screen" @contextmenu="contextmenu($event)">
        <div class="absolute top-0 h-10 w-full flex items-center justify-center text-gray-300 pr-8 cursor-pointer">
            <!-- <div class="m-auto text-gray-500">Right click for more options</div> -->
            <m-icon icon="edit" class="text-2xl mr-4" @click="openPage()" title="Edit"/>
            <i-icon icon="dashicons:html" class="text-2xl mr-4" @click="viewHTML" title="HTML source"/>
            <m-icon icon="laptop" class="text-2xl mr-4" @click="mode='fullscreen'" title="fullscreen"/>
            <m-icon icon="tablet" class="text-2xl mr-4" @click="mode='tablet'" title="tablet"/>
            <m-icon icon="smartphone" class="text-2xl  mr-4" @click="mode='smartphone'" title="smartphone"/>
            <m-icon v-if="mode!='fullscreen'" icon="flip_camera_android" class="text-2xl mr-4" @click="orientation=!orientation" title="Change orientation"/>
            <div v-if="mode==='tablet'" class="flex mx-2">
                <button class="w-4 h-4 flex items-center text-xl justify-center rounded-l-lg bg-blue-400" @click="customZoom>.1?customZoom-=.1:null">-</button>
                <div class="h-4 w-10 bg-white text-black flex items-center justify-center">zoom</div>
                <button class="w-4 h-4 flex items-center text-xl justify-center rounded-r-lg bg-blue-400" @click="customZoom<1.1?customZoom+=.1:null">+</button>
            </div>
            <div v-if="mode!='fullscreen'">{{currentSize}}</div>
            <!-- <m-icon icon="close" class="text-2xl mr-4" title="Esc to exit preview" @click="$dialogBus('closeDialog')"/> -->
        </div>
        <div class="flex flex-col overflow-y-auto overflow-x-hidden absolute inset-0 mt-10 laptop-view" v-if="mode==='fullscreen'">
            <BlockContainerPrvw 
                v-if="doc" 
                :doc="doc" 
                :key="doc.id"
                ref="content"
                id="content"/>
        </div>
        <div :class="mode==='fullscreen'?'hidden':''" v-if="mode!='fullscreen'" class="text-center text-gray-300">
            <!-- <m-icon icon="laptop" class="text-3xl" @click="mode='fullscreen'"/>
            <m-icon icon="tablet" class="text-3xl" @click="mode='tablet'"/><m-icon icon="smartphone" class="text-3xl" @click="mode='smartphone'"/>
            <m-icon icon="flip_camera_android" class="m-auto text-3xl" @click="orientation=!orientation"/> -->
            <iframe ref="previewFrame" :style="previewFrame"  id="previewFrame" :srcdoc="getHTML()" class="m-auto border-8 overflow-x-hidden border-black rounded-xl">
            </iframe>
            <!-- <iframe id="preview" :style="previewFrame" class="m-auto border-8 overflow-x-hidden border-black rounded-xl"/> -->
            
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
        <div v-if="svgString">
            <img :src="svgString"/>
        </div>
        <Modal v-if="modal" :topbar="true" component="blocks/components/BlockJSEditor.vue" @close="modal=!modal" :options="options"/>
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
        mode:'xs',
        svgString: null,
        srcdoc: null,
        customZoom: 0.5,
        currentSize: null,
        htmlSource: null
    }),
    components: {
        //WhoobePreviewContextMenu , MokaEditorPreview , WhoobePreviewHtml , WhoobePreviewPrintscreen ,
        //'block-preview-context-menu'    : () => import ( './window/block.preview.context.menu.vue'),
        'BlockContainerPrvw'    : () => import ( '@/components/blocks/preview/BlockContainer.vue'),
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
            //let scale = this.customZoom //window.innerHeight < 1024 ? .5 : 1
            //if ( this.customZoom ) scale = this.customZoom
            if ( this.mode === 'smartphone' ){
                this.orientation ?
                    this.currentSize = '800x375' : this.currentSize = '375x800'
                return this.orientation ? "width:800px;height:375px;" : "width:375px;height:80vh;"
            }
            if ( this.mode === 'tablet' ){
                this.orientation ?
                    this.currentSize = parseInt(1024*this.customZoom) + 'x' + parseInt(1366*this.customZoom) :
                        this.currentSize = parseInt(1366*this.customZoom) + 'x' + parseInt(1024*this.customZoom)

                return this.orientation ? "width:" + 1024*this.customZoom + "px;height:" + 1366*this.customZoom +"px;" : "width:" + 1366*this.customZoom + "px;height:" + 1024*this.customZoom + "px;"
            }
        }
    },
    watch: {
        mode(value){
            if ( value === 'tablet' || value === 'smartphone' ){
                window.localStorage.setItem('whoobe-preview-mode',true)
            } else {
                window.localStorage.setItem('whoobe-preview-mode',false)
            }
        },
        
        // srcdoc(value){
        //     let iframe = document.getElementById('previewFrame')
        //     let head = iframe.contentWindow.document.head
        //     let body = iframe.contentWindow.document.body
        //     let alpineJS = 'https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js'
        //     let jsURL = document.createElement ( 'script' )

        //     jsURL.setAttribute ( 'src' , alpineJS )
        //     jsURL.setAttribute ( 'defer' , '')
        //     head.appendChild ( jsURL )
        //     console.log ( iframe.contentWindow.document.scripts )
        // }
    },
    methods:{
        openPage(){
            this.$store.dispatch( 'add_tab' , { label: this.$store.state.editor.page.name , object: this.$store.state.editor.page , type: 'editor'})
            this.$dialogBus ( 'closeDialog' )
        },
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
            let fonts = jp.query ( this.$store.state.editor.page.json.blocks , '$..blocks..font') 
            let fnts = [ ...new Set ( fonts.filter ( a => { return a } ) )]
            let fontsLink = ''
            fnts.length ? fontsLink = '<!--Google Fonts-->\n<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=' + fnts.join('|') + '">' : null
            let mi = '<!--Material-icons-->\n<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">\n'
            let page = document.getElementById('content')
            let html = page.outerHTML
            //html = html.replaceAll ( 'http://localhost:3030/' , '' )
            html =  this.$beautify ( html.replaceAll('<!---->','').replaceAll('[object Object]','') )
            let htmlSource = mi + fontsLink + '\n' + html
            this.options = { lang: 'html' , content: htmlSource }
            //this.modal = true
            modalBus.$emit ( 'viewHTML' , this.options )
        },
        getHTML(){
            try {
                if ( !this.srcdoc ){
                    let mi = '<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">\n'
                    let fonts = jp.query ( this.$store.state.editor.page.json.blocks , '$..blocks..font') 
                    let fnts = [ ...new Set ( fonts.filter ( a => { return a } ) )]
                    let fontsLink = '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">'
                    fnts.length ? fontsLink = '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=' + fnts.join('|') + '">' : fontsLink = ''
                    let tw = '<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">\n'
                    let ajs = `<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"><\/script>`
                    let previewCss = '<link href="preview.css" rel="stylesheet">'
                    let page = document.getElementById('content')
                    let html = mi + tw + '\n' + fontsLink + '\n' + previewCss + '\n' + page.outerHTML
                    //html = html.replaceAll ( 'http://localhost:3030/' , '' )
                    html =  this.$beautify ( html.replaceAll('<!---->','').replaceAll('[object Object]','') )
                    this.srcdoc = html + '\n' + ajs
                    //this.srcdoc = this.getSourceSrc(html)
                    return   
                    //return html
                } 
                
                return this.srcdoc 
            } catch ( err ){
                console.log ( err )
                console.log ( 'Preview mode error in creating source')
            }
        },
        buildPage(){
            let page = document.getElementById('content')
            let html = page.outerHTML
            html = html.replaceAll ( 'http://localhost:3030/' , '' )
            html =  this.$beautify ( html.replaceAll('<!---->','').replaceAll('[object Object]','') ) 
            this.$exportBuild ( html )
        },
        async print() {
            this.$loading()
            let el , options
            el = document.querySelector('#content')
            options = { type: "dataURL" , useCORS: true , scale: 0.50 }
            let screenshot = await this.$html2canvas(el, options)
            this.printScreen = screenshot
            this.editor.page.image = screenshot
            this.$savePage()
            this.$loading()
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
        
        this.doc = this.$store.state.editor.document
        document.title = 'whoobe'
        document.addEventListener('keydown', (e) => {
            if ( e.key === 'Escape') this.$dialogBus('closeDialog')
        })
        this.mode = this.$attrs.options.mode
        //this.$eventBus ( 'notification' , 'Press Escape to close the preview')
        if ( this.mode != 'fullscreen' ){
            let style = document.createElement('style')
            style.textContent = 'body { overflow-y: auto; }'
            this.$refs.previewFrame.contentDocument.body.appendChild(style)
        }
        if ( this.doc.data.javascript ){
            let scrpt = document.createElement ( 'script' )
            scrpt.innerText = this.doc.data.javascript
            document.body.appendChild ( scrpt ) 
        }
        window.innerHeight < 1024 ? this.customZoom = .5 : this.customZoom = 1
    },
}
</script>

