import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeLanguage } from '@/i18n';
import type { User } from '@/types';

export type ThemeMode = 'system' | 'light' | 'dark';
export type Language = 'vi' | 'en';

export interface AppStoreState {
  // Theme & Appearance
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;

  // Localization & Language
  language: Language;
  setLanguage: (lang: Language) => void;

  // Authentication & User Session
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;

  // Global Metrics / Counter
  counter: number;
  increment: () => void;
  reset: () => void;
}

export const useAppStore = create<AppStoreState>()(
  persist(
    (set, get) => ({
      themeMode: 'system',
      setThemeMode: (mode: ThemeMode) => set({ themeMode: mode }),
      toggleTheme: () => {
        const current = get().themeMode;
        const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
        set({ themeMode: next });
      },

      language: 'vi',
      setLanguage: (lang: Language) => {
        changeLanguage(lang);
        set({ language: lang });
      },

      user: null,
      setUser: (user: User | null) => set({ user }),
      logout: () => set({ user: null }),

      counter: 0,
      increment: () => set((state) => ({ counter: state.counter + 1 })),
      reset: () => set({ counter: 0 }),
    }),
    {
      name: '@app/unified_store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        themeMode: state.themeMode,
        language: state.language,
        user: state.user,
        counter: state.counter,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.language) {
          changeLanguage(state.language);
        }
      },
    }
  )
);