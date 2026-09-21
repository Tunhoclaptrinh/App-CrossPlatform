import { useColorScheme as useDeviceColorScheme } from 'react-native';
import { Colors, ThemeColors } from '@/constants/colors';
import { useAppStore, ThemeMode } from './useAppStore';

export interface ThemeState {
  theme: ThemeColors;
  mode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

/**
 * Hook quản lý và ghi nhớ chế độ Sáng / Tối (Dark / Light mode)
 * Đồng bộ trực tiếp với Zustand unified store và lưu trữ bền vững vào AsyncStorage.
 * 
 * @example
 * const { theme, isDark, toggleTheme } = useThemeMode();
 * 
 * <View style={{ backgroundColor: theme.background }}>
 *   <Button onPress={toggleTheme}>Đổi chế độ {isDark ? "Sáng" : "Tối"}</Button>
 * </View>
 */
export function useThemeMode(): ThemeState {
  const deviceScheme = useDeviceColorScheme();
  const { themeMode, setThemeMode, toggleTheme } = useAppStore();

  const isDark = themeMode === 'system' ? deviceScheme === 'dark' : themeMode === 'dark';
  const theme = isDark ? Colors.dark : Colors.light;

  return {
    theme,
    mode: themeMode,
    isDark,
    setThemeMode,
    toggleTheme,
  };
}