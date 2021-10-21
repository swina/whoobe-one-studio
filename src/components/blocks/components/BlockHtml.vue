<template>
    <div>
        <div class="text-right w-full p-1">
        <!-- <span class="text-lg" v-if="copied">HTML Source Copied</span> 
        <button class="bg-white text-black" title="Copy source" @click="copyToClipboard"><m-icon icon="file_copy"/></button>  -->
        </div>
        <codemirror v-model="$attrs.options.html.content" class="h-full" :options="{lang:'htmlmixed',lineNumbers:true}"></codemirror>
        <!-- <textarea id="pageHTML" contenteditable class="h-3/4 w-full text-sm" style="font-family:monospace" v-model="$attrs.options.html.content"/> -->
    </div>
</template>

<script>
import { codemirror } from 'vue-codemirror-lite'
export default {
    name: 'BlockHTML',
    components: {
        codemirror
    },
    data:()=>({
        copied: false,
        html: null
    }),
    methods:{
        copyToClipboard() {
            var copyText = document.querySelector("#pageHTML");
            copyText.select();
            const el = document.createElement('textarea');
            el.setAttribute('value' , copyText.value )
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            this.copied = true
            let vm = this
            window.setTimeout ( ()=>{
                vm.copied = false
            },3000)
        },
    }
}
</script>