import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import { haptics } from '@/utils/haptics';
import type { AppListItemProps } from './types';
import { createListItemStyles } from './styles';

export const AppListItem: React.FC<AppListItemProps> = ({
  title,
  subtitle,
  leading,
  trailing,
  value,
  badge,
  badgeColor = '#007AFF',
  iconBox = false,
  iconBg,
  iconColor,
  variant = 'standard',
  showChevron,
  onPress,
  destructive = false,
  disabled = false,
  showDivider = false,
  dividerInset = 16,
  size = 'md',
  contrast,
  borderRadius,
  numberOfLinesTitle = 1,
  numberOfLinesSubtitle = 2,
  style,
  titleStyle,
  subtitleStyle,
  valueStyle,
  accessibilityLabel,
}) => {
  const { theme, isDark, globalContrast, radiusTokens } = useThemeMode();
  const resolvedContrast = contrast ?? globalContrast;
  const styles = useMemo(
    () =>
      createListItemStyles(
        theme,
        isDark,
        disabled,
        resolvedContrast,
        size,
        variant,
        radiusTokens.card,
        borderRadius
      ),
    [theme, isDark, disabled, resolvedContrast, size, variant, radiusTokens.card, borderRadius]
  );

  const isInteractive = !disabled && Boolean(onPress);
  const shouldShowChevron = showChevron !== undefined ? showChevron : Boolean(onPress);

  const handlePress = () => {
    if (isInteractive && onPress) {
      haptics.light();
      onPress();
    }
  };

  const dynamicIconBoxStyle = useMemo<StyleProp<ViewStyle>>(() => {
    if (!iconBox && !iconBg) return null;
    const bg = iconBg || (isDark ? `${badgeColor}25` : `${badgeColor}15`);
    const border = iconColor || (isDark ? `${badgeColor}40` : `${badgeColor}25`);
    return {
      backgroundColor: bg,
      borderColor: border,
    };
  }, [iconBox, iconBg, iconColor, badgeColor, isDark]);

  const dynamicBadgeStyle = useMemo<StyleProp<ViewStyle>>(() => {
    if (!badge) return null;
    return {
      backgroundColor: isDark ? `${badgeColor}20` : `${badgeColor}12`,
    };
  }, [badge, badgeColor, isDark]);

  const dynamicBadgeTextStyle = useMemo(() => {
    if (!badge) return null;
    return {
      color: badgeColor,
    };
  }, [badge, badgeColor]);

  const itemContent = (
    <View style={[styles.container, style]}>
      {leading && (
        <View style={styles.leadingBox}>
          {iconBox || iconBg ? (
            <View style={[styles.iconTile, dynamicIconBoxStyle]}>
              {leading}
            </View>
          ) : (
            leading
          )}
        </View>
      )}

      <View style={styles.contentCol}>
        <View style={styles.titleRow}>
          {typeof title === 'string' ? (
            <AppText
              style={[
                styles.title,
                destructive && styles.titleDestructive,
                titleStyle,
              ]}
              numberOfLines={numberOfLinesTitle}
            >
              {title}
            </AppText>
          ) : (
            title
          )}

          {badge && (
            <View style={[styles.badge, dynamicBadgeStyle]}>
              {typeof badge === 'string' ? (
                <AppText style={[styles.badgeText, dynamicBadgeTextStyle]}>
                  {badge}
                </AppText>
              ) : (
                badge
              )}
            </View>
          )}
        </View>

        {subtitle && (
          typeof subtitle === 'string' ? (
            <AppText
              style={[styles.subtitle, subtitleStyle]}
              numberOfLines={numberOfLinesSubtitle}
            >
              {subtitle}
            </AppText>
          ) : (
            subtitle
          )
        )}
      </View>

      {(value || trailing || shouldShowChevron) && (
        <View style={styles.trailingRow}>
          {value && (
            <AppText style={[styles.valueText, valueStyle]}>{value}</AppText>
          )}
          {trailing}
          {shouldShowChevron && (
            <ChevronRight
              size={18}
              color={theme.textSecondary}
              opacity={0.5}
            />
          )}
        </View>
      )}
    </View>
  );

  return (
    <View>
      {isInteractive ? (
        <TouchableOpacity
          activeOpacity={0.65}
          disabled={disabled}
          onPress={handlePress}
          accessibilityRole="button"
          accessibilityLabel={
            accessibilityLabel ||
            (typeof title === 'string' ? title : 'List item')
          }
        >
          {itemContent}
        </TouchableOpacity>
      ) : (
        itemContent
      )}

      {showDivider && variant === 'standard' && (
        <View
          style={[
            styles.divider,
            { marginLeft: dividerInset },
          ]}
        />
      )}
    </View>
  );
};
