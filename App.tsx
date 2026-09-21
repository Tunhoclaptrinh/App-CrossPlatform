import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { AppNavigator, linking } from '@/navigation';
import { ToastProvider } from '@/components/toast';
import { ErrorBoundary, OfflineBanner } from '@/components/common';
import { useThemeMode, useNetworkStatus } from '@/hooks';
import '@/i18n';

function AppContent(): React.JSX.Element {
  const { isDark } = useThemeMode();
  const { isConnected, checkConnection } = useNetworkStatus();
  const paperTheme = isDark ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <ToastProvider>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        {!isConnected && <OfflineBanner onRetry={checkConnection} />}
        <NavigationContainer linking={linking}>
          <AppNavigator />
        </NavigationContainer>
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