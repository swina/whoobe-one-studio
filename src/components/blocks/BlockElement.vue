<template>
    <component 
        v-if="element"
        :id="element.id"
        :ref="element.id"
        :is="component" 
        :type="element.type" 
        :class="classe" 
        :style="stile" 
        v-html="element.content" 
        v-model="element.content"
        :value="element.value" 
        :src="element.image && element.image.url?$imageURL(element.image):'no-image.png'" 
        :placeholder="element.placeholder" 
        :contenteditable="element.editable"
        @click="setCurrent(element),clickEvent" 
        @blur="handleInput"
        :data-id="element.id"
        data-type="element"
        :data-element-tag="element.type + ' ' +  element.element"
        :icon="element.tag==='iconify'?element.data.icon:null">
        </component>
</template>

<script>
import { mapState } from 'vuex'
import { editorBus } from '@/main'
export default {
    name: 'BlockElement',
    data:()=>({
        floatingID: null,
        elementLink: false,
        
    }),
    computed:{
        ...mapState ( [ 'editor' ] ),
        classe(){
            if ( !this.editor.current && !this.element ) {
                return
            }
            let cls = ''
            cls += this.element.css.css + ' ' + this.element.css.container
            cls += ' z-' + (parseInt(this.$attrs.level)+1)
            this.editor.current && this.editor.current.type === 'hidden' ?
                (cls += ' h-10 w-64 bg-gray-100 shadow') : null
            this.editor.current && this.editor.current.id === this.element.id ?
                 cls += ' shadow' :
                 cls += ' '
            
            return cls
        },
        stile(){
            let st = ''
            if ( this.element.image && this.element.image.url ){
                st += "background-image:url(" + this.element.image.url + ");"
            }
            this.element.font ? st += `font-family:"${this.element.font.replace('+',' ')}";` : null
            
            return st.replace('absolute','') + this.element.style
        },
        setEditable(){
            return this.editor.current && this.editor.current.id===this.element.id && this.element.editable ? true : false
        },
        component(){
            if ( !this.element ) return null
            
            return this.element.hasOwnProperty('level') ? 'h' + this.element.level : 
                this.element.element === 'grid' ? 'div' : this.element.element
        },
        element(){
            return this.$attrs.element
        },
        selector(){
            let cls = 'z-' + this.$attrs.level
            if ( this.editor.current && this.editor.current.id === this.element.id ){
                cls += ' shadow'
            } else {
                cls += ' '
            }
            return cls
        },
        
    },
    watch:{
        '$store.state.editor.current.id':function(id){
            id && this.element.id != id ? this.$refs[this.element.id].blur() : null
        },
       
    },
    methods:{
        setCurrent(block){
            if ( this.editor.current && this.editor.current.id === block.id ){
                this.$store.dispatch ( 'setCurrent' , null )
                
                this.$refs[block.id].blur()
                return
            }

            this.$refs[block.id].setAttribute ( 'contenteditable' , block.editable )
            this.$store.dispatch ( 'setCurrent' , block )
            this.$editorBus('floatingElement',block.id) 
            let coords = this.$refs[this.element.id].getBoundingClientRect()
            this.element.coords = coords
        },
        clickEvent(){
            this.element.events.display ?
                this.eventBus.$emit ( this.element.events.display ) : null
        },
        setFloating(){
            let el = document.querySelector('#' + this.floatingID )
            let coords = el.getBoundingClientRect()
            this.element.coords = coords
            this.$emit ( 'selected' , this.element )
        },
        edit(){
            //console.log ( 'edit this' )
        },
        focus (){
           
        //     this.$store.dispatch ( 'setCurrent' , this.element )
        //     //editorBus.$emit ( 'editElement' , this.element )
        },
        floating(){
             
            return this.editor.current ?
                    this.floatingID === this.editor.current.id ? 'opacity-100' : 'opacity-0' : null
        },
        handleInput: function(e){
            if ( !this.editor.current ) return
            let text = e.target.innerHTML.replaceAll(/style=\".*"/gm,'')
            this.element.content = text 
            // console.log ( this.editor.current.id , this.element.id )
            // this.editor.current.id === this.element.id ? 
            //     this.editor.current.content = text : null
            return
        },
    },
    mounted(){
        if ( this.element.data.hasOwnProperty ( 'options') ){
            if ( !this.$refs[this.element.id].options.length ){
                this.element.data.options.forEach ( option => {
                    let selectOption = document.createElement ( 'option' )
                    selectOption.value = option
                    selectOption.text = option
                    this.$refs[this.element.id].add ( selectOption )
                })
            }
        }
        // editorBus.$on ('linkBlock',()=>{
        //     this.elementLink =! this.elementLink
        // })
       
    }
}
</script>