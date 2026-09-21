import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Droplets, Wind, CloudRain, Compass, Thermometer } from 'lucide-react-native';
import { AppText } from '@/components';
import { useThemeMode } from '@/hooks';
import { weatherService } from '@/services/weather';
import type { CurrentWeatherCardProps } from '../types';
import {
  createWeatherStyles,
  getStatusBadgeStyle,
  getStatusBadgeTextStyle,
  getMetricIconBoxStyle,
} from '../styles';
import { WeatherIcon } from './WeatherIcon';

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ weather, tempUnit }) => {
  const { t } = useTranslation();
  const { theme: themeColors, isDark } = useThemeMode();
  const styles = createWeatherStyles(themeColors, isDark);

  const { current, daily, lastUpdated } = weather;
  const conditionInfo = weatherService.getWmoWeatherInfo(current.weatherCode, current.isDay);

  // Lấy nhiệt độ Max/Min của ngày hôm nay
  const todayDaily = daily[0];
  const maxTempStr = todayDaily
    ? weatherService.formatTemperature(todayDaily.tempMax, tempUnit)
    : '--';
  const minTempStr = todayDaily
    ? weatherService.formatTemperature(todayDaily.tempMin, tempUnit)
    : '--';

  const currentTempStr = weatherService.formatTemperature(current.temperature, tempUnit);
  const feelsLikeStr = weatherService.formatTemperature(current.apparentTemperature, tempUnit);

  const statusBadgeStyle = [styles.statusBadge, getStatusBadgeStyle(conditionInfo.accentColor)];
  const statusBadgeTextStyle = [
    styles.statusBadgeText,
    getStatusBadgeTextStyle(conditionInfo.accentColor),
  ];

  const humidityIconStyle = [styles.metricIconBox, getMetricIconBoxStyle('#0EA5E9')];
  const windIconStyle = [styles.metricIconBox, getMetricIconBoxStyle('#10B981')];
  const rainIconStyle = [styles.metricIconBox, getMetricIconBoxStyle('#3B82F6')];
  const pressureIconStyle = [styles.metricIconBox, getMetricIconBoxStyle('#8B5CF6')];

  return (
    <View style={styles.heroCard}>
      {/* 1. Badge trạng thái & Thời gian cập nhật */}
      <View style={styles.heroBadgeRow}>
        <View style={statusBadgeStyle}>
          <WeatherIcon weatherCode={current.weatherCode} isDay={current.isDay} size={16} />
          <AppText style={statusBadgeTextStyle}>{conditionInfo.labelVi}</AppText>
        </View>

        <AppText style={styles.updatedAtText}>
          {t('weather.lastUpdated')}: {lastUpdated}
        </AppText>
      </View>

      {/* 2. Nhiệt độ lớn & Icon thời tiết khổng lồ */}
      <View style={styles.heroMainRow}>
        <View style={styles.heroTempCol}>
          <AppText style={styles.bigTempText}>{currentTempStr}</AppText>
          <AppText style={styles.conditionLabelText}>{conditionInfo.labelVi}</AppText>
          <AppText style={styles.highLowText}>
            {t('weather.highLow', { high: maxTempStr, low: minTempStr })}
          </AppText>
        </View>

        <View style={styles.heroIconCol}>
          <WeatherIcon
            weatherCode={current.weatherCode}
            isDay={current.isDay}
            size={72}
            color={conditionInfo.accentColor}
          />
        </View>
      </View>

      {/* 3. Cảm giác như... */}
      <View style={styles.feelsLikeRow}>
        <Thermometer size={14} color={themeColors.textSecondary} />
        <AppText style={styles.feelsLikeText}>
          {' '}
          {t('weather.feelsLike')} {feelsLikeStr}
        </AppText>
      </View>

      {/* 4. Lưới 4 chỉ số khí quyển */}
      <View style={styles.metricsGrid}>
        {/* Độ ẩm */}
        <View style={styles.metricItem}>
          <View style={humidityIconStyle}>
            <Droplets size={18} color="#0EA5E9" />
          </View>
          <View style={styles.metricTextCol}>
            <AppText style={styles.metricLabel}>{t('weather.humidity')}</AppText>
            <AppText style={styles.metricValue}>{current.relativeHumidity}%</AppText>
          </View>
        </View>

        {/* Tốc độ gió */}
        <View style={styles.metricItem}>
          <View style={windIconStyle}>
            <Wind size={18} color="#10B981" />
          </View>
          <View style={styles.metricTextCol}>
            <AppText style={styles.metricLabel}>{t('weather.wind')}</AppText>
            <AppText style={styles.metricValue}>{current.windSpeed} km/h</AppText>
          </View>
        </View>

        {/* Lượng mưa */}
        <View style={styles.metricItem}>
          <View style={rainIconStyle}>
            <CloudRain size={18} color="#3B82F6" />
          </View>
          <View style={styles.metricTextCol}>
            <AppText style={styles.metricLabel}>{t('weather.precipitation')}</AppText>
            <AppText style={styles.metricValue}>{current.precipitation} mm</AppText>
          </View>
        </View>

        {/* Áp suất */}
        <View style={styles.metricItem}>
          <View style={pressureIconStyle}>
            <Compass size={18} color="#8B5CF6" />
          </View>
          <View style={styles.metricTextCol}>
            <AppText style={styles.metricLabel}>{t('weather.pressure')}</AppText>
            <AppText style={styles.metricValue}>{current.surfacePressure} hPa</AppText>
          </View>
        </View>
      </View>
    </View>
  );
};
