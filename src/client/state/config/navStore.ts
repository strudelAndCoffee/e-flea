import { create } from 'zustand'

interface NavState {
  fromRedirect: boolean
  setFromRedirect: (value: boolean) => void
}

const useNavStore = create<NavState>((set) => ({
  fromRedirect: false,
  setFromRedirect: (value: boolean) => set({ fromRedirect: value }),
}))

export default useNavStore
