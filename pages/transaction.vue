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
            <tr v-for="item in cart" :key="item.product_name">
              <td>{{item.product_name}}</td>
              <td>{{item.quantity}}</td>
              <button @click="remove_from_cart(item.product_id)">Remove</button>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h2>Products</h2>
        <v-select label="name" :options="products" v-model="selected_product"></v-select>
        <v-select :options="[1,2,3,4,5]" v-model="selected_num"></v-select>
        <button @click="add_to_cart()">Add to cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      selected_product: null,
      selected_num: null
    }
  },
  computed: {
    ...mapState({
      transactions: state => state.transactions,
      products: state => state.products,
      cart: state => state.cart
    })
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
        product_id: this.selected_product.id,
        product_name: this.selected_product.name,
        quantity: this.selected_num
      })
      this.selected_product = null
      this.selected_num = null
    },
    remove_from_cart(id) {
      this.$store.commit('remove_from_cart', id)
    }
  }
}
</script>