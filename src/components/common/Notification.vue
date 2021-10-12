<template>
    <div v-if="message" class="fixed z-modal bottom-0 left-0 w-screen h-24 mb-3">
        <transition name="fade">
            <div class="w-full md:w-4/5 m-auto bg-white shadow flex flex-row items-center p-2 border-l-4 text-lg py-4" :class="type">
                {{ message }}
            </div>
        </transition>
    </div>
</template>

<script>
import { eventBus } from '@/main'
export default {
    name: 'Notification',
    data: ()=>({
        message : '',
        error: false
    }),
    computed:{
        type(){
            return !this.error ? 'border-lime-500' :
                    'border-red-500'
        },
    },
    methods:{
        serverError(){
            this.message = 'No server connected'
            this.error = true
            this.$router.push('/')
        },
       
    },
    watch : {
        '$store.state.user.socket':(v)=>{
            eventBus.$emit ( 'notification' , 'Database backup: ' + v )
        }
    },
    mounted(){
        eventBus.$on ( 'notification' , (msg,type='info') => {
            type === 'error' ? this.error = true : this.error = false
            this.message = msg
            window.setTimeout( ()=> {
                this.message = ''
            },4000)
        })
        eventBus.$on ( 'error' , (msg) => {
            this.error = true
            this.message = msg
            window.setTimeout( ()=> {
                this.message = ''
            },4000)
        })
        
    }

}
</script>

