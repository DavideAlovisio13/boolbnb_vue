import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Structures from './pages/Structures.vue';
import AboutUs from './pages/AboutUs.vue';
import Login from './pages/Login.vue';
import Search from './pages/Search.vue';
import ApartmentDetailComponent from './pages/ApartmentDetailComponent.vue';

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
            name: 'about',
            component: AboutUs,
        },
        {
            path: '/accedi',
            name: 'accedi',
            component: Login,
        },
        {
            path: '/search/:query/:lat/:lon',
            name: 'search',
            component: Search,
        },
        {
            path: '/apartment/:slug',
            name: 'apartment-detail',
            component: ApartmentDetailComponent,
            props: true,
        }
    ]
});

export { router };