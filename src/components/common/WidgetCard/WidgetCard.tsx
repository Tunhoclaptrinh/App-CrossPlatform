import React from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RefreshCw } from 'lucide-react-native';
import { AppText } from '@/components/common/AppText';
import { AppBadge } from '@/components/common/AppBadge';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useAppStore } from '@/hooks/useAppStore';
import { haptics } from '@/utils/haptics';
import type { WidgetCardProps } from './types';
import { createWidgetCardStyles } from './styles';

export const WidgetCard: React.FC<WidgetCardProps> = ({
  title,
  subtitle,
  badge,
  icon,
  children,
  onRefresh,
  isRefreshing = false,
}) => {
  const { theme: themeColors, isDark } = useThemeMode();
  const { themeStyle } = useAppStore();
  const isGlass = themeStyle === 'apple-glass';
  const styles = createWidgetCardStyles(themeColors);

  const handleRefresh = () => {
    if (onRefresh && !isRefreshing) {
      haptics.light();
      onRefresh();
    }
  };

  return (
    <View style={styles.container}>
      {isGlass && (
        <View style={isDark ? styles.specularHighlightDark : styles.specularHighlight} />
      )}
      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          {icon && <View style={styles.iconWrapper}>{icon}</View>}
          <View>
            <AppText variant="subtitle" style={styles.titleText}>
              {title}
            </AppText>
            {subtitle && (
              <AppText variant="caption" color={themeColors.textSecondary} style={styles.subtitleText}>
                {subtitle}
              </AppText>
            )}
          </View>
        </View>

        {badge && (
          <View style={styles.badgeWrapper}>
            <AppBadge label={badge} variant="info" size="sm" />
          </View>
        )}

        {onRefresh && (
          <TouchableOpacity activeOpacity={0.7} onPress={handleRefresh}>
            {isRefreshing ? (
              <ActivityIndicator size="small" color={themeColors.primary} />
            ) : (
              <RefreshCw size={16} color={themeColors.textSecondary} />
            )}
          </TouchableOpacity>
        )}
      </View>

      {children && <View style={styles.contentArea}>{children}</View>}
    </View>
  );
};
