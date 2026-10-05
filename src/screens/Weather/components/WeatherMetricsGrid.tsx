import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  Droplets,
  Wind,
  CloudRain,
  Compass,
  Sun,
  Thermometer,
  Gauge,
} from 'lucide-react-native';
import { AppText } from '@/components';
import { useThemeMode } from '@/hooks';
import { weatherService } from '@/services/weather';
import type { WeatherMetricsGridProps } from '../types';
import {
  createWeatherStyles,
  getMetricIconBoxStyle,
  getDetailAdviceStyle,
  getDetailAdviceTextStyle,
} from '../styles';

export const WeatherMetricsGrid: React.FC<WeatherMetricsGridProps> = ({
  current,
  daily,
  tempUnit,
  onSelectMetric,
}) => {
  const { t } = useTranslation();
  const { theme: themeColors, isDark, radiusTokens } = useThemeMode();
  const styles = createWeatherStyles(themeColors, isDark, radiusTokens);

  const rainProbability = daily[0]?.precipitationProbabilityMax ?? 0;
  const uvInfo = weatherService.getUvIndexInfo(current.uvIndex);

  const feelsLikeStr = weatherService.formatTemperature(current.apparentTemperature, tempUnit);
  const actualTempStr = weatherService.formatTemperature(current.temperature, tempUnit);

  const feelsLikeIconStyle = [styles.metricIconBox, getMetricIconBoxStyle('#F97316')];
  const humidityIconStyle = [styles.metricIconBox, getMetricIconBoxStyle('#0EA5E9')];
  const windIconStyle = [styles.metricIconBox, getMetricIconBoxStyle('#10B981')];
  const windDirIconStyle = [styles.metricIconBox, getMetricIconBoxStyle('#6366F1')];
  const uvIconStyle = [styles.metricIconBox, getMetricIconBoxStyle(uvInfo.color)];
  const rainIconStyle = [styles.metricIconBox, getMetricIconBoxStyle('#3B82F6')];

  const uvBadgeStyle = [styles.metricBadge, getDetailAdviceStyle(uvInfo.color, isDark)];
  const uvBadgeTextStyle = [styles.metricBadgeText, getDetailAdviceTextStyle(uvInfo.color)];

  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionGlassHighlight} />
      {/* Tiêu đề mục */}
      <View style={styles.sectionHeaderRow}>
        <Gauge size={15} color="rgba(255, 255, 255, 0.85)" />
        <AppText style={styles.sectionTitle}>
          {t('weather.weatherDetails', 'CHI TIẾT KHÍ QUYỂN')}
        </AppText>
      </View>

      <View style={styles.unifiedMetricsGrid}>
        {/* Hàng 1: Nhiệt độ cảm nhận & Độ ẩm */}
        <View style={styles.unifiedMetricRow}>
          <TouchableOpacity
            style={styles.unifiedMetricCell}
            activeOpacity={0.7}
            onPress={() => onSelectMetric?.('temperature')}
          >
            <View style={styles.metricTileHeader}>
              <View style={feelsLikeIconStyle}>
                <Thermometer size={12} color="#F97316" />
              </View>
              <AppText variant="caption" numberOfLines={1} style={styles.metricLabel}>
                {t('weather.feelsLike')}
              </AppText>
            </View>
            <AppText style={styles.metricValue}>{feelsLikeStr}</AppText>
            <AppText numberOfLines={1} style={styles.metricSubtitle}>Thực tế: {actualTempStr}</AppText>
          </TouchableOpacity>

          <View style={styles.unifiedMetricColDivider} />

          <TouchableOpacity
            style={styles.unifiedMetricCell}
            activeOpacity={0.7}
            onPress={() => onSelectMetric?.('humidity')}
          >
            <View style={styles.metricTileHeader}>
              <View style={humidityIconStyle}>
                <Droplets size={12} color="#0EA5E9" />
              </View>
              <AppText variant="caption" numberOfLines={1} style={styles.metricLabel}>
                {t('weather.humidity')}
              </AppText>
            </View>
            <AppText style={styles.metricValue}>{current.relativeHumidity}%</AppText>
            <AppText numberOfLines={1} style={styles.metricSubtitle}>
              {current.relativeHumidity > 75 ? 'Độ ẩm cao' : current.relativeHumidity < 40 ? 'Khô ráo' : 'Lý tưởng'}
            </AppText>
          </TouchableOpacity>
        </View>

        <View style={styles.unifiedMetricRowDivider} />

        {/* Hàng 2: Tốc độ gió & Hướng gió */}
        <View style={styles.unifiedMetricRow}>
          <TouchableOpacity
            style={styles.unifiedMetricCell}
            activeOpacity={0.7}
            onPress={() => onSelectMetric?.('wind')}
          >
            <View style={styles.metricTileHeader}>
              <View style={windIconStyle}>
                <Wind size={12} color="#10B981" />
              </View>
              <AppText variant="caption" numberOfLines={1} style={styles.metricLabel}>
                {t('weather.windSpeed')}
              </AppText>
            </View>
            <AppText style={styles.metricValue}>{current.windSpeed} km/h</AppText>
            <AppText numberOfLines={1} style={styles.metricSubtitle}>
              Cấp {Math.min(Math.max(Math.round(current.windSpeed / 5), 1), 12)} gió
            </AppText>
          </TouchableOpacity>

          <View style={styles.unifiedMetricColDivider} />

          <TouchableOpacity
            style={styles.unifiedMetricCell}
            activeOpacity={0.7}
            onPress={() => onSelectMetric?.('windDirection')}
          >
            <View style={styles.metricTileHeader}>
              <View style={windDirIconStyle}>
                <Compass size={12} color="#6366F1" />
              </View>
              <AppText variant="caption" numberOfLines={1} style={styles.metricLabel}>
                {t('weather.windDirection')}
              </AppText>
            </View>
            <AppText style={styles.metricValue}>{current.windDirectionCardinal}</AppText>
            <AppText numberOfLines={1} style={styles.metricSubtitle}>{current.windDirection}° góc la bàn</AppText>
          </TouchableOpacity>
        </View>

        <View style={styles.unifiedMetricRowDivider} />

        {/* Hàng 3: Chỉ số UV & Lượng mưa */}
        <View style={styles.unifiedMetricRow}>
          <TouchableOpacity
            style={styles.unifiedMetricCell}
            activeOpacity={0.7}
            onPress={() => onSelectMetric?.('uv')}
          >
            <View style={styles.metricTileHeader}>
              <View style={uvIconStyle}>
                <Sun size={12} color={uvInfo.color} />
              </View>
              <AppText variant="caption" numberOfLines={1} style={styles.metricLabel}>
                {t('weather.uvIndex')}
              </AppText>
            </View>
            <View style={styles.uvRowWrap}>
              <AppText style={styles.metricValue}>{current.uvIndex}</AppText>
              <View style={uvBadgeStyle}>
                <AppText style={uvBadgeTextStyle}>{current.uvIndexLevel}</AppText>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.unifiedMetricColDivider} />

          <TouchableOpacity
            style={styles.unifiedMetricCell}
            activeOpacity={0.7}
            onPress={() => onSelectMetric?.('precipitation')}
          >
            <View style={styles.metricTileHeader}>
              <View style={rainIconStyle}>
                <CloudRain size={12} color="#3B82F6" />
              </View>
              <AppText variant="caption" numberOfLines={1} style={styles.metricLabel}>
                {t('weather.precipitation')}
              </AppText>
            </View>
            <AppText style={styles.metricValue}>{current.precipitation} mm</AppText>
            <AppText numberOfLines={1} style={styles.metricSubtitle}>{rainProbability}% khả năng mưa</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
