import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type CartState = {
  items: { id: string; quantity: number }[]
  isOpen: boolean
  setItems: (item: { id: string; quantity: number }[]) => void
  getCartQuantity: () => number
  getItemQuantity: (id: string) => number
  removeItemFromCart: (id: string) => void
  increaseItemQuantity: (id: string) => void
  decreaseItemQuantity: (id: string) => void
  deleteEverything: () => void
  openCart: () => void
  closeCart: () => void
}

const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      items: [],
      isOpen: false,
      setItems: (item) => set((state) => ({ ...state, item })),
      getCartQuantity: () => {
        const items = get().items
        if (items.length > 0)
          return items.reduce((total, item) => item.quantity + total, 0)
        return 0
      },
      getItemQuantity: (id) => {
        const items = get().items
        const item = items.find((item) => item.id === id)
        if (item) return item.quantity
        else return 0
      },
      removeItemFromCart: (id) => {
        const items = get().items
        const idx = items.findIndex((item) => item.id === id)
        items.splice(idx, 1)
        set((state) => ({ ...state, items }))
      },
      increaseItemQuantity: (id) => {
        const items = get().items
        const item = items.find((item) => item.id === id)
        if (item) {
          item.quantity++
        } else {
          const newItem = {
            id,
            quantity: 1,
          }
          items.push(newItem)
        }
        set((state) => ({ ...state, items }))
      },
      decreaseItemQuantity: (id) => {
        const items = get().items
        const item = items.find((item) => item.id === id)

        if (item && item.quantity > 0) {
          item.quantity--
          set((state) => ({ ...state, items }))

          if (item.quantity === 0) {
            const idx = items.findIndex((item) => item.id === id)
            items.splice(idx, 1)
            set((state) => ({ ...state, items }))
          }
        }
      },
      deleteEverything: () => set({}, true),
      openCart: () => set((state) => ({ ...state, isOpen: true })),
      closeCart: () => set((state) => ({ ...state, isOpen: false })),
    }),
    {
      name: 'eflea_cart_storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useCartStore
