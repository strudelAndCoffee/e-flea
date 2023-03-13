import axios from 'axios'

async function getAllProducts() {
  axios
    .get('http://localhost:3000/api/products')
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      throw err
    })
}

export { getAllProducts }
