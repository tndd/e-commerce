export const state = () => ({
  cart: []
})

export const getters = {
  cart_items(state) {
    return state.cart.map(item => ({
      id: item.product.id,
      version: item.product.update_date,
      quantity: item.quantity
    }))
  }
}

export const mutations = {
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
  }
}
