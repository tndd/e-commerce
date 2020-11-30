export default async ({ store }) => {
  try {
    await Promise.all([
      store.dispatch('product/load'),
      store.dispatch('load_transactions')
    ])
  }
  catch(e) {
    console.error(e)
  }
}