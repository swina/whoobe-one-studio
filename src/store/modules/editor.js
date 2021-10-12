const editor = {
    state: {
        elements: null,
        document: null,
        project: null,
        selected: null,
        page: null,
        current: null,
        component: null,
        action: null,
        subaction: null,
        level: null,
        parent: null,
        startTime: null,
        autosave: null,
        export: 'single',
        preview: null,
        fonts: process.env.VUE_APP_FONT_FAMILIES.split('|'),
        save: true,
        article: null,
        customizeTab: null
    },
    mutations: {
        elements ( state , elements ){
            state.elements = elements
        },
        document ( state , document ){
            state.document = document
        },
        project ( state , payload ){
            state.project = payload 
        },
        selected ( state , payload ){
            state.selected = payload 
        },
        page ( state , payload ){
            state.page = payload
        },
        current ( state , current ){
            state.current = current
        },
        startTime ( state , payload ){
            state.startTime = payload
        },
        component ( state , component ){
            state.component = component
        },
        action ( state , action ){
            state.action = action
        },
        subaction ( state , action ){
            state.subaction = action
        },
        level ( state , level ){
            state.level = level
        },
        parent ( state , parent ){
            state.parent = parent
        },
        autosave ( state , blocks ){
            state.autosave = blocks
        },
        preview ( state , preview ){
            state.preview = preview
        },
        export ( state , payload ){
            state.export = payload
        },
        save ( state , save ){
            state.save = save
        },
        article ( state , article ){
            state.article = article
        },
        customizeTab ( state , payload ){
            state.customizeTab = payload
        }
    },
    actions: {
        elements ( { commit } , payload ){
            commit ( 'elements' , payload )
        },
        document ( { commit } , payload ){
            commit ( 'document' , payload )
        },
        project ( { commit } , payload ){
            commit ( 'project' , payload )
        },
        selected ( { commit } , payload ){
            commit ( 'selected' , payload )
        },
        setPage ( { commit } , payload ){
            commit ( 'page' , payload )
        },
        setCurrent ( { commit } , current ){
            commit ( 'current' , current )
        },
        startTime ( { commit } , payload ){
            commit ( 'startTime' , payload )
        },
        setComponent ( { commit } , component ){
            commit ( 'component' , component)
        },
        setAction ( { commit } , action ){
            commit ( 'action' , action )
        },
        setSubAction ( { commit } , action ){
            commit ( 'subaction' , action )
        },
        setLevel ( { commit } , level ){
            commit ( 'level' , level )
        },
        setParent ( { commit } , parent ){
            commit ( 'parent' , parent)
        },
        autoSave ( { commit } , blocks ){
            commit ( 'autosave' , blocks )
        },
        setPreview ( { commit } , preview ){
            commit ( 'preview' , preview )
        },
        export ( { commit } , payload ){
            commit ( 'export' , payload )
        },
        save( { commit } , save ){
            commit ( 'save' , save )
        },
        article( { commit } , article ){
            commit ( 'article' , article )
        },
        customizeTab ( { commit } , payload ){
            commit ( 'customizeTab' , payload )
        }
    }

}

export default editor