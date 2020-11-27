export const state = () => ({
  products: [],
  transactions: [],
  transaction_progress: {},
  cart: []
})

export const getters = {
  cart_id_quantity(state) {
    return state.cart.map(item => ({
      id: item.product.id,
      quantity: item.quantity
    }))
  },
  transactions_full(state) {
    return state.transactions.map(t => ({
      ...t,
      status: state.transaction_progress[t.id]
    }))
  }
}

export const mutations = {
  set_products(state, products) {
    state.products = products
  },
  set_transactions(state, transactions) {
    state.transactions = transactions
  },
  add_product_to_cart(state, {product, quantity}) {
    const idx = state.cart.findIndex(item => item.product_id === product.id)
    if (idx !== -1) {
      state.cart[idx].quantity += quantity
    }
    else {
      state.cart.push({
        product,
        quantity
      })
    }
  },
  remove_from_cart(state, id) {
    const idx = state.cart.findIndex(item => item.product.id === id)
    if (idx !== -1) {
      state.cart.splice(idx, 1)
    }
  },
  clear_cart_items(state) {
    state.cart = []
  },
  set_transaction_progress(state, progresses) {
    let id_pg = {}
    progresses.forEach(p => {
      id_pg[p.id] = p.status
    })
    state.transaction_progress = {...id_pg}
  }
}

export const actions = {
  async load_products({ commit }) {
    const endpoint = 'http://localhost:3000/api/product'
    const { result } = await this.$http.$get(endpoint)
    commit('set_products', result)
  },
  async load_transaction_progress({ commit }) {
    const ep_tran_progress = 'http://localhost:3000/api/transaction_progress'
    const { result } = await this.$http.$get(ep_tran_progress)
    commit('set_transaction_progress', result)
  },
  async load_transactions({ commit, dispatch }) {
    const endpoint = 'http://localhost:3000/api/transaction'
    const { result } = await this.$http.$get(endpoint)
    commit('set_transactions', result)
    await dispatch('load_transaction_progress')
  }
}