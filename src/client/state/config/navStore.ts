import { create } from 'zustand'

interface AuthState {
  isLoggedIn: boolean
  userID: string | null
  setIsLoggedIn: (value: boolean) => void
  setUserID: (id: string | null) => void
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  userID: null,
  setIsLoggedIn: (value: boolean) => set({ isLoggedIn: value }),
  setUserID: (id: string | null) => set({ userID: id }),
}))

export default useAuthStore
