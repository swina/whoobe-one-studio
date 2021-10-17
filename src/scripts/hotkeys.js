import { eventBus , errorBus , dialogBus , editorBus } from '@/main'

import store from '../store'
let editor = store.state.editor
let shortcuts = {
    R : 'Remove selected block',
    D : 'Duplicate selected block' ,
    C : 'Copy selected block',
    V : 'Paste block',
    G : 'Copy block CSS and style',
    H : 'Paste CSS and style',
    K : 'Keyboard Shortcuts',
    Z : 'Customizer',
    '+' : 'Add element',
    '<' : 'Edit CSS and style',
    N   : 'Preview'
}
window.addEventListener("keydown", e => {

    //Editor HotKeys
    //console.log ( e )
    
    // delete block
    if ( e.altKey && e.code === 'KeyR' ){
        if ( editor.current  ){
            editorBus.$emit ( 'deleteBlock' , e )
        }
    }

    // duplicate block
    if ( e.altKey && e.code === 'KeyD' ){
        if ( editor.current  ){
            editorBus.$emit ( 'duplicateBlock' , e )
        }
    }

    // copy block to clipboard
    if ( e.altKey && e.code === 'KeyC' ){
        if ( editor.current  ){
            
            editorBus.$emit ( 'copyBlock' , editor.current )
        }
    }

    // copy block to clipboard
    if ( e.altKey && e.code === 'KeyV' ){
        if ( editor.current  ){
            editorBus.$emit ( 'pasteBlock' , 'block' )
            return
        }
    }

    // alt+G block copy CSS
    if ( e.altKey && e.code === 'KeyG' ){
        if ( editor.current  ){
            editorBus.$emit ( 'copyBlockCSS' , 'block' )
        }
    }

    // alt+G block copy CSS
    if ( e.altKey && e.code === 'KeyH' ){
        if ( editor.current  ){
            editorBus.$emit ( 'pasteBlockCSS' , 'block' )
        }
    }


    // alt+K Keyboard Shortcuts
    if ( e.altKey && e.code === 'KeyK' ){
        dialogBus.$emit ( 'shortcuts' , 'block' )
    }

    // alt+L block link dialog
    if ( e.altKey && e.code === 'KeyL' ){
        if ( editor.current  ){
            editorBus.$emit ( 'linkBlock' , 'block' )
        }
    }

    // alt+Z customize block
    if ( e.altKey && e.code === 'KeyZ' ){
        if ( editor.current  ){
            editorBus.$emit ( 'customizeBlock' , 'block' )
        }
    }

    // alt+A animation block
    if ( e.altKey && e.code === 'KeyA' ){
        if ( editor.current  ){
            editorBus.$emit ( 'animationBlock' , 'block' )
        }
    }

    //Alt++ add block
    if ( e.altKey && e.key === '+' ){
        if ( editor.current  ){
            editorBus.$emit ( 'addBlock' , 'block' )
        }
    }

    // alt+< css block
    if ( e.altKey && e.key === '<' ){
        if ( editor.current  ){
            editorBus.$emit ( 'cssBlock' , 'block' )
        }
    }

    // alt+n fullscreen view
    if ( e.altKey && e.code === 'KeyN' ){
        editorBus.$emit ( 'preview' , 'fullscreen' )
    }

    // // alt+n mobile view
    // if ( e.altKey && e.code === 'KeyM' ){
    //     //window.localStorage.setItem ( 'whoobe-preview-mode' , 365 )
    //     editorBus.$emit ( 'preview' , 'fullscreen' )
    // }

    // if ( e.altKey && e.code === 'KeyB' ){
    //     let obj = JSON.parse ( window.localStorage.getItem ( 'whoobe-preview') )
    //     store.dispatch ( 'document' , obj )
    //     //window.localStorage.setItem ( 'whoobe-preview-mode' , 768 )
    //     //editorBus.$emit ( 'preview' , 'fullscreen' )
    // }

})


export default shortcuts