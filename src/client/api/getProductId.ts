import axios from 'axios'

export default function getProductId() {
  return axios
    .get('/api/products/1')
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}
