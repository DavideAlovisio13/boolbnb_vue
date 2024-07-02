import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Structures from './pages/Structures.vue';
import AboutUs from './pages/AboutUs.vue';
import Contacts from './pages/Contacts.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/structures',
            name: 'structures',
            component: Structures,
        },
        {
            path: '/about',
            name:'about',
            component: AboutUs,
        },
        {
            path:'/contacts',
            name:'contacts',
            component: Contacts,
        }
    ]
});
export { router };