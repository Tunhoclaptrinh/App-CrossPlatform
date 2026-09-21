import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Calendar } from 'lucide-react-native';
import { AppText } from '@/components';
import { useThemeMode } from '@/hooks';
import { weatherService } from '@/services/weather';
import type { DailyForecastProps } from '../types';
import { createWeatherStyles, getDailyTempBarFillStyle } from '../styles';
import { WeatherIcon } from './WeatherIcon';

export const DailyForecast: React.FC<DailyForecastProps> = ({ daily, tempUnit }) => {
  const { t } = useTranslation();
  const { theme: themeColors, isDark } = useThemeMode();
  const styles = createWeatherStyles(themeColors, isDark);

  if (!daily || daily.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionCard}>
      {/* Tiêu đề mục */}
      <View style={styles.sectionHeaderRow}>
        <Calendar size={15} color="rgba(255, 255, 255, 0.85)" />
        <AppText style={styles.sectionTitle}>{t('weather.dailyForecast')}</AppText>
      </View>

      {/* Danh sách 7 ngày tới */}
      <View style={styles.dailyList}>
        {daily.map((item, index) => {
          const maxTempStr = weatherService.formatTemperature(item.tempMax, tempUnit);
          const minTempStr = weatherService.formatTemperature(item.tempMin, tempUnit);
          const showRain = item.precipitationProbabilityMax > 0;
          const barFillStyle = [
            styles.dailyTempBarFill,
            getDailyTempBarFillStyle(item.tempMin, item.tempMax),
          ];

          return (
            <View key={`daily-${item.date}-${index}`} style={styles.dailyRow}>
              {/* Cột Tên Ngày */}
              <View style={styles.dailyDayCol}>
                <AppText style={styles.dailyDayName}>{item.dayLabel}</AppText>
              </View>

              {/* Cột Icon & Khả năng mưa */}
              <View style={styles.dailyIconCol}>
                <WeatherIcon weatherCode={item.weatherCode} size={22} />
                {showRain && (
                  <AppText style={styles.dailyRainBadgeText}>
                    {item.precipitationProbabilityMax}%
                  </AppText>
                )}
              </View>

              {/* Cột Dải Nhiệt Độ Min - Max Bar */}
              <View style={styles.dailyTempRangeCol}>
                <AppText style={styles.dailyMinTempText}>{minTempStr}</AppText>

                <View style={styles.dailyTempBarTrack}>
                  <View style={barFillStyle} />
                </View>

                <AppText style={styles.dailyMaxTempText}>{maxTempStr}</AppText>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
