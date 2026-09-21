import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { WifiOff } from 'lucide-react-native';
import { AppText } from '../AppText';
import type { OfflineBannerProps } from './types';
import { styles } from './styles';

export const OfflineBanner: React.FC<OfflineBannerProps> = ({
  message = 'Không có kết nối Internet. Đang ở chế độ ngoại tuyến.',
  onRetry,
  style,
}) => {
  const content = (
    <View style={[styles.banner, style]}>
      <WifiOff size={16} color="#FFFFFF" style={styles.icon} />
      <AppText variant="caption" style={styles.text}>
        {message}
      </AppText>
    </View>
  );

  if (onRetry) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onRetry}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};
