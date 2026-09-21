import { Vibration, Platform, PermissionsAndroid } from 'react-native';

let isVibrationPermitted = Platform.OS === 'ios';

// Tự động kiểm tra quyền VIBRATE trên Android khi module khởi tạo
if (Platform.OS === 'android') {
  PermissionsAndroid.check('android.permission.VIBRATE' as any)
    .then((granted) => {
      isVibrationPermitted = granted;
    })
    .catch(() => {
      isVibrationPermitted = false;
    });
}

function safeVibrate(pattern?: number | number[]) {
  // Trên Android nếu binary cài trên máy chưa có quyền VIBRATE (tránh SecurityException gây RedBox)
  if (Platform.OS === 'android' && !isVibrationPermitted) {
    return;
  }

  try {
    if (pattern !== undefined) {
      Vibration.vibrate(pattern);
    } else {
      Vibration.vibrate();
    }
  } catch (error) {
    // Graceful fallback nếu thiết bị không hỗ trợ rung
    if (__DEV__) {
      console.warn('[Haptics] Vibration not permitted or supported:', error);
    }
  }
}

/**
 * Universal Haptic & Vibration Feedback Helper
 * Mang lai cam giac phan hoi xuc giac (haptic) cao cap khi cham nut hoac thao tac tren dien thoai.
 */
export const haptics = {
  /**
   * Rung nhe khi cham nut hoac chuyen tab
   */
  light() {
    safeVibrate(Platform.OS === 'android' ? 10 : undefined);
  },

  /**
   * Rung vua (Medium impact)
   */
  medium() {
    safeVibrate(Platform.OS === 'android' ? 25 : undefined);
  },

  /**
   * Rung manh khi nhan giu hoac xoa
   */
  heavy() {
    safeVibrate(Platform.OS === 'android' ? 45 : undefined);
  },

  /**
   * Nhip rung thong bao thanh cong
   */
  success() {
    safeVibrate(Platform.OS === 'android' ? [0, 15, 60, 25] : undefined);
  },

  /**
   * Nhip rung canh bao loi
   */
  error() {
    safeVibrate(Platform.OS === 'android' ? [0, 35, 50, 35, 50, 40] : undefined);
  },

  /**
   * Huy tat ca rung dang dien ra
   */
  cancel() {
    try {
      Vibration.cancel();
    } catch {
      // Ignored
    }
  },
};
