<template>
    <VOffline class="h-full" @detected-condition="handleConnectivityChange">
        <vue-progress-bar></vue-progress-bar>
        <div class="flex flex-row">
            <div class="w-1/12 bg-white">
                <SideBarNavigation></SideBarNavigation>
            </div>
            <div class="w-8/12 bg-light-gray">
                <router-view></router-view>
            </div>
            <div class="w-3/12 bg-white">
                <order-cart></order-cart>
            </div>
        </div>
    </VOffline>
</template>

<script>
import OrderCart from '../components/OrderCart.vue';
import SideBarNavigation from '../components/SideBarNavigation.vue';
import { VOffline } from 'v-offline';
export default {
    components: { OrderCart, SideBarNavigation, VOffline },
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