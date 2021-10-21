<template>
     <div ref="floatingBarElement" v-if="$store.state.editor.current && $attrs.coords" class="h-8 flex items-center absolute z-highest justify-center bg-white text-black shadow text-xs px-2 cursor-pointer -mt-10" :style="coordinate">
        <small class="chip bg-blue-400 capitalize" @click="$emit('close')">{{$store.state.editor.current.element}}</small>
        <i-icon class="floating-icon text-gray-400 hover:text-purple-600 text-xl" icon="icomoon-free:move-up" @click="$editorBus('moveBlock',1)" title="Move up"/>
        <i-icon v-if="$store.state.editor.current.type==='container'" class="floating-icon text-gray-400 hover:text-purple-600 text-xl" icon="la:elementor" @click="$eventBus('sidebar','elements')" title="Add element"/>
        <i-icon v-if="$store.state.editor.current.tag==='flex'" class="floating-icon text-gray-400 hover:text-purple-600 text-xl" icon="fluent:text-direction-horizontal-right-24-regular" @click="$editorBus('setFlexRow')" title="Direction row"/>
        <i-icon v-if="$store.state.editor.current.tag==='flex'" class="floating-icon text-gray-400 hover:text-purple-600 text-xl" icon="fluent:text-direction-rotate-90-ltr-20-regular" @click="$editorBus('setFlexCol')" title="Direction column"/>
        <i-icon v-if="$store.state.editor.current.semantic==='form'" class="floating-icon text-gray-400 hover:text-purple-600 text-xl" icon="clarity:form-line" @click="$editorBus('editorAction',{title:'Form settings',action:'BlockForm'})" title="Form settings"/>
        <template v-for="(icon,i) in icons">
            <i-icon class="floating-icon text-gray-400 hover:text-purple-600 text-xl" :icon="icon.icon" @click="$editorBus('editorAction',icon,$event),currentIcon=icon.icon" :title="icon.title" v-if="isIconEnabled(icon)" :key="'icon_'+i"/>
        </template>
        <i-icon class="floating-icon text-gray-400 hover:text-purple-600 text-xl" icon="ci:trash-empty" @click="$editorBus('deleteBlock')"/>
        <small class="chip bg-lime-400" v-if="$store.state.editor.current.gsap.animation" @click="$eventBus('sidebar','animation')">{{$store.state.editor.current.gsap.animation}}</small>
    </div>
</template>

<script>
import { editorBus } from '@/main'

export default {
    name: 'BlockFloatingBarBlock',
    data:()=>({
        currentIcon: '',
        icons: [
            { icon: 'akar-icons:edit' , title: 'Edit content' , action: 'BlockEditContent' , filter: null },
            { icon: 'akar-icons:diamond' , title: 'Icon' , action : 'BlockIconFinder' , filter: 'IconifyIcon' },
            { icon: 'carbon:settings' , title: 'Attributes' , action: 'BlockInput' , filter : 'input' },
            { icon: 'carbon:settings' , title: 'Slider settings' , action: 'BlockSliderControls' , filter : 'slider' },
            { icon: 'carbon:settings' , title: 'Attributes' , action: 'BlockInput' , filter : 'textarea' },
            { icon: 'carbon:text-font' , title: 'Font' , action: 'BlockFont'  },
            { icon: 'bx:bx-heading' , title: 'Heading' , action: 'BlockHeading' , filter: 'h' },
            { icon: 'fluent:text-color-24-regular' , title: 'Text Color' , action: 'BlockTextColor' , options: { context: 'textcolor' }, filter: null },
            { icon: 'fluent:color-fill-24-regular' , title: 'Fill Color' , action: 'BlockTextColor' , options: { context: 'bgcolor' } , filter: null },
            { icon: 'akar-icons:image' , title: 'Image' , action: 'BlockImageUrl' , filter : null },
            { icon: 'akar-icons:link-chain' , title: 'Link' , action: 'BlockLink' , filter: null },
            { icon: 'ant-design:download-outlined' , title: 'Import block' , action: 'BlockImport' , filter: 'container' },
            { icon: 'ant-design:upload-outlined' , title: 'Export block' , action: 'BlockExport' , filter: 'container' }
            //{ icon: 'ci:trash-empty' , title: 'Delete block' , action: 'BlockExport' , filter: 'container' }
            
            // { icon: 'menu' , title: 'More...' , action: 'BlockContextMenu' , filter: null },
            //{ icon: 'delete' , title: 'Remove' , action: 'deleteBlock' , filter: null },
        ],
        position: {},
        offsetX : 145,
        inner: null,
        currentElement : null
    }),
    methods:{
        isIconEnabled( icon ){
            return icon.filter ? 
                icon.filter.includes ( this.$store.state.editor.current.element ) 
                    ? true :
                                                     icon.filter.includes ( this.$store.state.editor.current.tag ) ?  true : 
                                icon.filter.includes ( this.$store.state.editor.current.element ) ? true : false : true
        },
        classe ( icon ){
            return icon === this.currentIcon ?
                'text-black' : null
        },
        getCoords(){
            let el = document.getElementById ( this.$store.state.editor.current.id )
            try {
                let coords = el.getBoundingClientRect()
                if ( coords.left < 0 ){
                    coords.left = this.$attrs.coords.left
                }
                if ( this.$store.state.editor.current.type === 'slider' ){
                    alert ( 'is slider' )
                    coords.top = coords.top - 60
                }
                this.position = {
                    top : coords.top - 32 + parseInt(this.$attrs.scroll) ,
                    left: coords.left ,
                    right: coords.right,
                    bottom: coords.bottom,
                    width: coords.width,
                    offsetX: 0,
                }
            } catch ( err  ){
                return 
            }
        }
    },
    computed:{
        coordinate(){
            return this.$store.state.editor.current.type != 'slider' ? 
                `top:${this.$attrs.coords.top + this.$attrs.scroll}px;left:${this.position.left}px;` :
                `top:${this.$attrs.coords.top + this.$attrs.scroll - 80 }px;left:${this.position.left -12}px;`
        }
    },

    mounted(){
        this.inner = window.innerWidth
        
        editorBus.$on ( 'isSidebar' , () => {
            this.getCoords()
        })
        editorBus.$on ( 'closeSidebar' , () => {
            this.getCoords()
        })
        this.getCoords()
        let fl = this.$refs.floatingBarElement.getBoundingClientRect() 
        if ( (this.position.left + fl.width + 50 ) > window.innerWidth ){
            this.position.left = window.innerWidth - fl.width - 50
        }
        
        //let coords = this.$refs.floatingBarElement.getBoundingClientRect()
        // if ( this.position.right > window.innerWidth - 100 ){
        //     this.position.left = this.position.left - 100
        // }
    }
}
</script>