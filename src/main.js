import { createApp } from 'vue'
import './styles/style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import VueProgressBar from "@aacassandra/vue3-progressbar";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import Default from './layouts/Default.vue'
import Blank from './layouts/Blank.vue'
import SideBarOnly from './layouts/SideBarOnly.vue'

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

// configuariton for vue 3 toastification
const toastOption = {
    position: "top-center",
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: true,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false
}

const app = createApp(App)

app.component('default-layout', Default)
app.component('blank-layout', Blank)
app.component('sidebar-layout', SideBarOnly)

app.use(router)
app.use(store)
app.use(VueProgressBar, options)
app.use(Toast, toastOption)
app.mount('#app')
