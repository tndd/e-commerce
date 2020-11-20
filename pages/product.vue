<template>
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
</template>

<script>
export default {
  async asyncData({ params, $http }) {
    const { result } = await $http.$get(`http://localhost:3000/api/product`)
    return { products: result }
  }
}
</script>