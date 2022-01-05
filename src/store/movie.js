import axios from "axios"
import _uniqBy from 'lodash/unionBy'
import _default from "vuex"

const _defaultMessage ='Search for the movie title!'

export default {
    //namespaced를 true로 해야 module화 가능
    namespaced: true,
    // 취급하는 각각의 date, 함수로 만들어야하는데 왜 그러냐면 객체데이터는 배열데이터와 동일하게
    // 하나의 참조형데이터고, 데이터의 불변성을 유지할려면 함수로 만들어서 반환해줘야 그떄 그떄 state에서
    // 사용하는 데이터가 고유해질수 잇음  
    state: () => ({
        movies: [],
        message: _defaultMessage,
        loading: false,
        theMovie: []
    }),
    // 계산된 date, vue에서의 computed!       
    //ex 예시임 이 프로젝트에서 getters는 따로 안 쓴데
    // movieIds(state) {
    //     return state.movies.map(m => m.imdbId)
    // }
    getters: {},
    // methods! 함수들
    // mutations는 변이를 의미함 state 즉 데이터를 변경시킬수 있음 
    // mutations 제외하고, 데이를 변경시킬 수 없게끔 해 놓는거임 actions에는 나머지 함수들 넣기
    mutations: {
        updateState(state, payload) {
            // Object.keys는 객체 데이터의 속성의 이름만 가지고 새로운 배열데이터를 만듬
            // ['movies','message','loading']
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
            })
        },
        resetMovies(state) {
            state.movies = []
            state.message = _defaultMessage
            state.loading = false
        }
    },
    // 비동기로 처리됨
    actions: {
        //searchMovies 안에 바로 state를 불러올수는 없음
        async searchMovies({ state, commit }, payload) {
            if (state.loading) {
                return
            }
            commit('updateState', {
                message: '',
                loading: true
            })
            try {
                const res = await _fetchMovie({
                ...payload,
                page: 1
        })
        const { Search, totalResults } = res.data
        commit('updateState', {
            movies: _uniqBy(Search, 'imdbID')
        })    
        console.log(totalResults) 
        console.log(typeof totalResults)

        const total = parseInt(totalResults, 10)
        //ceil은 올림처리 해주는 메소드
        const pageLength = Math.ceil(total / 10)

            // 추가 요청 있는지 확인
            if (pageLength > 1) {
                for (let page = 2; page <= pageLength; page += 1){
                    if (page > (payload.number / 10)) break
                    const res = await _fetchMovie({
                        ...payload,
                        page
                    })
                    const { Search } = res.data
                    commit('updateState', {
                        movies: [
                            ...state.movies,
                            ..._uniqBy(Search, 'imdbID')
                        ] //전개연산자
                    })
                }
            }
            } catch ({ message }) {
                commit('updateState', {
                    movies: [],
                    message
                })
            } finally {
                commit('updateState', {
                    loading: false
                })
            }
            
        },
        async searchMovieWithId({ state, commit }, payload) {
             if (state.loading) return
            commit('updateState', {
                theMovie: {},
                loading: true
            })
            // 단일영화정보 
            try {
                const res = await _fetchMovie(payload)
                console.log(res.data)
                commit('updateState', {
                    theMovie: res.data
                })
            } catch (error) {
                commit('updateState', {
                    theMovie: {}
                })              
            } finally {
                commit('updateState', {
                    loading: false
                })
            }
        }
    }
}

// _ 언더바 붙힌 이유는 이 movie.js에서만 사용하는 함수라는 거를 의미함
async function _fetchMovie(payload) {
  return await axios.post('/.netlify/functions/movie', payload)
}
