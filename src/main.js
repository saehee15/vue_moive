import { createApp } from 'vue'
import App from './App.vue'
//특정한 폴더에 index파일은 생략가능 밑에 /index.js 생략가능
import router from './routes/index.js'
import store from './store/index.js'

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')