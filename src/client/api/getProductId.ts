import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

async function getProductId() {
  const response = await axios.get('/api/products/1')
  return response
}

export default function queryApi() {
  const productQuery = useQuery({
    queryKey: ['products'],
    queryFn: () => getProductId(),
  })
  return productQuery
}
