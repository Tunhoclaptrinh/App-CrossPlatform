import React from 'react';
import { View, useColorScheme } from 'react-native';
import { Globe, Lock } from 'lucide-react-native';
import { Button } from 'react-native-paper';
import { AppText } from '@/components/common/AppText';
import { Colors } from '@/constants/colors';
import { browserHelper } from '@/utils/browser';
import type { AppWebViewProps } from './types';
import { createAppWebViewStyles } from './styles';

export const AppWebView: React.FC<AppWebViewProps> = ({
  url,
  title = 'Trình Duyệt Tích Hợp',
  onOpenExternal,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;
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
          <Button
            mode="contained-tonal"
            icon="open-in-new"
            onPress={handleOpenBrowser}
          >
            Mở Trình Duyệt Ngoài
          </Button>
        </View>
      </View>
    </View>
  );
};
