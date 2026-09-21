import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { AppHeaderProps } from './types';
import { styles, getHeaderThemedStyle, getBackButtonThemedStyle } from './styles';

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  leftAction,
  rightAction,
  style,
}) => {
  const { theme: themeColors } = useThemeMode();

  return (
    <View
      style={[
        styles.container,
        getHeaderThemedStyle(themeColors),
        style,
      ]}
    >
      <View style={styles.leftContainer}>
        {showBack ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={[styles.backButton, getBackButtonThemedStyle(themeColors)]}
          >
            <ArrowLeft size={20} color={themeColors.text} />
          </TouchableOpacity>
        ) : leftAction ? (
          leftAction
        ) : null}
      </View>

      <View style={styles.centerContainer}>
        <AppText variant="title" color={themeColors.text} numberOfLines={1} style={styles.title}>
          {title}
        </AppText>
        {subtitle ? (
          <AppText variant="caption" color={themeColors.textSecondary} numberOfLines={1}>
            {subtitle}
          </AppText>
        ) : null}
      </View>

      <View style={styles.rightContainer}>
        {rightAction || null}
      </View>
    </View>
  );
};
