import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Clock } from 'lucide-react-native';
import { AppText } from '@/components';
import { useThemeMode } from '@/hooks';
import { weatherService } from '@/services/weather';
import { haptics } from '@/utils';
import type { HourlyForecastProps } from '../types';
import { createWeatherStyles } from '../styles';
import { WeatherIcon } from './WeatherIcon';

export const HourlyForecast: React.FC<HourlyForecastProps> = ({
  hourly,
  tempUnit,
  onSelectHour,
}) => {
  const { t } = useTranslation();
  const { theme: themeColors, isDark } = useThemeMode();
  const styles = createWeatherStyles(themeColors, isDark);

  if (!hourly || hourly.length === 0) {
    return null;
  }

  const handlePressHour = (item: (typeof hourly)[0]) => {
    haptics.light();
    onSelectHour?.(item);
  };

  return (
    <View style={styles.sectionCard}>
      {/* Tiêu đề mục */}
      <View style={styles.sectionHeaderRow}>
        <Clock size={15} color="rgba(255, 255, 255, 0.85)" />
        <AppText style={styles.sectionTitle}>{t('weather.hourlyForecast')}</AppText>
      </View>

      {/* Băng chuyền cuộn ngang 24 giờ */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.hourlyScroll}
        contentContainerStyle={styles.hourlyScrollContent}
      >
        {hourly.map((item, index) => {
          const tempStr = weatherService.formatTemperature(item.temperature, tempUnit);
          const showRain = item.precipitationProbability > 0;

          const isCurrentHour = index === 0;
          const hourlyItemStyle = [styles.hourlyItem, isCurrentHour && styles.hourlyItemActive];

          return (
            <TouchableOpacity
              key={`hourly-${item.time}-${index}`}
              style={hourlyItemStyle}
              activeOpacity={0.7}
              onPress={() => handlePressHour(item)}
            >
              <AppText style={styles.hourlyTimeText}>{item.hourLabel}</AppText>

              <View style={styles.hourlyIconBox}>
                <WeatherIcon weatherCode={item.weatherCode} isDay={item.isDay} size={24} />
              </View>

              <AppText style={styles.hourlyRainText}>
                {showRain ? `${item.precipitationProbability}%` : ''}
              </AppText>

              <AppText style={styles.hourlyTempText}>{tempStr}</AppText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
