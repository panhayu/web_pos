<template>
    <VOffline class="h-full" @detected-condition="handleConnectivityChange">
        <vue-progress-bar></vue-progress-bar>
        <div class="flex flex-row">
            <div class="w-1/12 bg-white">
                <SideBarNavigation></SideBarNavigation>
            </div>
            <div class="w-11/12 bg-light-gray">
                <router-view></router-view>
            </div>
        </div>
    </VOffline>
</template>

<script>
import SideBarNavigation from '../components/SideBarNavigation.vue';
import { VOffline } from 'v-offline';
export default {
    components: { SideBarNavigation, VOffline },
    computed: {
        isOnline() {
            return this.$store.getters.onlineStatus;
        },
    },
    methods: {
        handleConnectivityChange(online) {
            this.$store.commit("updateOnlineStatus", online);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>