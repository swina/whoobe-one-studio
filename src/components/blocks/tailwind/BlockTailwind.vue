<template>
    <div class="relative z-highest h-full">
        <div v-if="editor.current" class="border-r border-b">
            <template v-for="group in groups">
                <div :key="group.label" class="capitalize cursor-pointer p-2 text-gray-700 text-base" :class="gr===group.label?'bg-bluegray-300 text-gray-200':''" @click="setControl(group)" v-if="isEnabled(group)">
                    {{ group.label }}
                    <m-icon class="absolute right-0 m-1" icon="chevron_right"/>
                </div>
            </template>
        </div>
        <transition name="slideright">
            <div v-if="controls" class="whoobe-editor-tw-controls bg-bluegray-100 text-gray-500 border-b border-gray-900 top-0 absolute w-full z-2xtop left-0 right-0 bottom-0">
                <div class="bg-indigo-500 text-white flex flex-row p-1 items-center capitalize cursor-pointer text-white" @click="controls=null,$store.dispatch('customizeTab',null)"><i class="material-icons absolute right-0">close</i> {{ gr }}</div>
                <div v-for="control in controls" class="capitalize" :class="control.hasOwnProperty('group')?'float-left my-4 mx-1':'p-2 flex flex-col clear-both'">
                    <component
                        :key="$randomID() + '_' + editor.current.id" 
                        :is="control.name" 
                        :attr="control.attr" 
                        :title="control.title"
                        :css="$clean(css)"
                        :stile="editor.current.style"
                        :icon="control.icon||null"
                        v-model="cssTw[control.attr]"
                        @stile="stile"
                        @css="updateCss"/>
                </div>
                <!-- <div :key="$randomID()" v-for="component in g.components" class="mb-1 p-1" :class="component.hasOwnProperty('group')? component.css :''">
                        <component 
                        :key="$randomID()"
                        :is="component.name" 
                        :component="component.name" 
                        :css="css" 
                        :stile="editor.current.style"
                        v-model="cssTw[component.attr]" 
                        :entity="editor.current"
                        :attr="component.attr" 
                        :icon="component.icon||null"
                        :classe="component.css||''"
                        :required="component.hasOwnProperty('required')? component.required :''"
                        :title="component.hasOwnProperty('title')?component.title:''"
                        :negative="component.hasOwnProperty('negative')?component.negative:false"
                        @stile="stile"
                        @clearstile="stile"
                        @blockcss="blockcss"
                        @css="update"/>
                    </div> -->
            </div>
        </transition>
    </div>
</template>

<script>
import twgroups from '@/scripts/tw.groups'
import classes from '@/scripts/tw.classes'
import { mapState } from 'vuex'
export default {
    name: 'BlockTailwind',
    components:{
        'Options'       : () => import ( './controls/tailwind.options.vue') ,
        'Checkbox'      : () => import ( './controls/tailwind.checkbox.vue') ,
        'Range'         : () => import ( './controls/tailwind.range.vue') ,
        'Color'         : () => import ( './controls/tailwind.color.vue') ,
        'Button'        : () => import ( './controls/tailwind.button.vue') ,
        'BgGradient'    : () => import ( './controls/tailwind.bg.gradient.vue') ,
        'Width'         : () => import ( './controls/tailwind.width.vue') ,
        'Height'        : () => import ( './controls/tailwind.height.vue') ,
        'BgPosition'    : () => import ( './controls/tailwind.bgposition.vue') ,
        'BorderColor'   : () => import ( './controls/tailwind.border.color.vue') ,
        'TextFont'      : () => import ( './controls/tailwind.text.font.vue') ,
        'Position'      : () => import ( './controls/tailwind.position.vue') ,
    },
    data:()=>({
        gr: '',
        controls: null,
        allCss: '',
        cssTw:{},
    }),
    props: ['css','cid'],
    mounted(){
        this.controls = null
        this.cssTw = {}
        this.allCss = this.css
        if ( this.editor.customizeTab ){
                this.setControl ( this.editor.customizeTab ) 
                this.gr = this.editor.customizeTab.label
            }
    },
    computed:{
        ...mapState ( [ 'editor' ] ),
        groups(){
            return twgroups
        }
    },
    watch:{
        cssTw:{
            handler(old,changed){
                if ( this.cid === this.editor.current.id ){
                    let css = this.$clean ( this.allCss + ' ' +  this.$clean(Object.values(changed).join(' ')) ) 
                    css = [ ...new Set(css.split(' '))].join(' ')
                    this.editor.current.css.css = css
                }
            },
            deep:true
        },
        // controls(v){
        //     if ( !v ) {
        //         this.cssTw = {}
        //         this.allCss = this.css
                
        //     }
        // },
        cid(v){
            
            this.allCss = this.css
            this.controls = null
            this.cssTw = {}
            
        }
    },
    methods:{
        isEnabled(group){
            if ( group.filter ){
                return group.filter.includes( this.editor.current.tag )
            }
            return true
        },
        setControl(group){
            this.gr = group.label
            this.$store.dispatch ( 'customizeTab' , group )
            this.controls = group.components
            this.css = this.editor.current.css.css
        },
        controlComponent(name){
            return () => import ( './controls/tailwind.' + name + '.vue' )
        },
        stile(stile){
            this.editor.current.style = stile
        },
        updateCss(classe){
            this.allCss = this.$clean(this.allCss.replace(this.$clean(classe),' '))
        }
    },
}
</script>