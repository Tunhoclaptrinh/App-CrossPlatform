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
  style,
}) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const bottomOffset = Math.max(insets.bottom + 12, 24);

  const displayMessage = message || t('network.offline', 'Không có kết nối Internet');

  const content = (
    <>
      <View style={styles.iconBox}>
        <WifiOff size={15} color="#FFFFFF" />
      </View>
      <View style={styles.textContainer}>
        <AppText variant="caption" style={styles.text} numberOfLines={2}>
          {displayMessage}
        </AppText>
      </View>
      {onRetry && (
        <View style={styles.retryBadge}>
          <RefreshCw size={11} color="#FFFFFF" style={styles.retryIcon} />
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
          style={[styles.banner, style]}
        >
          {content}
        </TouchableOpacity>
      ) : (
        <View style={[styles.banner, style]}>
          {content}
        </View>
      )}
    </View>
  );
};
