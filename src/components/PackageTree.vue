<template>
    <div>
        <ul>
            <template v-for="(key) in Object.keys($attrs.root)">
                
                <li class="list-none my-2 cursor-pointer" @click="requestPackage(key)" title="Click to get dependencies"> 
                    
                    
                    <!-- <span class="px-2 py-1 bg-indigo-400 text-black"> -->
                        <span class="pr-2 bg-indigo-400 py-2 px-2 text-black rounded-tl rounded-bl">{{ key }}</span>
                        <span class="bg-blue-200 px-2 py-2 text-black rounded-tr rounded-br" v-if="!$attrs.root[key].hasOwnProperty('dependencies')">{{ $attrs.root[key] }}</span>
                        <span v-else class="bg-blue-200 px-2 py-2 text-black rounded-tr rounded-br">{{$attrs.root[key].version}}</span>
                    <!-- </span> -->
                    
                    <PackageTemplateTree :root="$attrs.root[key].dependencies" :name="$attrs.name" v-if="$attrs.root[key].hasOwnProperty('dependencies') && $attrs.root[key].dependencies"/>
                </li>

            </template>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'PackageTemplateTree',
    methods:{
        requestPackage(key){
            if ( this.$attrs.root[key].hasOwnProperty('version') ){
                this.$emit('search',key,this.$attrs.root[key].version,this.$attrs.name)
            } else {
                this.$emit('search',key,this.$attrs.root[key],this.$attrs.name)
            }
        }
    }
}
</script>