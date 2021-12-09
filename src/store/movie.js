export default {
    //namespaced를 true로 해야 module화 가능
    namespaced: true,
    // 취급하는 각각의 date
    state: () => ({
        movie:[]
    }),
    // 계산된 date, vue에서의 computed!
    getters: {
        movieIds() {
            return movies.map(m => m.imdbId)
        }
    },
    // methods! 함수들
    mutationds: '',
    actions:''
}