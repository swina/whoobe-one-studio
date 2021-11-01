<template>
    <div class="grid grid-cols-2">
        <template v-for="shortcut in Object.keys(keyboardKeys)">
           <div class="my-1"> <span class="chip p-1 px-2 bg-gray-200">Alt</span> + <span class="chip bg-purple-400 p-1 px-2 text-white font-bold">{{ shortcut }}</span>  <span class="ml-4 font-bold">{{ keyboardKeys[shortcut] }}</span></div>
        </template>
    </div>
</template>

<script>
import shortcuts from '@/scripts/hotkeys'
export default {
    name: 'KeyboardShortcuts',
    computed:{
        keyboardKeys(){
            return shortcuts
        }
    }
}
</script>