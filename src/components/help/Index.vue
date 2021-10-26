<template>
    
    <div class="absolute h-screen z-modal top-0 left-0 mt-10 w-screen bg-white overflow-y-auto" style="font-family:'Montserrat'">
        <m-icon :icon="sidebar?'chevron_left':'menu'" class="z-modal fixed mt-10 left-0 top-0 text-3xl" @click="sidebar=!sidebar"/>
        <transition name="fade">
        <div class="fixed mt-10 top-0 left-0 overflow-y-auto flex flex-col p-2 pt-10 text-lg cursor-pointer overflow-x-hidden w-full" v-if="sidebar">

            <div class="w-1/5">
            <template v-for="page in pages">
                <div class="w-full p-1 hover:text-purple-800 text-gray-400" @click="context=page.md">{{ page.title }}</div>
                <template v-for="topic in topics[context]">
                    <div v-if="page.md === context && topic.substring(0,3) === '## '" class="text-sm w-full ml-2 text-gray-400 hover:text-purple-800 truncate" :class="currentLink===topicLink(topic)?'font-bold text-purple-800':''"><a :href="'#' + topicLink(topic)" @click="currentLink=topicLink(topic)">{{ topic.replace('## ','') }}</a></div>
                </template>
            </template>
            </div>
        </div>
        </transition>
        <div class="grid grid-cols-12">
            <div class="col-span-3" v-if="sidebar"></div>
            <div class="flex flex-col z-modal p-10 border-l pb-56" ref="help" v-if="helpPage" :class="sidebar?'col-span-9':'col-span-12'" :key="$randomID()">
                <!-- <MdToHtml :html="helpPage"/> -->
                <template v-for="line in helpPage.split('\n')">
                    <span v-html="htmlLine(line)" v-if="!line.includes('!') && !line.includes('>!')"/>
                </template>
                <!-- <div v-html="helpPage"></div> -->
                <!-- <vue-markdown :source="helpPage" class="text-sm" v-if="helpPage"/> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Help',
    //components: { VueMarkdown , MdToHtml },
    data:()=>({
        context: 'README',
        helpPage : null,
        sidebar: true,
        pages: [
            { title: 'Main' , md: 'README' },
            { title: 'Editor' , md: 'Editor' },
            { title: 'Elements' , md: 'EditorElements' }
        ],
        topics: {},
        currentLink : '',
        startCode : false
    }),
    watch:{
        context(value){
            if ( value ) this.loadMarkdown()
        },
        $route(to, from) {
            const currentRoute = this.$router.currentRoute;
            const idToScrollTo = currentRoute.hash;
            this.$nextTick(() => {
                if (idToScrollTo && document.querySelector(idToScrollTo)) {
                    document.querySelector(idToScrollTo).scrollIntoView();
                }
            });
        },
    },
    methods:{
        loadMarkdown ( ){
            fetch ( 'docs/' + this.context + '.md' )
                .then ( res => res.text() )
                .then ( 
                    mdcontent => {
                        this.helpPage = mdcontent.replaceAll('\r','').replaceAll('```\n','```').replaceAll('\n```','```')
                        let a = mdcontent.split ( '\n' )
                        let args = a.filter ( str => { return str.includes('## ') })
                        this.topics[this.context] =  args
                        try {
                            this.$refs.help.scrollIntoView();
                        } catch ( err ) {
                            return
                        }

                    })
        },
        topicLink(link){
            return link.replaceAll(' ','').replaceAll('#','').toLowerCase()
        },
        htmlLine ( line ){
            let newLine 
            line.substring(0,2) === '# ' ?
                newLine = '<h1 class="my-2 mt-4 text-3xl text-purple-700 font-bold">' + line.replaceAll('#','') + '</h1>' :
                    line.substring(0,3) === '## ' ?
                        newLine = '<h2 class="border-b text-purple-500 font-bold text-2xl my-2 mt-4" id="' + line.replaceAll('#','').replaceAll(' ','').toLowerCase() + '">' + line.replaceAll('#','') + '</h2>' :  
                            line.substring(0,4) === '### ' ? 
                                newLine = '<h3 class="text-purple-500 font-bold text-lg my-2 mt-2">' + line.replaceAll('#','') + '</h3>' : newLine = line
            
            newLine.includes('**') ?
                newLine = '<strong>' + newLine.replaceAll('**','') + '</strong>' : null
            newLine.includes('![') ?
                newLine = '<img class="my-4 border" src="' + 
                    newLine.replaceAll('!','')
                    .replaceAll('[','')
                    .replaceAll(']','')
                    .replaceAll('(','')
                    .replaceAll(')','') + '"/>' : null
            newLine.includes('- ') ?
                newLine = '<span class="ml-2">' + newLine + '</span>': null

            if ( newLine.includes('```') ){
                    newLine = '<div style="font-family:monospace" class="w-5/6 overflow-x-auto bg-gray-800 text-gray-100 p-2 rounded">' + line.replaceAll('```','') + '</div>'
            }
            if ( newLine.includes('](')) {
                let aLine = line.split(']')
                let aText = aLine[0].replace('[','')
                let aLink = aLine[1].replace('(','').replace(')','')
                newLine = '<a class="font-bold text-purple-600" title="' + aText + '" href="' + aLink + '" target="_blank">' + aText + '</a>'
            }
            if ( newLine.includes('<ICON') ){
                let icon = line.split(':')
                icon = icon[1].replace('>','')
                newLine = '<i class="material-icons text-2xl">' + icon + '</i>'
            }
            if ( newLine.includes('!<') ){
                newLine = '<div class="bg-black text-gray-2">'
            }
            if ( newLine.includes('>!') ){
                newLine = '</div>'
            }
            return newLine
        }
    },
    mounted(){
        this.$attrs.options.context ? 
            this.context = this.$attrs.options.context : null
        this.loadMarkdown()
    }
}
</script>

