<template>
    <div class="flex">
        <div class='w-4/12 md:w-8/12 lg:w-9/12 bg-light-blue min-h-screen'></div>
        <div class="w-8/12 md:w-4/12 lg:w-3/12 bg-white min-h-screen p-6">
            <div class="h-full flex flex-col items-start justify-center space-y-12">
                <div>
                    <h1 class="text-4xl text-blue font-bold">Welcome Back,</h1>
                    <p class="text-lg text-gray font-light">log in to continue</p>
                </div>
                <div class="w-full space-y-4">
                    <base-text-input v-model="email" name="email" label="Email" />
                    <base-text-input class="w-full" v-model="pass" name="pass" type="password" label="Password"/>
                    <div v-show="message" class="w-full p-4 bg-light-red rounded-lg">
                        <div class="flex items-start space-x-2">
                            <ExclamationCircleIcon class="w-6 h-6 text-red" />
                            <p class="text-red font-light">{{message}}</p>
                        </div>
                    </div>
                </div>
                <BaseButton @click="handleLogin()" :disabled="!isFormValid" class="w-full">
                    <p>Login</p>
                </BaseButton>
            </div>
        </div>
    </div>
</template>

<script>
import BaseButton from "../components/BaseButton.vue";
import BaseTextInput from "../components/BaseTextInput.vue"
import { ExclamationCircleIcon } from "@heroicons/vue/24/outline";
export default {
    name: 'Login',
    components: { BaseButton, BaseTextInput, ExclamationCircleIcon },
    data() {
        return {
            email: "",
            pass: "",
            message: "",
        }
    },
    methods: {
        handleLogin() {
            this.$Progress.start();
            this.message = "";
            const formData = new FormData();
            formData.append("email", this.email);
            formData.append("password", this.pass);
            this.$store.dispatch("auth/login", formData).then(() => {
                this.$Progress.finish();
                this.$router.push({ name: "Home" });
            }).catch((error) => {
                this.$Progress.fail();
                this.message = error.response.data.message;
            });

        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
        isFormValid() {
            return this.email && this.pass;
        }
    },
    created() {
        if (this.isLoggedIn) {
            this.$router.push({ name: "Home" });
        }
    },
    mounted() {

    },
}
</script>

<style scoped>

</style>