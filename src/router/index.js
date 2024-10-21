import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/theft',
      name: 'theft',
      component: () => import('../views/Theft.vue')
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('../views/Reports.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/officers',
      name: 'officers',
      component: () => import('../views/Officers.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('userToken')) {
    next('/');
  } else {
    next()
  }
})

export default router