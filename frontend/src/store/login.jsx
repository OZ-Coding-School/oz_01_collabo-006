import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
    persist(
        (set, get) => ({
            isLogined: false,
            setIsLogined: (value) => set({ isLogined: value }),
        }),
        {
            name: 'login state',
        }
    )
)

export default useLoginStore

// https://velog.io/@hyunn/Zustand-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%83%81%ED%83%9C-%EC%A0%84%EC%97%AD%EA%B4%80%EB%A6%AC
