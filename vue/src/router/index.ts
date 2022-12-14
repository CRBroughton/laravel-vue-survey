import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../components/DefaultLayout.vue'
import AuthLayout from '../components/AuthLayout.vue'
import Dashboard from '../views/Dashboard.vue'
import Surveys from '../views/Surveys.vue'
import Login from '../views/Login.vue'
import SurveyView from '../views/SurveyView.vue'
import Register from '../views/Register.vue'
import { store } from '../store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Dashboard',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '/dashboard', name: 'Dashboard', component: Dashboard },
      { path: '/surveys', name: 'Surveys', component: Surveys },
      { path: '/surveys', name: 'SurveyCreate', component: SurveyView },
      { path: '/surveys/:id', name: 'SurveyView', component: SurveyView },
    ],
  },
  {
    path: '/auth',
    name: 'Auth',
    redirect: '/login',
    component: AuthLayout,
    meta: { isGuest: true },
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login,
      },
      {
        path: '/register',
        name: 'Register',
        component: Register,
      },
    ],
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token)
    next({ name: 'Login' })

  else if (store.state.user.token && (to.meta.isGuest))
    next({ name: 'Dashboard' })

  else
    next()
})

export default router
