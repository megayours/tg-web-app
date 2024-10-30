import { create } from 'zustand'

type View = 'home' | 'leaderboard' | 'profile'

interface NavigationState {
  currentView: View
  setView: (view: View) => void
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentView: 'home',
  setView: (view) => set({ currentView: view })
}))
