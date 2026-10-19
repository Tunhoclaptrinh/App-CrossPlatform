import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '@/hooks/useThemeMode';
import { ScreenWrapper } from '../ScreenWrapper';
import { AppText } from '../AppText';
import { AppButton } from '../AppButton';
import type { StudyPageProps } from './types';
import { createStyles } from './styles';

export function StudyPage({
  title,
  subtitle,
  children,
  scrollable,
  onBack,
  action,
}: StudyPageProps) {
  const { t } = useTranslation();
  const { theme, isDark } = useThemeMode();
  const styles = useMemo(() => createStyles(isDark), [isDark]);
  return (
    <ScreenWrapper
      edges={
        onBack ? ['top', 'bottom', 'left', 'right'] : ['top', 'left', 'right']
      }
      disableMeshBackground
      disableKeyboardDismiss
      style={styles.screen}
    >
      <View style={styles.header}>
        {onBack && (
          <AppButton
            title={t('study.back')}
            variant="ghost"
            leftIcon={<ChevronLeft size={20} color={theme.primary} />}
            onPress={onBack}
            style={styles.back}
          />
        )}
        <View style={styles.top}>
          <View style={styles.titles}>
            <AppText accessibilityRole="header" style={styles.title}>
              {title}
            </AppText>
            {subtitle && (
              <AppText
                style={styles.headerSubtitle}
                color={theme.textSecondary}
              >
                {subtitle}
              </AppText>
            )}
          </View>
          {action}
        </View>
      </View>
      {scrollable ? (
        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {children}
        </ScrollView>
      ) : (
        <View style={styles.body}>{children}</View>
      )}
    </ScreenWrapper>
  );
}
