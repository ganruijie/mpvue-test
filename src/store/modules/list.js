import {getBoardData} from '../../utils/api'
import {LIST_MOVIE_LIST, LIST_CLEAR_STATE} from '../mutations-type'

const state = {
    page: 1,
    hasMore: true,
    movies: [],
    type: ''
  }
  
  const mutations = {
    [LIST_CLEAR_STATE] (state) {
      state.page = 1
      state.hasMore = true
      state.movies = []
    },
  
    [LIST_MOVIE_LIST] (state, { data, type }) {
      state.type = type
      if (data.subjects.length) {
        state.movies.push.apply(state.movies, data.subjects)
  
        if (type === 'us_box') {
          state.hasMore = false
        }
      } else {
        state.hasMore = false
      }
    }
  }
  
  const actions = {
    async getMovies ({ state, commit }, { type, search }) {
      console.log(state.hasMore,'8888888888888888888888')
      if (state.hasMore){
        console.log('7777777777777')
        let data = await getBoardData({ board: type, page: state.page++, search:search })
        console.log(data,'8989898989')
        commit(LIST_MOVIE_LIST, {data, type})
      }
    }
  }
  
  export default {
    state,
    mutations,
    actions
  }