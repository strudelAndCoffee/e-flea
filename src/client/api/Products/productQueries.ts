import axios from 'axios'

async function getAllProducts() {
  try {
    const res = await axios.get('http://localhost:3000/api/products', {
      withCredentials: true,
    })
    return res.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function getProductsByVendorId(vendor_id: string) {
  const query_url = `http://localhost:3000/api/products/vendor-products/${vendor_id}`
  try {
    const res = await axios.get(query_url, {
      withCredentials: true,
    })
    return res.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function getProductById(product_id: string) {
  const query_url = `http://localhost:3000/api/products/${product_id}`
  try {
    const res = await axios.get(query_url, {
      withCredentials: true,
    })
    return res.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export { getAllProducts, getProductsByVendorId, getProductById }
