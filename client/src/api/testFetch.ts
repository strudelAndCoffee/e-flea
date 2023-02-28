import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function getRandomDogPic(): string | null {
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

  if (isLoading) return 'Loading...'
  if (isError || !data.url) return null
  return data.url
}
