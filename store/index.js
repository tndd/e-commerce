export const state = () => ({
  products: []
})

export const mutations = {
  set_products(state, products) {
    state.products = products
  }
}

export const actions = {
  async load_products({ commit }) {
    const endpoint = 'http://localhost:3000/api/product'
    const { result } = await this.$http.$get(endpoint)
    commit('set_products', result)
  }
}