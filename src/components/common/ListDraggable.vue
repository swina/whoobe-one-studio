<template>
    <div v-if="list">
        <ul class="dragula-list m-0" id="list-draggable" style="min-height:3rem;">
            <template v-for="item in list">
                <li class="list-none p-1 m-0 mb-1 bg-gray-200 dragula-element cursor-move" :data-item="item" v-if="!fields.includes(item)">{{ item }}</li>
            </template>
        </ul>
        <div class="bg-purple-500 text-white px-1 mb-1">Selected</div>
        <div class="dragula-drop" style="min-height:3rem;">
            <template v-for="item in fields">
                <li class="list-none p-1 m-0 mb-1 bg-purple-400 dragula-element cursor-move" :data-item="item">{{ item }}</li>
            </template>
        </div>
        
    </div>
</template>

<script>
import dragula from 'dragula'
import { mapState } from 'vuex'
export default {
    props: [ 'list' , 'selected' ],
    data:()=>({
        config: null,
        fields: [],
    }),
    computed:{
        ...mapState ( ['datastore'] )
    },
    methods:{
        fieldsList(target){
            let childs = target.childNodes
            this.fields = []
            let len = childs.length, i = -1;
            if(++i < len) do {
                this.fields.push ( childs[i].getAttribute ( 'data-item') )
            } while(++i < len);
            this.$emit ( 'fields' , this.fields )
        }
    },
    mounted(){
        this.fields = this.selected
        this.config = this.datastore.whoobe_store
        dragula([document.querySelector('.dragula-list'),document.querySelector('.dragula-drop')])
            .on ( 'drop' , (el,target) => {
                console.log ( target.classList )
                if ( target.classList.contains('dragula-drop') ){
                    el.classList.replace('bg-gray-200','bg-purple-400')
                    this.fields.push ( el.getAttribute('data-item') )
                    let childs = target.childNodes
                    this.fields = []
                    let len = childs.length, i = -1;
                    if(++i < len) do {
                        this.fields.push ( childs[i].getAttribute ( 'data-item') )
                        console.log('node: ', childs[i]);
                    } while(++i < len);
                    this.fields = [ ... new Set ( this.fields ) ]
                    this.$emit ( 'fields' , this.fields )
                }
                if ( target.classList.contains('dragula-list') ){
                    el.classList.replace('bg-purple-400','bg-gray-200')
                    this.fieldsList ( target )
                }
            });
        // var drake = dragula({
        //     isContainer: function (el) {
        //         console.log ( el )
        //         if ( el.getAttribute('name') == 'dragula-list' ) return true
        //         return false
        //     },
        //     accepts: function (el, target, source, sibling) {
                
        //         if ( target.id === source.id ) return false
        //         if ( el.getAttribute('name') === 'dragula-element' ) return true
        //         return false; // elements can be dropped in any of the `containers` by default
        //     },
        //     move: function ( el, source, handle, sibling) {
        //         console.log ( el )
        //         //if ( !el.classList.includes('dragula-element') ) return false
        //         return true
        //     }
        // });
        // let vm = this
        // drake.on ( 'drop' , (el,target,source,sibling) => {
        //     console.log ( el )
        // })
    }
}
</script>