<template>
    <div class="flex flex-wrap p-12 items-center justify-center">
        <template v-for="option in menu">
            <div class="w-20 h-20 flex flex-col items-center justify-center shadow-xl bg-gray-700 rounded text-gray-500 m-4 hover:text-gray-400 cursor-pointer" :title="option.label" @click="openDialog(option.action)" :key="option.label">
                <m-icon :icon="option.icon" class="text-3xl"/>
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
            { label: 'Empty Page' , icon: 'auto_fix_high' , action: 'startEmpty' },
            { label: 'Lead Page' , icon: 'web' , action: 'startDefault' },
            { label: 'Templates' , icon: 'library_books' , action: 'pages' },
            //{ label: 'Import' , icon: 'download' , action: 'importDB' },
            { label: 'Backup' , icon: 'health_and_safety' , action: 'exportDB' },
            { label: 'Settings' , icon: 'settings' , action: 'settings'},

        ],
        
    }),
    methods:{
        openDialog(dialog){
            this.$dialogBus ( dialog )
        }
    }
}
</script>