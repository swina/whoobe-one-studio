<template>
<span @click="$emit('click')">
    <Icon :is="component" :icon="icon"/>
</span>
</template>

<script>
import { Icon } from '@iconify/vue2';

export default {
    name: 'IIcon',
    components: { Icon },
    props: ['icon'],
    computed:{
        component(){
            return Icon
        }
    },
}
</script>