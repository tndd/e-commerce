<template>
  <table border="1">
    <tbody>
      <tr>
        <th>Ordered Date</th>
        <th>ID</th>
        <th>Buyer ID</th>
        <th>Product ID</th>
        <th>Product Version</th>
        <th>Quantity</th>
        <th>Status</th>
      </tr>
      <tr v-for="t in transactions" :key="t.id">
        <td>{{t.ordered_date}}</td>
        <td>{{t.id}}</td>
        <td>{{t.buyer_id}}</td>
        <td>{{t.product_id}}</td>
        <td>{{t.product_version}}</td>
        <td>{{t.quantity}}</td>
        <td>{{t.status}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['transactions'],
  data() {
    return {}
  }
}
</script>