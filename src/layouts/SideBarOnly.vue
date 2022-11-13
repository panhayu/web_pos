<template>
    <vue-progress-bar></vue-progress-bar>
    <div class="flex flex-row">
        <div class="w-1/12 bg-white">
            <SideBarNavigation></SideBarNavigation>
        </div>
        <div class="w-11/12 bg-light-gray">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import SideBarNavigation from '../components/SideBarNavigation.vue';
export default {
    components: { SideBarNavigation }
}
</script>

<style lang="scss" scoped>

</style>