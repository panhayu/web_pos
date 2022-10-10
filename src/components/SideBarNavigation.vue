<template>
    <div class="w-full min-h-screen p-2 flex flex-col space-y-8 items-center justify-center sticky top-0">
        <div>
            <router-link to="/dine_in_order" active-class="text-blue"
                class="flex flex-col group text-gray cursor-pointer items-center space-y-2  select-none">
                <ArchiveBoxIcon class="w-8 h-8  group-hover:text-blue" />
                <p class="text-sm font-light  group-hover:text-blue">
                    Dine In
                </p>
            </router-link>
        </div>
        <div>
            <router-link to="/take_away_order" active-class="text-blue"
                class="flex flex-col group text-gray cursor-pointer items-center space-y-2  select-none">
                <ShoppingBagIcon class="w-8 h-8  group-hover:text-blue" />
                <p class="text-sm font-light  group-hover:text-blue">
                    Take Away
                </p>
            </router-link>
        </div>
        <div>
            <router-link to="/take-away" active-class="text-blue"
                class="flex flex-col group text-gray cursor-pointer items-center space-y-2  select-none">
                <TruckIcon class="w-8 h-8  group-hover:text-blue" />
                <p class="text-sm font-light  group-hover:text-blue">
                    Delivery
                </p>
            </router-link>
        </div>
    </div>
</template>

<script>
import { ShoppingBagIcon, TruckIcon, ArchiveBoxIcon } from '@heroicons/vue/24/outline';
export default {
    name: 'SideBarNavigation',
    components: {
        ShoppingBagIcon,
        TruckIcon,
        ArchiveBoxIcon
    },
    data() {
        return {}
    },
    methods: {},
    created() { },
    mounted() { },
}
</script>

<style scoped>

</style>