<template>
    <div class="flex flex-row">
        <div class="w-1/12 bg-white"></div>
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
export default {
    components: { OrderCart }
}
</script>

<style lang="scss" scoped>

</style>