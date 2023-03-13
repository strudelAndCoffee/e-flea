import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ProductType } from '../../../server/db/models/Product.js'

type CartState = {
  items: { id: string; quantity: number }[]
  setItems: (item: { id: string; quantity: number }[]) => void
  addItemToCart: (id: string) => void
  removeItemFromCart: (id: string) => void
  increaseItemQuantity: (id: string) => void
  decreaseItemQuantity: (id: string) => void
  deleteEverything: () => void
}

const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      items: [],
      setItems: (item) => set((state) => ({ ...state, item })),
      addItemToCart: (id) => {
        const newItem = {
          id,
          quantity: 1,
        }
        const items = get().items
        items.push(newItem)
        set({ items })
      },
      removeItemFromCart: (id) => {
        const items = get().items
        const idx = items.findIndex((item) => item.id === id)
        items.splice(idx, 1)
        set({ items })
      },
      increaseItemQuantity: (id) => {
        const items = get().items
        const item = items.find((item) => item.id === id)
        if (item) item.quantity++
        set({ items })
      },
      decreaseItemQuantity: (id) => {
        const items = get().items
        const item = items.find((item) => item.id === id)
        if (item && item.quantity > 0) item.quantity--
        set({ items })
      },
      deleteEverything: () => set({}, true),
    }),
    {
      name: 'eflea_cart_storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useCartStore
