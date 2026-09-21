import { Vibration, Platform } from 'react-native';

/**
 * Universal Haptic & Vibration Feedback Helper
 * Mang lai cam giac phan hoi xuc giac (haptic) cao cap khi cham nut hoac thao tac tren dien thoai.
 */
export const haptics = {
  /**
   * Rung nhe khi cham nut hoac chuyen tab
   */
  light() {
    if (Platform.OS === 'android') {
      Vibration.vibrate(10);
    } else {
      Vibration.vibrate();
    }
  },

  /**
   * Rung vua (Medium impact)
   */
  medium() {
    if (Platform.OS === 'android') {
      Vibration.vibrate(25);
    } else {
      Vibration.vibrate();
    }
  },

  /**
   * Rung manh khi nhan giu hoac xoa
   */
  heavy() {
    if (Platform.OS === 'android') {
      Vibration.vibrate(45);
    } else {
      Vibration.vibrate();
    }
  },

  /**
   * Nhip rung thong bao thanh cong
   */
  success() {
    if (Platform.OS === 'android') {
      Vibration.vibrate([0, 15, 60, 25]);
    } else {
      Vibration.vibrate();
    }
  },

  /**
   * Nhip rung canh bao loi
   */
  error() {
    if (Platform.OS === 'android') {
      Vibration.vibrate([0, 35, 50, 35, 50, 40]);
    } else {
      Vibration.vibrate();
    }
  },

  /**
   * Huy tat ca rung dang dien ra
   */
  cancel() {
    Vibration.cancel();
  },
};
