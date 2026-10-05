import {
  GeoCityLocation,
  WeatherData,
  CurrentWeather,
  HourlyForecastItem,
  DailyForecastItem,
  WeatherConditionInfo,
} from './types';
import { permissions } from '@/utils/permissions';

const FORECAST_BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export const DEFAULT_CITIES: GeoCityLocation[] = [
  {
    id: 1581130,
    name: 'Hà Nội',
    country: 'Việt Nam',
    countryCode: 'VN',
    latitude: 21.0285,
    longitude: 105.8542,
    timezone: 'Asia/Bangkok',
  },
  {
    id: 1566083,
    name: 'TP. Hồ Chí Minh',
    country: 'Việt Nam',
    countryCode: 'VN',
    latitude: 10.8231,
    longitude: 106.6297,
    timezone: 'Asia/Bangkok',
  },
  {
    id: 1583992,
    name: 'Đà Nẵng',
    country: 'Việt Nam',
    countryCode: 'VN',
    latitude: 16.0544,
    longitude: 108.2022,
    timezone: 'Asia/Bangkok',
  },
  {
    id: 1581298,
    name: 'Hải Phòng',
    country: 'Việt Nam',
    countryCode: 'VN',
    latitude: 20.8449,
    longitude: 106.6881,
    timezone: 'Asia/Bangkok',
  },
  {
    id: 1586203,
    name: 'Cần Thơ',
    country: 'Việt Nam',
    countryCode: 'VN',
    latitude: 10.0452,
    longitude: 105.7469,
    timezone: 'Asia/Bangkok',
  },
  {
    id: 1584071,
    name: 'Đà Lạt',
    country: 'Việt Nam',
    countryCode: 'VN',
    latitude: 11.9404,
    longitude: 108.4583,
    timezone: 'Asia/Bangkok',
  },
  {
    id: 1572151,
    name: 'Nha Trang',
    country: 'Việt Nam',
    countryCode: 'VN',
    latitude: 12.2388,
    longitude: 109.1967,
    timezone: 'Asia/Bangkok',
  },
  {
    id: 1850147,
    name: 'Tokyo',
    country: 'Nhật Bản',
    countryCode: 'JP',
    latitude: 35.6762,
    longitude: 139.6503,
    timezone: 'Asia/Tokyo',
  },
  {
    id: 2643743,
    name: 'London',
    country: 'Vương Quốc Anh',
    countryCode: 'GB',
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: 'Europe/London',
  },
  {
    id: 5128581,
    name: 'New York',
    country: 'Hoa Kỳ',
    countryCode: 'US',
    latitude: 40.7128,
    longitude: -74.006,
    timezone: 'America/New_York',
  },
];

/**
 * Phân loại mã thời tiết WMO tiêu chuẩn thành nhãn song ngữ và màu sắc biểu thị
 */
export function getWmoWeatherInfo(code: number, isDay = true): WeatherConditionInfo {
  switch (code) {
    case 0:
      return {
        labelVi: isDay ? 'Trời quang đãng' : 'Trời quang về đêm',
        labelEn: isDay ? 'Clear Sky' : 'Clear Night',
        category: 'clear',
        accentColor: isDay ? '#F59E0B' : '#6366F1',
      };
    case 1:
      return {
        labelVi: 'Trời ít mây',
        labelEn: 'Mainly Clear',
        category: 'clear',
        accentColor: isDay ? '#FBBF24' : '#818CF8',
      };
    case 2:
      return {
        labelVi: 'Mây rải rác',
        labelEn: 'Partly Cloudy',
        category: 'cloudy',
        accentColor: '#38BDF8',
      };
    case 3:
      return {
        labelVi: 'Nhiều mây u ám',
        labelEn: 'Overcast',
        category: 'cloudy',
        accentColor: '#94A3B8',
      };
    case 45:
    case 48:
      return {
        labelVi: 'Sương mù dày đặc',
        labelEn: 'Foggy',
        category: 'fog',
        accentColor: '#64748B',
      };
    case 51:
    case 53:
    case 55:
      return {
        labelVi: 'Mưa phùn nhẹ',
        labelEn: 'Drizzle',
        category: 'drizzle',
        accentColor: '#0EA5E9',
      };
    case 56:
    case 57:
      return {
        labelVi: 'Mưa phùn buốt giá',
        labelEn: 'Freezing Drizzle',
        category: 'drizzle',
        accentColor: '#06B6D4',
      };
    case 61:
      return {
        labelVi: 'Mưa rào nhẹ',
        labelEn: 'Slight Rain',
        category: 'rain',
        accentColor: '#0284C7',
      };
    case 63:
      return {
        labelVi: 'Mưa rào vừa',
        labelEn: 'Moderate Rain',
        category: 'rain',
        accentColor: '#2563EB',
      };
    case 65:
      return {
        labelVi: 'Mưa rào to',
        labelEn: 'Heavy Rain',
        category: 'rain',
        accentColor: '#1D4ED8',
      };
    case 66:
    case 67:
      return {
        labelVi: 'Mưa tuyết lạnh giá',
        labelEn: 'Freezing Rain',
        category: 'rain',
        accentColor: '#0284C7',
      };
    case 71:
    case 73:
    case 75:
    case 77:
      return {
        labelVi: 'Tuyết rơi',
        labelEn: 'Snow Fall',
        category: 'snow',
        accentColor: '#E0F2FE',
      };
    case 80:
      return {
        labelVi: 'Mưa rào thoáng qua',
        labelEn: 'Light Showers',
        category: 'rain',
        accentColor: '#0284C7',
      };
    case 81:
    case 82:
      return {
        labelVi: 'Mưa rào xối xả',
        labelEn: 'Violent Showers',
        category: 'rain',
        accentColor: '#1E40AF',
      };
    case 85:
    case 86:
      return {
        labelVi: 'Tuyết rào dày',
        labelEn: 'Snow Showers',
        category: 'snow',
        accentColor: '#BAE6FD',
      };
    case 95:
      return {
        labelVi: 'Dông bão có sấm sét',
        labelEn: 'Thunderstorm',
        category: 'thunderstorm',
        accentColor: '#7C3AED',
      };
    case 96:
    case 99:
      return {
        labelVi: 'Dông lốc kèm mưa đá',
        labelEn: 'Thunderstorm with Hail',
        category: 'thunderstorm',
        accentColor: '#6D28D9',
      };
    default:
      return {
        labelVi: 'Thời tiết bình thường',
        labelEn: 'Moderate',
        category: 'cloudy',
        accentColor: '#38BDF8',
      };
  }
}

/**
 * Chuyển đổi nhiệt độ độ C sang độ F
 */
export function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32);
}

/**
 * Định dạng nhiệt độ hiển thị theo đơn vị lựa chọn
 */
export function formatTemperature(
  tempC: number,
  unit: 'celsius' | 'fahrenheit' = 'celsius',
): string {
  const value = unit === 'fahrenheit' ? celsiusToFahrenheit(tempC) : Math.round(tempC);
  return `${value}°`;
}

/**
 * Định dạng tên thứ theo tiếng Việt
 */
function getVietnameseDayLabel(dateStr: string, index: number): string {
  if (index === 0) {
    return 'Hôm nay';
  }
  const date = new Date(dateStr);
  const day = date.getDay();
  switch (day) {
    case 0:
      return 'Chủ Nhật';
    case 1:
      return 'Thứ Hai';
    case 2:
      return 'Thứ Ba';
    case 3:
      return 'Thứ Tư';
    case 4:
      return 'Thứ Năm';
    case 5:
      return 'Thứ Sáu';
    case 6:
      return 'Thứ Bảy';
    default:
      return dateStr;
  }
}

/**
 * Chuyển đổi hướng gió dạng độ (0 - 360) sang hướng la bàn tiếng Việt
 */
export function getWindDirectionInfo(degrees: number): {
  code: string;
  labelVi: string;
  degrees: number;
} {
  const directions = [
    { code: 'N', labelVi: 'Bắc' },
    { code: 'NE', labelVi: 'Đông Bắc' },
    { code: 'E', labelVi: 'Đông' },
    { code: 'SE', labelVi: 'Đông Nam' },
    { code: 'S', labelVi: 'Nam' },
    { code: 'SW', labelVi: 'Tây Nam' },
    { code: 'W', labelVi: 'Tây' },
    { code: 'NW', labelVi: 'Tây Bắc' },
  ];
  const normalized = ((Math.round(degrees) % 360) + 360) % 360;
  const index = Math.round(normalized / 45) % 8;
  return {
    ...directions[index],
    degrees: normalized,
  };
}

/**
 * Phân loại chỉ số UV thành mức độ cảnh báo và màu sắc tương ứng
 */
export function getUvIndexInfo(uv: number): {
  levelVi: string;
  color: string;
  adviceVi: string;
} {
  if (uv < 3) {
    return {
      levelVi: 'Thấp',
      color: '#10B981',
      adviceVi: 'An toàn khi hoạt động ngoài trời, không cần che chắn đặc biệt.',
    };
  }
  if (uv < 6) {
    return {
      levelVi: 'Trung bình',
      color: '#F59E0B',
      adviceVi: 'Nên đeo kính râm và bôi kem chống nắng khi ra nắng.',
    };
  }
  if (uv < 8) {
    return {
      levelVi: 'Cao',
      color: '#F97316',
      adviceVi: 'Cần mặc áo chống nắng, đội nón rộng vành từ 10h đến 16h.',
    };
  }
  if (uv < 11) {
    return {
      levelVi: 'Rất cao',
      color: '#EF4444',
      adviceVi: 'Hạn chế ra ngoài vào giờ cao điểm nắng gắt.',
    };
  }
  return {
    levelVi: 'Nguy hiểm',
    color: '#7C3AED',
    adviceVi: 'Cực kỳ nguy hiểm! Tránh tiếp xúc trực tiếp với ánh nắng mặt trời.',
  };
}

/**
 * Gọi API Open-Meteo để lấy thông tin dự báo thời tiết đầy đủ
 */
export async function fetchWeatherForecast(city: GeoCityLocation): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: city.latitude.toString(),
    longitude: city.longitude.toString(),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'weather_code',
      'wind_speed_10m',
      'wind_direction_10m',
      'surface_pressure',
      'uv_index',
      'visibility',
    ].join(','),
    hourly: [
      'temperature_2m',
      'apparent_temperature',
      'weather_code',
      'precipitation_probability',
      'precipitation',
      'relative_humidity_2m',
      'wind_speed_10m',
      'wind_direction_10m',
      'uv_index',
      'is_day',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_probability_max',
      'precipitation_sum',
      'uv_index_max',
      'wind_speed_10m_max',
      'wind_direction_10m_dominant',
      'sunrise',
      'sunset',
    ].join(','),
    timezone: 'auto',
  });

  const url = `${FORECAST_BASE_URL}?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Open-Meteo API Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // 1. Phân tích dữ liệu hiện tại
  const windDirDeg = Math.round(data.current?.wind_direction_10m ?? 0);
  const uvVal = Number(data.current?.uv_index ?? 0);
  const uvInfo = getUvIndexInfo(uvVal);
  const windDirInfo = getWindDirectionInfo(windDirDeg);

  const current: CurrentWeather = {
    time: data.current?.time || new Date().toISOString(),
    temperature: data.current?.temperature_2m ?? 25,
    apparentTemperature: data.current?.apparent_temperature ?? data.current?.temperature_2m ?? 25,
    relativeHumidity: data.current?.relative_humidity_2m ?? 70,
    isDay: data.current?.is_day === 1,
    precipitation: Number(data.current?.precipitation ?? 0),
    weatherCode: data.current?.weather_code ?? 0,
    windSpeed: data.current?.wind_speed_10m ?? 0,
    windDirection: windDirDeg,
    windDirectionCardinal: windDirInfo.labelVi,
    uvIndex: uvVal,
    uvIndexLevel: uvInfo.levelVi,
    surfacePressure: Math.round(data.current?.surface_pressure ?? 1013),
    visibility: Math.round((data.current?.visibility ?? 10000) / 1000), // mét -> km
  };

  // 2. Phân tích dữ liệu 24 giờ tới (Lọc từ giờ hiện tại)
  const hourlyTimes: string[] = data.hourly?.time || [];
  const hourlyTemps: number[] = data.hourly?.temperature_2m || [];
  const hourlyApparent: number[] = data.hourly?.apparent_temperature || [];
  const hourlyCodes: number[] = data.hourly?.weather_code || [];
  const hourlyPrecipProb: number[] = data.hourly?.precipitation_probability || [];
  const hourlyPrecip: number[] = data.hourly?.precipitation || [];
  const hourlyHumidity: number[] = data.hourly?.relative_humidity_2m || [];
  const hourlyWindSpeed: number[] = data.hourly?.wind_speed_10m || [];
  const hourlyWindDir: number[] = data.hourly?.wind_direction_10m || [];
  const hourlyUv: number[] = data.hourly?.uv_index || [];
  const hourlyIsDay: number[] = data.hourly?.is_day || [];

  // Tìm index gần nhất với thời gian hiện tại
  const nowHourStr = current.time.slice(0, 13); // "YYYY-MM-DDTHH"
  let startIndex = hourlyTimes.findIndex((t) => t.startsWith(nowHourStr));
  if (startIndex === -1) {
    startIndex = 0;
  }

  const hourly: HourlyForecastItem[] = [];
  const maxHours = Math.min(startIndex + 24, hourlyTimes.length);

  for (let i = startIndex; i < maxHours; i++) {
    const timeStr = hourlyTimes[i];
    const hourOnly = timeStr.split('T')[1]?.slice(0, 5) || '';
    const isFirst = i === startIndex;

    hourly.push({
      time: timeStr,
      hourLabel: isFirst ? 'Bây giờ' : hourOnly,
      temperature: Math.round(hourlyTemps[i] ?? current.temperature),
      apparentTemperature: Math.round(hourlyApparent[i] ?? current.apparentTemperature),
      weatherCode: hourlyCodes[i] ?? current.weatherCode,
      precipitationProbability: hourlyPrecipProb[i] ?? 0,
      precipitation: Number(hourlyPrecip[i] ?? 0),
      relativeHumidity: hourlyHumidity[i] ?? 70,
      windSpeed: Math.round(hourlyWindSpeed[i] ?? current.windSpeed),
      windDirection: Math.round(hourlyWindDir[i] ?? current.windDirection),
      uvIndex: Number(hourlyUv[i] ?? 0),
      isDay: hourlyIsDay[i] === 1,
    });
  }

  // 3. Phân tích dữ liệu 7 ngày tới
  const dailyTimes: string[] = data.daily?.time || [];
  const dailyCodes: number[] = data.daily?.weather_code || [];
  const dailyMaxTemps: number[] = data.daily?.temperature_2m_max || [];
  const dailyMinTemps: number[] = data.daily?.temperature_2m_min || [];
  const dailyPrecipMax: number[] = data.daily?.precipitation_probability_max || [];
  const dailyPrecipSum: number[] = data.daily?.precipitation_sum || [];
  const dailyUvMax: number[] = data.daily?.uv_index_max || [];
  const dailyWindMax: number[] = data.daily?.wind_speed_10m_max || [];
  const dailyWindDir: number[] = data.daily?.wind_direction_10m_dominant || [];
  const dailySunrises: string[] = data.daily?.sunrise || [];
  const dailySunsets: string[] = data.daily?.sunset || [];

  const daily: DailyForecastItem[] = [];
  const daysCount = Math.min(dailyTimes.length, 7);

  for (let i = 0; i < daysCount; i++) {
    daily.push({
      date: dailyTimes[i],
      dayLabel: getVietnameseDayLabel(dailyTimes[i], i),
      weatherCode: dailyCodes[i] ?? 0,
      tempMax: Math.round(dailyMaxTemps[i] ?? 30),
      tempMin: Math.round(dailyMinTemps[i] ?? 20),
      precipitationProbabilityMax: dailyPrecipMax[i] ?? 0,
      precipitationSum: Number(dailyPrecipSum[i] ?? 0),
      uvIndexMax: Number(dailyUvMax[i] ?? 5),
      windSpeedMax: Math.round(dailyWindMax[i] ?? 10),
      windDirectionDominant: Math.round(dailyWindDir[i] ?? 0),
      sunrise: dailySunrises[i] ? dailySunrises[i].split('T')[1]?.slice(0, 5) : '05:30',
      sunset: dailySunsets[i] ? dailySunsets[i].split('T')[1]?.slice(0, 5) : '18:00',
    });
  }

  return {
    city,
    current,
    hourly,
    daily,
    lastUpdated: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
  };
}

/**
 * Tìm kiếm danh sách thành phố toàn cầu bằng Open-Meteo Geocoding API
 */
export async function searchCities(query: string): Promise<GeoCityLocation[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) {
    return [];
  }

  const params = new URLSearchParams({
    name: trimmed,
    count: '8',
    language: 'vi',
    format: 'json',
  });

  const response = await fetch(`${GEOCODING_BASE_URL}?${params.toString()}`);
  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  if (!data.results || !Array.isArray(data.results)) {
    return [];
  }

  return data.results.map((item: Record<string, unknown>) => ({
    id: Number(item.id),
    name: String(item.name || ''),
    country: String(item.country || ''),
    countryCode: item.country_code ? String(item.country_code) : undefined,
    admin1: item.admin1 ? String(item.admin1) : undefined,
    latitude: Number(item.latitude),
    longitude: Number(item.longitude),
    timezone: item.timezone ? String(item.timezone) : undefined,
  }));
}

/**
 * Lấy vị trí thiết bị hiện tại (GPS / IP Geolocation fallback)
 */
export async function getCurrentLocationCity(): Promise<GeoCityLocation> {
  const hasPermission = await permissions.requestLocation();
  if (!hasPermission) {
    throw new Error('Quyền vị trí bị từ chối. Vui lòng cấp quyền trong Cài đặt.');
  }

  try {
    const res = await fetch(
      'http://ip-api.com/json/?fields=status,city,regionName,country,countryCode,lat,lon',
      { headers: { Accept: 'application/json' } }
    );
    if (res.ok) {
      const info = await res.json();
      if (info && info.status === 'success') {
        return {
          id: Math.round(Number(info.lat) * 1000 + Number(info.lon) * 100),
          name: info.city || info.regionName || 'Vị trí của bạn',
          country: info.country || 'Việt Nam',
          countryCode: info.countryCode || 'VN',
          admin1: info.regionName,
          latitude: Number(info.lat),
          longitude: Number(info.lon),
        };
      }
    }
  } catch (err) {
    console.warn('[weatherService] IP location fallback error:', err);
  }

  return DEFAULT_CITIES[0];
}

export const weatherService = {
  DEFAULT_CITIES,
  fetchWeatherForecast,
  searchCities,
  getWmoWeatherInfo,
  getWindDirectionInfo,
  getUvIndexInfo,
  getCurrentLocationCity,
  celsiusToFahrenheit,
  formatTemperature,
};
