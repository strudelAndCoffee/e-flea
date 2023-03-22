import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type UserDataType = {
  username: string
  email: string
  first_name: string
  last_name: string
  dob: {
    day: number
    month: number
    year: number
  }
  vendor_account: boolean
}
interface AuthState {
  isLoggedIn: boolean
  userData: UserDataType | null
  userID: string | null
  isVendorAccount: boolean
  setIsLoggedIn: (value: boolean) => void
  setUserData: (userData: UserDataType) => void
  setUserID: (id: string | null) => void
  setIsVendorAccount: (value: boolean) => void
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isLoggedIn: false,
      userData: null,
      userID: null,
      isVendorAccount: false,
      setIsLoggedIn(value) {
        set((state) => ({ ...state, isLoggedIn: value }))
      },
      setUserData(userData) {
        set((state) => ({ ...state, userData }))
      },
      setUserID(id) {
        set((state) => ({ ...state, userID: id }))
      },
      setIsVendorAccount(value) {
        set((state) => ({ ...state, isVendorAccount: value }))
      },
    }),
    {
      name: 'eflea_auth_storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useAuthStore
