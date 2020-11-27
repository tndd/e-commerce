export default async ({ store }) => {
  try {
    await Promise.all([
      store.dispatch('load_products'),
      store.dispatch('load_transactions'),
      store.dispatch('load_transaction_progress')
    ])
  }
  catch(e) {
    console.error(e)
  }
}