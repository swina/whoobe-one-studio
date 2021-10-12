import Vue from 'vue'
//import schema from '@/scripts/schema'
//import elements from '@/assets/elements.json'
//console.log ( elements )
const datastore = {
    state: {
        workspace: null,
        preloaded: [],
        tables:null,
        fields:{},
        dataset:{},
        //schema : schema,
        components_categories:[],
        currentArticle: null,
        selectedCategories: {},
        whoobe_store: null,
        shopify: null,
        //elements: elements
    },
    mutations:{
        workspace ( state , payload ){
            state.workspace = payload 
        },
        tables ( state , tables ){
            state.tables = tables
        },
        dataset( state ,  dataset  ){
            state.dataset[dataset.table] = dataset.data
        },
        fields( state ,  data  ){
            state.fields[data.table] = data.fields
        },
        add_media ( state , payload ){
            state.dataset.media.unshift(payload)
        },
        components_categories ( state , payload ){
            state.components_categories = payload
        },
        currentArticle ( state , payload ){
            state.currentArticle = payload
        },
        currentProduct ( state , payload ){
            state.currentProduct = payload
        },
        selectedCategories ( state , payload ){
            state.selectedCategories = payload
        },
        whoobe_store ( state , payload ){
            state.whoobe_store = payload
        },
        shopifyClient ( state , payload ){
            state.shopify = payload
        }
    },
    actions: {
        workspace ( { commit } , payload ){
            commit ( 'workspace' , payload )
        },
        tables ( { commit } , payload ){
            commit ( 'tables' , payload )
        },
        dataset ( { commit } ,   dataset   ){
            if ( dataset.table === 'categories' ){
                let cts = dataset.data.sort ( (a,b) => a.name - b.name ) 
                console.log ( cts )
                let categories = cts.filter ( category => category.type === 'block' )
                        .map ( cat => {
                            return {
                                label: cat.name ,
                                icon: 'widgets',
                                component: 'Blocks',
                                path: 'blocks/blocks',
                                filter: cat.name
                            }
                })
                commit ( 'components_categories' , categories )     
            }
            // if ( dataset.table === 'setup' ){
            //     let categories = dataset.data[0].categories.components.map ( cat => {
            //         return {
            //             label: cat + 's',
            //             icon: 'widgets',
            //             component: 'Blocks',
            //             path: 'blocks/blocks',
            //             filter: cat
            //         }
            //     })
            //     commit ( 'components_categories' , categories )
            // }
            commit ( 'dataset' ,  dataset  )
        },
        fields ( { commit } , payload ){
            commit ( 'fields' ,  payload  )
        },
        add_media ( { commit } , payload ){
            commit ( 'add_media' , payload )
        },
        components_categories ( { commit } , payload ){
            commit ( 'components_categories' , payload )
        },
        currentArticle ( { commit } , payload ){
            commit ( 'currentArticle' , payload )
        },
        currentProduct ( { commit } , payload ){
            commit ( 'currentProduct' , payload )
        },
        selectedCategories ( { commit } , payload ){
            commit ( 'selectedCategories' , payload )
        },
        whoobe_store ( { commit } , payload ){
            commit ( 'whoobe_store' , payload )
        },
        shopifyClient ( { commit } , payload ){
            commit ( 'shopifyClient' , payload )
        }
    }

}

export default datastore