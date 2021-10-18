<template>
    <div ref="floatingActionContainer" class="flex flex-col shadow" :class="classe">
        <div ref="floatingActionHeader" class="cursor-move z-modal flex bg-purple-800 h-8 text-white p-1">
            {{ $attrs.title }}
            <div class="flex h-8 items-center justify-center absolute top-0 right-0 z-modal">
                <m-icon class="mr-1" icon="open_with"/><m-icon class="m-1 mr-2 cursor-pointer" icon="close" @click="$emit('close')"/>
            </div>
        </div>
        <div class="" v-if="$attrs.component">
            <component 
                :is="$attrs.component"
                ref="floatingDropdown" 
                class="" 
                id="floatingAction"
                :coords="$attrs.coords"
                :scroll="$attrs.scroll"
                :options="$attrs.options"
                />
        </div>
    </div>
</template>

<script>
export default {
    name: 'BlockFloatingAction',
    computed:{
        classe(){
            return this.$attrs.component ? '' : 'hidden'
        }
    },
    mounted(){
        const wrapper = this.$refs.floatingActionContainer
        let header = this.$refs.floatingActionHeader;

        function onDrag({movementX, movementY}){
            let getStyle = window.getComputedStyle(wrapper);
            let leftVal = parseInt(getStyle.left);
            let topVal = parseInt(getStyle.top);
            wrapper.style.left = `${leftVal + movementX}px`;
            wrapper.style.top = `${topVal + movementY}px`;
        }

        header.addEventListener("mousedown", ()=>{
            header.classList.add("active");
            header.addEventListener("mousemove", onDrag);
        });

        document.addEventListener("mouseup", ()=>{
            header.classList.remove("active");
            header.removeEventListener("mousemove", onDrag);
        });
    }
}
</script>