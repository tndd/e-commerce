<template>
  <div>
    <div>
      <h1>Transactions</h1>
      <table border="1">
        <tbody>
          <tr>
            <th>Ordered Date</th>
            <th>ID</th>
            <th>Buyer ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
          </tr>
          <tr v-for="t in transactions" :key="t.id">
            <td>{{t.ordered_date}}</td>
            <td>{{t.id}}</td>
            <td>{{t.buyer_id}}</td>
            <td>{{t.product_id}}</td>
            <td>{{t.quantity}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h1>Regist Transactions</h1>
      choose the products you want to buy and add them to the cart.
      <div>
        <h2>Cart</h2>
        <table>
          <tbody>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
            </tr>
            <tr v-for="item in cart" :key="item.product.name">
              <td>{{item.product.name}}</td>
              <td>{{item.quantity}}</td>
              <button @click="remove_from_cart(item.product.id)">Remove</button>
            </tr>
          </tbody>
        </table>
        <button @click="buy_cart_items()">Buy</button>
      </div>
      <div>
        <h2>Products</h2>
        <v-select label="name" :options="products" v-model="selected_product"></v-select>
        <v-select :options="[1,2,3,4,5]" v-model="selected_num"></v-select>
        <button @click="add_to_cart()">Add to cart</button>
      </div>
    </div>
    <div>
      <h1>Delete Transactino</h1>
      <input type="text" placeholder="Target removed transaction id" v-model="delete_id">
      <button @click="delete_transaction()">Delete</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      selected_product: null,
      selected_num: null,
      delete_id: null
    }
  },
  computed: {
    ...mapState({
      transactions: state => state.transactions,
      products: state => state.products,
      cart: state => state.cart
    }),
    ...mapGetters([
      'cart_id_quantity'
    ])
  },
  methods: {
    add_to_cart() { 
      if (
        this.selected_product == null ||
        this.selected_num == null) 
      {
        alert('Empty forms exist.')
        return
      }
      this.$store.commit('add_product_to_cart', {
        product: this.selected_product,
        quantity: this.selected_num
      })
      this.selected_product = null
      this.selected_num = null
    },
    remove_from_cart(id) {
      this.$store.commit('remove_from_cart', id)
    },
    async buy_cart_items() {
      const payload = {
        products: this.cart_id_quantity,
        buyer_id: "99a3c36c-3453-4992-a025-9776699eb64c"
      }
      const endpoint ='http://localhost:3000/api/transaction'
      try {
        await this.$http.post(endpoint, payload)
        this.$store.commit('clear_cart_items')
        await this.$store.dispatch('load_transactions')
      }
      catch(e) {
        console.error(e)
        alert(`error in post: ${endpoint}`)
      }
    },
    async delete_transaction() {
      const endpoint = `http://localhost:3000/api/transaction/${this.delete_id}`
      try {
        await this.$http.delete(endpoint)
        this.delete_id = null
        await this.$store.dispatch('load_transactions')
      }
      catch(e) {
        console.error(e)
        alert(`error in delete: ${endpoint}`)
      }
    }
  }
}
</script>