import React from 'react';
import { View } from 'react-native';
import { Inbox } from 'lucide-react-native';
import { AppText } from '../AppText';
import { AppButton } from '../AppButton';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { EmptyStateProps } from './types';
import { styles } from './styles';

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Không có dữ liệu',
  description = 'Hiện tại chưa có mục nào được hiển thị ở đây.',
  icon,
  actionText,
  onActionPress,
  style,
}) => {
  const { theme: themeColors } = useThemeMode();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconWrapper}>
        {icon || <Inbox size={64} color={themeColors.textSecondary} strokeWidth={1.2} />}
      </View>

      <AppText variant="subtitle" style={styles.title}>
        {title}
      </AppText>

      <AppText
        variant="body"
        color={themeColors.textSecondary}
        style={styles.description}
      >
        {description}
      </AppText>

      {actionText && onActionPress && (
        <AppButton
          title={actionText}
          variant="tonal"
          size="sm"
          onPress={onActionPress}
        />
      )}
    </View>
  );
};
