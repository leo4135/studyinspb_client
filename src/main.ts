import {createApp, ref} from 'vue';
import './style.css';
import App from './App.vue';
import {createRouter, createWebHistory} from 'vue-router';
import MainPage from './components/MainPage.vue';
import PageForProgramms from './components/PageForProgramms.vue';
import PageForOrganizations from "./components/PageForOrganizations.vue";
import PageForProgrammsCard from "./components/PageForProgrammsCard.vue";
import {createPinia, defineStore} from 'pinia';
// vuetify
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import {createVuetify} from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { test }  from '../data.ts'


const vuetify = createVuetify({
    components,
    directives
})


const routes = [
    {path: '/',component: MainPage},
    {path: '/organizations',name: 'organizations', component: PageForOrganizations},
    {path: '/programms', component: PageForProgramms},
    {path: '/education_programs/:id', name: "education_programs", component: PageForProgrammsCard, props: true}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const pinia = createPinia()


createApp(App)
    .use(pinia)
    .use(vuetify)
    .use(router)
    .mount('#app')

export const useCounterStore = defineStore('mockData', () => {
    const dataEducationPrograms = ref({
        arr: test
    })



    return { dataEducationPrograms }
})