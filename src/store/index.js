import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    genrePage: 2
  },
  mutations: {
    increment(state) {
      state.genrePage++
    },
    reset(state) {
      state.genrePage = 2
    }
  }
})
