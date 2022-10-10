<template>
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
</template>

<script>
import OrderCart from '../components/OrderCart.vue';
import SideBarNavigation from '../components/SideBarNavigation.vue';
export default {
    components: { OrderCart, SideBarNavigation }
}
</script>

<style lang="scss" scoped>

</style>