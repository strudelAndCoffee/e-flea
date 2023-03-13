import axios from 'axios'

async function getAllVendors() {
  axios
    .get('http://localhost:3000/api/products')
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      throw err
    })
}

export { getAllVendors }
