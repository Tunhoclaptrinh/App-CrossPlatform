import React from 'react';
import { View } from 'react-native';
import { useThemeMode } from '@/hooks/useThemeMode';
import { AppHeader } from '../AppHeader';
import { ScreenWrapper } from '../ScreenWrapper';
import { resolveSurfaceColors } from '../surfaceUtils';
import type { AppScreenLayoutProps } from './types';
import { createStyles } from './styles';

export const AppScreenLayout = React.memo(function AppScreenLayoutComponent({
  header,
  footer,
  children,
  surface = 'theme',
  bottomInset = true,
  scrollable = true,
  contentContainerStyle,
  ...props
}: AppScreenLayoutProps) {
  const { theme, isDark } = useThemeMode();
  const colors = resolveSurfaceColors(theme, isDark, surface);
  const styles = createStyles(colors);
  return (
    <ScreenWrapper
      {...props}
      scrollable={scrollable}
      disableMeshBackground={surface === 'solid'}
      backgroundColor={colors.background}
      edges={bottomInset ? ['left', 'right', 'bottom'] : ['left', 'right']}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      header={
        <AppHeader
          titleAlign="left"
          variant="standard"
          backgroundColor={surface === 'solid' ? colors.card : undefined}
          {...header}
        />
      }
      footer={
        footer != null && typeof footer !== 'boolean' ? (
          <View style={styles.footer}>{footer}</View>
        ) : undefined
      }
    >
      {children}
    </ScreenWrapper>
  );
});
