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
import type { MeshVariant } from '@/components/common/AppleMeshBackground/types';
import type {
  AppHeaderVariant,
  AppHeaderBackStyle,
  AppHeaderActionStyle,
  HeaderTitleAlign,
  AppHeaderSize,
} from '@/components/common/AppHeader/types';

export type ThemeMode = 'system' | 'light' | 'dark';
export type ThemeStyle = 'default' | 'apple-glass';
export type HeaderVariant = AppHeaderVariant;
export type Language = 'vi' | 'en';
export type FontScale = 'small' | 'standard' | 'large';
export type { MeshVariant };
import type { SecurityConfig, CryptoPacket } from '@/screens/Auth/types';

export const DEFAULT_SECURITY_CONFIG: SecurityConfig = {
  cipherAlgorithm: 'AES-256-GCM',
  keyDerivation: 'PBKDF2-100k',
  secretPepper: 'React_Native_Enterprise_Sec_Pepper_#2026',
  requireBiometrics: false,
  enableZeroKnowledgeHash: true,
  simulatedLatencyMs: 600,
  autoEnrollBiometrics: true,
};

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

  // Global Dynamic Mesh Wallpaper & Background
  meshVariant: MeshVariant;
  setMeshVariant: (variant: MeshVariant) => void;

  // Surface & Contrast Engine Controls
  globalContrast: ControlContrast;
  setGlobalContrast: (contrast: ControlContrast) => void;
  globalShadow: ControlShadow;
  setGlobalShadow: (shadow: ControlShadow) => void;
  globalControlVariant: ControlVariant;
  setGlobalControlVariant: (variant: ControlVariant) => void;

  // Global Surface Radius Override
  customCardRadius: number | undefined;
  setCustomCardRadius: (radius: number | undefined) => void;

  // Global Header Styling
  headerBackStyle: AppHeaderBackStyle;
  setHeaderBackStyle: (style: AppHeaderBackStyle) => void;
  headerActionStyle: AppHeaderActionStyle;
  setHeaderActionStyle: (style: AppHeaderActionStyle) => void;
  headerTitleAlign: HeaderTitleAlign;
  setHeaderTitleAlign: (align: HeaderTitleAlign) => void;
  headerSize: AppHeaderSize;
  setHeaderSize: (size: AppHeaderSize) => void;
  headerTitleColor: string | undefined;
  setHeaderTitleColor: (color: string | undefined) => void;
  headerSubtitleColor: string | undefined;
  setHeaderSubtitleColor: (color: string | undefined) => void;
  headerTintColor: string | undefined;
  setHeaderTintColor: (color: string | undefined) => void;
  headerBgColor: string | undefined;
  setHeaderBgColor: (color: string | undefined) => void;
  headerBorderRadius: number | undefined;
  setHeaderBorderRadius: (radius: number | undefined) => void;

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

  // Enterprise Cryptography & Security Settings
  securityConfig: SecurityConfig;
  setSecurityConfig: (config: SecurityConfig) => void;
  resetSecurityConfig: () => void;
  latestCryptoPacket: CryptoPacket | null;
  setLatestCryptoPacket: (pkt: CryptoPacket | null) => void;
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

      meshVariant: 'aurora',
      setMeshVariant: (variant: MeshVariant) => set({ meshVariant: variant }),

      headerVariant: 'standard',
      setHeaderVariant: (variant: HeaderVariant) => set({ headerVariant: variant }),
      toggleHeaderVariant: () => {
        const current = get().headerVariant;
        set({ headerVariant: current === 'standard' ? 'frosted-capsule' : 'standard' });
      },

      customCardRadius: undefined,
      setCustomCardRadius: (radius: number | undefined) => set({ customCardRadius: radius }),

      headerBackStyle: 'glass-capsule',
      setHeaderBackStyle: (style: AppHeaderBackStyle) => set({ headerBackStyle: style }),
      headerActionStyle: 'capsule',
      setHeaderActionStyle: (style: AppHeaderActionStyle) => set({ headerActionStyle: style }),
      headerTitleAlign: 'center',
      setHeaderTitleAlign: (align: HeaderTitleAlign) => set({ headerTitleAlign: align }),
      headerSize: 'md',
      setHeaderSize: (size: AppHeaderSize) => set({ headerSize: size }),
      headerTitleColor: undefined,
      setHeaderTitleColor: (color: string | undefined) => set({ headerTitleColor: color }),
      headerSubtitleColor: undefined,
      setHeaderSubtitleColor: (color: string | undefined) => set({ headerSubtitleColor: color }),
      headerTintColor: undefined,
      setHeaderTintColor: (color: string | undefined) => set({ headerTintColor: color }),
      headerBgColor: undefined,
      setHeaderBgColor: (color: string | undefined) => set({ headerBgColor: color }),
      headerBorderRadius: undefined,
      setHeaderBorderRadius: (radius: number | undefined) => set({ headerBorderRadius: radius }),

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
          meshVariant: 'aurora',
          customCardRadius: undefined,
          headerVariant: 'standard',
          headerBackStyle: 'glass-capsule',
          headerActionStyle: 'capsule',
          headerTitleAlign: 'center',
          headerSize: 'md',
          headerTitleColor: undefined,
          headerSubtitleColor: undefined,
          headerTintColor: undefined,
          headerBgColor: undefined,
          headerBorderRadius: undefined,
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

      securityConfig: DEFAULT_SECURITY_CONFIG,
      setSecurityConfig: (config: SecurityConfig) => set({ securityConfig: config }),
      resetSecurityConfig: () => set({ securityConfig: DEFAULT_SECURITY_CONFIG }),
      latestCryptoPacket: null,
      setLatestCryptoPacket: (pkt: CryptoPacket | null) => set({ latestCryptoPacket: pkt }),
    }),
    {
      name: '@app/unified_store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        themeMode: state.themeMode,
        themeStyle: state.themeStyle,
        meshVariant: state.meshVariant,
        customCardRadius: state.customCardRadius,
        headerVariant: state.headerVariant,
        headerBackStyle: state.headerBackStyle,
        headerActionStyle: state.headerActionStyle,
        headerTitleAlign: state.headerTitleAlign,
        headerSize: state.headerSize,
        headerTitleColor: state.headerTitleColor,
        headerSubtitleColor: state.headerSubtitleColor,
        headerTintColor: state.headerTintColor,
        headerBgColor: state.headerBgColor,
        headerBorderRadius: state.headerBorderRadius,
        accentColor: state.accentColor,
        radiusPreset: state.radiusPreset,
        globalControlSize: state.globalControlSize,
        fontScale: state.fontScale,
        reduceMotion: state.reduceMotion,
        hapticsEnabled: state.hapticsEnabled,
        language: state.language,
        user: state.user,
        counter: state.counter,
        securityConfig: state.securityConfig,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.language) {
          changeLanguage(state.language);
        }
      },
    }
  )
);