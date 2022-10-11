import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import store from '../store'
import DineInOrder from '../views/DineInOrder.vue'
import TakeAwayOrder from '../views/TakeAwayOrder.vue'
import PrintReceipt from '../views/PrintReceipt.vue'

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
      beforeEnter: projectedRoute,
      component: DineInOrder,
      meta: {requiresAuth: true, title: 'POS - Dine In Order', layout: 'default'}
  },
  {
    path: '/take_away_order',
    name: 'TakeAwayOrder',
    beforeEnter: projectedRoute,
    component: TakeAwayOrder,
    meta: {requiresAuth: true, title: 'POS - Take Away Order', layout: 'default'}
  }, 
  {
    path: '/print_reciept',
    name: 'PrintReciept',
    beforeEnter: projectedRoute,
    component: PrintReceipt,
    meta: {requiresAuth: true, title: 'POS - Print Reciept', layout: 'blank'}
  }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
  
function projectedRoute(to, from, next) {
  var isAuthenticated = store.state.auth.status.loggedIn;
  if (isAuthenticated) {
    next()
  } else {
    next('/login')
  }
}

export default router