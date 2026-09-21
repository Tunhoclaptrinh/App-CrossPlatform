import {
  GeoCityLocation,
  WeatherData,
  CurrentWeather,
  HourlyForecastItem,
  DailyForecastItem,
  WeatherConditionInfo,
} from './types';

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
      'surface_pressure',
    ].join(','),
    hourly: [
      'temperature_2m',
      'weather_code',
      'precipitation_probability',
      'relative_humidity_2m',
      'is_day',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_probability_max',
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
  const current: CurrentWeather = {
    time: data.current?.time || new Date().toISOString(),
    temperature: data.current?.temperature_2m ?? 25,
    apparentTemperature: data.current?.apparent_temperature ?? data.current?.temperature_2m ?? 25,
    relativeHumidity: data.current?.relative_humidity_2m ?? 70,
    isDay: data.current?.is_day === 1,
    precipitation: data.current?.precipitation ?? 0,
    weatherCode: data.current?.weather_code ?? 0,
    windSpeed: data.current?.wind_speed_10m ?? 0,
    surfacePressure: Math.round(data.current?.surface_pressure ?? 1013),
  };

  // 2. Phân tích dữ liệu 24 giờ tới (Lọc từ giờ hiện tại)
  const hourlyTimes: string[] = data.hourly?.time || [];
  const hourlyTemps: number[] = data.hourly?.temperature_2m || [];
  const hourlyCodes: number[] = data.hourly?.weather_code || [];
  const hourlyPrecipProb: number[] = data.hourly?.precipitation_probability || [];
  const hourlyHumidity: number[] = data.hourly?.relative_humidity_2m || [];
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
      weatherCode: hourlyCodes[i] ?? current.weatherCode,
      precipitationProbability: hourlyPrecipProb[i] ?? 0,
      relativeHumidity: hourlyHumidity[i] ?? 70,
      isDay: hourlyIsDay[i] === 1,
    });
  }

  // 3. Phân tích dữ liệu 7 ngày tới
  const dailyTimes: string[] = data.daily?.time || [];
  const dailyCodes: number[] = data.daily?.weather_code || [];
  const dailyMaxTemps: number[] = data.daily?.temperature_2m_max || [];
  const dailyMinTemps: number[] = data.daily?.temperature_2m_min || [];
  const dailyPrecipMax: number[] = data.daily?.precipitation_probability_max || [];
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

export const weatherService = {
  DEFAULT_CITIES,
  fetchWeatherForecast,
  searchCities,
  getWmoWeatherInfo,
  celsiusToFahrenheit,
  formatTemperature,
};
