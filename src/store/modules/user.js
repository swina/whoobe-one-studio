const user = {
    state: {
        login: false,
        user: {},
        popup: false,
        intro : 1,
        socket: true
    },
    mutations: {
        login ( state , login ){
            state.login = login
        },
        user ( state , user ){
            state.user = user
        },
        popup ( state , payload ){
            state.popup = payload
        },
        intro ( state , payload ){
            state.intro = payload
        },
        socket ( state , payload ){
            state.socket = payload
        }
    },
    actions: {
        login( { commit } , login ){
            commit ( 'login' , login )
        },
        user( { commit } , user ){
            commit ( 'user' , user )
        },
        popup( { commit } , payload ){
            commit ( 'popup' , payload )
        },
        intro( { commit } , payload ){
            commit ( 'intro' , payload )
        },
        socket( { commit } , payload ){
            commit ( 'socket' , payload )
        },
    }

}
export default user