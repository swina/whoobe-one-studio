<template>
    <div ref="mainEditor" id="mainEditor" class="bg-gray-100 min-h-screen text-black" :classe="display" v-if="display && editor.page && editor.document">
        <div class="h-8 mt-8 p-1 bg-white text-gray-800 w-full fixed flex flex-row items-center left-0 top-0 z-2xtop shadow cursor-pointer">
            <!-- <m-icon icon="menu" css="icon-button z-modal" @click="$eventBus('desktopSidebarLeft','main')" title="Main menu"/> -->
            <!-- <m-icon icon="web" css="icon-button text-black z-modal" @click="$dialogBus('pages')" title="Templates"/> -->
            <span class="ml-6 text-gray-800 chip bg-white" v-if="editor.page">{{ editor.page.name }} <span class="chip bg-purple-800 text-white p-1">{{ editor.page.category }}</span></span>
            <i-icon icon="carbon:settings" class="text-gray-400 ml-4 text-2xl hover:text-purple-600" @click="$dialogBus('settingsPage')" title="Template settings"/>
            <i-icon icon="akar-icons:javascript-fill" class="text-xl icon-button ml-4 cursor-pointer" @click="$dialogBus('JSEditor','javascript')" title="Add Javascript"/>
            <!-- <i-icon icon="akar-icons:css-fill" class="text-xl icon-button ml-4 cursor-pointer" @click="$dialogBus('JSEditor','css')" title="Add custom style"/> -->
            <i-icon icon="gg:shortcut" class="text-gray-400 ml-4 text-2xl hover:text-purple-600" @click="$dialogBus('shortcuts')" title="Shortcuts"/>
            <i-icon icon="grommet-icons:help-option" class="ml-4 text-2xl icon-button" @click="$dialogBus('help','Editor')" title="Documentation"/>
            <i-icon icon="codicon:open-preview" class="text-gray-400 ml-4 text-2xl hover:text-purple-600" @click="$editorBus('preview','fullscreen')" title="Preview"/>
            
            <span class="absolute right-0 mr-12">X:{{ parseInt(containerCoords.left)-editorOffsetX }} Y:{{ parseInt(containerCoords.top + scroll - editorOffsetY ) }} </span>
        </div>
        <div class="p-4 mt-24 pb-20">
            <BlockContainer v-if="editor.document" 
                :doc="editor.document" 
                @current="setCurrent"
                level="10"/>
        </div>
        <!-- <component 
            :is="actionComponent"
            ref="floatingDropdown" 
            class="z-highest bg-white modal shadow border border-black" 
            id="floatingAction"
            :coords="coords"
            :scroll="scroll"
            :class="editElementContent()"
            :parent="editor.current?editor.current.id:null"
            :options="options"
            v-if="editor.current"
            @position="actionComponentPosition"
            @close="actionComponent=null"/> -->
            <!-- :style="actionStile"/>  -->
        <BlockFloatingAction 
            v-if="editor.current"
            class="z-modal bg-white modal" 
            :coords="coords"
            :scroll="scroll"
            :title="actionTitle"
            :component="actionComponent" 
            :options="options" 
            @close="actionComponent=null"/>

        <BlockFloating 
            :is="component" 
            class="absolute left-0 z-highest" 
            id="floating"
            :scroll="scroll" 
            :coords="containerCoords"
            :class="editElementContent()"
            @close="component=null,actionComponent=null"/>

        <pre v-if="editor.current && viewBlocks">
            {{ editor.current.tag }}
            {{ editor.current }}
        </pre>
    </div>
</template>

<script>
import Element from '@/scripts/ElementsClass'
import Block from '@/scripts/BlocksClass'
import { mapState } from 'vuex'
import { editorBus , dialogBus } from '@/main'
export default {
    name: 'BlockEditor',
    components:{
        'BlockContainer' : () => import ( '@/components/blocks/BlockContainer.vue' ),
        'BlockLink'         : () => import ( '@/components/blocks/components/BlockLink.vue'),
        'BlockFloating'     : () => import ( '@/components/blocks/components/BlockFloating.vue'),
        'BlockEditContent'  : () => import ( '@/components/blocks/components/BlockEditContent.vue'),
        'BlockFloatingAction' : () => import ( '@/components/blocks/components/BlockFloatingAction.vue'),
    },
    // props: [ 'scroll' ],
    data:()=>({
        scroll: 0,
        viewBlocks : false,
        elementLink : false,
        elementFloating: false,
        elementContent: false,
        floatingID : null,
        display: true,
        editorOffsetX:16,
        editorOffsetY:88,
        coords: {
            top: 0,
            left: 0,
            offsetX: 0,
            offsetY: 0
        },
        
        containerCoords: {
            top: 0,
            left:0,
            height: 0
        },
        component: null,
        actionComponent: null,
        actionStile: '',
        actionTitle: '',
        options: null,
        action: null,
        timer: null
    }),
    computed:{
        ...mapState ( ['editor'] ),
        linkVisible(){
            return this.elementLink ? 'opacity-100' : 'opacity-0'
        },
        floating(){
            return this.elementFloating ? 
                this.editor.current.type === 'element' ? 'opacity-100' : 'opacity-0' : 'opacity-0'
        },
        classe(){
            return this.display ? '' : 'hidden'
        },
        
        actionPosition(){
            console.log ( this.$refs )
            if ( this.$refs.floatingDropdown ){
                console.log ( this.$refs.floatingDropdown )
            }
            return false
        }

    },
    watch:{
        scroll(v){
            if ( !this.editor.current  ) return
            if ( this.editor.current && this.editor.current.id && this.containerCoords ){
                try {
                    let el = document.getElementById ( this.editor.current.id )
                    let coords = el.getBoundingClientRect()
                    this.containerCoords.top = coords.top - v
                    this.actionStile = `top:${this.coords.top - this.containerCoords.height}px;left:${this.coords.left}px;`
                    
                } catch ( err ){
                    return
                }
            }
        },
        '$store.state.editor.current.id' : function(){
            this.actionComponent = null
            this.containerCoords.top = this.containerCoords.top - this.scroll
        }
    },
    methods:{
        actionComponentPosition(h){
            if ( h ){
                this.containerCoords.height = h
                if ( this.containerCoords.top > 250 ){
                    this.actionStile = `top:${this.coords.top-this.scroll-h}px;left:${this.coords.left}px;`
                } else {
                    this.actionStile = `top:0px;left:${this.coords.left}px;`//`top:${this.coords.top-this.scroll-8}px;left:${this.coords.left}px;`
                }
            }
        },
        createDocument(){
            const component = new Block()
            const block = new Element().Flexbox({direction:'col'})
            block.css.css = this.$clean ( block.css.css )
            components.json = block
            this.$store.dispatch ( 'setComponent' , component )
            this.$store.dispatch ( 'document' , block )
            this.$store.dispatch ( 'setCurrent' , block )
        },
        setCurrent ( element ){
            //console.log ( this.$refs.mainEditor.scrollTop )
            
            element.css.css = this.$clean ( element.css.css )
            this.$store.dispatch ( 'setCurrent' , element )
            this.action = null
        },
        getCoords(id){
            let el = document.querySelector('#' + id )
            try {
                return el.getBoundingClientRect()
            } catch ( err ){
                return null
            }
        },
        editContent(){
            return this.elementContent ? 
                this.editor.current.type === 'element' ? 'opacity-100' : 'opacity-0' : 'opacity-0'
        },
        editElementContent(){
            return this.component ? 'opacity-100' : 'opacity-0'
                //this.editor.current.type === 'element' ? 'opacity-100' : 'opacity-0' : 'opacity-0'
        },
    
    },
    beforeDestroy(){
        window.clearInterval ( this.timer )
        this.timer = null
    },
    mounted(){
        this.actionStile = `top:${this.coords.top-this.scroll-8}px;left:${this.coords.left}px;`
        //Autosave if is set to true in settings
        let vm = this
        let settings = this.$store.state.editor.settings //JSON.parse ( window.localStorage.getItem ( 'whoobe-settings') )
        if ( settings.autosave && this.editor.page.id != 0 ){
            this.timer = window.setInterval( () => {
                vm.$savePage()
            },parseInt(settings.autosaveTimeout)*1000*60)
        }
        if ( !this.editor.document ) {
            
            let lastDocument = window.localStorage.getItem( 'whoobe-preview' )
            if ( lastDocument ){
                //let confirm = window.confirm ( 'Do you want to open the last document you worked on?' )
                //confirm ? 
                    this.$store.dispatch ( 'document' , JSON.parse ( lastDocument ) ) 
                    //: 
                //        this.$editorBus('createDocument')
                     
            } else {
                this.$editorBus('createComponent')
            }
        }

        

        editorBus.$on ( 'floatingElement' , (id) => {
            this.component = () => import ( '@/components/blocks/components/BlockFloating.vue')
            let coords = this.getCoords(id)
            if ( coords ){
                this.containerCoords = {
                    top: coords.top + 8,
                    left: coords.left
                }
            }
            
        })

        editorBus.$on ( 'selectElement' , ( coords , type ) => {
            if ( !coords ){
                let sel = document.querySelector('.elementSelector')
                if ( sel ) document.body.removeChild ( sel )
                return
            }
            let el = document.getElementById ( this.editor.current.id )

        })

        editorBus.$on ( 'editorAction' , ( action ) => {
            this.actionTitle = action.title
            this.action = action.icon
            this.actionComponent = () => import ( '@/components/blocks/components/' + action.action )
            let coords = this.getCoords ( 'floating' )
            this.coords.top = coords.top + this.scroll
            this.coords.left = coords.left
            this.options = action.options
            
        })

        editorBus.$on ( 'importComponent' , ( component ) => {
            this.editor.current.blocks.push ( component.json.blocks[0] )
            this.$dialogBus ( 'closeDialog' )
        })

        editorBus.$on ( 'selectedMedia' , ( media ) => {
            this.editor.current.image.hasOwnProperty('url') ?
                this.editor.current.image.url = media : this.editor.current.image = media
            this.actionComponent = null
            this.action = null
            this.$dialogBus ( 'closeDialog' )
        })

        editorBus.$on ( 'setFlexRow' , () => {
            this.editor.current.css.container = this.editor.current.css.container.replace ( 'flex-col','').replace('flex-row','')
            this.editor.current.css.container.includes('flex-row') ? null :
                this.editor.current.css.container = this.$clean(this.editor.current.css.container + ' flex-row')
        })

        editorBus.$on ( 'setFlexCol' , () => {
            this.editor.current.css.container = this.editor.current.css.container.replace ( 'flex-col','').replace('flex-row','')
            this.editor.current.css.container.includes('flex-col') ? null :
                this.editor.current.css.container = this.$clean(this.editor.current.css.container + ' flex-col')
        })
       
        editorBus.$on ( 'copyBlockCSS' , () => {
            let css = Object.assign ( {} , this.editor.current.css )
            css.style = this.editor.current.style
            window.localStorage.setItem ( 'whoobe-block-css' , JSON.stringify(css) )
        })

        editorBus.$on ( 'pasteBlockCSS' , () => {
            if ( window.localStorage.getItem ( 'whoobe-block-css') ){
                let css = JSON.parse ( window.localStorage.getItem ( 'whoobe-block-css' ) )
                this.editor.current.css.css = css.css
                this.editor.current.css.container = css.container
                this.editor.current.style = css.style
                //window.localStorage.setItem ( 'whoobe-block-css' , false )
            }
        })

        

        // let doc = Object.assign ( {} , this.editor.document )
        // function addKey ( obj , key , value ){
        //     console.log ( 'adding key => ', key , ' to: ' , obj.id )
        //     obj[key] = value // === 'object' ? {} : value
        //     obj.blocks.map ( block => {
        //         addKey ( block , key , value )
        //     })
        //     return obj
        // }
        // if ( !doc.hasOwnProperty('alpine') ){
        //     doc = addKey ( doc , 'alpine' , {} )
        //     this.$store.dispatch('document', doc )
        // }
        
        
        // let lastDocument = window.localStorage.getItem( 'whoobe-preview' )
        // if ( this.$store.state.editor.page ){
        //     this.$store.state.editor.page.json = JSON.parse ( lastDocument )
        // } else {
        //     this.$editorBus ( 'createPage' , JSON.parse(lastDocument) )
        // }
        //this.$dialogBus ( 'pages' )
        if ( !this.editor.page ) this.$router.push('/')
        this.setCurrent ( this.editor.document )
        this.action = null
        this.actionComponent = null
        this.$editorBus ( 'floatingElement' , this.editor.document.id )

        this.$refs.mainEditor.addEventListener ( 'scroll' , (e) => {
            this.scroll = e.target.scrollTop
            //this.scrollTop =  e.target.scrollTop 
        })
        this.$refs.mainEditor.style.overflowY = 'auto'

        if ( !this.editor.page.id && !this.editor.document.blocks.length ){
            this.$dialogBus ( 'snippets' )
        }
    }

}
</script>