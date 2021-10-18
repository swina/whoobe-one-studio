const desktop =  {
    state: {
        mode: 'full',
        message: '',
        filter: '',
        tabs: [],
        component: null,
        cloudinary_image: null,
        error: null,
        currentTab: 0,
        loading: false,
        project: null,
        confirm: false,
        confirmAction : null,
        toolbar : null,
        menu_responsive: false
    },
    mutations: {
        mode ( state , payload ){
            state.mode = payload
        },
        message ( state , payload ){
            state.message = payload
        },
        filter ( state , payload ){
            state.filter = payload
        },
        tabs( state , payload ){
            state.tabs = payload
        },
        add_tab ( state , payload ){
            let founded = false
            state.tabs.forEach ( (tab,i) => {
                console.log ( tab.label , payload.label )
                if ( tab.label === payload.label ){
                    state.currentTab = i
                    founded = true
                    return
                }
            })
            if ( !founded ){
                state.tabs.push ( payload )
                state.currentTab = state.tabs.length-1
            }
        },
        removeTab ( state , index ){
            state.tabs.splice ( index , 1 )
        },
        cloudinary_image ( state , payload ){
            state.cloudinary_image = payload
        },
        error ( state , error ){
            state.error = error 
        },
        currentTab ( state , tab ){
            state.currentTab = tab
            //set desktop status to open when reload
            console.log ( 'update tabs' , state.tabs )
            window.localStorage.setItem('whoobe-desktop',JSON.stringify(state.tabs))
        },
        component ( state , component ){
            state.component = component
        },
        loading ( state , payload ){
            state.loading = payload
        },
        project ( state , payload ){
            state.project = payload
        },
        confirm ( state , payload ){
            state.confirm = payload
        },
        confirmAction ( state , payload ){
            state.confirmAction = payload
        },
        toolbar ( state , payload ){
            state.toolbar = payload
        },
        menu_responsive ( state ){
            state.menu_responsive =! state.menu_responsive
        }
    },
    actions : {
        mode ( { commit } , payload ){
            commit ( 'mode' , payload )
        },
        message ( { commit } , payload ){
            commit ( 'message' , payload )
        },
        filter ( { commit } , payload ){
            commit ( 'filter' , payload )
        },
        tabs ( { commit } , payload ){
            commit ( 'tabs' , payload )
        },
        add_tab ( { commit } , payload  ){
            
                commit ( 'add_tab' , payload )
            //commit ( 'currentTab' , state.tabs.lenght-1)
        },
        cloudinary_image ( { commit } , payload ){
            commit ( 'cloudinary_image' , payload )
        },
        error ( { commit } , payload ){
            commit ( 'error' , payload )
        },
        currentTab ( { commit } , payload ){
            // payload < 0 ?
            //     payload = 0 : null 
            commit ( 'currentTab' , payload )
        },
        removeTab ( { commit } , index ){
            commit ( 'removeTab' , index )
        },
        component ( { commit } , component ){
            commit ( 'component' , component )
        },
        loading ( { commit } , payload ){
            commit ( 'loading' , payload ? payload : false )
        },
        project ( { commit } , payload ){
            commit ( 'project' , payload )
        },
        confirm ( { commit } , payload ){
            commit ( 'confirm' , payload )
        },
        confirmAction ( { commit } , payload ){
            commit ( 'confirmAction' , payload )
        },
        toolbar ( { commit } , payload ){
            commit ( 'toolbar' , payload )
        },
        menu_responsive ( { commit } ){
            commit ( 'menu_responsive' )
        },
    }
}

export default desktop