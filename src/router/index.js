import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import DineInOrder from '../views/DineInOrder.vue'

const routes = [
    {
      path: '/',
      alias: '/home',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true, title: 'Home', layout: 'default' }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {requiresAuth: true, title: 'Login', layout: 'blank'}
    },
    {
      path: '/dine_in_order',
      name: 'DineInOrder',
      component: DineInOrder,
      meta: {requiresAuth: true, title: 'POS - Dine In Order', layout: 'default'}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })

export default router