<template>
  <div>
    <div>
      <h1>Products</h1>
      <table border="1">
        <tbody>
          <tr>
            <th>Registrated Date</th>
            <th>ID</th>
            <th>Original ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
          <tr v-for="p in products" :key="p.data">
            <td>{{p.registrated_date}}</td>
            <td>{{p.id}}</td>
            <td>{{p.original_id}}</td>
            <td>{{p.name}}</td>
            <td>{{p.price}}</td>
            <td>{{p.description}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h1>Add Product Form</h1>
      <table>
        <tbody>
          <tr>
            <td><label for="product_name">Name</label></td>
            <td><input type="text" id="product_name" v-model="product_form.name"></td>
          </tr>
          <tr>
            <td><label for="product_price">Price</label></td>
            <td><input type="text" id="product_price" v-model="product_form.price"></td>
          </tr>
        </tbody>
      </table>
      <button @click="post_product()">Regist Product</button>
    </div>
    <div>
      <h1>Delete Product</h1>
      <input type="text" placeholder="Target removed product id" v-model="delete_id">
      <button @click="delete_product()">Delete</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      product_form: {
        name: null,
        price: null
      },
      delete_id: null
    }
  },
  computed: {
    ...mapState({
      products: state => state.products
    })
  },
  methods: {
    async post_product() {
      const payload = {
        name: this.product_form.name,
        price: this.product_form.price
      }
      try {
        await this.$http.post('http://localhost:3000/api/product', payload)
        this.product_form.name = null
        this.product_form.price = null
        await this.$store.dispatch('load_products')
      }
      catch(e) {
        console.error(e)
        alert('error in post: http://localhost:3000/api/product')
      }
    },
    async delete_product() {
      const endpoint = `http://localhost:3000/api/product/${this.delete_id}`
      try {
        await this.$http.delete(endpoint)
        this.delete_id = null
        await this.$store.dispatch('load_products')
      }
      catch(e) {
        console.error(e)
        alert(`error in delete: ${endpoint}`)
      }
    }
  }
}
</script>