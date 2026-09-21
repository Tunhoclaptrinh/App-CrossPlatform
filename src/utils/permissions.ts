import { PermissionsAndroid, Platform } from 'react-native';

/**
 * Universal Mobile Permissions Helper (Android runtime permissions & iOS safe passthrough)
 */
export const permissions = {
  /**
   * Xin quyen truy cap Camera
   */
  async requestCamera(): Promise<boolean> {
    if (Platform.OS !== 'android') return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Quyền Truy Cập Camera',
          message: 'Ứng dụng cần quyền Camera để chụp ảnh và quét mã QR.',
          buttonPositive: 'Đồng ý',
          buttonNegative: 'Từ chối',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('[permissions] Camera request error:', err);
      return false;
    }
  },

  /**
   * Xin quyen doc Bo nho / Thu vien anh
   */
  async requestPhotoLibrary(): Promise<boolean> {
    if (Platform.OS !== 'android') return true;

    try {
      // Android 13+ (API 33) su dung READ_MEDIA_IMAGES
      const permission =
        Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

      const granted = await PermissionsAndroid.request(permission, {
        title: 'Quyền Truy Cập Thư Viện Ảnh',
        message: 'Ứng dụng cần truy cập thư viện ảnh để chọn hình ảnh tải lên.',
        buttonPositive: 'Đồng ý',
        buttonNegative: 'Từ chối',
      });
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('[permissions] Photo request error:', err);
      return false;
    }
  },

  /**
   * Xin quyen gui Thong bao (Android 13+)
   */
  async requestNotifications(): Promise<boolean> {
    if (Platform.OS !== 'android' || Platform.Version < 33) return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Quyền Gửi Thông Báo',
          message: 'Ứng dụng cần gửi thông báo để cập nhật tin tức và nhắc nhở bạn.',
          buttonPositive: 'Đồng ý',
          buttonNegative: 'Từ chối',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('[permissions] Notification request error:', err);
      return false;
    }
  },

  /**
   * Xin quyen ghi am / Microphone
   */
  async requestMicrophone(): Promise<boolean> {
    if (Platform.OS !== 'android') return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Quyền Sử Dụng Microphone',
          message: 'Ứng dụng cần quyền Microphone để thu âm giọng nói hoặc gọi thoại.',
          buttonPositive: 'Đồng ý',
          buttonNegative: 'Từ chối',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('[permissions] Microphone request error:', err);
      return false;
    }
  },

  /**
   * Xin quyen vi tri / Location
   */
  async requestLocation(): Promise<boolean> {
    if (Platform.OS !== 'android') return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Quyền Truy Cập Vị Trí',
          message: 'Ứng dụng cần vị trí chính xác để định vị bản đồ và giao hàng.',
          buttonPositive: 'Đồng ý',
          buttonNegative: 'Từ chối',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('[permissions] Location request error:', err);
      return false;
    }
  },
};

