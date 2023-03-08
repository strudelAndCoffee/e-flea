import { create } from 'zustand'
import { ProductType } from '../../components/Product'
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

useProductStore.setState((state) => ({ ...state, products }))

export default useProductStore
