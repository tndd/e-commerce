export default async ({ store }) => {
  try {
    await Promise.all([
      store.dispatch('product/load'),
      store.dispatch('transaction/load'),
      store.dispatch('user/load')
    ])
  }
  catch(e) {
    console.error(e)
  }
}