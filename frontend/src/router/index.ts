import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FuelStation from '../views/FuelStation.vue'
import AllFuelData from '../views/AllFuelData.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import AuthenticationService from '@/services/AuthenticationService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/all',
      name: 'AllFuelData',
      component: AllFuelData,
      meta: { requiresAuth: true }
    },
    {
      path: '/fuelstations/:id',
      name: 'FuelStation',
      component: FuelStation,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresAuth: false }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!AuthenticationService.isLoggedIn()) 
      next({ name: 'Login' });
    else 
        next();
    
  } else 
      next();
});

export default router
