<template>
  <div>
    <div>
      <h1>Products</h1>
      <table border="1">
        <tbody>
          <tr>
            <th>Update Date</th>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Inventory</th>
          </tr>
          <tr v-for="p in products" :key="p.data">
            <td>{{p.update_date}}</td>
            <td>{{p.id}}</td>
            <td>{{p.name}}</td>
            <td>{{p.price}}</td>
            <td>{{p.inventory}}</td>
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
      <h1>Update Product Inventory</h1>
      <input type="text" placeholder="product id" v-model="inventory_form.id">
      <input type="number" placeholder="inventory num" v-model="inventory_form.num">
      <button @click="post_inventory()">Update Inventory</button>
    </div>
    <div>
      <h1>Update Product</h1>
      <input type="text" placeholder="id" v-model="version_form.id">
      <input type="text" placeholder="name" v-model="version_form.name">
      <input type="number" placeholder="price" v-model="version_form.price">
      <textarea cols="30" rows="5" placeholder="description" v-model="version_form.description"></textarea>
      <button @click="post_version()">Update Product</button>
    </div>
    <div>
      <h1>Delete Product</h1>
      <input type="text" placeholder="Target removed product id" v-model="delete_id">
      <button @click="delete_product()">Delete</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      product_form: {
        name: null,
        price: null
      },
      inventory_form: {
        id: null,
        num: null
      },
      version_form: {
        id: null,
        name: null,
        price: null,
        description: null
      },
      delete_id: null
    }
  },
  computed: {
    ...mapGetters([
      'products'
    ])
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
    async post_inventory() {
      const endpoint = 'http://localhost:3000/api/product_inventory'
      const payload = {
        id: this.inventory_form.id,
        inventory: this.inventory_form.num
      }
      try {
        await this.$http.post(endpoint, payload)
        this.inventory_form.id = null
        this.inventory_form.num = null
        await this.$store.dispatch('load_products')
      }
      catch(e) {
        console.error(e)
        alert(`error in delete: ${endpoint}`)
      }
    },
    async post_version() {
      const target_prd = this.products.find(p => p.id === this.version_form.id)
      if (!target_prd) {
        alert('incorrect product id.')
        return
      }
      const payload = {
        id: this.version_form.id,
        name: (this.version_form.name ? this.version_form.name : target_prd.name),
        price: (this.version_form.price ? this.version_form.price : target_prd.price),
        description: (this.version_form.description ? this.version_form.description : target_prd.description),
      }
      const endpoint = 'http://localhost:3000/api/product_version'
      try {
        await this.$http.post(endpoint, payload)
        this.version_form.id = null
        this.version_form.name = null
        this.version_form.price = null
        this.version_form.description = null
        await this.$store.dispatch('load_products')
      }
      catch(e) {
        console.error(e)
        alert(`error in delete: ${endpoint}`)
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