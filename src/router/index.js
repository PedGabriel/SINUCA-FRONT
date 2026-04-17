import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    }, 
    {
      path: '/delegacao',
      name: 'Delegacao',
      component: () => import('../views/DelagationView.vue'),
    },
    {
      path: '/p',
      name: 'playground',
      component: () => import('../views/playground.vue'),
    },
    {
      path: '/p/:id',
      name: 'playground-task',
      component: () => import('../views/playground2.vue'),
    },
  ],
})

export default router
