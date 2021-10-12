<template>
    <span></span>
</template>

<script>
import { eventBus , editorBus } from '@/main'
export default {
    name : 'Events',
    mounted(){
        //General Events
        eventBus.$on ( 'linkMedia' , (e) => {
            alert ( 'Link Media' )
        })


    }
}
</script>