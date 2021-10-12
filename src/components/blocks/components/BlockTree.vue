<template>
    <div class="flex flex-col cursor-pointer w-full" v-if="current">
        <div class="flex flex-row w-full pb-1 items-center capitalize" @click="$store.dispatch('setCurrent',current)">
            <m-icon :icon="current.icon"/> {{ current.semantic || current.element  }}
        </div>    
        <template v-for="block in current.blocks">
            <div class="pl-2 flex w-full flex-row items-center pb-1 capitalize" :key="'tree_' + block.id" @click="$store.dispatch('setCurrent',current)">
                <span v-if="!block.blocks">
                    <m-icon  :icon="block.icon"/> {{ block.semantic || block.element }} 
                </span>
                <BlockTree v-if="block.blocks" :current="block"/>
            </div>            
        </template>
    </div>
</template>

<script>
export default {
    name: 'BlockTree',
    computed:{
        current(){
            return this.$attrs.current ? this.$attrs.current :
                this.$store.state.editor.current ? this.$store.state.editor.current : null
        }
    }
}
</script>