<template>
    <div class="space-y-8">
        <div class="p-8 pb-0 backdrop-blur-lg  w-full">
            <div>
                <h1 class="text-2xl font-bold">Dine-In Order</h1>
                <div v-if="selectedTable" class="flex flex-row items-center space-x-2">
                    <p class="text-md text-gray font-light">Selecte or Choose Items for </p>
                    <p class="px-3 py-1 bg-blue text-white font-bold rounded-md">
                        {{ selectedTable.number }}
                    </p>
                </div>
                <p v-else class="text-md text-gray font-light">Selecte or Choose Table for Dine-In Order</p>
            </div>
        </div>
        <!-- show table list -->
        <div v-if="!selectedTable" class="p-8 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
            <template v-for="table in tableList" :key='table.id'>
                <div @click="handleSelect(table)"
                    class="group px-6 py-12 bg-white rounded-md cursor-pointer hover:bg-blue">
                    <p class="text-4xl text-blue font-bold group-hover:text-white">
                        {{ table.number }}
                    </p>
                </div>
            </template>
        </div>
        <!-- show item list upone table selected -->
        <ItemsList v-else />
    </div>
</template>

<script>
import userService from '../services/user.service';
import ItemsList from '../components/ItemsList.vue';
export default {
    name: 'DineInOrder',
    components: {
        ItemsList,
    },
    data() {
        return {
            tableList: [],
            selectedTable: '',
        }
    },
    methods: {
        getTableList() {
            userService.getDineInTables().then((response) => {
                this.tableList = response.data.data
                localStorage.setItem('tableList', JSON.stringify(this.tableList))
            })
        },
        handleSelect(value) {
            this.selectedTable = value;
        },
    },
    created() {
        this.$Progress.start();
        if (localStorage.getItem('tableList')) {
            this.tableList = JSON.parse(localStorage.getItem('tableList'))
        }
        this.getTableList();
    },
    mounted() {
        this.$store.commit("updateOrderType", "dine-in");
        this.$Progress.finish();
    }
}
</script>

<style scoped>

</style>