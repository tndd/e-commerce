export default async ({ store }) => {
  try {
    await Promise.all([
      store.dispatch('load_products'),
      store.dispatch('load_transactions')
    ])
  }
  catch(e) {
    console.error(e)
  }
}