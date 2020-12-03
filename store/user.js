export const state = () => ({
  master: [],
  version: {},
})

export const getters = {
  list(state) {
    return state.master.map(m => ({
      id: m.id,
      update_date: (m.id in state.version ? state.version[m.id].update_date : null),
      name: (m.id in state.version ? state.version[m.id].name : null),
      address: (m.id in state.version ? state.version[m.id].address : null),
      zip_code: (m.id in state.version ? state.version[m.id].zip_code : null),
      phone_number: (m.id in state.version ? state.version[m.id].phone_number : null),
      email: (m.id in state.version ? state.version[m.id].email : null),
      password: (m.id in state.version ? state.version[m.id].password : null)
    }))
  }
}

export const mutations = {
  set_master(state, products) {
    state.master = products
  },
  set_versions(state, versions) {
    let version = {}
    versions.forEach(v => {
      version[v.user_id] = {
        update_date: v.update_date,
        name: v.name,
        address: v.address,
        zip_code: v.zip_code,
        phone_number: v.phone_number,
        email: v.email,
        password: v.password
      }
    })
    state.version = version
  }
}

export const actions = {
  async load_master({ commit }) {
    const endpoint = 'http://localhost:3000/api/user'
    const { result } = await this.$http.$get(endpoint)
    commit('set_master', result)
  },
  async load_versions({ commit }) {
    const endpoint = 'http://localhost:3000/api/user_version'
    const { result } = await this.$http.$get(endpoint)
    commit('set_versions', result)
  },
  async load({ dispatch }) {
    await dispatch('load_master')
    await dispatch('load_versions')
  }
}