import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthState {
  isLoggedIn: boolean
  userID: string | null
  setIsLoggedIn: (value: boolean) => void
  setUserID: (id: string | null) => void
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isLoggedIn: false,
      userID: null,
      setIsLoggedIn: (value: boolean) => set({ isLoggedIn: value }),
      setUserID: (id: string | null) => set({ userID: id }),
    }),
    {
      name: 'eflea_auth_storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export default useAuthStore
