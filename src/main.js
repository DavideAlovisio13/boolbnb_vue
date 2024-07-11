import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BootstrapVue3, BButton, BModal } from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import './assets/styles/general.scss';
import { TRUE } from 'sass';

const app = createApp(App);
app.use(router);
app.use(BootstrapVue3);
app.component('BButton', BButton);
app.component('BModal', BModal);
app.mount('#app');




