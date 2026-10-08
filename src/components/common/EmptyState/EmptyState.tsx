import React from 'react';
import { View } from 'react-native';
import { Inbox } from 'lucide-react-native';
import { AppText } from '../AppText';
import { AppButton } from '../AppButton';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { EmptyStateProps } from './types';
import { styles } from './styles';

export const EmptyState: React.FC<EmptyStateProps> = React.memo(({
  title = 'Không có dữ liệu',
  description = 'Hiện tại chưa có mục nào được hiển thị ở đây.',
  icon,
  actionText,
  onActionPress,
  size = 'md',
  contrast,
  borderRadius,
  style,
}) => {
  const { theme: themeColors, isDark, globalContrast } = useThemeMode();
  const resolvedContrast = contrast ?? globalContrast;
  const isHigh = resolvedContrast === 'high';

  let iconSize = 60;
  let containerPadding = 24;
  let titleVariant: 'h3' | 'subtitle' | 'subtitle2' = 'subtitle';
  let descVariant: 'body' | 'caption' = 'body';
  let buttonSize: 'sm' | 'md' = 'sm';

  if (size === 'sm') {
    iconSize = 36;
    containerPadding = 14;
    titleVariant = 'subtitle2';
    descVariant = 'caption';
    buttonSize = 'sm';
  } else if (size === 'lg') {
    iconSize = 76;
    containerPadding = 36;
    titleVariant = 'h3';
    descVariant = 'body';
    buttonSize = 'md';
  }

  const descColor = isHigh
    ? (isDark ? 'rgba(255, 255, 255, 0.85)' : '#334155')
    : themeColors.textSecondary;

  const dynamicRadiusStyle = borderRadius !== undefined ? { borderRadius } : null;

  return (
    <View style={[styles.container, { padding: containerPadding }, dynamicRadiusStyle, style]}>
      <View style={styles.iconWrapper}>
        {icon || <Inbox size={iconSize} color={themeColors.textSecondary} strokeWidth={1.2} />}
      </View>

      <AppText variant={titleVariant} style={styles.title}>
        {title}
      </AppText>

      <AppText
        variant={descVariant}
        color={descColor}
        style={styles.description}
      >
        {description}
      </AppText>

      {actionText && onActionPress && (
        <AppButton
          title={actionText}
          variant={isHigh ? 'primary' : 'tonal'}
          size={buttonSize}
          onPress={onActionPress}
        />
      )}
    </View>
  );
});
