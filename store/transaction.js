export const state = () => ({
  master: [],
  progress: {},
})

export const getters = {
  list(state) {
    return state.master.map(t => ({
      ...t,
      status: state.progress[t.id]
    }))
  }
}

export const mutations = {
  set_master(state, transactions) {
    state.master = transactions
  },
  set_progress(state, progresses) {
    let progress = {}
    progresses.forEach(p => {
      progress[p.transaction_id] = p.status
    })
    state.progress = {...progress}
  }
}

export const actions = {
  async load_progress({ commit }) {
    const endpoint = 'http://localhost:3000/api/transaction_progress'
    const { result } = await this.$http.$get(endpoint)
    commit('set_progress', result)
  },
  async load_master({ commit }) {
    const endpoint = 'http://localhost:3000/api/transaction'
    const { result } = await this.$http.$get(endpoint)
    commit('set_master', result)
  },
  async load({ dispatch }) {
    await dispatch('load_master')
    await dispatch('load_progress')
  }
}