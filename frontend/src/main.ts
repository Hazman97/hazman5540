import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import './assets/input.css'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '102558661771-4i3dtssthtr4q7t509p88f99e46pivc4.apps.googleusercontent.com' // Using a generic placeholder if not set, user should configure this in .env
})

app.mount('#app')
