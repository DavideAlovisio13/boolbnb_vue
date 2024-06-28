import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './components/AppHome.vue';
import StructuresComponent from './components/StructuresComponent.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/structures',
            name: 'structures',
            component: StructuresComponent
        },

    ]
});
export { router };