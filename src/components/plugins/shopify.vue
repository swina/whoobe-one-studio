<template>
    <div class="flex flex-col">
        <div v-if="product">
            Connect <input type="checkbox" v-model="shopify"/>
            <div v-if="shopify">
                <button @click="setData('img')">image</button>
                <button @click="setData('title')">title</button>
                
            </div>
        </div>
        <div v-else>
            Shopify not connected.
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Shopify',
    data:()=>({
        product: null,
        fields: ['title','images','price'],
        shopify : false
    }),
    computed:{
        ...mapState ( ['datastore','editor'] )
    },
    watch:{
        shopify(value){
            if ( value ){
                if ( this.editor.current.type === 'container' ){
                    this.editor.current.data = 'shopify'
                }
            }
        }
    },
    methods:{
        setData(type){
            if ( type === 'img' ){
                if ( this.editor.current.element === type ){
                    this.editor.current.data = 'shopify.images'
                    this.editor.current.image.url = this.product.images[0].src
                }
            }
            if ( type === 'title' ){
                this.editor.current.data = 'shopify.title'
                this.editor.current.content = this.product[type]
            }
            
        }
    },
    mounted(){
        this.product = this.datastore.whoobe_store[0]
    }
}
</script>