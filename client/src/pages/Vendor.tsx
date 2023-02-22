interface VendorProps {
  id: number
}

export default function Vendor({ id }: VendorProps) {
  return (
    <section className="app-page">
      <h1>Vendor {id}</h1>
    </section>
  )
}
