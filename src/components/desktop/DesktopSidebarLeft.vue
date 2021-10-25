<template>
    <div class="fixed z-modal  w-12 md:w-10  flex flex-col items-center pt-2 h-screen bg-purple-900 text-white cursor-pointer">
        <i-icon icon="akar-icons:chevron-left" class="icon-button mb-2" @click="$eventBus('desktopSidebarLeft','main')" title="Close"/>
        <i-icon icon="iwwa:dashboard" class="icon-button mb-2" @click="$store.dispatch('component',null),$eventBus('desktopSidebarLeft')" title="Dashboard"/>
        <i-icon icon="emojione-monotone:new-button" class="icon-button mb-2" @click="$dialogBus('startEmpty'),$eventBus('desktopSidebarLeft')" title="New template"/>
        <i-icon icon="la:elementor" class="icon-button mb-2" @click="$dialogBus('pages'),$eventBus('desktopSidebarLeft')" title="Templates"/>
        <i-icon icon="carbon:settings-adjust" class="icon-button mb-2" @click="$dialogBus('settings'),$eventBus('desktopSidebarLeft')" title="Settings"/>
        <i-icon icon="bi:github" class="icon-button mb-2" @click="$dialogBus('linkToGithub'),$eventBus('desktopSidebarLeft')" title="Github"/>
        <i-icon icon="mdi:help" class="icon-button" @click="$dialogBus('help'),$eventBus('desktopSidebarLeft')" title="Docs"/>
    </div>
</template>