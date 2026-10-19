import React, { useMemo } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { AppNavigator, linking } from '@/navigation';
import {
  ToastProvider,
  ErrorBoundary,
  OfflineBanner,
} from '@/components/common';
import { useThemeMode, useNetworkStatus } from '@/hooks';
import '@/i18n';

function AppContent(): React.JSX.Element {
  const { isDark, theme } = useThemeMode();
  const { isConnected, checkConnection } = useNetworkStatus();
  const navigationTheme = useMemo(() => {
    const baseNavigationTheme = isDark ? DarkTheme : DefaultTheme;
    return {
      ...baseNavigationTheme,
      colors: {
        ...baseNavigationTheme.colors,
        primary: theme.primary,
        background: theme.background,
        card: theme.card,
        text: theme.text,
        border: theme.border,
        notification: theme.notification,
      },
    };
  }, [isDark, theme]);
  const paperTheme = isDark ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <ToastProvider>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <NavigationContainer linking={linking} theme={navigationTheme}>
          <AppNavigator />
        </NavigationContainer>
        {!isConnected && <OfflineBanner onRetry={checkConnection} />}
      </ToastProvider>
    </PaperProvider>
  );
}

export default function App(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
