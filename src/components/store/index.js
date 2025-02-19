import { createStore } from 'vuex'

export default createStore({
  state: {
    themeMode: 'light', // Default mode
  },
  mutations: {
    setThemeMode(state, mode) {
      state.themeMode = mode
    },
  },
  actions: {
    toggleThemeMode({ commit, state }) {
      const newMode = state.themeMode === 'light' ? 'dark' : 'light'
      commit('setThemeMode', newMode)
    },
  },
})
