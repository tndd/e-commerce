<template>
  <div>{{this.$store.state.transactions}}</div>
</template>

<script>
export default {
  async asyncData({ store }) {
    await store.dispatch('load_transactions')
  }
}
</script>