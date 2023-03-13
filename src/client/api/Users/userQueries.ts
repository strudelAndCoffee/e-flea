import axios from 'axios'

async function getAllUsers() {
  axios
    .get('http://localhost:3000/api/users')
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      throw err
    })
}

export { getAllUsers }
