import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/Dashboard.vue'
import Home from '../views/Home.vue'
import Poll from '../views/Poll.vue'
import AddRevenue from '../views/AddRevenue.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/poll',
    name: 'Poll',
    component: Poll,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/addRevenue',
    name: 'AddRevenue',
    component: AddRevenue
  },
  {
    path: '/',
    redirect: '/home',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
