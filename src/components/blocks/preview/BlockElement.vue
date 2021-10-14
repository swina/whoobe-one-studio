<template>
        <!-- <component 
            mode="render"
            :block="element"
            :id="element.anchor ? element.anchor : element.id"
            :ref="element.id"
            :is="component" 
            :type="element.type" 
            :class="classe" 
            :style="stile" 
            v-html="element.tag==='iconify'?null:element.content" 
            :value="element.value" 
            :src="element.image && element.image.url?$imageURL(element.image):'no-image.png'" 
            :placeholder="element.placeholder"
            :data-icon="element.tag==='iconify'?element.data.icon:null"
            @click="eventClick">
        </component> -->
            <!-- :id="element.anchor ? element.anchor : element.id" -->
        <component 
            :ref="element.id"
            :is="component" 
            :class="classe" 
            :style="stile" 
            v-html="element.tag==='iconify'?null:element.content" 
            :value="element.value" 
            :src="element.image && element.image.url?$imageURL(element.image):'no-image.png'"
            :alt="element.image && element.image.alt?element.image.alt:element.element"
            :title="element.image && element.image.caption?element.image.caption:element.element"
            :data-icon="element.tag==='iconify'?element.data.icon:null"
            @click="eventClick">
        </component>
       
</template>

<script>
import { eventBus } from '@/main'
export default {
    name: 'BlockElement',
    data: () => ({
        display: true
    }),
    computed:{
        classe(){
            let cls = Object.values ( this.element.css ).join ( ' ' )
            this.display ? null : cls += ' hidden'
            
            return cls.trim()
        },
        stile(){
            let st = ''
            if ( this.element.image && this.element.element != 'img' && this.element.image.url ){
                st += "background-image:url(" + this.element.image.url + ");"
            }
            this.element.font ? st += `font-family:"${this.element.font.replace('+',' ')}";` : null
            return st + this.element.style
        },
        component(){
            //if ( !this.element || !this.display ) return null
            if ( this.element.semantic ) return this.element.semantic
            return this.element.hasOwnProperty('level') ? 'h' + this.element.level : 
                this.element.element === 'iconify' ? 'IconifyIcon' : this.element.element
        },
        element(){
            return this.$attrs.element
        },
    },
    watch:{
        display(v){
            if ( v ) {
                if ( this.$refs ){
                    this.$animationElement ( this.element , this.element.id , this.$refs )
                }
            }
        }
    },
    methods:{
        eventClick(){
            this.element.events.click ?
                eventBus.$emit ( this.element.events.click ) : null
        }
    },
    mounted(){
        
        
        this.element.events.display ?
            this.display = false : null
            
        this.element.events.display ?
            eventBus.$on ( this.element.events.display , () => {
                this.display =! this.display
            }) : null
        
        this.element.events.hide ?
            eventBus.$on ( this.element.events.hide , () => {
                this.display =! this.display
            }) : null
        
        this.element.gsap.animation && this.element.gsap.duration && this.display ?
            this.$animation(this.element,this.element.id,this.$refs) : null

        this.$refs[this.element.id].removeAttribute('element')
        if ( this.element.element != 'img' ) this.$refs[this.element.id].removeAttribute('src')
        if ( this.element.element != 'img' ) this.$refs[this.element.id].removeAttribute('alt')
        if ( this.element.element != 'img' && !this.element.link ) this.$refs[this.element.id].removeAttribute('title')
        if ( this.element.tag === 'input'){
            Object.keys(this.element.data.attributes).forEach( attribute => {
                this.$refs[this.element.id].setAttribute ( attribute , this.element.data.attributes[attribute] )
            })
        }
    }
}
</script>