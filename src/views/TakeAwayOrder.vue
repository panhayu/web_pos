<template>
    <div>
        <div class="xl:px-8 lg:px-6 md:px-4 pt-4">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-2xl font-bold">Take Away Order</h1>
                    <p class="text-md text-gray font-light">Selecte or Choose Items for Take Away order</p>
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
import { SignalSlashIcon } from '@heroicons/vue/24/outline';

export default {
    name: 'TakeAwayOrder',
    components: {
        ItemsList,
        SignalSlashIcon
    },
    data() {
        return {}
    },
    computed: {
        isOnline() {
            return this.$store.getters.onlineStatus;
        },
    },
    created() {
        this.$Progress.start();
    },
    mounted() {
        this.$store.commit("updateOrderType", "take-away");
        this.$Progress.finish();
    }
}
</script>

<style scoped>

</style>