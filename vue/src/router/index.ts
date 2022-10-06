import { createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
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