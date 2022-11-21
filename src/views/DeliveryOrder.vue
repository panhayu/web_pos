<template>
    <div>
        <div class="xl:px-8 lg:px-6 md:px-4 pt-4">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-2xl font-bold">Delivery Order</h1>
                    <p class="text-md text-gray font-light">Selecte or Choose Items for Delivery order</p>
                </div>
                <div v-if="!isOnline" class="bg-red text-white px-4 py-2 rounded-full text-sm font-light">
                    <div class="flex flex-row space-x-2 items-center">
                        <SignalSlashIcon class="w-6 h-6" />
                        <p>Offline Mode</p>
                    </div>
                </div>
            </div>
        </div>
        <ItemsList />
    </div>
</template>

<script>
import ItemsList from '../components/ItemsList.vue';
import { SignalSlashIcon, WifiIcon } from '@heroicons/vue/24/outline';
export default {
    name: "DeliveryOrder",
    components: { ItemsList, SignalSlashIcon, WifiIcon },
    computed: {
        isOnline() {
            return this.$store.getters.onlineStatus;
        },
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