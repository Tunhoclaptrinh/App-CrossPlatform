import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import { haptics } from '@/utils/haptics';
import type { AppAvatarProps } from './types';
import {
  getAvatarPixelSize,
  getAvatarFontSize,
  getInitials,
  getAvatarColorByName,
  STATUS_COLORS,
  createAvatarStyles,
} from './styles';

export const AppAvatar: React.FC<AppAvatarProps> = ({
  source,
  name,
  size = 'md',
  status,
  badgeCount,
  badgeText,
  rounded = true,
  contrast,
  style,
  imageStyle,
  onPress,
  accessibilityLabel,
}) => {
  const { theme, isDark, globalContrast, radiusTokens } = useThemeMode();
  const [imageError, setImageError] = useState(false);

  const resolvedContrast = contrast ?? globalContrast;
  const pixelSize = getAvatarPixelSize(size);
  const fontSize = getAvatarFontSize(size);
  const styles = createAvatarStyles(theme, isDark, pixelSize, resolvedContrast);

  const borderRadius = rounded
    ? pixelSize / 2
    : Math.min(radiusTokens?.control ?? 8, Math.round(pixelSize * 0.3));
  const initials = getInitials(name);
  const bgColor = getAvatarColorByName(name);

  const effectiveSource =
    typeof source === 'string' ? { uri: source } : source;
  const hasValidImage = !!effectiveSource && !imageError;

  const handlePress = () => {
    if (onPress) {
      haptics.light();
      onPress();
    }
  };

  const innerDynamicStyle = React.useMemo(() => ({
    borderRadius,
    backgroundColor: hasValidImage ? 'transparent' : bgColor,
  }), [borderRadius, hasValidImage, bgColor]);

  const imageDynamicStyle = React.useMemo(() => [
    styles.image,
    { borderRadius },
    imageStyle,
  ], [borderRadius, imageStyle, styles.image]);

  const content = (
    <View style={[styles.container, style]}>
      <View style={[styles.avatarInner, innerDynamicStyle]}>
        {hasValidImage ? (
          <Image
            source={effectiveSource}
            style={imageDynamicStyle}
            onError={() => setImageError(true)}
            resizeMode="cover"
          />
        ) : (
          <AppText style={[styles.initialsText, { fontSize }]}>
            {initials}
          </AppText>
        )}
      </View>

      {/* Status Dot */}
      {status && (
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: STATUS_COLORS[status] },
          ]}
        />
      )}

      {/* Notification Count Badge */}
      {(badgeCount !== undefined || badgeText !== undefined) && (
        <View style={styles.countBadge}>
          <AppText style={styles.countBadgeText}>
            {badgeText ?? (badgeCount && badgeCount > 99 ? '99+' : badgeCount)}
          </AppText>
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || name || 'Avatar'}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};
