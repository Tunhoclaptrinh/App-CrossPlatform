import { appStorage } from '@/services/storage';
import { fileService } from '@/services/file';
import type { WidgetDataSnapshot } from './types';

const WIDGET_STORAGE_KEY = '@app/widget_snapshot';
const WIDGET_FILE_NAME = 'widget_snapshot.json';

/**
 * Universal Widget Bridge Service
 * Cầu nối đồng bộ dữ liệu giữa React Native và hệ thống Widget (In-App Dashboard hoặc Android/iOS WidgetKit)
 */
export const widgetBridgeService = {
  /**
   * Đồng bộ dữ liệu mới nhất cho Widget
   */
  async syncWidgetData(snapshot: Partial<WidgetDataSnapshot>): Promise<WidgetDataSnapshot> {
    const fullSnapshot: WidgetDataSnapshot = {
      lastUpdated: Date.now(),
      activeCount: snapshot.activeCount ?? 0,
      headline: snapshot.headline || 'Universal Base App',
      status: snapshot.status || 'online',
      customData: snapshot.customData || {},
    };

    // 1. Lưu vào AsyncStorage
    await appStorage.setItem(WIDGET_STORAGE_KEY, fullSnapshot);

    // 2. Xuất file JSON cục bộ trong SQLite để Android AppWidgetProvider hoặc iOS App Group có thể đọc
    await fileService.saveJson(WIDGET_FILE_NAME, fullSnapshot);

    return fullSnapshot;
  },

  /**
   * Lấy dữ liệu snapshot hiện tại của Widget
   */
  async getWidgetData(): Promise<WidgetDataSnapshot> {
    const fromStorage = await appStorage.getItem<WidgetDataSnapshot>(WIDGET_STORAGE_KEY);
    if (fromStorage) return fromStorage;

    return {
      lastUpdated: Date.now(),
      activeCount: 0,
      headline: 'Chưa có dữ liệu widget',
      status: 'offline',
    };
  },
};
