import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Thermometer } from 'lucide-react-native';
import { AppText } from '@/components';
import { useThemeMode } from '@/hooks';
import { weatherService } from '@/services/weather';
import type { CurrentWeatherCardProps } from '../types';
import {
  createWeatherStyles,
  getStatusBadgeStyle,
  getStatusBadgeTextStyle,
} from '../styles';
import { WeatherIcon } from './WeatherIcon';

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ weather, tempUnit }) => {
  const { t } = useTranslation();
  const { theme: themeColors, isDark } = useThemeMode();
  const styles = createWeatherStyles(themeColors, isDark);

  const { current, daily } = weather;
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

  return (
    <View style={styles.floatingHeroContainer}>
      {/* 1. Huy hiệu trạng thái thời tiết mờ kính */}
      <View style={styles.heroBadgeRow}>
        <View style={statusBadgeStyle}>
          <WeatherIcon weatherCode={current.weatherCode} isDay={current.isDay} size={15} />
          <AppText style={statusBadgeTextStyle}>{conditionInfo.labelVi}</AppText>
        </View>
      </View>

      {/* 2. Nhiệt độ khổng lồ không khung viền (Floating Giant Temp) */}
      <View style={styles.heroCenterBlock}>
        <View style={styles.heroIconBox}>
          <WeatherIcon
            weatherCode={current.weatherCode}
            isDay={current.isDay}
            size={76}
            color={conditionInfo.accentColor}
          />
        </View>
        <AppText style={styles.floatingBigTempText}>{currentTempStr}</AppText>
        <AppText style={styles.floatingConditionText}>{conditionInfo.labelVi}</AppText>
      </View>

      {/* 3. Biên độ nhiệt Max/Min & Cảm giác thực tế */}
      <View style={styles.floatingHighLowRow}>
        <AppText style={styles.floatingHighLowText}>
          {t('weather.highLow', { high: maxTempStr, low: minTempStr })}
        </AppText>
        <View style={styles.highLowDotDivider} />
        <View style={styles.floatingFeelsLikeCol}>
          <Thermometer size={13} color={isDark ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.65)'} />
          <AppText style={styles.floatingFeelsLikeText}>
            {' '}{t('weather.feelsLike')} {feelsLikeStr}
          </AppText>
        </View>
      </View>
    </View>
  );
};
