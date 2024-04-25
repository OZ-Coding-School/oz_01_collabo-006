import create from 'zustand'

const useStore = create((set) => ({
    selectedDog: null,
    setSelectedDog: (dog) => set({ selectedDog: dog }),
}))

export default useStore
