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
      </div>
      <div>
        <h2>Products</h2>
          <table border="1">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th></th>
              </tr>
              <tr v-for="p in products" :key="p.name">
                <td>{{p.name}}</td>
                <td>{{p.price}}</td>
                <button>Pick</button>
              </tr>
            </tbody>
          </table>
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