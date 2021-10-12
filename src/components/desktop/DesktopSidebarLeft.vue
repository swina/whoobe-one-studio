<template>
    <div class="fixed z-modal w-full flex flex-col items-center pt-2 h-screen md:w-12 bg-bluegray-200">
        

            <m-icon icon="chevron_left" css="icon-button mb-2" @click="$eventBus('desktopSidebarLeft','main')" title="Close"/>
            <m-icon icon="dashboard" css="icon-button mb-2" @click="$eventBus('desktopSidebarLeft','main'),$router.push('/')" title="Dashboard"/>
            <m-icon icon="web" css="icon-button mb-2" @click="$dialogBus('pages'),$eventBus('desktopSidebarLeft')" title="Pages"/>
            <m-icon icon="photo" css="icon-button" @click="$dialogBus('media','manage'),$eventBus('desktopSidebarLeft')" title="Pages"/>
        
    </div>
</template>