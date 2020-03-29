import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      username: window.localStorage.getItem('user') === "undefined" ||window.localStorage.getItem('user') == null? '' : JSON.parse(window.localStorage.getItem('user')).username
    },
    userId: {
      id: window.localStorage.getItem('userId') === "undefined" ||  window.localStorage.getItem('userId') ==  null? '' : JSON.parse(window.localStorage.getItem('userId')).id
    },
    batch: {
      id: window.localStorage.getItem('batch') === "undefined" ||  window.localStorage.getItem('batch') ==  null?1 : window.localStorage.getItem('batch')
    },
    rounds: {
      id: window.localStorage.getItem('rounds') === "undefined" ||  window.localStorage.getItem('rounds') ==  null? 1 : window.localStorage.getItem('rounds')
    }
  },

  mutations: {
    login(state, user) {
      state.user = user

      if (user != null) {
        window.localStorage.setItem('user', JSON.stringify(user))
      }

    },
    save(state, userId) {
      state.userId = userId
      window.localStorage.setItem('userId', JSON.stringify(userId))
    }
  }
});
