<template>
    <div class="flex">
        <div class='w-9/12 bg-light-blue min-h-screen'></div>
        <div class="w-3/12 bg-white min-h-screen p-6">
            <div class="h-full flex flex-col items-start justify-center space-y-12">
                <div>
                    <h1 class="text-4xl text-blue font-bold">Welcome Back,</h1>
                    <p class="text-lg font-normal text-gray">log in to continue</p>
                </div>
                <div class="w-full space-y-4">
                    <base-text-input
                        v-model="username"
                        name="username"
                        label="Username"
                    />
                    <base-text-input
                        class="w-full"
                        v-model="pass"
                        name="pass"
                        type="password"
                        label="Password"
                    />
                </div>
                <BaseButton @click="handleLogin()" class="w-full">
                    <p>Login</p>
                </BaseButton>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseButton from "../components/BaseButton.vue";
    import BaseTextInput from "../components/BaseTextInput.vue"
    export default {
        name: 'Login',
        components: {BaseButton, BaseTextInput},
        data() {return {
            username: "",
            pass: "",
        }},
        methods: {
            handleLogin() {
                alert('username: '+this.username+' pass: '+this.pass)
                this.$router.push('/home')
            }
        },
        created() {
            
        },
        mounted() {
            
        },
    }
</script>

<style scoped>

</style>