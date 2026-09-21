import React from 'react';
import {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from 'lucide-react-native';
import type { WeatherIconProps } from '../types';

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  weatherCode,
  isDay = true,
  size = 28,
  color,
}) => {
  // 0: Clear sky
  if (weatherCode === 0) {
    if (isDay) {
      return <Sun size={size} color={color || '#F59E0B'} />;
    }
    return <Moon size={size} color={color || '#818CF8'} />;
  }

  // 1, 2: Mainly clear, partly cloudy
  if (weatherCode === 1 || weatherCode === 2) {
    if (isDay) {
      return <CloudSun size={size} color={color || '#38BDF8'} />;
    }
    return <CloudMoon size={size} color={color || '#94A3B8'} />;
  }

  // 3: Overcast
  if (weatherCode === 3) {
    return <Cloud size={size} color={color || '#94A3B8'} />;
  }

  // 45, 48: Fog
  if (weatherCode === 45 || weatherCode === 48) {
    return <CloudFog size={size} color={color || '#64748B'} />;
  }

  // 51, 53, 55, 56, 57: Drizzle
  if (weatherCode >= 51 && weatherCode <= 57) {
    return <CloudDrizzle size={size} color={color || '#0EA5E9'} />;
  }

  // 61, 63, 65, 66, 67, 80, 81, 82: Rain
  if (
    (weatherCode >= 61 && weatherCode <= 67) ||
    (weatherCode >= 80 && weatherCode <= 82)
  ) {
    return <CloudRain size={size} color={color || '#2563EB'} />;
  }

  // 71, 73, 75, 77, 85, 86: Snow
  if (
    (weatherCode >= 71 && weatherCode <= 77) ||
    (weatherCode >= 85 && weatherCode <= 86)
  ) {
    return <CloudSnow size={size} color={color || '#7DD3FC'} />;
  }

  // 95, 96, 99: Thunderstorm
  if (weatherCode >= 95 && weatherCode <= 99) {
    return <CloudLightning size={size} color={color || '#7C3AED'} />;
  }

  return <Cloud size={size} color={color || '#38BDF8'} />;
};
