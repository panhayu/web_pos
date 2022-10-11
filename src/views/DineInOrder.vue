<template>
    <div class="space-y-8">
        <div class="sticky p-8 pb-0 top-0 backdrop-blur-lg  w-full">
            <div>
                <h1 class="text-2xl font-bold">Dine-In Order</h1>
                <div v-if="selectedTable" class="flex flex-row items-center space-x-2">
                    <p class="text-md text-gray font-light">Selecte or Choose Items for </p>
                    <p class="px-3 py-1 bg-blue text-white font-bold rounded-md">
                        {{selectedTable.number}}
                    </p>
                </div>
                <p v-else class="text-md text-gray font-light">Selecte or Choose Table for Dine-In Order</p>
            </div>
            <!-- category cards -->
            <div v-show="selectedTable"
                class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-4 py-1">
                <template v-for="category in itemsList" :key="category.id">
                    <div class="group px-2 py-4 bg-white rounded-lg hover:bg-light-blue cursor-pointer"
                        @click="goTo(category.name)">
                        <p class="text-md font-light text-gray group-hover:text-blue">{{category.name}}</p>
                    </div>
                </template>
            </div>
        </div>
        <!-- show table list -->
        <div v-if="!selectedTable" class="p-8 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
            <template v-for="table in tableList" :key='table.id'>
                <div @click="handleSelect(table)"
                    class="group px-6 py-12 bg-white rounded-md cursor-pointer hover:bg-blue">
                    <p class="text-4xl text-blue font-bold group-hover:text-white">{{ table.number }}</p>
                </div>
            </template>
        </div>
        <!-- show item list upone table selected -->
        <div v-else class="p-8 space-y-8">
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
            tableList: [
                { id: '1', name: 'A01' },
                { id: '2', name: 'A02' },
                { id: '3', name: 'A03' },
                { id: '4', name: 'A04' },
                { id: '5', name: 'A05' },
                { id: '6', name: 'A06' },
                { id: '7', name: 'A07' },
                { id: '8', name: 'A08' },
            ],
            selectedTable: '',
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