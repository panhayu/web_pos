import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import store from '../store'
import DineInOrder from '../views/DineInOrder.vue'
import TakeAwayOrder from '../views/TakeAwayOrder.vue'
import PrintReceipt from '../views/PrintReceipt.vue'
import DeliveryOrder from '../views/DeliveryOrder.vue'

const routes = [
    {
      path: '/',
      alias: '/dine_in_order',
      name: 'Home',
      beforeEnter: protectedRoute,
      component: DineInOrder,
      meta: {requiresAuth: true, title: 'POS - Dine In Order', layout: 'default'}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {requiresAuth: true, title: 'Login', layout: 'blank'}
    },
  {
    path: '/take_away_order',
    name: 'TakeAwayOrder',
    beforeEnter: protectedRoute,
    component: TakeAwayOrder,
    meta: {requiresAuth: true, title: 'POS - Take Away Order', layout: 'default'}
  }, 
  {
    path: '/print_reciept',
    name: 'PrintReciept',
    beforeEnter: protectedRoute,
    component: PrintReceipt,
    meta: {requiresAuth: true, title: 'POS - Print Reciept', layout: 'blank'}
  },
  {
    path: '/delivery_order',
    name: 'DeliveryOrder',
    beforeEnter: protectedRoute,
    component: DeliveryOrder,
    meta: {requiresAuth: true, title: 'POS - Delivery Order', layout: 'default'}
  }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
  
function protectedRoute(to, from, next) {
  var isAuthenticated = store.state.auth.status.loggedIn;
  if (isAuthenticated) {
    next()
  } else {
    next('/login')
  }
}

export default router