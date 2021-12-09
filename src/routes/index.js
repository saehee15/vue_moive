import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'

export default createRouter({
    // Hash, History 모드가 있음
    // 여기서는 Hash 모드로, createWebHashHistory 메소드를 가져와서 함수로 사용
    // Hash 모드: 도메인 주소 뒤에 #/를 붙여서 해당하는 페이지로 접근하는 방식 ex) http://wwww.google.com/#/search
    // 사용하는 이유: 특정페이지에서 새로고침을 했을때 페이지를 찾을수없다는 메세지 방지
    // History 모드는 서버에 셋팅이 필요
    history: createWebHashHistory(),
    // pages 배열로 작성
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/movie',
            component: Movie
        },
        {
            path: '/about',
            component: About
        }
        
    ]
})