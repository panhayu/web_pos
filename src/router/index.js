import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

const routes = [
    {
      path: '/',
      alias: '/home',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true, title: 'Home' }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {requiresAuth: true, title: 'Login'}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })

export default router