import { create } from 'zustand'
import { ProductType } from '../../../server/db/models/Product.js'

interface ProductState {
  products: ProductType[]
  setProducts: (products: ProductType[]) => void
}

const useProductStore = create<ProductState>((set) => ({
  products: [],
  setProducts: (products: ProductType[]) =>
    set((state) => ({ ...state, products })),
}))

export default useProductStore
