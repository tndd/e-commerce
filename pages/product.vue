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
            <th>Registrant User ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
          <tr v-for="p in products" :key="p.data">
            <td>{{p.registrated_date}}</td>
            <td>{{p.id}}</td>
            <td>{{p.original_id}}</td>
            <td>{{p.registrant_user_id}}</td>
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
  </div>
</template>

<script>
export default {
  async asyncData({ store }) {
    await store.dispatch('load_products')
  },
  data() {
    return {
      product_form: {
        name: null,
        price: null
      }
    }
  },
  computed: {
    products() {
      return this.$store.state.products
    }
  },
  methods: {
    async post_product() {
      const payload = {
        name: this.product_form.name,
        price: this.product_form.price,
        registrant_user_id: 'cc7cf5d4-593e-4815-a894-1748a1ca6b85'
      }
      try {
        await this.$http.post('http://localhost:3000/api/product', payload)
        this.product_form.name = null
        this.product_form.price = null
        // reload products
        const { result } = await $http.$get('http://localhost:3000/api/product')
        this.products = result
      }
      catch(e) {
        console.error(e)
        alert('error in post: http://localhost:3000/api/product')
      }
    }
  }
}
</script>