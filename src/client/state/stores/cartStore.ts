import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { getProductById } from '../../api/products'

type CartItemType = {
  id: string
  quantity: number
  name: string
  price: number
  img_url: string
}

type CartState = {
  items: CartItemType[]
  isOpen: boolean
  setItems: (items: CartItemType[]) => void
  getCartQuantity: () => number
  getItemQuantity: (id: string) => number
  addItemToCart: (
    id: string,
    name: string,
    price: number,
    img_url: string
  ) => void
  removeItemFromCart: (id: string) => void
  increaseItemQuantity: (id: string) => void
  decreaseItemQuantity: (id: string) => void
  openCart: () => void
  closeCart: () => void
  getCartTotalPrice: () => number
  deleteAllItems: () => void
}

const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      items: [],
      isOpen: false,
      setItems(items) {
        set((state) => ({ ...state, items }))
      },
      getCartQuantity() {
        const items = get().items
        if (items.length > 0)
          return items.reduce((total, item) => item.quantity + total, 0)
        return 0
      },
      getItemQuantity(id) {
        const items = get().items
        const item = items.find((item) => item.id === id)
        if (item) return item.quantity
        else return 0
      },
      addItemToCart(id, name, price, img_url) {
        const items = get().items
        const newItem = {
          id,
          name,
          price,
          img_url,
          quantity: 1,
        }
        items.push(newItem)
        set((state) => ({ ...state, items }))
      },
      removeItemFromCart(id) {
        const items = get().items
        const idx = items.findIndex((item) => item.id === id)
        items.splice(idx, 1)
        set((state) => ({ ...state, items }))
      },
      increaseItemQuantity(id) {
        const items = get().items
        const item = items.find((item) => item.id === id)
        if (item) {
          item.quantity++
          set((state) => ({ ...state, items }))
        }
      },
      decreaseItemQuantity(id) {
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
      openCart() {
        set((state) => ({ ...state, isOpen: true }))
      },
      closeCart() {
        set((state) => ({ ...state, isOpen: false }))
      },
      getCartTotalPrice() {
        const items = get().items
        let total_price = 0
        items.forEach((item) => {
          const item_total = item.price * item.quantity
          total_price += item_total
        })
        return total_price
      },
      deleteAllItems() {
        set((state) => ({ ...state, items: [] }))
      },
    }),
    {
      name: 'eflea_cart_storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useCartStore
