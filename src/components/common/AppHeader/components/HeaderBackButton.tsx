import React from 'react';
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { AppText } from '../../AppText';
import { haptics } from '@/utils/haptics';
import { styles } from '../styles';
import type { AppHeaderBackStyle, AppHeaderVariant } from '../types';

export interface HeaderBackButtonProps {
  onPress: () => void;
  title?: string;
  backStyle?: AppHeaderBackStyle;
  variant?: AppHeaderVariant;
  tintColor?: string;
  isDark?: boolean;
  radius?: number;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  hitSlop?: { top: number; bottom: number; left: number; right: number };
}

export const HeaderBackButton: React.FC<HeaderBackButtonProps> = React.memo(({
  onPress,
  title,
  backStyle = 'text',
  variant = 'standard',
  tintColor,
  isDark = false,
  radius = 19,
  style,
  accessibilityLabel,
  hitSlop,
}) => {
  const handlePress = () => {
    haptics.light();
    onPress();
  };

  if (variant === 'floating-pill') {
    const islandIconColor = tintColor || (isDark ? '#FFFFFF' : '#0F172A');
    const islandBtnStyle = {
      borderRadius: 16,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.05)',
      borderColor: isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(0, 0, 0, 0.08)',
    };

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePress}
        hitSlop={hitSlop || { top: 8, bottom: 8, left: 8, right: 8 }}
        style={[styles.islandBackBtn, islandBtnStyle, style]}
        accessibilityLabel={accessibilityLabel || title || 'Quay lại'}
      >
        <ChevronLeft size={18} color={islandIconColor} strokeWidth={2.4} />
      </TouchableOpacity>
    );
  }

  if (backStyle === 'circle') {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePress}
        hitSlop={hitSlop || { top: 8, bottom: 8, left: 8, right: 8 }}
        style={[
          styles.backCircleBtn,
          isDark ? styles.backCircleBtnDark : styles.backCircleBtnLight,
          { borderRadius: radius },
          style,
        ]}
        accessibilityLabel={accessibilityLabel || title || 'Quay lại'}
      >
        <ChevronLeft
          size={20}
          color={tintColor || (isDark ? '#FFFFFF' : '#0F172A')}
          strokeWidth={2.4}
        />
      </TouchableOpacity>
    );
  }

  // iOS Text / Chevron Back Style
  const effectiveTintColor = tintColor || (isDark ? '#38BDF8' : '#007AFF');
  const showText = Boolean(title || variant === 'standard');

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      hitSlop={hitSlop || { top: 12, bottom: 12, left: 12, right: 12 }}
      style={[styles.iosBackBtn, style]}
      accessibilityLabel={accessibilityLabel || title || 'Quay lại'}
    >
      <ChevronLeft size={24} color={effectiveTintColor} strokeWidth={2.4} />
      {showText && (
        <AppText style={[styles.iosBackText, { color: effectiveTintColor }]}>
          {title || 'Quay lại'}
        </AppText>
      )}
    </TouchableOpacity>
  );
});

HeaderBackButton.displayName = 'HeaderBackButton';
