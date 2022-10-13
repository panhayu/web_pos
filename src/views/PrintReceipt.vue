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
                        <tr v-for="(item, index) in itemsInCart" :key="item.id">
                            <td class="py-1">{{index+1}}</td>
                            <td class="py-1">{{item.name}}</td>
                            <td class="py-1 text-center">{{item.quantity}}</td>
                            <td class="py-1 text-right">{{parseFloat(item.price)}}៛</td>
                        </tr>
                        <tr class="border-t border-dashed border-gray">
                            <td colspan="3" class="text-right py-2">Total</td>
                            <td class="text-right py-2">{{parseFloat(cartTotal)}}៛</td>
                        </tr>
                    </tbody>
                </table>
                <p class="small-text text-center my-4 font-light">Thank you for you purchase!</p>
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
        }
    },
    methods: {
        handlePrint() {
            window.print();
        }
    },
    computed: {
        itemsInCart() {
            return this.$store.getters.cart;
        },
        cartTotal() {
            let total = 0;
            this.itemsInCart.forEach((item) => {
                total += item.price * item.quantity;
            })
            return total;
        },
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