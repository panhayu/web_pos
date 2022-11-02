<template>
    <div @click="handleAddToCart(item)" class="group bg-white rounded-md pb-2 cursor-pointer select-none">
        <img v-if="item.image" :src="item.image" class="rounded-t-lg object-cover square-image" alt="">
        <img v-else :src="defaultImage" class="rounded-t-lg object-cover square-image" alt="">
        <div class="px-2 py-1">
            <p class="text-md text-gray font-light truncate group-hover:text-blue">
                {{ item.name }}
            </p>
            <p v-if="itemSize.length > 0" class="text-gray text-md font-bold group-hover:text-blue">
                {{ Intl.NumberFormat().format(itemSize[0].price) }}៛
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BaseItemCard',
    props: {
        item: {
            type: Object,
            required: true,
        },
        itemSize: {
            type: Object,
            // required: true,
            default: '',
        },
        defaultImage: {
            type: String,
            default: 'https://theme-assets.getbento.com/sensei/5a38345.sensei/assets/images/catering-item-placeholder-704x520.png',
        },
    },
    data() {
    },
    methods: {
        handleAddToCart(item) {
            this.$store.commit('addToCart', item)
        }
    },
}
</script>

<style scoped>
.square-image {
    aspect-ratio: 1/1;
}
</style>