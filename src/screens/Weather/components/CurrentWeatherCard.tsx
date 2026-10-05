import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Thermometer } from 'lucide-react-native';
import { AppText } from '@/components';
import { useThemeMode } from '@/hooks';
import { weatherService } from '@/services/weather';
import { haptics } from '@/utils';
import type { CurrentWeatherCardProps } from '../types';
import { createWeatherStyles } from '../styles';
import { WeatherIcon } from './WeatherIcon';

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  weather,
  tempUnit,
  onPressCard,
}) => {
  const { t } = useTranslation();
  const { theme: themeColors, isDark, radiusTokens } = useThemeMode();
  const styles = createWeatherStyles(themeColors, isDark, radiusTokens);

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

  const handlePress = () => {
    if (onPressCard) {
      haptics.light();
      onPressCard();
    }
  };

  return (
    <TouchableOpacity
      style={styles.floatingHeroContainer}
      activeOpacity={0.85}
      onPress={handlePress}
    >
      {/* 1. Biểu tượng thời tiết lớn & Nhiệt độ thanh thoát không viền hộp */}
      <View style={styles.heroCenterBlock}>
        <View style={styles.heroIconBox}>
          <WeatherIcon
            weatherCode={current.weatherCode}
            isDay={current.isDay}
            size={72}
            color={conditionInfo.accentColor}
          />
        </View>
        <AppText style={styles.floatingBigTempText}>{currentTempStr}</AppText>
        <AppText style={styles.floatingConditionText}>{conditionInfo.labelVi}</AppText>
      </View>

      {/* 2. Dòng thông tin biên độ nhiệt thanh thoát (Typographic, không viền hộp) */}
      <View style={styles.floatingHighLowRow}>
        <AppText style={styles.floatingHighLowText}>
          {t('weather.highLow', { high: maxTempStr, low: minTempStr })}
        </AppText>
        <View style={styles.highLowDotDivider} />
        <View style={styles.floatingFeelsLikeCol}>
          <Thermometer size={13} color="rgba(255, 255, 255, 0.85)" />
          <AppText style={styles.floatingFeelsLikeText}>
            {' '}{t('weather.feelsLike')} {feelsLikeStr}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};
