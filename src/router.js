import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './components/AppHome.vue';
import StructuresComponent from './pages/StructuresComponent.vue';
import AboutUsComponent from './pages/AboutUsComponent.vue';
import ContactsComponent from './pages/ContactsComponent.vue';
import AdvanceSearchComponent from './pages/AdvanceSearchComponent.vue';
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
        {
            path: '/about',
            name:'about',
            component: AboutUsComponent
        },
        {
            path:'/contacts',
            name:'contacts',
            component: ContactsComponent
        },
        {
            path:'/search',
            name: 'search',
            component: AdvanceSearchComponent
        }
    ]
});
export { router };