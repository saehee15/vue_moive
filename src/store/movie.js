import axios from "axios";
export default {
    //namespaced를 true로 해야 module화 가능
    namespaced: true,
    // 취급하는 각각의 date
    state: () => ({
        movies:[]
    }),
    // 계산된 date, vue에서의 computed!
    getters: {
        //ex 예시임 이 프로젝트에서 getters는 따로 안 쓴데
        // movieIds(state) {
        //     return state.movies.map(m => m.imdbId)
        // }
    },
    // methods! 함수들
    // mutations는 변이를 의미함 state 즉 데이터를 변경시킬수 있음 
    // mutations 제외하고, 데이를 변경시킬 수 없게끔 해 놓는거임 actions에는 나머지 함수들 넣기
    mutations: {
        resetMovies(state) {
            state.movies = []
        }
    },
    // 비동기로 처리됨
    actions: {
        //searchMovies 안에 바로 state를 불러올수는 없음
        searchMovies(context, payload) {
        const { title, type, number, year } = payload //payload로 받아서 구조분해화한거
        const OMDB_API_kEY = "7035c60c"
        const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${OMDB_API_kEY}&s=${title}&type=${type}&y=${year}&page=1`)
        console.log(res);
        }
    }
}