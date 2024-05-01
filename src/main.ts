import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import MainPage from './components/MainPage.vue'
import PageForProgramms from './components/PageForProgramms.vue'

const routes = [
  { path: '/', component: MainPage },
  { path: '/programms', component: PageForProgramms }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

createApp(App)
  .use(router)
  .mount('#app')
