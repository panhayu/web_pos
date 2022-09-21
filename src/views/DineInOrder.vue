<template>
    <div class="p-8 space-y-8">
        <div>
            <h1 class="text-2xl font-bold">Dine-In Order</h1>
            <p class="text-md text-gray font-light">Selecte or Choose Table for Dine-In Order</p>
        </div>
        <div class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
            <template v-for="table in tableList" :key='table.id'>
                <div @click="handleSelect(table.id)" class="group px-6 py-12 bg-white rounded-md cursor-pointer hover:bg-blue">
                    <p class="text-4xl text-blue font-bold group-hover:text-white">{{ table.name }}</p>
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
                    {id: '1', name: 'A01'},
                    {id: '2', name: 'A02'},
                    {id: '3', name: 'A03'},
                    {id: '4', name: 'A04'},
                    {id: '5', name: 'A05'},
                    {id: '6', name: 'A06'},
                    {id: '7', name: 'A07'},
                    {id: '8', name: 'A08'},
                ]
            }
        },
        methods: {
            handleSelect(value) {
                alert('Selected Table with ID: ' + value)
                this.$router.push('/home')
            }
        }
    }
</script>

<style scoped>

</style>