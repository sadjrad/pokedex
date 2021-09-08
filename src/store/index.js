import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stats:{},
    types:{},
    pokemonName: {},
    abilities:{},
    image : "",
    evolution:[{}],
  },
  getters:{
    pName : state => {
      return state.pokemonName;      
    }

  },

  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
