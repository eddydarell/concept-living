// import './assets/main.css'
// import './assets/desktop.css'
// import './assets/laptop.css'
// import './assets/tablet.css'
// import './assets/mobile.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
