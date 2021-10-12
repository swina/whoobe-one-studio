const generator = {
    state : {
        website: null,
        pages: []
    },
    mutations : {
        website ( state , website ){
            state.website = website
        },
        pages ( state , pages ){
            state.pages = pages
        },
        addPage ( state , page ){
            state.pages.push ( page )
        }
    },
    actions : {
        website ( { commit } , website ){
            commit ( 'website' , website )
        },
        pages ( { commit } , pages ){
            commit ( 'pages' , pages )
        },
        addPage ( { commit } , page ){
            commit ( 'addPage' , page )
        }
    }
}

export default generator