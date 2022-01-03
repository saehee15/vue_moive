import { createApp } from 'vue'
import App from './App.vue'
//특정한 폴더에 index파일은 생략가능 밑에 /index.js 생략가능
import router from './routes/index.js'
import store from './store/index.js'
import loadImage from './plugins/loadImage'

createApp(App)
    .use(router) //$route, $router
    .use(store) //$store
    .use(loadImage) //$loadImage
    .mount('#app')