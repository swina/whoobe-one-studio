<template>
   <div class="flex flex-wrap p-8 items-center justify-center">
        <template v-for="option in menu">
            <div class="w-20 h-20 flex flex-col items-center justify-center shadow-xl bg-gray-700 rounded text-gray-500 m-4 hover:text-gray-400 cursor-pointer" :title="option.label" @click="openDialog(option)" :key="option.label">
                <i-icon :icon="option.icon" class="text-3xl"/>
                <div>{{ option.label }}</div>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'Dashboard',
    data:()=>({
        menu: [
            { label: 'Empty Editor' , icon: 'emojione-monotone:new-button' , action: 'startEmpty'  },
            //{ label: 'Default' , icon: 'web' , action: 'startDefault' },
            { label: 'Templates' , icon: 'la:elementor' , action: 'pages' },
            //{ label: 'Import' , icon: 'download' , action: 'importDB' },
            //{ label: 'Backup' , icon: 'health_and_safety' , action: 'exportDB' },
            { label: 'Settings' , icon: 'carbon:settings-adjust' , action: 'settings'},
            { label: 'Github' , icon: 'bi:github' , action: 'linkToGithub'},
            //{ label: 'Docs' , icon: 'help' , action: 'linkToDocumentation'}
        ],
        
    }),
    methods:{
        openDialog(dialog){
            let founded = false
            if ( this.$store.state.desktop.tabs.length ){
                this.$store.state.desktop.tabs.forEach ( (tab,i) => {
                    if ( tab.label === dialog.label ){
                        console.log ( tab.label , dialog.label )
                        this.$store.dispatch('currentTab',i)
                        founded = true
                    }
                })
                if ( !founded )
                    this.$dialogBus ( dialog.action )
            } else {
                this.$dialogBus ( dialog.action )
            }
        }
    }
}
</script>