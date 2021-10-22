<template>
    <div v-if="element" class="p-2 flex flex-col" :key="element.id + '_attr'">
        <div v-if="element && element.data && element.data.attributes && Object.keys(element.data.attributes)">
            <select v-model="currentAttribute" class="w-full" v-if="attributes.length">
                <option v-for="att in attributes">{{att}}</option>
            </select>
            {{currentAttribute}}
            <template v-for="(attrib,i) in attributes">
                <div class="w-5/6 flex items-center mb-1">
                <span class="chip bg-purple-400 mr-2">{{ attrib }}</span> {{ element.data.attributes[attrib]}}
                <m-icon icon="close" class="absolute text-gray-400 text-xl mr-2 right-0" @click="deleteAttribute(attrib,i)"/>
                </div>
            </template>
        </div>
        <label>Attribute</label>
        <input type="text" class="w-full" v-model="newAttributeName"/>
        <label>Value</label>
        <input type="text" class="w-full" v-model="newAttributeValue" @keydown="addAttribute($event)"/>
        <p class="text-xs text-gray-300 absolute bottom-0 mb-20"><b>To add an attribute add a name a value (optional) and click Enter</b>.<br><br>You can add attributes to any element. Do not duplicate attributes in order to prevent unexpected behaviors.</p>
    </div>
</template>


<script>
import { mapState } from 'vuex'
export default {
    name: 'BlockAttributes',
    data:()=>({
        element: null,
        newAttributeName: '',
        newAttributeValue: '',
        currentAttribute: null,
        attributes:[]
    }),
    watch:{
        '$store.state.editor.current':function(el){
            this.element = el
            if ( el.data.hasOwnProperty('attributes') ){ 
                Object.keys ( el.data.attributes ) ? this.attributes = Object.keys ( el.data.attributes ) : null
            }
        }
    },
    methods:{
        addAttribute(e){
            if ( e.keyCode === 13 ){
                if ( !this.element.data.hasOwnProperty('attributes') ){
                    let attrib = {}
                    attrib[this.newAttributeName] = this.newAttributeValue 
                    console.log ( attrib )
                    this.element.data['attributes'] = attrib
                } else {
                    this.element.data.attributes[this.newAttributeName] = this.newAttributeValue
                }
                this.attributes.push ( this.newAttributeName )
                this.newAttributeName = ''
                this.newAttributeValue = ''
                this.$store.dispatch ( 'setCurrent' , this.element )
            }
        },
        deleteAttribute(attrib,i){
            this.currentAttribute = null
            this.attributes.splice(i,1)
            delete this.element.data.attributes[attrib]
            this.$store.dispatch ( 'setCurrent' , this.element )
            console.log ( attrib , ' deleted')
        }
    },
    mounted(){
        this.element = this.$store.state.editor.current
    }

}
</script>