<template>
    <div class="space-y-8">
        <div class="sticky p-8 pb-0 top-0 backdrop-blur-lg  w-full">
            <div>
                <h1 class="text-2xl font-bold">Take Away Order</h1>
                <div class="flex flex-row items-center space-x-2">
                    <p class="text-md text-gray font-light">Selecte or Choose Items for Take Away order</p>
                </div>
            </div>
            <!-- category cards -->
            <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-4 py-1">
                <template v-for="category in itemsList" :key="category.id">
                    <div class="group px-2 py-4 bg-white rounded-lg hover:bg-light-blue cursor-pointer"
                        @click="goTo(category.name)">
                        <p class="text-md font-light text-gray group-hover:text-blue">{{category.name}}</p>
                    </div>
                </template>
            </div>
        </div>
        <!-- show item list upone table selected -->
        <div class="p-8 space-y-8">
            <template v-for="category in itemsList" :key="category.id">
                <div :id="category.name" :ref="category.name">
                    <p class="text-xl text-gray font-light mb-6">{{category.name}}</p>
                    <!-- item cards -->
                    <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                        <template v-for="item in category.items" :key="item.id">
                            <div @click="handleAddToCart(item)"
                                class="group bg-white rounded-xl pb-2 cursor-pointer select-none">
                                <img v-if="item.image" :src="item.image" class="rounded-t-xl object-cover square-image"
                                    alt="">
                                <img v-else :src="defaultImage" class="rounded-t-xl object-cover square-image" alt="">
                                <div class="px-2">
                                    <p class="text-md text-gray font-light group-hover:text-blue">{{item.name}}</p>
                                    <p v-if="item.price" class="text-gray text-xl font-bold group-hover:text-blue">$
                                        {{parseFloat(item.price).toFixed(2)}}
                                    </p>
                                    <p v-else class="text-gray text-xl font-bold group-hover:text-blue">
                                        $ {{parseFloat(0).toFixed(2)}}
                                    </p>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import userService from '../services/user.service';

export default {
    name: 'DineInOrder',
    data() {
        return {
            params: new URLSearchParams(),
            defaultImage: 'https://theme-assets.getbento.com/sensei/5a38345.sensei/assets/images/catering-item-placeholder-704x520.png',
            itemsList: [],
        }
    },
    methods: {
        getItemsList() {
            this.params.set('relations', 'items')
            userService.getItemsByCategory(this.params).then((response) => {
                this.itemsList = response.data.data
            })
        },
        getTableList() {
            userService.getDineInTables().then((response) => {
                this.tableList = response.data.data
            })
        },
        handleSelect(value) {
            this.selectedTable = value;
        },
        goTo(category) {
            this.$refs[category][0].scrollIntoView({ behavior: 'smooth' })
        },
        handleAddToCart(item) {
            this.$store.commit('addToCart', item)
            console.log(this.$store.state.cart);
        }
    },
    created() {
        this.$Progress.start();
        this.getTableList();
        this.getItemsList();
    },
    mounted() {
        this.$Progress.finish();
    }
}
</script>

<style scoped>
.square-image {
    aspect-ratio: 1/1;
}
</style>