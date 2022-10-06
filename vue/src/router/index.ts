import { createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import DefaultLayout from '../components/DefaultLayout.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard',
        name: 'Dashboard',
        component: DefaultLayout,
        children: [
            { path: 'dashboard', name: 'Dashboard', component: Dashboard }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Resiter',
        component: Register
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router