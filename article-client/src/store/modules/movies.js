import axios from 'axios'
import _ from 'lodash'
import api from '@/api/index.js'

export default {
  state: {
    movies: [],
  },
  getters: {
  },
  mutations: {
    CLEAR_MOVIES(state) {
      state.movies = []
    },
    FETCH_MOVIES(state, movies) {
      state.movies.push(movies)
    }
  },
  actions: {
    clearMovies({commit}) {
      commit('CLEAR_MOVIES')
    },
    fetchMovies({ commit }) {
      const genres = [12, 14, 16, 18, 27, 28, 35, 36, 37, 53, 80, 99, 878, 9648, 10402, 10749, 10751, 10752, 10770]
      const randomGenres = _.sampleSize(genres, 3)
      randomGenres.forEach((genre) => {
        axios({
          method: 'get',
          url: api.movies.movies(),
          params: {
            genre_id: genre
          }
        })
          .then((res) => {
            const movies = {
              genre: genre,
              data: res.data
            }
            commit('FETCH_MOVIES', movies)
          })
          .catch((err) => {
            console.log(err.res)
          })
      })
    },
  },
}