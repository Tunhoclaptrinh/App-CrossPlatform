import React from 'react';
import { View, TouchableOpacity, useColorScheme } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { AppText } from '../AppText';
import { Colors } from '@/constants/colors';
import type { AppHeaderProps } from './types';
import { styles } from './styles';

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  leftAction,
  rightAction,
  style,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColors.card,
          borderBottomColor: themeColors.border,
        },
        style,
      ]}
    >
      <View style={styles.leftContainer}>
        {showBack ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={[styles.backButton, { backgroundColor: themeColors.surfaceSubtle }]}
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
