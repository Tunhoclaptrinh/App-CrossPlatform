export interface GeoCityLocation {
  id: number;
  name: string;
  country: string;
  countryCode?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone?: string;
}

export interface CurrentWeather {
  time: string;
  temperature: number; // in °C
  apparentTemperature: number; // in °C (feels like)
  relativeHumidity: number; // in %
  isDay: boolean; // true = day, false = night
  precipitation: number; // in mm
  weatherCode: number; // WMO code
  windSpeed: number; // in km/h
  surfacePressure: number; // in hPa
}

export interface HourlyForecastItem {
  time: string; // ISO string e.g. "2026-09-21T14:00"
  hourLabel: string; // e.g. "14:00" or "Bây giờ"
  temperature: number; // in °C
  weatherCode: number;
  precipitationProbability: number; // in %
  relativeHumidity: number; // in %
  isDay: boolean;
}

export interface DailyForecastItem {
  date: string; // ISO string e.g. "2026-09-21"
  dayLabel: string; // e.g. "Hôm nay", "Thứ Hai"
  weatherCode: number;
  tempMax: number; // in °C
  tempMin: number; // in °C
  precipitationProbabilityMax: number; // in %
  sunrise: string;
  sunset: string;
}

export interface WeatherData {
  city: GeoCityLocation;
  current: CurrentWeather;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  lastUpdated: string;
}

export type WeatherCategory =
  | 'clear'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'thunderstorm';

export interface WeatherConditionInfo {
  labelVi: string;
  labelEn: string;
  category: WeatherCategory;
  accentColor: string;
}
