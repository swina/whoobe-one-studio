<template>
     <div ref="floatingBarElement" v-if="$store.state.editor.current && $attrs.coords" class="h-8 flex items-center absolute justify-center bg-white text-black shadow text-xs px-2 cursor-pointer -mt-10" :style="coordinate">
        <small class="chip bg-blue-400 capitalize">{{$store.state.editor.current.element}}</small>
        <m-icon class="floating-icon text-xl" icon="expand_less" @click="$editorBus('moveBlock',1)"/>
        <m-icon class="floating-icon text-xl" icon="add" v-if="$store.state.editor.current.type==='container'" @click="$eventBus('sidebar','elements')"/>
        <!--
        <m-icon class="floating-icon text-xl" icon="edit" @click="$editorBus('editContent')"/>
        <m-icon class="floating-icon text-xl" icon="brush"  @click="$editorBus('customizeBlock')"/>
        <m-icon v-if="$store.state.editor.current.element === 'img'" class="floating-icon text-xl" icon="photo"  @click="$editorBus('imageURL')"/>
        <m-icon class="floating-icon text-xl" icon="link" @click="$editorBus('linkBlock')"/>
        <m-icon class="floating-icon text-xl" icon="delete" @click="$editorBus('deleteBlock')"/> -->
        <template v-for="icon in icons">
            <m-icon class="floating-icon text-xl" :class="'hover:text-indigo-500'":icon="icon.icon" @click="$editorBus('editorAction',icon,$event),currentIcon=icon.icon" :title="icon.title" v-if="isIconEnabled(icon)" :classe="classe(icon.icon)"/>
        </template>
        <m-icon class="floating-icon text-xl" icon="delete" @click="$editorBus('deleteBlock',1)"/>
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
            //{ icon: 'expand_less' , title: 'Move up' , action: 'moveBlock,1' , filter : null},
            { icon: 'edit' , title: 'Edit content' , action: 'BlockEditContent' , filter: null },
            { icon: 'photo' , title: 'Icon' , action : 'BlockIconFinder' , filter: 'IconifyIcon' },
            { icon: 'format_size' , title: 'Font' , action: 'BlockFont'  },
            { icon: 'title' , title: 'Heading' , action: 'BlockHeading' , filter: 'h' },
            { icon: 'format_color_text' , title: 'Color' , action: 'BlockTextColor' , options: { context: 'textcolor' }, filter: null },
            { icon: 'format_color_fill' , title: 'Fill Color' , action: 'BlockTextColor' , options: { context: 'bgcolor' } , filter: null },
            //{ icon: 'brush' , title: 'Customize' , action: 'customizeBlock' , filter : null },
            { icon: 'photo' , title: 'Image' , action: 'BlockImageUrl' , filter : null },
            { icon: 'link' , title: 'Link' , action: 'BlockLink' , filter: null },

            { icon: 'menu' , title: 'More...' , action: 'BlockContextMenu' , filter: null },
            //{ icon: 'delete' , title: 'Remove' , action: 'deleteBlock' , filter: null },
        ],
        position: {},
        offsetX : 145,
        inner: null,
        currentElement : null
    }),
    methods:{
        isIconEnabled( icon ){
            return icon.filter ? icon.filter.includes ( this.$store.state.editor.current.element ) : true
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
            return `top:${this.$attrs.coords.top + this.$attrs.scroll}px;left:${this.position.left}px;`
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