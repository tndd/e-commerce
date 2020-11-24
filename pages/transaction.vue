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
          <tr v-for="t in transactions" :key="t.ordered_date">
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
        No contents
      </div>
      <div>
        <h2>Products</h2>
        <v-select label="name" :options="products"></v-select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      transactions: state => state.transactions,
      products: state => state.products
    })
  }
}
</script>