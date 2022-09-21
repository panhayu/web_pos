import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
      path: '/',
      alias: '/home',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true, title: 'Home' }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })

export default router