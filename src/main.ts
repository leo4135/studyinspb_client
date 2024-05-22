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

export const useCounterStore = defineStore('counter', () => {
    const count = ref({
        arr: [
            {
                id: 1,
                name: 'Бизнес-аналитика и большие данные (Master in Business Analytics and Big Data - MiBA)',
                name_org: 'Санкт-Петербургский государственный университет ',
                level_education: 'Магистратура',
                form_education: 'Очное',
                range_edu: "2",
                lang_edu: 'английский',
                free_mest: '1',
                notFree_mest: '20',
                cost_rus: '300000',
                cost_all: '608700',
                ball_ege: '198',
                actual: true,
                adress: 'Санкт-Петербург, Университетская набережная, д. 7/9',
                rector: 'Кропачев Николай Михайлович',
                info: 'Основная образовательная программа магистратуры «Бизнес-аналитика и большие данные (Master \n' +
                    'in Business Analytics and Big Data - MiBA)» ставит своей целью формирование фундаментальных знаний \n' +
                    'в области менеджмента, анализа больших данных и современных аналитических инструментов, применяемых для решения управленческих задач. Возможность пройти семестр включенного обучения за рубежом в одной из ведущих бизнес-школ из списка партнеров СПбГУ. '
            },
            {
                id: 2,
                name: 'Бизнес-аналитика и большие данные (Master in Business Analytics and Big Data - MiBA)',
                name_org: 'Санкт-Петербургский государственный университет ',
                level_education: 'Магистратура',
                form_education: 'Очное',
                range_edu: "2",
                lang_edu: 'английский',
                free_mest: '1',
                notFree_mest: '20',
                cost_rus: '300000',
                cost_all: '608700',
                ball_ege: '198',
                adress: '',
                actual: true,
                rector: 'Кропачев Николай Михайлович',
                info: 'Основная образовательная программа магистратуры «Бизнес-аналитика и большие данные (Master \n' +
                    'in Business Analytics and Big Data - MiBA)» ставит своей целью формирование фундаментальных знаний \n' +
                    'в области менеджмента, анализа больших данных и современных аналитических инструментов, применяемых для решения управленческих задач. Возможность пройти семестр включенного обучения за рубежом в одной из ведущих бизнес-школ из списка партнеров СПбГУ. '
            },
            {
                id: 3,
                name: 'Бизнес-аналитика и большие данные (Master in Business Analytics and Big Data - MiBA)',
                name_org: 'Санкт-Петербургский государственный университет ',
                level_education: 'Магистратура',
                form_education: 'Очное',
                range_edu: "2",
                lang_edu: 'английский',
                free_mest: '1',
                notFree_mest: '20',
                cost_rus: '300000',
                cost_all: '608700',
                ball_ege: '198',
                actual: true,
                rector: 'Кропачев Николай Михайлович',
                info: 'Основная образовательная программа магистратуры «Бизнес-аналитика и большие данные (Master \n' +
                    'in Business Analytics and Big Data - MiBA)» ставит своей целью формирование фундаментальных знаний \n' +
                    'в области менеджмента, анализа больших данных и современных аналитических инструментов, применяемых для решения управленческих задач. Возможность пройти семестр включенного обучения за рубежом в одной из ведущих бизнес-школ из списка партнеров СПбГУ. '
            },
            {
                id: 4,
                name: 'Бизнес-аналитика и большие данные (Master in Business Analytics and Big Data - MiBA)',
                name_org: 'Санкт-Петербургский государственный университет ',
                level_education: 'Магистратура',
                form_education: 'Очное',
                range_edu: "2",
                lang_edu: 'английский',
                free_mest: '1',
                notFree_mest: '20',
                cost_rus: '300000',
                cost_all: '608700',
                ball_ege: '198',
                actual: true,
                rector: 'Кропачев Николай Михайлович',
                info: 'Основная образовательная программа магистратуры «Бизнес-аналитика и большие данные (Master \n' +
                    'in Business Analytics and Big Data - MiBA)» ставит своей целью формирование фундаментальных знаний \n' +
                    'в области менеджмента, анализа больших данных и современных аналитических инструментов, применяемых для решения управленческих задач. Возможность пройти семестр включенного обучения за рубежом в одной из ведущих бизнес-школ из списка партнеров СПбГУ. '
            }
        ]
    })



    return { count }
})