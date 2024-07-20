import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FuelStation from '../views/FuelStation.vue'
import AllFuelData from '../views/AllFuelData.vue'
import Register from '../views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/all',
      name: 'AllFuelData',
      component: AllFuelData
    },
    {
      path: '/fuelstations/:id',
      name: 'FuelStation',
      component: FuelStation
    }
  ]
})

export default router
