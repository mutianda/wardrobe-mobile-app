import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserState = {
  token: string | null
  username: string
  isLogin: boolean
  login: (username: string, token: string) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      token: null,
      username: '',
      isLogin: false,
      login: (username, token) => set({ token, username, isLogin: true }),
      logout: () => set({ token: null, username: '', isLogin: false }),
    }),
    {
      name: 'wardrobe-user',
    }
  )
)
