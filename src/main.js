import { createApp } from 'vue'
import './styles/style.css'
import App from './App.vue'
import router from './router'
import store from './store'

import Default from './layouts/Default.vue'
import Blank from './layouts/Blank.vue'

const app = createApp(App)

app.component('default-layout', Default)
app.component('blank-layout', Blank)

app.use(router)
app.use(store)
app.mount('#app')
