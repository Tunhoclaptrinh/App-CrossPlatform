import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { WifiOff, RefreshCw } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { AppText } from '../AppText';
import type { OfflineBannerProps } from './types';
import { styles } from './styles';

export const OfflineBanner: React.FC<OfflineBannerProps> = ({
  message,
  onRetry,
  size = 'md',
  contrast = 'normal',
  borderRadius,
  style,
}) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const bottomOffset = Math.max(insets.bottom + 12, 24);

  const isHigh = contrast === 'high';
  const iconSize = size === 'sm' ? 13 : size === 'lg' ? 18 : 15;
  const paddingVertical = size === 'sm' ? 8 : size === 'lg' ? 14 : 10;
  const paddingHorizontal = size === 'sm' ? 12 : size === 'lg' ? 18 : 14;

  const dynamicBannerStyle = {
    paddingVertical,
    paddingHorizontal,
    borderWidth: isHigh ? 1.5 : 1,
    borderColor: isHigh ? 'rgba(239, 68, 68, 0.65)' : 'rgba(239, 68, 68, 0.35)',
    ...(borderRadius !== undefined ? { borderRadius } : {}),
  };

  const displayMessage = message || t('network.offline', 'Không có kết nối Internet');

  const content = (
    <>
      <View style={styles.iconBox}>
        <WifiOff size={iconSize} color="#FFFFFF" />
      </View>
      <View style={styles.textContainer}>
        <AppText variant={size === 'sm' ? 'caption' : 'body2'} style={styles.text} numberOfLines={2}>
          {displayMessage}
        </AppText>
      </View>
      {onRetry && (
        <View style={styles.retryBadge}>
          <RefreshCw size={size === 'sm' ? 9 : 11} color="#FFFFFF" style={styles.retryIcon} />
          <AppText style={styles.retryText}>
            {t('network.retry', 'Thử lại')}
          </AppText>
        </View>
      )}
    </>
  );

  return (
    <View pointerEvents="box-none" style={[styles.container, { bottom: bottomOffset }]}>
      {onRetry ? (
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onRetry}
          style={[styles.banner, dynamicBannerStyle, style]}
        >
          {content}
        </TouchableOpacity>
      ) : (
        <View style={[styles.banner, dynamicBannerStyle, style]}>
          {content}
        </View>
      )}
    </View>
  );
};
