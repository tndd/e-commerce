export const state = () => ({
  master: [],
  inventory: {},
  version: {}
})

export const getters = {
  list(state) {
    return state.master.map(p => ({
      id: p.id,
      update_date: (p.id in state.version ? state.version[p.id].update_date : null),
      name: (p.id in state.version ? state.version[p.id].name : null),
      price: (p.id in state.version ? state.version[p.id].price : null),
      description: (p.id in state.version ? state.version[p.id].description : null),
      inventory: (p.id in state.inventory ? state.inventory[p.id].num : null),
      inventory_timestamp: (p.id in state.inventory ? state.inventory[p.id].update_date : null)
    }))
  }
}

export const mutations = {
  set_master(state, products) {
    state.master = products
  },
  set_inventories(state, inventories) {
    let inventory = {}
    inventories.forEach(i => {
      inventory[i.product_id] = {
        update_date: i.update_date,
        num: i.inventory
      }
    })
    state.inventory = {...inventory}
  },
  set_versions(state, versions) {
    let version = {}
    versions.forEach(v => {
      version[v.product_id] = {
        update_date: v.update_date,
        name: v.name,
        price: v.price,
        description: v.description
      }
    })
    state.version = version
  }
}

export const actions = {
  async load_master({ commit }) {
    const endpoint = 'http://localhost:3000/api/product'
    const { result } = await this.$http.$get(endpoint)
    commit('set_master', result)
  },
  async load_inventories({ commit }) {
    const endpoint = 'http://localhost:3000/api/product_inventory'
    const { result } = await this.$http.$get(endpoint)
    commit('set_inventories', result)
  },
  async load_versions({ commit }) {
    const endpoint = 'http://localhost:3000/api/product_version'
    const { result } = await this.$http.$get(endpoint)
    commit('set_versions', result)
  },
  async load({ dispatch }) {
    await dispatch('load_master')
    await dispatch('load_inventories')
    await dispatch('load_versions')
  }
}