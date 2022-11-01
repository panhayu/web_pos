<template>
    <TabGroup>
        <TabList
            class="grid 2xl:grid-cols-10 xl:grid-cols-7 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-4 xl:px-8 lg:px-6 md:px-4 py-2 sticky top-0 backdrop-blur-lg w-full">
            <Tab as="template" v-slot="{ selected }" class="w-full">
                <div :class="[
                    'w-full group px-2 py-4 rounded-lg cursor-pointer',
                    selected ? 'bg-blue text-white' : 'bg-white text-gray hover:bg-light-blue hover:text-blue'
                ]">
                    <p class="text-md text-left font-light">
                        All Items
                    </p>
                </div>
            </Tab>
            <Tab v-for="category in categoryList" :key="category.id" as="template" v-slot="{ selected }" class="w-full">
                <div :class="[
                    'w-full group px-2 py-4 rounded-lg cursor-pointer',
                    selected ? 'bg-blue text-white' : 'bg-white text-gray hover:bg-light-blue hover:text-blue'
                ]">
                    <p class="text-md text-left font-light">
                        {{ category.name }}
                    </p>
                </div>
            </Tab>
        </TabList>
        <TabPanels>
            <TabPanel class="xl:px-8 lg:px-6 md:px-4 py-2">
                <!-- item cards -->
                <div
                    class="grid 2xl:grid-cols-10 xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4">
                    <div v-for="(item, index) in allItems" :key="index">
                        <BaseItemCard :item="item" :itemSize="item.sizes" />
                    </div>
                </div>
            </TabPanel>
            <TabPanel v-for="(category, index) in categoryList" :key="index" class="xl:px-8 lg:px-6 md:px-4 py-2">
                <!-- item cards -->
                <div
                    class="grid 2xl:grid-cols-10 xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4">
                    <div v-for="(item, index) in category.items" :key="index">
                        <BaseItemCard :item="item" :itemSize="item.sizes" />
                    </div>
                </div>
            </TabPanel>
        </TabPanels>
    </TabGroup>
</template>

<script>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import BaseItemCard from '../components/BaseItemCard.vue'
import userService from '../services/user.service'
export default {
    name: 'ItemsList',
    components: { TabGroup, TabList, Tab, TabPanels, TabPanel, BaseItemCard },
    data() {
        return {
            params: new URLSearchParams(),
            allItems: [],
            categoryList: [],
        }
    },
    methods: {
        getAllItem() {
            this.params.set('relations', 'sizes')
            userService.getAllItems(this.params).then((response) => {
                this.allItems = response.data.data;
                localStorage.setItem('allItems', JSON.stringify(this.allItems))
            });
        },
        getCategoryList() {
            this.params.set('relations', 'items')
            userService.getCategory(this.params).then((response) => {
                this.categoryList = response.data.data;
                localStorage.setItem('categoryList', JSON.stringify(this.categoryList))
            });
        },
    },
    created() {
        this.$Progress.start();
        if (localStorage.getItem('allItems')) {
            this.allItems = JSON.parse(localStorage.getItem('allItems'))
        }
        if (localStorage.getItem('categoryList')) {
            this.categoryList = JSON.parse(localStorage.getItem('categoryList'))
        }
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