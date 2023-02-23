import { useState } from 'react'
import { Combobox } from '@headlessui/react'

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

  return (
    <div className="searchbar-wrapper">
      <Combobox value={selected} onChange={setSelected}>
        <Combobox.Input
          onChange={(e) => {
            setQuery(e.target.value)
            if (query === '') setSelected('')
          }}
          placeholder="Search"
        />
        <Combobox.Button>Search</Combobox.Button>
        <Combobox.Options className="search-options-panel">
          {filteredProducts.map((item) => (
            <Combobox.Option
              key={item}
              value={item}
              className={({ active }) =>
                `search-option ${active && 'search-option-active'}`
              }
            >
              {item}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  )
}
