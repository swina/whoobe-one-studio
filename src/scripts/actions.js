import store from '../store'
import router from '../router'
import Block from './BlocksClass'
import Element from './ElementsClass'

import page from '../assets/pages/default.json'

const createEmptyBlock = () => {
    let page = new Block()
    const block = new Element().Flexbox({direction:'col'}).setIcon('dashboard').setTag('document')
    page.json.blocks = block
    page.name = 'A new page'
    store.dispatch ( 'setPage' , page )
    store.dispatch ( 'setCurrent' , block )
    store.dispatch ( 'document' , block )
    store.dispatch ( 'add_tab' , {
        label: page.name,
        object: page,
        type: 'editor'
    })
}

const openDefaultBlock = () => {
    store.dispatch ( 'setPage' , page )
    store.dispatch ( 'document' , page.json.blocks )
    store.dispatch ( 'add_tab' , {
        label: page.name ,
        object: page,
        type: 'editor'
    })
}

const test = () => {
    console.log ( 'this is a test' )
}


export default { createEmptyBlock , openDefaultBlock }