import { createApp } from 'vue'
import './styles/style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import VueProgressBar from "@aacassandra/vue3-progressbar";

import Default from './layouts/Default.vue'
import Blank from './layouts/Blank.vue'

// configuration for vue3-progressbar
const options = {
    color: 'var(--blue)',
    failedColor: "var(--red)",
    thickness: "5px",
    transition: {
        speed: "0.5s",
        opacity: "0.2s",
        termination: 900,
    },
    autoRevert: true,
    location: "top",
    inverse: false,
};

const app = createApp(App)

app.component('default-layout', Default)
app.component('blank-layout', Blank)

app.use(router)
app.use(store)
app.use(VueProgressBar, options)
app.mount('#app')
