import { useState } from 'react'

const products = [
  'product 1',
  'product 2',
  'product 3',
  'product 4',
  'product 5',
]

export default function Searchbar() {
  const [selected, setSelected] = useState('')
  const [query, setQuery] = useState('')

  const filteredProducts =
    query === ''
      ? products
      : products.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase())
        })

  return <div className="searchbar-wrapper"></div>
}
