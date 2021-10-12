<template>
    <div ref="blockContextMenu" class="fixed z-highest shadow bg-white shadow absolute flex flex-col w-64 cursor-pointer" v-if="display && $store.state.editor.current && $store.state.editor.current.id === $attrs.parent">
        <div class="p-1 hover:bg-gray-200 flex items-center" @click="$editorBus('moveBlock',1),$emit('close')">
            Move Up
            <div  class="absolute right-0 flex items-center">
                
                <m-icon icon="expand_less"/>
            </div>
        </div>
        <div class="p-1 hover:bg-gray-200 flex items-center">
            Customize
            <div  class="absolute right-0 flex items-center pr-1">
                <span class="mr-2">Alt+Z</span>
                <m-icon icon="brush"/>
            </div>
        </div>
        <div class="p-1 hover:bg-gray-200 flex items-center">
            Copy
            <div  class="absolute right-0 flex items-center pr-1" @click="$editorBus('copyBlock'),$emit('close')">
                <span class="mr-2">Alt+C</span>
                <m-icon icon="content_copy"/>
            </div>
        </div>
        <div class="p-1 hover:bg-gray-200 flex items-center" @click="$editorBus('pasteBlock'),$emit('close')">
            Paste
            <div  class="absolute right-0 flex items-center pr-1">
                <span class="mr-2">Alt+V</span>
                <m-icon icon="content_paste"/>
            </div>
        </div>
        <div class="p-1 hover:bg-gray-200 flex items-center" @click="$editorBus('deleteBlock'),$emit('close')">
            Delete
            <div  class="absolute right-0 flex items-center pr-1">
                <span class="mr-2">Alt+R</span>
                <m-icon icon="delete"/>
            </div>
        </div>
        <div class="p-1 hover:bg-gray-200 flex items-center" @click="$editorBus('imageURL')">
            Image/Media
            <div  class="absolute right-0 flex items-center pr-1">
                <!-- <span class="mr-2">Alt+V</span> -->
                <m-icon icon="photo"/>
            </div>
        </div>
        <div class="w-full border-b"></div>
        <div class="p-1 hover:bg-gray-200 flex items-center" @click="$exportBlock(),$emit('close')">
            Export as Reusable
            <div  class="absolute right-0 flex items-center pr-1">
                <!-- <span class="mr-2">Alt+V</span> -->
                <m-icon icon="upload"/>
            </div>
        </div>
        <div class="p-1 hover:bg-gray-200 flex items-center" @click="$dialogBus('pages','block'),$emit('close')">
            Import Block
            <div  class="absolute right-0 flex items-center pr-1">
                <!-- <span class="mr-2">Alt+V</span> -->
                <m-icon icon="download"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BlockContextMenu',
    data:()=>({
        display: true
    })
}
</script>