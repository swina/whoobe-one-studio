<template>
    <span></span>
</template>
<script>
import { editorBus } from '@/main'
import { mapState } from 'vuex'
import jp from 'jsonpath'
export default {
    name: 'EditorEvents',
    computed:{
        ...mapState ( ['editor'] )
    },
    mounted(){
        
    }
}
</script>