<template>
    <div>
        <div class="xl:px-8 lg:px-6 md:px-4 pt-4">
            <h1 class="text-2xl font-bold">Delivery Order</h1>
            <div class="flex flex-row items-center space-x-2">
                <p class="text-md text-gray font-light">Selecte or Choose Items for Delivery order</p>
            </div>
        </div>
        <ItemsList />
    </div>
</template>

<script>
import ItemsList from '../components/ItemsList.vue';
export default {
    name: "DeliveryOrder",
    components: { ItemsList },
    data() {
        return {};
    },
    created() {
        this.$Progress.start();
    },
    mounted() {
        this.$Progress.finish();
        this.$store.commit("updateOrderType", "delivery");
    },
}
</script>

<style scoped>

</style>