<template>
  <div>
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
</template>

<script>
export default {
  props: ['products'],
  data() {
    return {}
  }
}
</script>