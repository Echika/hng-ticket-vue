import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { initializeSampleData } from './utils/ticketStorage'

// Initialize sample tickets on app load
initializeSampleData()

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')