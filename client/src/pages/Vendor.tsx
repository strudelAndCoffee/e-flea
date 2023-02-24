import { useParams } from 'react-router-dom'
import { NotFound } from './'

export default function Vendor() {
  const { id } = useParams()
  if (id == null || id === undefined) return <NotFound />
  return (
    <section className="app-page">
      <h1>Vendor {id}</h1>
    </section>
  )
}
