<template>
    <div class="p-6 min-w-min min-h-screen flex flex-col items-center bg-light-gray rounded-2xl">
        <div class="ticket bg-white rounded-md w-64 max-w-64 p-4">
            <div class="flex flex-col space-y-2">
                <img class="w-1/6" :src="logo" alt="" />
                <div class="w-full flex flex-col justify-center">
                    <h1 class="text-xs font-bold text-center">CADT's Canteen</h1>
                    <p class="small-text font-light text-center">2nd Bridge Prek Leap, National Road Number 6, Phnom
                        Penh</p>
                </div>
                <table class="table-auto w-full text-xs font-light">
                    <thead class="border-b border-dashed border-gray">
                        <tr>
                            <td class="pb-2 w-1/12">No.</td>
                            <td class="w-6/12 pb-2">Item</td>
                            <td class="w-1/12 pb-2">Qty</td>
                            <td class="w-2/12 pb-2 text-right">Price</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in items" :key="item.id">
                            <td class="py-1">{{index+1}}</td>
                            <td class="py-1">{{item.item_name}}</td>
                            <td class="py-1 text-center">{{item.quantity}}</td>
                            <td class="py-1 text-right">{{parseFloat(item.price).toFixed(2)}}</td>
                        </tr>
                        <tr class="border-t border-dashed border-gray">
                            <td colspan="3" class="text-right">Total</td>
                            <td class="text-right">$ 3.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <BaseButton @click="handlePrint" class="w-1/4 mt-auto hidden-print">Print Reciept</BaseButton>
    </div>
</template>

<script>
import BaseButton from '../components/BaseButton.vue';
export default {
    name: 'PrintReciept',
    components: { BaseButton },
    data() {
        return {
            logo: 'https://www.cadt.edu.kh/wp-content/uploads/2022/09/CADT-Masterbrand-Logos-Navy_CADT-Lockup-2-English.png',
            items: [
                {
                    "item_id": "3b696cbc-10ef-11ed-a261-0242ac120000",
                    "size_id": "3b696cbc-10ef-14ed-a261-0242ac120002",
                    "item_name": "item 1",
                    "size_name": "Large",
                    "quantity": "1",
                    "price": "1.50"
                },
                {
                    "item_id": "3b696cbc-10ef-11ed-a261-0242ac120000",
                    "size_id": "3b696cbc-10ef-11ed-a261-0242ac120002",
                    "item_name": "item 4",
                    "size_name": "Small",
                    "quantity": "1",
                    "price": "0.50"
                }
            ]
        }
    },
    methods: {
        handlePrint() {
            window.print();
        }
    },
    created() { },
    mounted() { },
}
</script>

<style scoped>
.small-text {
    font-size: 8px;
}

@media print {

    .hidden-print,
    .hidden-print * {
        display: none !important;
    }
}
</style>