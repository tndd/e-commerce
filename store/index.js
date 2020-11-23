export const state = () => ({
  products: [],
  transactions: []
})

export const mutations = {
  set_products(state, products) {
    state.products = products
  },
  set_transactions(state, transactions) {
    state.transactions = transactions
  }
}

export const actions = {
  async load_products({ commit }) {
    const endpoint = 'http://localhost:3000/api/product'
    const { result } = await this.$http.$get(endpoint)
    commit('set_products', result)
  },
  async load_transactions({ commit }) {
    const endpoint = 'http://localhost:3000/api/transaction'
    const { result } = await this.$http.$get(endpoint)
    commit('set_transactions', result)
  }
}