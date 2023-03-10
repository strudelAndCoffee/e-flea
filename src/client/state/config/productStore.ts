import { create } from 'zustand'
import { ProductType } from '../../../server/db/models/Product.js'
import { products } from '../../test-data/products.json'

interface ProductState {
  products: ProductType[]
  setProducts: (products: ProductType[]) => void
}

const useProductStore = create<ProductState>((set) => ({
  products: [],
  setProducts: (products: ProductType[]) =>
    set((state) => ({ ...state, products })),
}))

// useProductStore.setState((state) => state.products = products)

export default useProductStore
