import axios from 'axios'

async function getAllUsers() {
  try {
    const res = await axios.get('http://localhost:3000/api/users', {
      withCredentials: true,
    })
    return res.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export { getAllUsers }
