import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Droplets, Wind, CloudRain, Compass } from 'lucide-react-native';
import { AppText } from '@/components';
import { useThemeMode } from '@/hooks';
import type { CurrentWeather, DailyForecastItem } from '@/services/weather/types';
import {
  createWeatherStyles,
  getMetricIconBoxStyle,
} from '../styles';

interface WeatherMetricsGridProps {
  current: CurrentWeather;
  daily: DailyForecastItem[];
}

export const WeatherMetricsGrid: React.FC<WeatherMetricsGridProps> = ({ current, daily }) => {
  const { t } = useTranslation();
  const { theme: themeColors, isDark } = useThemeMode();
  const styles = createWeatherStyles(themeColors, isDark);

  const rainProbability = daily[0]?.precipitationProbabilityMax ?? 0;
  const humidityIconStyle = [styles.metricIconBox, getMetricIconBoxStyle('#0EA5E9')];
  const windIconStyle = [styles.metricIconBox, getMetricIconBoxStyle('#10B981')];
  const rainIconStyle = [styles.metricIconBox, getMetricIconBoxStyle('#3B82F6')];
  const pressureIconStyle = [styles.metricIconBox, getMetricIconBoxStyle('#8B5CF6')];

  return (
    <View style={styles.metricsGrid}>
      {/* 1. Độ ẩm không khí */}
      <View style={styles.metricTile}>
        <View style={styles.metricTileHeader}>
          <View style={humidityIconStyle}>
            <Droplets size={12} color="#0EA5E9" />
          </View>
          <AppText variant="caption" numberOfLines={1} style={styles.metricLabel}>
            {t('weather.humidity')}
          </AppText>
        </View>
        <AppText style={styles.metricValue}>{current.relativeHumidity}%</AppText>
      </View>

      {/* 2. Tốc độ gió */}
      <View style={styles.metricTile}>
        <View style={styles.metricTileHeader}>
          <View style={windIconStyle}>
            <Wind size={12} color="#10B981" />
          </View>
          <AppText variant="caption" numberOfLines={1} style={styles.metricLabel}>
            {t('weather.windSpeed')}
          </AppText>
        </View>
        <AppText style={styles.metricValue}>{current.windSpeed} km/h</AppText>
      </View>

      {/* 3. Khả năng mưa */}
      <View style={styles.metricTile}>
        <View style={styles.metricTileHeader}>
          <View style={rainIconStyle}>
            <CloudRain size={12} color="#3B82F6" />
          </View>
          <AppText variant="caption" numberOfLines={1} style={styles.metricLabel}>
            {t('weather.rainProbability')}
          </AppText>
        </View>
        <AppText style={styles.metricValue}>{rainProbability}%</AppText>
      </View>

      {/* 4. Áp suất khí quyển */}
      <View style={styles.metricTile}>
        <View style={styles.metricTileHeader}>
          <View style={pressureIconStyle}>
            <Compass size={12} color="#8B5CF6" />
          </View>
          <AppText variant="caption" numberOfLines={1} style={styles.metricLabel}>
            {t('weather.pressure')}
          </AppText>
        </View>
        <AppText style={styles.metricValue}>{Math.round(current.surfacePressure)} hPa</AppText>
      </View>
    </View>
  );
};
