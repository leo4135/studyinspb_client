import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createMemoryHistory, createRouter} from 'vue-router'
import MainPage from './components/MainPage.vue'
import PageForProgramms from './components/PageForProgramms.vue'
import PageForOrganizations from "./components/PageForOrganizations.vue"

// vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const vuetify = createVuetify({
    components,
    directives
})


const routes = [
    {path: '/', component: MainPage},
    {path: '/organizations', component: PageForOrganizations},
    {path: '/programms', component: PageForProgramms}
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

createApp(App)
    .use(vuetify)
    .use(router)
    .mount('#app')
