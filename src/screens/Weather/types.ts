import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';
import type {
  WeatherData,
  GeoCityLocation,
  HourlyForecastItem,
  DailyForecastItem,
  CurrentWeather,
} from '@/services/weather';
import type { TemperatureUnit } from '@/hooks/useWeatherStore';

export type WeatherScreenProps = NativeStackScreenProps<RootStackParamList, 'Weather'>;

export interface WeatherIconProps {
  weatherCode: number;
  isDay?: boolean;
  size?: number;
  color?: string;
}

export interface CurrentWeatherCardProps {
  weather: WeatherData;
  tempUnit: TemperatureUnit;
  onPressCard?: () => void;
}

export interface HourlyForecastProps {
  hourly: HourlyForecastItem[];
  tempUnit: TemperatureUnit;
  onSelectHour?: (hour: HourlyForecastItem) => void;
}

export interface DailyForecastProps {
  daily: DailyForecastItem[];
  tempUnit: TemperatureUnit;
  onSelectDay?: (day: DailyForecastItem) => void;
}

export interface WeatherMetricsGridProps {
  current: CurrentWeather;
  daily: DailyForecastItem[];
  tempUnit: TemperatureUnit;
  onSelectMetric?: (metricKey: string) => void;
}

export type WeatherDetailTarget =
  | { type: 'current'; current: CurrentWeather; city: GeoCityLocation; sunrise?: string; sunset?: string }
  | { type: 'hourly'; hour: HourlyForecastItem; cityName: string }
  | { type: 'daily'; day: DailyForecastItem; cityName: string };

export interface WeatherDetailModalProps {
  visible: boolean;
  onClose: () => void;
  target: WeatherDetailTarget | null;
  tempUnit: TemperatureUnit;
}

export interface CitySearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectCity: (city: GeoCityLocation) => void;
  savedCities: GeoCityLocation[];
}
