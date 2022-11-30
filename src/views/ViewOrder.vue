<template>
    <div class="p-8 h-screen">
        <div class="p-4 w-full h-full rounded-2xl bg-white flex flex-col">
            <div class="pb-4">
                <h1 class="text-2xl font-bold">Order</h1>
                <p class="text-gray">Local order that haven't sync to server.</p>
            </div>
            <!-- display localOrder  -->
            <div class="flex flex-col space-y-4">
                <table class="w-auto">
                    <tr class="text-left border-b border-light-gray text-gray">
                        <th class="py-2">No.</th>
                        <th class="py-2">Total Items</th>
                        <th class="py-2">Order Note</th>
                        <th class="py-2">Order Channel</th>
                        <th class="py-2">Peyment</th>
                        <th class="text-center">Total Price</th>
                    </tr>
                    <tr v-for="(order, index) in localOrder" :key="order.id">
                        <td class="text-gray">{{ index + 1 }}</td>
                        <td>
                            <div class="flex space-x-2">
                                <p>{{ order.quantity }}</p>
                                <p v-if="order.quantity > 1">items</p>
                                <p v-else>item</p>
                            </div>
                        </td>
                        <td>
                            <p>{{ order.note }}</p>
                        </td>
                        <!-- order channel -->
                        <td class="py-2">
                            <div v-if="order.order_channel_id === '3b696cbc-10ef-11ed-a261-0242ac120002'"
                                class="text-center">
                                <p class="bg-light-gray px-2 py-1 rounded-full w-fit">Delivery</p>
                            </div>
                            <div v-if="order.order_channel_id === '3b696cbc-10ef-13ed-a261-0242ac120002'">
                                <p class="bg-light-gray px-2 py-1 rounded-full w-fit">Dine-in</p>
                            </div>
                            <div v-if="order.order_channel_id === '3b696cbc-10ef-14ed-a261-0242ac120002'">
                                <p class="bg-light-gray px-2 py-1 rounded-full w-fit">Takeway</p>
                            </div>
                        </td>
                        <!-- payment methode -->
                        <td>
                            <div v-if="order.payment_id === '3b696cbc-10ef-13ed-a261-0242ac120002'" class="text-center">
                                <p class="bg-light-gray px-2 py-1 rounded-full w-fit">ABA PAY</p>
                            </div>
                            <div v-if="order.payment_id === '3b696cbc-10ef-14ed-a261-0242ac120002'">
                                <p class="bg-light-gray px-2 py-1 rounded-full w-fit">CADT PAY</p>
                            </div>
                            <div v-if="order.payment_id === '3b696cbc-10ef-11ed-a261-0242ac120002'">
                                <p class="bg-light-gray px-2 py-1 rounded-full w-fit">Cash</p>
                            </div>
                        </td>
                        <td class="text-lg text-center">{{ Intl.NumberFormat().format(order.total_price) }}៛</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ViewOrder",
    data() {
        return {
            localOrder: [],
            order: [],
        };
    },
    computed: {
        isOnline() {
            return this.$store.getters.onlineStatus;
        },
        isLocalOrderEmpty() {
            return this.localOrder.length === 0;
        },
    },
    methods: {
    },
    created() {
        this.$Progress.start();
        this.localOrder = JSON.parse(localStorage.getItem("orders")) || [];
    },
    mounted() {
        this.$Progress.finish();
    },
}
</script>

<style scoped>

</style>