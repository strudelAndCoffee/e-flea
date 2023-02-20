import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
// import { fetchDog } from '../api/fetchDog'

export default function Test() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['dogs'],
    queryFn: () =>
      axios
        .get('https://random.dog/woof.json')
        .then((res) => {
          return res.data
        })
        .catch((err) => {
          throw err
        }),
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error! Data could not load...</p>
  return (
    <div>
      <h2>Test Component</h2>
      <img src={data.url} />
    </div>
  )
}
