import {createApp, ref} from 'vue';
import './style.css';
import App from './App.vue';
import {createRouter, createWebHistory} from 'vue-router';
import MainPage from './components/MainPage.vue';
import PageForProgramms from './components/PageForProgramms.vue';
import PageForOrganizations from "./components/PageForOrganizations.vue";
import PageForProgrammsCard from "./components/PageForProgrammsCard.vue";
import PageForOrganizationCard from "./components/PageForOrganizationCard.vue";
import PageForContacts from "./components/PageForContacts.vue";
import Calculator from "./components/Calculator.vue";
import PageForNews from "./components/PageForNews.vue";
import bagger from "./components/ListFromJob.vue"
import Chatbird from './components/Chatbird.vue';
import {createPinia, defineStore} from 'pinia';
// vuetify
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import {createVuetify} from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import './yandex-metrica'







const vuetify = createVuetify({
    components,
    directives
})


const routes = [
    {path: '/',component: MainPage},
    {path: '/organizations',name: 'organizations', component: PageForOrganizations, props: true},
    {path: '/organizations/:tab',name: 'organizationsType', component: PageForOrganizations, props: true},
    {path: '/programs', component: PageForProgramms},
    {path: '/contacts', component: PageForContacts},
    {path: '/programs/:id', name: "programs", component: PageForProgrammsCard, props: true},
    {path: '/organization/:id', name: "organization", component: PageForOrganizationCard, props: true},
    {path: '/news/:id', name: "news", component: PageForNews, props: true},
    {path: '/calculator', name: 'calculator', component: Calculator, props: true},
    {path: '/chatbird', name: 'chatbird', component: Chatbird, props: true},
    {path: '/bugs', name: 'bugs', component: bagger, props: true},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.afterEach((to) => {
    ym(98749918, 'hit', to.fullPath);
  });

const pinia = createPinia()

createApp(App)
    .use(pinia)
    .use(vuetify)
    .use(router)
    .mount('#app')

export const useCounterStore = defineStore('Data', () => {
    const dataEducationPrograms = ref([])
    const dataOrganizations = ref([])
    const educationTabs = ref('Основное')
    const filtres = ref([])
    const filtresOrg = ref([])
    const calculatorEGE = ref([])
    let updatedForHeaderInFooter = ref('some');


    return { dataEducationPrograms, educationTabs, filtres, dataOrganizations, filtresOrg, calculatorEGE, updatedForHeaderInFooter }
})