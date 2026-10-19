import React, { useContext, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { Palette, Plus, Pencil } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/hooks/useAppStore';
import { useThemeMode } from '@/hooks/useThemeMode';
import { ControlSize, Spacing } from '@/constants';
import { ScreenWrapper } from '../ScreenWrapper';
import { AppHeader } from '../AppHeader';
import { AppScrollView } from '../AppScrollView';
import { ThemeStudioModal } from '../ThemeStudioModal';
import type { StudyPageProps } from './types';
import { createStyles } from './styles';

export function StudyPage({
  title,
  subtitle,
  children,
  scrollable,
  onBack,
  action,
  onAdd,
  onEdit,
}: StudyPageProps) {
  const { t } = useTranslation();
  const appearance = useThemeMode();
  const storageFailed = useAppStore(s => s.studyHydrationFailed);
  const { theme, isGlassTheme } = appearance;
  const [studioOpen, setStudioOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const tabBarHeight = useContext(BottomTabBarHeightContext);
  const [measuredHeaderHeight, setMeasuredHeaderHeight] = useState<number>();
  const headerHeight =
    measuredHeaderHeight ??
    insets.top + ControlSize[appearance.headerSize].height + Spacing.xs;
  const bottomInset = tabBarHeight ?? insets.bottom;
  const styles = useMemo(
    () => createStyles(appearance, headerHeight, bottomInset),
    [appearance, headerHeight, bottomInset],
  );
  const scrollInsets = useMemo(
    () => ({ top: headerHeight, bottom: bottomInset }),
    [headerHeight, bottomInset],
  );
  const content =
    typeof children === 'function'
      ? children({
          contentContainerStyle: styles.contentInsets,
          scrollIndicatorInsets: scrollInsets,
        })
      : children;
  const actions = [
    ...(onAdd
      ? [
          {
            id: 'add',
            icon: <Plus size={20} color={theme.primary} />,
            accessibilityLabel: t('study.add'),
            onPress: onAdd,
          },
        ]
      : []),
    ...(onEdit
      ? [
          {
            id: 'edit',
            icon: <Pencil size={20} color={theme.primary} />,
            accessibilityLabel: t('study.edit'),
            onPress: onEdit,
          },
        ]
      : []),
    {
      id: 'theme',
      icon: <Palette size={20} color={theme.primary} />,
      accessibilityLabel: t('study.customizeAppearance'),
      onPress: () => setStudioOpen(true),
    },
  ];
  return (
    <ScreenWrapper
      edges={['left', 'right']}
      disableMeshBackground
      disableKeyboardDismiss
    >
      {scrollable ? (
        <AppScrollView
          style={styles.body}
          contentContainerStyle={[styles.content, styles.contentInsets]}
          contentInsetAdjustmentBehavior="never"
          indicatorInsets={scrollInsets}
          scrollIndicatorInsets={scrollInsets}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {content}
        </AppScrollView>
      ) : (
        <View
          style={[
            styles.body,
            typeof children !== 'function' && styles.contentInsets,
          ]}
        >
          {content}
        </View>
      )}
      {/* Keep the native header above scroll content on Android. */}
      <View
        style={styles.headerOverlay}
        pointerEvents="box-none"
        collapsable={false}
        onLayout={event =>
          setMeasuredHeaderHeight(event.nativeEvent.layout.height)
        }
      >
        <AppHeader
          title={title}
          subtitle={subtitle}
          showBack={Boolean(onBack)}
          onBack={onBack}
          backTitle={t('study.back')}
          variant={appearance.headerVariant}
          size={appearance.headerSize}
          titleAlign={appearance.headerTitleAlign}
          backStyle={appearance.headerBackStyle}
          actionStyle={appearance.headerActionStyle}
          titleStyle={styles.headerTitle}
          subtitleStyle={styles.headerSubtitle}
          tintColor={appearance.headerTintColor}
          backgroundColor={appearance.headerBgColor}
          borderRadius={appearance.headerBorderRadius}
          transparent={
            isGlassTheme &&
            !appearance.headerBgColor &&
            appearance.headerVariant === 'standard'
          }
          rightActions={storageFailed ? [] : actions}
          rightAction={action}
        />
      </View>
      {studioOpen && (
        <ThemeStudioModal visible onClose={() => setStudioOpen(false)} />
      )}
    </ScreenWrapper>
  );
}
