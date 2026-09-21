import React from 'react';
import { View } from 'react-native';
import { Globe, Lock, ExternalLink } from 'lucide-react-native';
import { AppText } from '@/components/common/AppText';
import { AppButton } from '@/components/common/AppButton';
import { useThemeMode } from '@/hooks/useThemeMode';
import { browserHelper } from '@/utils/browser';
import type { AppWebViewProps } from './types';
import { createAppWebViewStyles } from './styles';

export const AppWebView: React.FC<AppWebViewProps> = ({
  url,
  title = 'Trình Duyệt Tích Hợp',
  onOpenExternal,
}) => {
  const { theme: themeColors } = useThemeMode();
  const styles = createAppWebViewStyles(themeColors);

  const handleOpenBrowser = () => {
    if (onOpenExternal) {
      onOpenExternal();
    } else {
      browserHelper.openUrl(url);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Lock size={14} color="#10B981" />
        <View style={styles.urlContainer}>
          <AppText variant="caption" color={themeColors.textSecondary} numberOfLines={1} style={styles.urlText}>
            {url}
          </AppText>
        </View>
        <Globe size={18} color={themeColors.primary} />
      </View>

      <View style={styles.contentArea}>
        <AppText variant="subtitle" style={styles.title}>
          {title}
        </AppText>
        <AppText variant="caption" color={themeColors.textSecondary} style={styles.description}>
          Khung sườn Webview tối ưu hóa bảo mật, sẵn sàng hiển thị nội dung HTML, OAuth hoặc liên kết thanh toán.
        </AppText>
        <View style={styles.actions}>
          <AppButton
            title="Mở Trình Duyệt Ngoài"
            variant="tonal"
            size="md"
            leftIcon={<ExternalLink size={18} color={themeColors.primary} />}
            onPress={handleOpenBrowser}
          />
        </View>
      </View>
    </View>
  );
};
