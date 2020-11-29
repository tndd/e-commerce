export const state = () => ({
  product_master: [],
  product_inventory: {},
  product_version: {},
  transactions: [],
  transaction_progress: {},
  cart: []
})

export const getters = {
  products(state) {
    return state.product_master.map(p => ({
      id: p.id,
      update_date: state.product_version[p.id].update_date,
      name: state.product_version[p.id].name,
      price: state.product_version[p.id].price,
      description: state.product_version[p.id].description,
      inventory: state.product_inventory[p.id].num,
      inventory_timestamp: state.product_inventory[p.id].update_date
    }))
  },
  cart_items(state) {
    return state.cart.map(item => ({
      id: item.product.id,
      version: item.product.version,
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
  set_product_master(state, products) {
    state.product_master = products
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
      id_pg[p.transaction_id] = p.status
    })
    state.transaction_progress = {...id_pg}
  },
  set_product_inventory(state, inventories) {
    let product_inventory = {}
    inventories.forEach(i => {
      product_inventory[i.product_id] = {
        update_date: i.update_date,
        num: i.inventory
      }
    })
    state.product_inventory = {...product_inventory}
  },
  set_product_version(state, versions) {
    let product_version = {}
    versions.forEach(v => {
      product_version[v.product_id] = {
        update_date: v.update_date,
        name: v.name,
        price: v.price,
        description: v.description
      }
    })
    state.product_version = product_version
  }
}

export const actions = {
  async load_product_inventory({ commit }) {
    const endpoint = 'http://localhost:3000/api/product_inventory'
    const { result } = await this.$http.$get(endpoint)
    commit('set_product_inventory', result)
  },
  async load_product_version({ commit }) {
    const endpoint = 'http://localhost:3000/api/product_version'
    const { result } = await this.$http.$get(endpoint)
    commit('set_product_version', result)
  },
  async load_products({ commit, dispatch }) {
    const endpoint = 'http://localhost:3000/api/product'
    const { result } = await this.$http.$get(endpoint)
    commit('set_product_master', result)
    await dispatch('load_product_inventory')
    await dispatch('load_product_version')
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