import axios from 'axios'

async function getAllVendors() {
  try {
    const res = await axios.get('http://localhost:3000/api/vendors', {
      withCredentials: true,
    })
    return res.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export { getAllVendors }
