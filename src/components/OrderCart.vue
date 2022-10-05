<template>
    <div class="w-full min-h-screen flex flex-col content-between sticky top-0 p-8">
        <div class="header">
            <div class="flex flex-row justify-between items-center pb-4">
                <h1 class="text-2xl text-black font-bold">Current Order</h1>
                <div class="group p-2 bg-light-gray rounded-md cursor-pointer hover:bg-red" @click="handleClarCart">
                    <TrashIcon class="w-6 h-6 text-red group-hover:text-white" />
                </div>
            </div>
            <div class="border-b border-light-gray"></div>
        </div>
        <!-- items in cart -->
        <div class="my-2 overflow-y-hidden">
            <template v-for="item in itemsInCart" :key="item.id">
                <div class="flex justify-between mb-4">
                    <!-- item detail -->
                    <div class="flex">
                        <img v-if="item.image" :src="item.image" class=" w-20 object-cover rounded-md square-img" alt="" />
                        <img v-else :src="defaultImage" class=" w-20 object-cover rounded-md square-img" alt="" />
                        <div class="pl-4">
                            <p class="font-light text-md">{{item.name}}</p>
                        </div>
                    </div>
                    <!-- price -->
                    <div class="flex flex-col items-end justify-between">
                        <p v-if="item.price" class="text-lg text-blue font-bold">
                            $ {{parseFloat(item.price).toFixed(2)}}
                        </p>
                        <p v-else>
                            $ {{parseFloat(0).toFixed(2)}}
                        </p>
                        <!-- qty controller -->
                        <div class="flex flex-row items-center justify-between">
                            <div @click="handleDecrease(item.qty)" class="p-1 bg-blue rounded-md">
                                <MinusIcon class="text-white w-4 h-4" />
                            </div>
                            <p class="text-blue text-lg font-bold px-4">{{item.qty}}</p>
                            <div @click="handleIncrease(item.qty)" class="p-1 bg-blue rounded-md">
                                <PlusIcon class="text-white w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <div v-if="itemsInCart.length == '0'" class="p-4 my-4 bg-light-gray rounded-md flex items-center">
                <ShoppingCartIcon class="w-8 h-8 text-gray mr-4" />
                <p class="text-gray font-thin">Add to items to cart to make an order.</p>
            </div>
        </div>
        <div class="bottom mt-auto">
            <!-- payment method card -->
            <div class="payment my-4">
                <p class="text-md text-gray font-thin">
                    Payment Method
                </p>
                <RadioGroup class="flex flex-row space-x-2 my-2 w-full" v-model="selectedPayment">
                    <template v-for="payment in paymentMethods" :key="payment.id">
                        <RadioGroupOption v-slot="{ checked }" :value="payment" class="w-full">
                            <span :class='checked ? "bg-light-blue text-blue" : "text-gray bg-light-gray"'
                                class="block w-full text-sm font-medium p-4 rounded-lg cursor-pointer text-center select-none">{{payment.name}}</span>
                        </RadioGroupOption>
                    </template>
                </RadioGroup>
            </div>
            <!-- summary card -->
            <div class="w-full p-4 bg-light-gray rounded-md my-4">
                <div class="flex flex-row justify-between">
                    <p class="text-gray font-thin">Subtotal</p>
                    <p class="text-black font-bold">$ {{parseFloat(calulateTotal).toFixed(2)}}</p>
                </div>
                <div class="border-b border-dark-gray my-2"></div>
                <div class="flex flex-row justify-between">
                    <p class="text-black text-lg font-bold">Total</p>
                    <p class="text-black text-lg font-bold">$ {{parseFloat(calulateTotal).toFixed(2)}}</p>
                </div>
            </div>
            <!-- place order button -->
            <BaseButton @click="handlePlaceOrder" :disabled="!isEmptyCart" class="w-full">
                <p>Place Order</p>
            </BaseButton>
        </div>
    </div>
</template>

<script>
import { TrashIcon, ShoppingCartIcon, PlusIcon, MinusIcon } from '@heroicons/vue/24/outline'
import BaseButton from './BaseButton.vue';
import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
} from '@headlessui/vue'
export default {
    name: 'OrderCart',
    components: {
        TrashIcon,
        ShoppingCartIcon,
        PlusIcon,
        MinusIcon,
        BaseButton,
        RadioGroup,
        RadioGroupLabel,
        RadioGroupOption,
    },
    data() {
        return {
            defaultImage: 'https://theme-assets.getbento.com/sensei/5a38345.sensei/assets/images/catering-item-placeholder-704x520.png',
            paymentMethods: [
                {
                    id: '1',
                    name: 'Cash'
                },
                {
                    id: '2',
                    name: 'ABA PAY'
                },
                {
                    id: '3',
                    name: 'ACLEDA'
                },
            ],
            selectedPayment: [
                {
                    id: '1',
                    name: 'Cash'
                },
            ],
            itemsInCart: this.cart = this.$store.getters.cart,
            total: 0,
        }
    },
    methods: {
        handleClarCart() {
            this.itemsInCart = [];
            this.$store.commit('empty');
        },
        handlePlaceOrder() {
            alert('Check Out')
        },
        handleDecrease(event) {
            alert(event)
        },
        handleIncrease(event) {
            alert(event)
        },

    },
    computed: {
        calulateTotal() {
            let total = 0;
            this.itemsInCart.forEach((item, index) => {
                total += item.price * item.qty
            });
            return total
        },
        isEmptyCart() {
            if (this.itemsInCart.length == !'0') {
                return false
            } else {
                return true
            }
        }
    },
    created() {
        this.$store.commit("cartKeys", this.cartKeys);
    },
    mounted() {

    },
}
</script>

<style scoped>
.square-img {
    aspect-ratio: 1/1;
}
</style>