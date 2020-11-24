export const state = () => ({
  products: [],
  transactions: [],
  cart: []
})

export const mutations = {
  set_products(state, products) {
    state.products = products
  },
  set_transactions(state, transactions) {
    state.transactions = transactions
  },
  add_product_to_cart(state, {product_id, product_name, quantity}) {
    const idx = state.cart.findIndex(c => c.product_id === product_id)
    if (idx !== -1) {
      state.cart[idx].quantity += quantity
    }
    else {
      state.cart.push({
        product_id,
        product_name,
        quantity
      })
    }
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