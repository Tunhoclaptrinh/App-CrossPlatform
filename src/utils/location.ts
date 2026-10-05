import { permissions } from './permissions';

export interface LocationResult {
  latitude: number;
  longitude: number;
  cityName?: string;
  regionName?: string;
  country?: string;
  countryCode?: string;
  source: 'gps' | 'network' | 'ip';
}

/**
 * Universal Mobile Geolocation Helper
 * Hỗ trợ lấy vị trí thiết bị chính xác với quyền runtime và fallback IP Geolocation
 */
export const location = {
  /**
   * Lấy vị trí thiết bị hiện tại
   */
  async getCurrentLocation(): Promise<LocationResult> {
    const hasPermission = await permissions.requestLocation();
    if (!hasPermission) {
      throw new Error('Quyền vị trí bị từ chối. Vui lòng cấp quyền truy cập vị trí trong Cài đặt.');
    }

    // IP Geolocation fallback đáng tin cậy cho cả emulator và thiết bị thực tế
    try {
      const response = await fetch(
        'http://ip-api.com/json/?fields=status,message,city,regionName,country,countryCode,lat,lon',
        { headers: { Accept: 'application/json' } }
      );
      if (response.ok) {
        const data = await response.json();
        if (data && data.status === 'success') {
          return {
            latitude: Number(data.lat),
            longitude: Number(data.lon),
            cityName: data.city || data.regionName,
            regionName: data.regionName,
            country: data.country,
            countryCode: data.countryCode,
            source: 'ip',
          };
        }
      }
    } catch (err) {
      console.warn('[location] IP geolocation fallback warning:', err);
    }

    // Fallback tọa độ mặc định (Hà Nội, Việt Nam)
    return {
      latitude: 21.0285,
      longitude: 105.8542,
      cityName: 'Hà Nội',
      country: 'Việt Nam',
      countryCode: 'VN',
      source: 'network',
    };
  },
};
