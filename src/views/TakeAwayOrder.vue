<template>
    <div>
        <div class="sticky p-8 pb-0 top-0 backdrop-blur-lg  w-full">
            <div>
                <h1 class="text-2xl font-bold">Take Away Order</h1>
                <div class="flex flex-row items-center space-x-2">
                    <p class="text-md text-gray font-light">Selecte or Choose Items for Take Away order</p>
                </div>
            </div>
            <!-- category cards -->
            <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-4 py-1">
                <template v-for="category in categoryList" :key="category.id">
                    <div v-if="category.items.length > 0"
                        class="group px-2 py-4 bg-white rounded-lg hover:bg-light-blue cursor-pointer">
                        <p class="text-md font-light text-gray group-hover:text-blue">{{ category.name }}</p>
                    </div>
                </template>
            </div>
        </div>
        <!-- show item list upone table selected -->
        <div class="px-8 py-4">
            <!-- item cards -->
            <div class="grid xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                <div v-for="item in itemsList" :key="item.id">
                    <BaseItemCard :item="item" :itemSize="item.sizes" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import userService from '../services/user.service';
import BaseItemCard from '../components/BaseItemCard.vue';

export default {
    name: 'TakeAwayOrder',
    components: { BaseItemCard },
    data() {
        return {
            params: new URLSearchParams(),
            defaultImage: 'https://theme-assets.getbento.com/sensei/5a38345.sensei/assets/images/catering-item-placeholder-704x520.png',
            itemsList: [],
            categoryList: [],
        }
    },
    methods: {
        getAllItem() {
            this.params.set('relations', 'sizes')
            userService.getAllItems(this.params).then((response) => {
                this.itemsList = response.data.data;
            });
        },
        getCategoryList() {
            this.params.set('relations', 'items')
            userService.getCategory(this.params).then((response) => {
                this.categoryList = response.data.data;
            });
        },
        handleSelect(value) {
            this.selectedTable = value;
        },
    },
    created() {
        this.$Progress.start();
        this.getAllItem();
        this.getCategoryList();
    },
    mounted() {
        this.$Progress.finish();
    }
}
</script>

<style scoped>

</style>