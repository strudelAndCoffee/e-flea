import { create } from 'zustand'

interface BearState {
  bears: number
  increasePopulation: (by: number) => void
}

export const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))

// function BearCounter() {
//   const bears = useBearStore((state) => state.bears)
//   return <h1>{bears} around here ...</h1>
// }

// function Controls() {
//   const increasePopulation = useBearStore((state) => state.increasePopulation)
//   return <button onClick={increasePopulation}>one up</button>
// }
