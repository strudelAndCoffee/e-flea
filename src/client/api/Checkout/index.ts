import axios from 'axios'

async function getCheckoutUrl(items: { id: string; quantity: number }[]) {
  const itemData = { items }
  try {
    const res = await axios.post(
      `http://localhost:3000/auth/checkout`,
      itemData,
      {
        withCredentials: true,
      }
    )
    return res.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export { getCheckoutUrl }
