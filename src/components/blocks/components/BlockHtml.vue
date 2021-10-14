<template>
    <div>
        <div class="text-right w-full p-1">
        <span class="text-lg" v-if="copied">HTML Source Copied</span> 
        <button class="bg-white text-black" title="Copy source" @click="copyToClipboard"><m-icon icon="file_copy"/></button> 
        </div>
        <textarea id="pageHTML" class="h-2/3 w-full text-sm" style="font-family:monospace" v-model="$attrs.options.html"/>
    </div>
</template>

<script>
export default {
    name: 'BlockHTML',
    data:()=>({
        copied: false
    }),
    methods:{
        copyToClipboard() {
            var copyText = document.querySelector("#pageHTML");
            copyText.select();
            console.log ( copyText.value )
            const el = document.createElement('textarea');
            el.setAttribute('value' ,copyText.value )
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