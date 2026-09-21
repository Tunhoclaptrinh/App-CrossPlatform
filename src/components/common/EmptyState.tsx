import React from 'react';
import { StyleSheet, View, ViewStyle, useColorScheme } from 'react-native';
import { Inbox } from 'lucide-react-native';
import { AppText } from './AppText';
import { AppButton } from './AppButton';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/theme';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionText?: string;
  onActionPress?: () => void;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Chưa có dữ liệu',
  description = 'Hiện tại danh sách đang trống hoặc không tìm thấy kết quả phù hợp.',
  icon,
  actionText,
  onActionPress,
  style,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.iconWrapper, { backgroundColor: themeColors.borderLight }]}>
        {icon || <Inbox size={40} color={themeColors.textSecondary} />}
      </View>

      <AppText variant="h3" style={styles.title} color={themeColors.text}>
        {title}
      </AppText>

      {description ? (
        <AppText variant="body" style={styles.description} color={themeColors.textSecondary}>
          {description}
        </AppText>
      ) : null}

      {actionText && onActionPress ? (
        <AppButton
          title={actionText}
          onPress={onActionPress}
          variant="primary"
          style={styles.actionButton}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxxl,
    paddingHorizontal: Spacing.xl,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  description: {
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  actionButton: {
    minWidth: 160,
  },
});