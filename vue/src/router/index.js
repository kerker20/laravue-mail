import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Templates from "../views/Templates.vue";
import Settings from "../views/Settings.vue";
import DefaultLayout from '../components/DefaultLayout.vue'
import AuthLayout from '../components/AuthLayout.vue'
import Mails from '../views/Mails.vue'
import store from "../store";

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        name: 'Dashboard',
        component: DefaultLayout,
        meta: {
            requiresAuth: true,
        },
        children: [
            {path: '/dashboard', name: 'Dashboard', component: Dashboard},
            {path: '/mails', name: 'Mails', component: Mails},
            {path: '/templates', name: 'Templates', component: Templates},
            {path: '/settings', name: 'Settings', component: Settings},
        ]
    },
    {
        path: '/auth',
        redirect: '/login',
        name: 'Auth',
        component: AuthLayout,
        meta: {
            isGuest: true,
        },
        children: [
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
            {
                path: '/register',
                name: 'Register',
                component: Register
            }
        ]

    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth && !store.state.user.token){
        next({name: 'Login'});
    }else if (store.state.user.token && (to.meta.isGuest)) {
        next({ name: 'Dashboard' });
    }else{
        next();
    }
})

export default router;