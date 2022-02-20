<template>
    <div class="flex flex-col p-2">
        <div v-if="product" class="flex flex-col">
            <div class="flex">
                <button class="border-r px-2 hover:bg-blue-400 hover:text-white" @click="loopPage=!loopPage">Store Design</button>
                <button class="border-r px-2 hover:bg-blue-400 hover:text-white" @click="loopPage=!loopPage">Product Design</button>
            </div>

            <div v-if="(loopPage || editor.current.css.container.includes('shopify-grid') ) && !editor.current.css.container.includes('shopify-product') && !isField" class="flex flex-col border">
                <div class="bg-purple-500 text-white px-1">Store Page</div>
                <div class="flex flex-col p-2 border-t">
                    Items per page
                    <div class="flex items-center">
                        <input type="number" v-model="loop.records" min="1" max="120">
                        <m-icon icon="refresh" class="text-xl" @click="createLoopComponent(true)"/>
                    </div> 
                    Items per row
                    <input type="number" v-model="loop.row" min="1" max="12">
                    
                    
                </div>
                
            </div>
            <div v-if="showProduct || editor.current.css.container.includes('shopify-product')">
                    <div class="bg-purple-500 text-white px-1" @click="showProduct=!showProduct">Available Fields</div>
                    <ListDraggable :list="Object.keys(schema).sort()" :selected="datastore.whoobe_store.config.fields" @fields="setFieldsConfig"/>
                    <button class="btn bg-blue-500 text-white rounded m-auto my-2 w-20" @click="createLoopComponent(false)">Set</button>
                </div>
            <div v-if="editor.current.css.container.includes('shopify-product')">
                <div class="bg-purple-500 text-white px-1">Product Container</div>
            </div>
            CSS
            <textarea class="text-sm w-full" v-model="editor.current.css.css"/>
        </div>
        <div v-else>
            Shopify not connected.
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Element from '@/scripts/ElementsClass'
import Block from '@/scripts/BlocksClass' 
import jp from 'jsonpath'
import dragula from 'dragula'

export default {
    name: 'Shopify',
    components: {
        'ListDraggable' : () => import ( '@/components/common/ListDraggable.vue')
    },
    data:()=>({
        loopPage: true,
        loop: {
            records: 8,
            row: 4,
            fields:[]
        },
        products: null,
        product: null,
        fields: [],
        shopify : false,
        selectedField: null,
        fieldCss: '',
        currentCSS: '',
        schema: {
            id : { type: 'Inline Text' , field: 'id' },
            title: { type: 'Inline Text' , field: 'title' },
            description: { type: 'Paragraph' , field: 'description' },
            handle: { type: 'Inline Text' , field: 'handle' },
            productType: { type: 'Inline Text' , field: 'productType' },
            price: { type: 'Price' , root: 'variants' , field: 'priceV2.amount' },
            currency : { type: 'Inline Text' , root: 'variants' , field: 'priceV2.currency' },
            image: { type: 'Image' , root: 'variants' , field: 'image.src' },
        },
        showProduct: true
    }),
    computed:{
        ...mapState ( ['datastore','editor'] ),
        storeFields(){
            return Object.keys(this.datastore.whoobe_store[0])
        },
        isGrid(){
            //console.log ( this.editor.current?.shopify ) 
            if ( this.editor.current?.shopify ){
                return true
            }   
            return false
            //return this.editor.current.css.container.includes('shopify-grid')
        },
        
        isProduct(){
            return this.editor.current.css.container.includes('shopify-product')
        },
        isField(){
            return this.editor.current.data && this.editor.current.data?.field
        }

    },
    watch:{
        
        // fieldCss(value){
        //     this.editor.current.css.css = value
        //     let grid = jp.parent ( this.editor.document , '$..blocks[?(@.id=="shopify-grid")]' )
        //     this.shopifyContainer.blocks.forEach ( block => {
        //         block.blocks.forEach ( element => {
        //             if ( element.css.css.includes ( 'shopify-field-' + value ) ){
        //                 //console.log ( element )
        //             }
        //         })
        //     })
        // },
        '$store.state.editor.current' : function(obj){
            if ( obj.css.container.includes('shopify-field') || obj.css.container.includes('shopify-product')){
                this.currentCSS = obj.css.css
                //this.setFieldCss(this.shopifyContainer(this.editor.current.data.grid))
            }

        },
        // currentCSS(value){
           
        //     if ( this.editor.current.css.container.includes ( 'shopify-field' )  ){
        //         this.setFieldCss(this.editor.current.data.grid,this.editor.current.data.field)
        //     }
        //     if ( this.editor.current.css.container.includes ( 'shopify-product' ) ){
        //         this.setContainerCss(this.editor.current.data.grid,this.editor.current.data.field)
        //     }
        // },
        '$store.state.editor.current.css.css' : function( ){

            if ( this.editor.current.css.container.includes ( 'shopify-field' )  ){
                this.setFieldCss(this.editor.current.data.grid,this.editor.current.data.field)
            }
            if ( this.editor.current.css.container.includes ( 'shopify-product' ) ){
                this.setContainerCss(this.editor.current.data.grid,this.editor.current.id)
            }
        },
        '$store.state.editor.current.font' : function( ){

            if ( this.editor.current.css.container.includes ( 'shopify-field' )  ){
                this.setFieldCss(this.editor.current.data.grid,this.editor.current.data.field)
            }
            if ( this.editor.current.css.container.includes ( 'shopify-product' ) ){
                this.setContainerCss(this.editor.current.data.grid,this.editor.current.id)
            }
        },
        '$store.state.editor.current.style' : function( ){

            if ( this.editor.current.css.container.includes ( 'shopify-field' ) && !this.editor.current.css.css ){
                this.setFieldCss(this.editor.current.data.grid,this.editor.current.data.field)
            }
            if ( this.editor.current.css.container.includes ( 'shopify-product' ) && !this.editor.current.css.css ){
                this.setContainerCss(this.editor.current.data.grid,this.editor.current.id)
            }
        },
        selectedField ( value ){
            let product = this.products[0]
            let array = this.schema[value].field.split('.')
            let fieldValue = product[this.schema[value].field]
            //let grid = jp.parent ( this.editor.document , '$..blocks[?(@.id=="shopify-grid")]' )
            if ( this.schema[value].root ){
                fieldValue = product.variants[0][array[0]][array[1]]
            }
            //console.log ( grid )
            try {
                let elements = document.querySelectorAll ( '.shopify-product' )
                this.shopifyContainer.blocks.forEach ( (block,index) => {
                    
                    let fieldValue = this.products[index][this.schema[value].field]
                    if ( this.schema[value].root ){
                        fieldValue = this.products[index].variants[0][array[0]][array[1]]
                        let element 
                        if ( this.schema[value].type === 'Image' ){
                            element = new Element().createElement ( 'Image')
                            element.css.container += ' shopify-field-' + value
                            element.image.url = fieldValue
                            
                        } else {
                            element = new Element().createElement('Inline Text')
                            element.css.container += ' shopify-field-' + value
                            element.content = fieldValue
                        }
                        block.blocks.push ( element )
                    } else {
                        let element = new Element().createElement ( 'Inline Text')
                        element.content = fieldValue
                        element.css.container = ' shopify-field-' + value
                        block.blocks.push ( element )
                    }
                })
                // elements.forEach ( element => {
                //     let id = element.getAttribute('id')                    
                //     var parent = jp.parent ( grid , '$..blocks[?(@.id=="' + id + '")]' )
                //     console.log ( parent , id )
                //     //parent.blocks.push ( block )
                // })
            } catch ( err ){
                console.log ( err )
            }
        },
        shopify(value){
            if ( value ){
                if ( this.editor.current.type === 'container' ){
                    this.editor.current.data = 'shopify'
                }
            }
        },
        
    },
    methods:{
        shopifyContainer(id){
            if ( !id ) return false
            return jp.parent ( this.editor.document , '$..blocks[?(@.id=="' + id + '")]' )[0]
        },
        setFieldsConfig(fields){
            console.log ( fields )
            let store = this.datastore.whoobe_store
            store.config.fields = fields
            this.$store.dispatch ( 'whoobe_store' , store )
        },
        initField(field){
            this.loop.fields.push ( field )
            this.loop.fields = [ ... new Set ( this.loop.fields) ]
            console.log ( 'added field => ' , field )
            let whoobe_store = {
                products: this.datastore.whoobe_store.products,
                config: {
                    fields: this.loop.fields,
                    loop: this.loop
                }
            }
            this.$store.dispatch('whoobe_store' , whoobe_store )
        },
        addField ( value ){
            let product = this.products[0]
            let array = this.schema[value].field.split('.')
            this.fields.push ( value )
            
            let fieldValue = product[this.schema[value].field]
            let grid = jp.parent ( this.editor.document , '$..blocks[?(@.id=="shopify-grid")]' )
            if ( this.schema[value].root ){
                fieldValue = product.variants[0][array[0]][array[1]]
            }
            try {
                
                let elements = document.querySelectorAll ( '.shopify-product' )
                
                grid[0].blocks.forEach ( (block,index) => {
                    
                    let fieldValue = this.products[index][this.schema[value].field]
                    if ( this.schema[value].root ){
                        fieldValue = this.products[index].variants[0][array[0]][array[1]]
                        let element 
                        if ( this.schema[value].type === 'Image' ){
                            element = new Element().createElement ( 'Image')
                            element.css.container += ' shopify-field-' + value
                            element.css.css = 'w-56 h-56 object-cover'
                            element.image.url = fieldValue
                        } else {
                            element = new Element().createElement('Inline Text')
                            element.css.container += ' shopify-field-' + value
                            element.css.css = 'my-1'
                            if ( this.schema[value].type === 'Price' ){
                                fieldValue = parseFloat(fieldValue).toFixed(2)
                            } 
                            element.content = fieldValue
                        }
                        element.data = { field: value , schema: this.schema[value] }
                        block.blocks.push ( element )
                    } else {
                        let element = new Element().createElement ( 'Inline Text')
                        element.css.container += ' shopify-field-' + value
                        element.css.css = 'my-2'
                        element.content = fieldValue
                        element.data = { field: value , schema: this.schema[value] }
                        block.blocks.push ( element )
                    }
                })
                // elements.forEach ( element => {
                //     let id = element.getAttribute('id')                    
                //     var parent = jp.parent ( grid , '$..blocks[?(@.id=="' + id + '")]' )
                //     console.log ( parent , id )
                //     //parent.blocks.push ( block )
                // })
            } catch ( err ){
                console.log ( err )
            }
        },
        createLoopComponent(flag){
            if ( !flag ){
                const component = new Block()
                const block = new Element().Grid().Cols(this.loop.row)
                block.css.container = block.css.container + ' shopify-grid'
                //this.shopifyContainer = block
                let data = { records: this.loop.records , row: this.loop.row , fields: this.datastore.whoobe_store.config.fields }
                block.id = 'shopify-grid-' + this.$randomID()
                block.shopify = this.datastore.whoobe_store.config
                block.css.css = 'items-center'
                block.data = data
                for ( let n=0 ; n < this.loop.records ; n++ ){
                    console.log ( n )
                    const el = new Element().Flexbox({direction:'col'})
                    el.css.container += ' shopify-product'
                    el.css.css = 'items-center'
                    el.data = { records: this.loop.records , row: this.loop.row , fields: this.loop.fields , grid: block.id }
                    block.blocks.push ( el )
                    this.addFieldsToProduct(el,n,this.datastore.whoobe_store.config.fields,block.id)
                }
                this.editor.current.blocks.push ( block )
                //this.shopifyContainer = block
                
            } else {
                if ( this.editor.current.css.container.includes ( 'shopify-grid') ){
                    this.editor.current.data.records = this.loop.records
                    this.editor.current.data.row = this.loop.row
                    let container = Object.assign ( {} , this.editor.current.blocks[0] )
                    this.editor.current.blocks = []
                    for ( let n=0 ; n < this.editor.current.data.records ; n++ ){
                        const el = new Element().Flexbox({direction:'col'})
                        el.css = container.css
                        el.font = container.font
                        el.style = container.style
                        el.data = { records: this.loop.records , row: this.loop.row , fields: this.loop.fields , grid: this.editor.current.id }
                        this.editor.current.data.fields.forEach( (field,i)=>{
                            let f = this.createField ( field , n )
                            //console.log ( f , container.blocks[i].css )
                            f.css = container.blocks[i].css
                            f.font = container.blocks[i].font
                            f.style = container.blocks[i].style
                            el.blocks.push ( f )
                        })
                        this.editor.current.blocks.push ( el )
                        //this.addFieldsToProduct(el,n,this.editor.current.data.fields,container)
                    }
                    
 
                } else {
                    alert ( 'Select the Shopify Grid' )
                }
            }
        },
        addFieldsToProduct(target,index,fields,gridID){
            let block = Object.assign ( {} , target )
            let container = this.editor.current.blocks[0]
            fields.forEach ( ( value , n ) => {
                let array = this.schema[value].field.split('.')
                let fieldValue = this.products[index][this.schema[value].field]
                    if ( this.schema[value].root ){
                        fieldValue = this.products[index].variants[0][array[0]][array[1]]
                        let element 
                        if ( this.schema[value].type === 'Image' ){
                            element = new Element().createElement ( 'Image')
                            element.css.container += ' shopify-field-' + value
                            element.css.css = 'w-56 h-56 object-cover'
                            element.data = { field: value , schema: this.schema[value] , grid: gridID }
                            element.image.url = fieldValue
                        } else {
                            element = new Element().createElement('Inline Text')
                            element.css.container += ' shopify-field-' + value
                            element.css.css = 'my-1'
                            if ( this.schema[value].type === 'Price' ){
                                fieldValue = parseFloat(fieldValue).toFixed(2)
                            }
                            element.data = { field: value , schema: this.schema[value] , grid: gridID } 
                            element.content = fieldValue
                        }
                        block.blocks.push ( element )
                    } else {
                        let element = new Element().createElement ( 'Inline Text')
                        element.css.container += ' shopify-field-' + value
                        element.css.css = 'my-2'
                        element.content = fieldValue
                        element.data = { field : value , grid: gridID }
                        block.blocks.push ( element )
                    }
            })
            
            //this.editor.current.blocks.push ( block )
        },
        createField(value,index){
            let array = this.schema[value].field.split('.')
            let fieldValue = this.products[index][this.schema[value].field]
            if ( this.schema[value].root ){
                fieldValue = this.products[index].variants[0][array[0]][array[1]]
                let element 
                if ( this.schema[value].type === 'Image' ){
                    element = new Element().createElement ( 'Image')
                    element.data = { field: value , schema: this.schema[value] }
                    element.image.url = fieldValue
                } else {
                    element = new Element().createElement('Inline Text')
                    if ( this.schema[value].type === 'Price' ){
                        fieldValue = parseFloat(fieldValue).toFixed(2)
                    }
                    element.data = { field: value , schema: this.schema[value] } 
                    element.content = fieldValue
                }
                element.data = this.schema[value]
                return element
            } else {
                let element = new Element().createElement ( 'Inline Text')
                element.content = fieldValue
                element.data = this.schema[value]
                return element
            }
        },
        setFieldCss(id,field){
            let grid = this.shopifyContainer(id)
            if ( grid )
                    grid.blocks.forEach ( container => {
                        container.blocks.forEach ( element => {
                            console.log ( element.data.field , field )
                            if ( element.data.field === field ){
                                let css = [ ... new Set ( this.editor.current.css.css.split(' ') )].join(' ')
                                element.css.css = this.editor.current.css.css
                                element.style = this.editor.current.style
                                element.font = this.editor.current.font                    
                            }
                        })
                    })
                    
                    
        },
        setContainerCss(id){
            let grid = this.shopifyContainer(id)
            if ( grid )
                grid.blocks.forEach ( container => {
                    if ( container.css.container.includes ( 'shopify-product' ) ){
                        container.css.css = this.editor.current.css.css
                        container.style = this.editor.current.style
                        container.font = this.editor.current.font
                    }  
                })
        },
        refreshGrid(){
            let container = this.editor.current.blocks[0]
            let currentRecords = this.editor.current.blocks.length
            let recordsToAdd = this.loop.records - currentRecords
            for ( let n=0 ; n < recordsToAdd ; n++ ){
                const el = new Element().Flexbox({direction:'col'})
                el.css.container += ' shopify-product'
                el.css.css = 'items-center'
                //this.$store.dispatch('setCurrent',el)
                this.addFieldsToProduct(el,n+currentRecords)
            }    
        },
        addItem(item){
            const component = new Block()
            const block = new Element().Flexbox({direction:'col'})
            block.css.css = this.$clean ( block.css.css )
            let element = new Element().createElement('Image')
            element.image.url = item.images[0].src
            block.blocks.push ( element )
            element = new Element().createElement('Inline Text')
            element.content = item.title
            block.blocks.push ( element )
            this.editor.current.blocks.push ( block )
        },
        createElement(el){
            if ( !this.editor.current ) return
            let element = new Element().createElement(el.name).setIcon(el.icon)
            this.editor.current.blocks.push ( element )
            this.$store.dispatch ( 'setCurrent' , element )
            if ( element.helper ){
                this.$dialogBus ( 'editorHelper' , { content: element.helper , title: element.element.toUpperCase() , width: element.dialog } )
            }
        },
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
        if ( this.datastore.shopify.config.storefrontAccessToken && !this.datastore.whoobe_store ){
            this.client = this.datastore.shopify

            this.client.collection.fetchAllWithProducts().then((collections) => {
                this.client.collections = collections
                // Do something with the collections
                this.client.product.fetchAll(200).then((products) => {
                    if ( this.datastore.whoobe_store ){
                        let data = {
                            products : products,
                            config : this.datastore.whoobe_store.config
                        }
                        this.$store.dispatch ( 'whoobe_store' , data )
                    } else {
                        let data = {
                            products : products,
                            config : {
                                fields: [],
                                records: this.loop.records,
                                row: this.loop.row
                            }
                        }
                        this.$store.dispatch ( 'whoobe_store' , data )
                    }
                    this.product = this.datastore.whoobe_store.products[0]
                    this.products = this.datastore.whoobe_store.products
                }).catch ( error => console.log(error));
            });
        } else {
            this.product = this.datastore.whoobe_store.products[0]
            this.products = this.datastore.whoobe_store.products
        }
        
    }
}
</script>