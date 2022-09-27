<template>
    <div class="p-8 space-y-8">
        <div>
            <h1 class="text-2xl font-bold">Dine-In Order</h1>
            <div v-if="selectedTable" class="flex flex-row items-center space-x-2">
                <p class="text-md text-gray font-light">Selecte or Choose Items for </p>
                <p class="px-3 py-1 bg-blue text-white font-bold rounded-md">
                    {{selectedTable.name}}
                </p>
            </div>
            <p v-else class="text-md text-gray font-light">Selecte or Choose Table for Dine-In Order</p>
        </div>
        <!-- show table list -->
        <div v-if="!selectedTable" class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
            <template v-for="table in tableList" :key='table.id'>
                <div @click="handleSelect(table)"
                    class="group px-6 py-12 bg-white rounded-md cursor-pointer hover:bg-blue">
                    <p class="text-4xl text-blue font-bold group-hover:text-white">{{ table.name }}</p>
                </div>
            </template>
        </div>
        <!-- show item list upone table selected -->
        <div v-else class="space-y-8">
            <!-- category cards -->
            <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                <template v-for="category in categories" :key="category.id">
                    <div class="group px-2 py-4 bg-white rounded-lg hover:bg-light-blue cursor-pointer"
                        @click="goTo(category.name)">
                        <p class="text-md font-light text-gray group-hover:text-blue">{{category.name}}</p>
                    </div>
                </template>
            </div>
            <template v-for="category in categories" :key="category.id">
                <div :ref="category.name">
                    <p class="text-xl text-gray font-light mb-6">{{category.name}}</p>
                    <!-- item cards -->
                    <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                        <template v-for="item in category.items" :key="item.id">
                            <div class="group bg-white rounded-xl pb-2 cursor-pointer select-none">
                                <img :src="item.image" class="rounded-t-xl object-contain" alt="">
                                <div class="px-2">
                                    <p class="text-md text-gray font-light group-hover:text-blue">{{item.name}}</p>
                                    <p class="text-gray text-xl font-bold group-hover:text-blue">$
                                        {{parseFloat(item.price).toFixed(2)}}</p>
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
export default {
    name: 'DineInOrder',
    data() {
        return {
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
            categories: [
                {
                    id: 'F-01',
                    name: 'Food',
                    items: [
                        {
                            id: 'F01-S02',
                            name: 'Supreme Set 2XL',
                            image: 'https://media.istockphoto.com/photos/grilled-chicken-breast-and-vegetables-picture-id1056419208?k=20&m=1056419208&s=612x612&w=0&h=a5Vc73iCNe6aMj__YUrCADRUBBhE-qB_uR0C_FQwoEA=',
                            price: '4'
                        },
                        {
                            id: 'F01-S03',
                            name: 'Supreme Set',
                            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStDFH59gXTaiPCUpaqZ_mciMlfARCtYRPkG937Bu6oF-qhf48iDuvu8YjVWLrPfQ_VbQo&usqp=CAU',
                            price: '3.5'
                        },
                        {
                            id: 'F01-S02',
                            name: 'Supreme Set 2XL',
                            image: 'https://media.istockphoto.com/photos/fried-chicken-breast-and-vegetables-picture-id880752828?k=20&m=880752828&s=612x612&w=0&h=66ArWqqaGNwZvm1mwNkmYNRwIhm6OJ1M5ngzmGZ6aZw=',
                            price: '4.5'
                        },
                        {
                            id: 'F01-S03',
                            name: 'Supreme Set',
                            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStDFH59gXTaiPCUpaqZ_mciMlfARCtYRPkG937Bu6oF-qhf48iDuvu8YjVWLrPfQ_VbQo&usqp=CAU',
                            price: '5.25'
                        },
                        {
                            id: 'F01-S02',
                            name: 'Supreme Set 2XL',
                            image: 'https://media.istockphoto.com/photos/grilled-fish-with-lentil-puree-and-vegetables-seen-from-above-picture-id168613528?k=20&m=168613528&s=612x612&w=0&h=EKGw0CPxqfZybKo8WJ1aVUV-2z94T_0p6wv5BiKUp58=',
                            price: '3.75'
                        },
                        {
                            id: 'F01-S03',
                            name: 'Supreme Set',
                            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStDFH59gXTaiPCUpaqZ_mciMlfARCtYRPkG937Bu6oF-qhf48iDuvu8YjVWLrPfQ_VbQo&usqp=CAU',
                            price: '6'
                        },
                        {
                            id: 'F01-S02',
                            name: 'Supreme Set 2XL',
                            image: 'https://media.istockphoto.com/photos/grilled-chicken-breast-and-vegetables-picture-id1056419208?k=20&m=1056419208&s=612x612&w=0&h=a5Vc73iCNe6aMj__YUrCADRUBBhE-qB_uR0C_FQwoEA=',
                            price: '5'
                        },
                    ],
                },
                {
                    id: 'F-02',
                    name: 'Drink',
                    items: [
                        {
                            id: 'D01-S02',
                            name: 'Ankor Puro',
                            image: 'https://www.monde-selection.com/wp-content/uploads/2021/05/1032204-500x500.png',
                            price: '0.25'
                        },
                        {
                            id: 'F01-S03',
                            name: 'Coca-cola',
                            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStDFH59gXTaiPCUpaqZ_mciMlfARCtYRPkG937Bu6oF-qhf48iDuvu8YjVWLrPfQ_VbQo&usqp=CAU',
                            price: '3.5'
                        },
                        {
                            id: 'D01-S02',
                            name: 'Supreme Set 2XL',
                            image: 'https://thumbs.dreamstime.com/b/vector-illustration-classic-coca-cola-can-isolated-white-background-editorial-use-coca-cola-company-most-popular-185464472.jpg',
                            price: '1'
                        },
                        {
                            id: 'D01-S03',
                            name: 'Sprite',
                            image: 'https://my-test-11.slatic.net/p/ca1bfec0c6930022cf8719ef9526cbb3.jpg',
                            price: '1'
                        },
                    ],
                },
                {
                    id: 'F-03',
                    name: 'Other',
                    items: [
                        {
                            id: 'D01-S02',
                            name: 'Ankor Puro',
                            image: 'https://www.monde-selection.com/wp-content/uploads/2021/05/1032204-500x500.png',
                            price: '0.25'
                        },]
                },
            ],
        }
    },
    methods: {
        handleSelect(value) {
            this.selectedTable = value;
        },
        goTo(refName) {
            var element = this.$refs[refName];
            var top = element.offsetTop;

            window.scrollTo(0, top);
        },
    }
}
</script>

<style scoped>

</style>