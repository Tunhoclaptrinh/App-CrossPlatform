import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';
import type {
  WeatherData,
  GeoCityLocation,
  HourlyForecastItem,
  DailyForecastItem,
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
}

export interface HourlyForecastProps {
  hourly: HourlyForecastItem[];
  tempUnit: TemperatureUnit;
}

export interface DailyForecastProps {
  daily: DailyForecastItem[];
  tempUnit: TemperatureUnit;
}

export interface CitySearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectCity: (city: GeoCityLocation) => void;
  savedCities: GeoCityLocation[];
}
