import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import axios from 'axios'
import { ProductType } from '../../../server/db/models/Product.js'

interface ProductState {
  products: ProductType[]
  setProducts: (products: ProductType[]) => void
  fetchProducts: () => void
}

const useProductStore = create(
  persist<ProductState>(
    (set) => ({
      products: [],
      setProducts(products: ProductType[]) {
        set((state) => ({ ...state, products }))
      },
      async fetchProducts() {
        const res = await axios.get('http://localhost:3000/api/products', {
          withCredentials: true,
        })

        if (res.data.products)
          set((state) => ({ ...state, products: res.data.products }))
      },
    }),
    {
      name: 'eflea_product_storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useProductStore
