<template>
    <div v-if="!proccedCheckOut" class="w-full min-h-screen flex flex-col content-between sticky top-0 px-8 pb-8 overflow-y-auto h-32">
        <div class="header sticky top-0 bg-white pt-8">
            <div class="flex flex-row justify-between items-center pb-4">
                <h1 class="text-2xl text-black font-bold">Current Order</h1>
                <div v-show="isEmptyCart" class="group p-2 bg-light-gray rounded-md cursor-pointer hover:bg-red"
                    @click="handleClarCart">
                    <TrashIcon class="w-6 h-6 text-red group-hover:text-white" />
                </div>
            </div>
            <div class="border-b border-light-gray"></div>
        </div>
        <!-- items in cart -->
        <div class="my-2">
            <template v-for="item in itemsInCart" :key="item.id">
                <div class="flex justify-between mb-4">
                    <!-- item detail -->
                    <div class="flex">
                        <img v-if="item.image" :src="item.image" class=" w-16 object-cover rounded-md square-img"
                            alt="" />
                        <img v-else :src="defaultImage" class=" w-16 object-cover rounded-md square-img" alt="" />
                        <div class="pl-4">
                            <p class="font-light text-md">{{ item.name }}</p>
                        </div>
                    </div>
                    <!-- price -->
                    <div class="flex flex-col items-end justify-between">
                        <p v-if="item.price" class="text-lg text-blue font-bold">
                            {{ Intl.NumberFormat().format(item.price) }}៛
                        </p>
                        <p v-else>
                            {{ parseFloat(0) }}៛
                        </p>
                        <!-- qty controller -->
                        <div class="flex flex-row items-center justify-between">
                            <button @click="handleDecrease(item)" class="p-1 bg-blue rounded-md">
                                <MinusIcon class="text-white w-4 h-4" />
                            </button>
                            <p class="text-blue text-lg font-bold px-4">{{ item.quantity }}</p>
                            <button @click="handleIncrease(item)" class="p-1 bg-blue rounded-md">
                                <PlusIcon class="text-white w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
                <div v-show="cartLength > 1" class="border-b border-light-gray mb-2 "></div>
            </template>
            <div v-if="itemsInCart.length == '0'" class="p-4 my-4 bg-light-gray rounded-md flex items-center">
                <ShoppingCartIcon class="w-8 h-8 text-gray mr-4" />
                <p class="text-gray font-thin">Add to items to cart to make an order.</p>
            </div>
        </div>
        <div class="bottom mt-auto sticky bottom-0 bg-white">
            <!-- summary card -->
            <div class="w-full p-4 bg-light-gray rounded-md my-4">
                <div class="flex flex-row justify-between">
                    <p class="text-gray font-thin">Subtotal</p>
                    <p class="text-black font-bold">{{ Intl.NumberFormat().format(cartTotal) }}៛</p>
                </div>
                <div class="border-b border-dark-gray my-2"></div>
                <div class="flex flex-row justify-between">
                    <p class="text-black text-lg font-bold">Total</p>
                    <p class="text-black text-lg font-bold">{{ Intl.NumberFormat().format(cartTotal) }}៛</p>
                </div>
            </div>
            <!-- place order button -->
            <BaseButton @click="handlePlaceOrder" :disabled="!isEmptyCart" class="w-full">
                <p>Place Order</p>
            </BaseButton>
        </div>
    </div>
    <div v-else class="w-full min-h-screen flex flex-col content-between sticky top-0 p-8">
        <!-- header -->
        <div class="header">
            <div class="flex flex-row justify-between items-center pb-4">
                <h1 class="text-2xl text-black font-bold">Procced Order</h1>
                <div class="group p-2 bg-light-gray rounded-md cursor-pointer hover:bg-blue" @click="handleBack">
                    <ArrowLeftIcon class="w-6 h-6 text-gray group-hover:text-white" />
                </div>
            </div>
            <div class="border-b border-light-gray"></div>
        </div>
        <div>
            <BaseTextInput v-model="note" name="note" label="Order Note" class="w-full my-4" />
            <!-- payment method card -->
            <div class="payment my-4">
                <p class="text-md text-gray font-light">
                    Payment Method
                </p>
                <RadioGroup class="w-full grid grid-cols-1 md:grid-cols-2" v-model="selectedPayment">
                    <template v-for="payment in paymentMethods" :key="payment.id">
                        <RadioGroupOption v-slot="{ checked }" :value="payment" class="w-full pr-2 pb-1 pt-1">
                            <span :class='checked ? "bg-light-blue text-blue" : "text-gray bg-light-gray"'
                                class="block w-full text-sm font-medium p-4 rounded-lg cursor-pointer text-center select-none">{{ payment.name }}</span>
                        </RadioGroupOption>
                    </template>
                </RadioGroup>
            </div>
        </div>
        <!-- bottom -->
        <div class="bottom mt-auto">
            <div class="border-b border-light-gray"></div>
            <!-- place order button -->
            <div class="space-x-2 flex pt-4">
                <BaseButton @click="handlePrintReceipt" :isSecondary="true" class="w-2/4">
                    <p>Print Reciept</p>
                </BaseButton>
                <BaseButton class="w-2/4" :disabled="!isPaymentSelected" @click="handleCheckOut">
                    <p>Check out</p>
                </BaseButton>
            </div>
        </div>
    </div>
</template>

<script>
import { TrashIcon, ShoppingCartIcon, PlusIcon, MinusIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'
import BaseButton from './BaseButton.vue';
import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
} from '@headlessui/vue'
import userService from '../services/user.service';
import BaseTextInput from './BaseTextInput.vue';
import { useToast } from "vue-toastification";
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
        BaseTextInput,
        ArrowLeftIcon
    },
    setup() {
        const toast = useToast();
        return { toast }
    },
    data() {
        return {
            defaultImage: 'https://theme-assets.getbento.com/sensei/5a38345.sensei/assets/images/catering-item-placeholder-704x520.png',
            paymentMethods: [],
            selectedPayment: [],
            total: 0,
            proccedCheckOut: false,
            note: '',
        }
    },
    methods: {
        handleClarCart() {
            this.itemsInCart = [];
            this.$store.commit('empty');
        },
        getPayment() {
            userService.getPaymentMethods().then((response) => {
                this.paymentMethods = response.data.data;
            })
        },
        handlePlaceOrder() {
            this.proccedCheckOut = true;
        },
        handleDecrease(item) {
            this.$store.commit('removeFromCart', item);
        },
        handleIncrease(item) {
            this.$store.commit('addToCart', item)
        },
        handleCheckOut() {
            this.$Progress.start()
            let formData = new FormData();
            formData.append('note', this.note);
            formData.append('payment_id', this.selectedPayment.id);
            formData.append('quantity', this.itemsInCart.length);
            formData.append('total_price', this.cartTotal);
            formData.append("order_channel_id", "3b696cbc-10ef-14ed-a261-0242ac120002");
            formData.append("order_status_id", "3b696cbc-10ef-14ed-a261-0242ac120002")
            this.itemsInCart.forEach((item, index) => {
                formData.append(`items[${index}][item_id]`, item.id);
                formData.append(`items[${index}][item_name]`, item.name);
                formData.append(`items[${index}][size_id]`, item.size_id);
                formData.append(`items[${index}][size_name]`, item.size_name);
                formData.append(`items[${index}][quantity]`, item.quantity);
                formData.append(`items[${index}][price]`, item.price);
            })

            userService.storeOrder(formData).then((response) => {
                this.$Progress.finish()
                this.proccedCheckOut = false;
                this.itemsInCart = [];
                this.selectedPayment = '';
                this.$store.commit('empty');
                this.toast.success('Order Placed Successfully');
            }).catch((error) => {
                this.$Progress.fail()
                this.toast.error('Something went wrong');
                console.log(error);
            })
        },
        handlePrintReceipt() {
            this.$router.push('/print_reciept')
        },
        handleBack() {
            this.proccedCheckOut = !this.proccedCheckOut;
        }
    },
    computed: {
        itemsInCart() {
            return this.$store.getters.cart;
        },
        cartLength() {
            return this.$store.getters.cart.length;
        },
        cartTotal() {
            let total = 0;
            this.itemsInCart.forEach((item) => {
                total += item.price * item.quantity;
            })
            return total;
        },
        isEmptyCart() {
            if (this.itemsInCart.length == !'0') {
                return false
            } else {
                return true
            }
        },
        isPaymentSelected() {
            if (this.selectedPayment.length == !'0') {
                return false
            } else {
                return true
            }
        },
    },
    created() {
        this.getPayment();
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