<template>
    <div class="flex flex-col w-full min-h-screen px-4 py-8 bg-white sticky top-0">
        <div class="text-center">
            <p class="text-2xl text-gray font-bold">POS</p>
            <div class="w-full border-b border-1 border-light-gray my-4"></div>
        </div>
        <div class="space-y-8">
            <div v-for="channel in orderChannel" :key="channel.id">
                <div v-if="channel.is_active === 1" class="text-gray">
                    <div v-if="channel.name === 'Dine-in'">
                        <router-link to="/dine_in_order" active-class="text-blue"
                            class="flex flex-col group cursor-pointer items-center space-y-2  select-none">
                            <ArchiveBoxIcon class="w-8 h-8 group-hover:text-blue" />
                            <p class="text-sm font-light group-hover:text-blue">
                                Dine In
                            </p>
                        </router-link>
                    </div>
                    <div v-if="channel.name === 'Takeaway'">
                        <router-link to="/take_away_order" active-class="text-blue"
                            class="flex flex-col group cursor-pointer items-center space-y-2  select-none">
                            <ShoppingBagIcon class="w-8 h-8 group-hover:text-blue" />
                            <p class="text-sm font-light  group-hover:text-blue">
                                Take Away
                            </p>
                        </router-link>
                    </div>
                    <div v-if="channel.name === 'Delivery'">
                        <router-link to="/delivery_order" active-class="text-blue"
                            class="flex flex-col group cursor-pointer items-center space-y-2  select-none">
                            <TruckIcon class="w-8 h-8 group-hover:text-blue" />
                            <p class="text-sm font-light group-hover:text-blue">
                                Delivery
                            </p>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="text-gray">
                <router-link to="/order" active-class="text-blue"
                    class="flex flex-col group cursor-pointer items-center space-y-2  select-none">
                    <ClipboardIcon class="w-8 h-8 group-hover:text-blue" />
                    <p class="text-sm font-light group-hover:text-blue">
                        Order
                    </p>
                </router-link>
            </div>
        </div>
        <div class="mt-auto flex flex-col items-center space-y-4">
            <div v-show="!this.isOnline" class="p-2 bg-light-red rounded-full">
                <SignalSlashIcon class="w-6 h-6 text-red" />
            </div>
            <div @click="handleLogout" class="flex flex-col items-center cursor-pointer text-red">
                <ArrowLeftCircleIcon class="w-8 h-8 text-red group-hover:text-red" />
                <p class="text-sm font-light  group-hover:text-red">
                    Logout
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { ShoppingBagIcon, TruckIcon, ArchiveBoxIcon, ArrowLeftCircleIcon, ClipboardIcon, SignalSlashIcon } from '@heroicons/vue/24/outline';
import userService from '../services/user.service';
export default {
    name: 'SideBarNavigation',
    components: {
        ShoppingBagIcon,
        TruckIcon,
        ArchiveBoxIcon,
        ArrowLeftCircleIcon,
        ClipboardIcon,
        SignalSlashIcon
    },
    data() {
        return {
            orderChannel: [],
        }
    },
    computed: {
        isOnline() {
            return this.$store.getters.onlineStatus;
        }
    },
    methods: {
        handleLogout() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/login');
        },
        getOrderChannel() {
            userService.getOrderChannel().then((response) => {
                this.orderChannel = response.data.data;
                localStorage.setItem('orderChannel', JSON.stringify(this.orderChannel));
            });
        }
    },
    created() {
        this.getOrderChannel();
        this.orderChannel = JSON.parse(localStorage.getItem('orderChannel'));
    },
    mounted() { },
}
</script>

<style scoped>

</style>