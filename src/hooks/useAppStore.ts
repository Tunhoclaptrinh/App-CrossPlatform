import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeLanguage } from '@/i18n';
import type { User } from '@/types';
import type { AccentColor } from '@/constants/colors';
import type { RadiusPreset, ControlSizeKey } from '@/constants/theme';
import type {
  ControlContrast,
  ControlShadow,
  ControlVariant,
} from '@/components/common/surfaceUtils';

export type ThemeMode = 'system' | 'light' | 'dark';
export type ThemeStyle = 'default' | 'apple-glass';
export type HeaderVariant = 'standard' | 'frosted-capsule' | 'floating-pill';
export type Language = 'vi' | 'en';
export type FontScale = 'small' | 'standard' | 'large';

export interface AppStoreState {
  // Theme & Appearance
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  themeStyle: ThemeStyle;
  setThemeStyle: (style: ThemeStyle) => void;
  toggleThemeStyle: () => void;
  headerVariant: HeaderVariant;
  setHeaderVariant: (variant: HeaderVariant) => void;
  toggleHeaderVariant: () => void;

  // Surface & Contrast Engine Controls
  globalContrast: ControlContrast;
  setGlobalContrast: (contrast: ControlContrast) => void;
  globalShadow: ControlShadow;
  setGlobalShadow: (shadow: ControlShadow) => void;
  globalControlVariant: ControlVariant;
  setGlobalControlVariant: (variant: ControlVariant) => void;

  // Dynamic UI Customizations
  accentColor: AccentColor;
  setAccentColor: (accent: AccentColor) => void;
  radiusPreset: RadiusPreset;
  setRadiusPreset: (preset: RadiusPreset) => void;
  globalControlSize: ControlSizeKey;
  setGlobalControlSize: (size: ControlSizeKey) => void;
  fontScale: FontScale;
  setFontScale: (scale: FontScale) => void;
  reduceMotion: boolean;
  setReduceMotion: (enabled: boolean) => void;
  hapticsEnabled: boolean;
  setHapticsEnabled: (enabled: boolean) => void;
  resetThemeSettings: () => void;

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
  decrement: () => void;
  reset: () => void;
}

export const useAppStore = create<AppStoreState>()(
  persist(
    (set, get) => ({
      themeMode: 'light',
      setThemeMode: (mode: ThemeMode) => set({ themeMode: mode }),
      toggleTheme: () => {
        const current = get().themeMode;
        const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
        set({ themeMode: next });
      },

      themeStyle: 'apple-glass',
      setThemeStyle: (style: ThemeStyle) => set({ themeStyle: style }),
      toggleThemeStyle: () => {
        const current = get().themeStyle;
        set({ themeStyle: current === 'apple-glass' ? 'default' : 'apple-glass' });
      },

      headerVariant: 'standard',
      setHeaderVariant: (variant: HeaderVariant) => set({ headerVariant: variant }),
      toggleHeaderVariant: () => {
        const current = get().headerVariant;
        set({ headerVariant: current === 'standard' ? 'frosted-capsule' : 'standard' });
      },

      globalContrast: 'normal',
      setGlobalContrast: (contrast: ControlContrast) => set({ globalContrast: contrast }),

      globalShadow: 'none',
      setGlobalShadow: (shadow: ControlShadow) => set({ globalShadow: shadow }),

      globalControlVariant: 'standard',
      setGlobalControlVariant: (variant: ControlVariant) => set({ globalControlVariant: variant }),

      accentColor: 'blue',
      setAccentColor: (accent: AccentColor) => set({ accentColor: accent }),

      radiusPreset: 'standard',
      setRadiusPreset: (preset: RadiusPreset) => set({ radiusPreset: preset }),

      globalControlSize: 'md',
      setGlobalControlSize: (size: ControlSizeKey) => set({ globalControlSize: size }),

      fontScale: 'standard',
      setFontScale: (scale: FontScale) => set({ fontScale: scale }),

      reduceMotion: false,
      setReduceMotion: (enabled: boolean) => set({ reduceMotion: enabled }),

      hapticsEnabled: true,
      setHapticsEnabled: (enabled: boolean) => set({ hapticsEnabled: enabled }),

      resetThemeSettings: () =>
        set({
          accentColor: 'blue',
          radiusPreset: 'standard',
          themeStyle: 'apple-glass',
          themeMode: 'light',
          headerVariant: 'standard',
          globalContrast: 'normal',
          globalShadow: 'none',
          globalControlVariant: 'standard',
          globalControlSize: 'md',
          fontScale: 'standard',
          reduceMotion: false,
          hapticsEnabled: true,
        }),

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
      decrement: () => set((state) => ({ counter: Math.max(0, state.counter - 1) })),
      reset: () => set({ counter: 0 }),
    }),
    {
      name: '@app/unified_store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        themeMode: state.themeMode,
        themeStyle: state.themeStyle,
        headerVariant: state.headerVariant,
        accentColor: state.accentColor,
        radiusPreset: state.radiusPreset,
        globalControlSize: state.globalControlSize,
        fontScale: state.fontScale,
        reduceMotion: state.reduceMotion,
        hapticsEnabled: state.hapticsEnabled,
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