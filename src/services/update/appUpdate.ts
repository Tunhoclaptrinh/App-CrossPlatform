import { Alert, Linking } from 'react-native';
import { AppConfig } from '@/constants/config';

export interface UpdateInfo {
  hasUpdate: boolean;
  isForceUpdate: boolean;
  latestVersion: string;
  releaseNotes?: string;
  downloadUrl?: string;
}

/**
 * Compare two semver strings: '1.2.0' vs '1.1.9'
 * Returns > 0 if v1 > v2, < 0 if v1 < v2, 0 if equal
 */
export const compareVersions = (v1: string, v2: string): number => {
  const p1 = v1.split('.').map(Number);
  const p2 = v2.split('.').map(Number);
  for (let i = 0; i < Math.max(p1.length, p2.length); i++) {
    const num1 = p1[i] || 0;
    const num2 = p2[i] || 0;
    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }
  return 0;
};

export const appUpdateService = {
  currentVersion: AppConfig.VERSION,
  buildNumber: AppConfig.BUILD_NUMBER,

  async checkForUpdates(): Promise<UpdateInfo> {
    try {
      // Giả lập hoặc gọi remote config / App Store / Google Play API
      // Khi deploy thật, trỏ endpoint tới https://your-server.com/api/v1/version
      const mockRemote = {
        latestVersion: '1.0.1',
        minRequiredVersion: '1.0.0',
        releaseNotes: 'Bổ sung hệ thống Design System và Toast Notification toàn cục.',
        downloadUrl: 'https://play.google.com/store/apps',
      };

      const hasUpdate = compareVersions(mockRemote.latestVersion, this.currentVersion) > 0;
      const isForceUpdate = compareVersions(this.currentVersion, mockRemote.minRequiredVersion) < 0;

      return {
        hasUpdate,
        isForceUpdate,
        latestVersion: mockRemote.latestVersion,
        releaseNotes: mockRemote.releaseNotes,
        downloadUrl: mockRemote.downloadUrl,
      };
    } catch (error) {
      console.error('[appUpdateService] Error checking for update:', error);
      return {
        hasUpdate: false,
        isForceUpdate: false,
        latestVersion: this.currentVersion,
      };
    }
  },

  promptUpdateIfAvailable(update: UpdateInfo) {
    if (!update.hasUpdate) return;

    const buttons = [];

    if (!update.isForceUpdate) {
      buttons.push({
        text: 'Để sau',
        style: 'cancel' as const,
      });
    }

    buttons.push({
      text: 'Cập nhật ngay',
      onPress: () => {
        if (update.downloadUrl) {
          Linking.openURL(update.downloadUrl).catch(() => {});
        }
      },
    });

    Alert.alert(
      `Có phiên bản mới (v${update.latestVersion})`,
      update.releaseNotes || 'Vui lòng cập nhật để trải nghiệm các tính năng mới nhất.',
      buttons,
      { cancelable: !update.isForceUpdate }
    );
  },
};