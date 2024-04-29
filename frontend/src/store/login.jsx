import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useLoginStore = create(
    persist(
        (set, get) => ({
            isLogined: false,
            setIsLogined: (value) => set({ isLogined: value }),
        }),
        {
            name: 'login_state',
        }
    )
)

export default useLoginStore
