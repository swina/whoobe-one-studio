<template>
    <div class="p-2 flex flex-col" v-if="element" :key="element.id" :ref="'alp'+element.id">
        <strong>Alpine Directive</strong>
        
        <select v-model="directive" class="w-full mb-2">
            <option v-for="directive in directives" :value="directive">{{directive}}</option>
        </select>
        
        <input type="text" class="w-full mb-2" placeholder="add a directive not listed"  v-model="extraDirective" @keydown="addDirective($event)"/>
        <input type="text" class="w-full mb-2" v-model="newDirective" @keydown="addDirective($event)"/>

        <strong>Current directives</strong>
        
        <div class="flex flex-wrap" v-if="element.data.alpine">
            <template v-for="elementDirective in Object.keys(element.data.alpine)">
                <span v-if="element.data.alpine[elementDirective]" class="chip bg-purple-400 px-1 flex items-center m-1 rounded-full cursor-pointer" :title="element.data.alpine[elementDirective]" @click="currentDirective = elementDirective , currentData = element.data.alpine[elementDirective]">{{ elementDirective }} <m-icon icon="close"  @click="removeDirective(elementDirective)" class="text-xs text-black ml-1 bg-white rounded-full h-4 w-4 flex items-center justify-center"/></span>
            </template>
        </div>
        <div v-if="currentDirective">
            <span class="chip w-auto text-purple-400 px-1 flex items-center m-1 rounded-full cursor-pointer">{{ currentDirective }}</span>
            <textarea style="font-family:monospace" class="w-full text-xs h-52" v-model="element.data.alpine[currentDirective]"/>
        </div>
        <p class="text-xs text-gray-300 absolute bottom-0 mb-20"><b>Add an AlpineJS directive selecting from the list and add your code</b>.
        <!-- <br><br>AlpineJS is disabled in smartphone/tablet preview -->
        </p>
    </div>
</template>

<script>
export default {
    name: 'BlockAlpine',
    data:()=>({
        element: null,
        directive: '',
        currentDirective : null,
        currentData : null,
        extraDirective: '',
        newDirective: '',
        directives: ['x-data','x-init','x-show','x-bind','x-bind:class',    'x-on','x-on:click','x-text','x-html','x-model','x-for','x-transition','x-effect','x-ignore','x-ref','x-cloak','x-if']
    }),
    mounted(){
        this.element = this.$store.state.editor.current
    },
    methods:{
        addDirective(e){
            if ( e.keyCode === 13 ){
                if ( !this.element.data.alpine ){
                    this.element.data.alpine = {}
                }
                this.element.data['alpine'][this.directive] = this.newDirective
                this.directive = ''
                this.newDirective = ''
            }
        },
        removeDirective(key){
            delete this.element.data.alpine[key] 
            this.$store.dispatch ( 'setCurrent' , this.element )
        }
    },
   

}
</script>