import React from 'react';
import { Modal, View, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  X,
  Thermometer,
  Droplets,
  Wind,
  Compass,
  Sun,
  CloudRain,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  ShieldAlert,
} from 'lucide-react-native';
import { AppText } from '@/components';
import { useThemeMode } from '@/hooks';
import { weatherService } from '@/services/weather';
import { haptics } from '@/utils';
import type { WeatherDetailModalProps } from '../types';
import {
  createWeatherStyles,
  getDetailAdviceStyle,
  getDetailAdviceTextStyle,
  getMetricIconBoxStyle,
} from '../styles';
import { WeatherIcon } from './WeatherIcon';

export const WeatherDetailModal: React.FC<WeatherDetailModalProps> = ({
  visible,
  onClose,
  target,
  tempUnit,
}) => {
  const { t } = useTranslation();
  const { theme: themeColors, isDark, radiusTokens } = useThemeMode();
  const styles = createWeatherStyles(themeColors, isDark, radiusTokens);

  if (!visible || !target) {
    return null;
  }

  // Trích xuất dữ liệu tùy theo loại mục tiêu
  let title = '';
  let subtitle = '';
  let weatherCode = 0;
  let isDay = true;
  let mainTemp = '';
  let feelsLike = '';
  let humidity = 0;
  let windSpeed = 0;
  let windDirDeg = 0;
  let uvVal = 0;
  let rainProb = 0;
  let rainAmount = 0;
  let sunriseStr: string | undefined;
  let sunsetStr: string | undefined;
  let pressureVal: number | undefined;
  let visibilityVal: number | undefined;

  if (target.type === 'current') {
    const { current, city, sunrise, sunset } = target;
    title = city.name;
    subtitle = `Thời tiết hiện tại • ${city.country}`;
    weatherCode = current.weatherCode;
    isDay = current.isDay;
    mainTemp = weatherService.formatTemperature(current.temperature, tempUnit);
    feelsLike = weatherService.formatTemperature(current.apparentTemperature, tempUnit);
    humidity = current.relativeHumidity;
    windSpeed = current.windSpeed;
    windDirDeg = current.windDirection;
    uvVal = current.uvIndex;
    rainProb = 0;
    rainAmount = current.precipitation;
    pressureVal = current.surfacePressure;
    visibilityVal = current.visibility;
    sunriseStr = sunrise;
    sunsetStr = sunset;
  } else if (target.type === 'hourly') {
    const { hour, cityName } = target;
    title = `Dự báo lúc ${hour.hourLabel}`;
    subtitle = `${cityName} • ${hour.time.replace('T', ' ')}`;
    weatherCode = hour.weatherCode;
    isDay = hour.isDay;
    mainTemp = weatherService.formatTemperature(hour.temperature, tempUnit);
    feelsLike = weatherService.formatTemperature(hour.apparentTemperature, tempUnit);
    humidity = hour.relativeHumidity;
    windSpeed = hour.windSpeed;
    windDirDeg = hour.windDirection;
    uvVal = hour.uvIndex;
    rainProb = hour.precipitationProbability;
    rainAmount = hour.precipitation;
  } else {
    const { day, cityName } = target;
    title = `${day.dayLabel}, ${day.date}`;
    subtitle = `${cityName} • Dự báo cả ngày`;
    weatherCode = day.weatherCode;
    isDay = true;
    mainTemp = `${weatherService.formatTemperature(day.tempMax, tempUnit)} / ${weatherService.formatTemperature(day.tempMin, tempUnit)}`;
    feelsLike = `Biên độ ${Math.abs(day.tempMax - day.tempMin)}°`;
    humidity = 70; // Giá trị trung bình ước tính
    windSpeed = day.windSpeedMax;
    windDirDeg = day.windDirectionDominant;
    uvVal = day.uvIndexMax;
    rainProb = day.precipitationProbabilityMax;
    rainAmount = day.precipitationSum;
    sunriseStr = day.sunrise;
    sunsetStr = day.sunset;
  }

  const conditionInfo = weatherService.getWmoWeatherInfo(weatherCode, isDay);
  const uvInfo = weatherService.getUvIndexInfo(uvVal);
  const windDirInfo = weatherService.getWindDirectionInfo(windDirDeg);

  // Tạo lời khuyên sức khỏe tổng hợp
  let activityAdvice = 'Thời tiết thuận lợi cho các hoạt động ngoài trời.';
  if (rainProb >= 60 || rainAmount > 2) {
    activityAdvice = 'Có khả năng mưa cao hoặc lượng mưa đáng kể, nhớ mang theo ô hoặc áo mưa.';
  } else if (uvVal >= 8) {
    activityAdvice = 'Bức xạ mặt trời ở mức nguy hại, hãy dùng kem chống nắng, kính râm và mũ rộng vành.';
  } else if (windSpeed > 30) {
    activityAdvice = 'Gió thổi mạnh, cẩn thận vật cản khi lưu thông trên cầu hoặc đường cao tốc.';
  }

  const handleClose = () => {
    haptics.light();
    onClose();
  };

  const adviceBoxStyle = [styles.detailAdviceCard, getDetailAdviceStyle(uvInfo.color, isDark)];
  const adviceTitleStyle = [styles.detailAdviceTitle, getDetailAdviceTextStyle(uvInfo.color)];
  const adviceTextStyle = [styles.detailAdviceBody, getDetailAdviceTextStyle(isDark ? '#F1F5F9' : '#334155')];

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <View style={styles.detailModalOverlay}>
        <View style={styles.detailModalContent}>
          {/* Header */}
          <View style={styles.detailModalHeader}>
            <View style={styles.detailModalTitleRow}>
              <AppText style={styles.detailModalTitle}>{title}</AppText>
              <AppText style={styles.detailModalSubtitle}>{subtitle}</AppText>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.modalCloseBtn}>
              <X size={22} color={themeColors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Hero Card Trong Modal */}
            <View style={styles.detailHeroCard}>
              <View style={styles.detailHeroIconWrap}>
                <WeatherIcon weatherCode={weatherCode} isDay={isDay} size={48} color={conditionInfo.accentColor} />
              </View>
              <View style={styles.detailHeroInfo}>
                <AppText style={styles.detailHeroTemp}>{mainTemp}</AppText>
                <AppText style={styles.detailHeroCondition}>{conditionInfo.labelVi}</AppText>
                <AppText style={styles.detailHeroSub}>
                  {target.type === 'daily' ? feelsLike : `Cảm giác như ${feelsLike}`}
                </AppText>
              </View>
            </View>

            {/* Lưới Chi Tiết Đầy Đủ Các Chỉ Số */}
            <View style={styles.detailMetricsGrid}>
              {/* 1. Nhiệt độ */}
              <View style={styles.detailMetricItem}>
                <View style={styles.detailMetricItemHeader}>
                  <View style={[styles.metricIconBox, getMetricIconBoxStyle('#F97316')]}>
                    <Thermometer size={12} color="#F97316" />
                  </View>
                  <AppText style={styles.detailMetricItemLabel}>Nhiệt độ</AppText>
                </View>
                <AppText style={styles.detailMetricItemVal}>{mainTemp}</AppText>
                <AppText style={styles.detailMetricItemSub}>
                  {target.type === 'daily' ? 'Khoảng Max / Min' : `Cảm giác: ${feelsLike}`}
                </AppText>
              </View>

              {/* 2. Độ ẩm */}
              <View style={styles.detailMetricItem}>
                <View style={styles.detailMetricItemHeader}>
                  <View style={[styles.metricIconBox, getMetricIconBoxStyle('#0EA5E9')]}>
                    <Droplets size={12} color="#0EA5E9" />
                  </View>
                  <AppText style={styles.detailMetricItemLabel}>Độ ẩm</AppText>
                </View>
                <AppText style={styles.detailMetricItemVal}>{humidity}%</AppText>
                <AppText style={styles.detailMetricItemSub}>
                  {humidity > 70 ? 'Khá ẩm ướt' : humidity < 40 ? 'Khô ráo' : 'Thoải mái'}
                </AppText>
              </View>

              {/* 3. Tốc độ gió */}
              <View style={styles.detailMetricItem}>
                <View style={styles.detailMetricItemHeader}>
                  <View style={[styles.metricIconBox, getMetricIconBoxStyle('#10B981')]}>
                    <Wind size={12} color="#10B981" />
                  </View>
                  <AppText style={styles.detailMetricItemLabel}>Tốc độ gió</AppText>
                </View>
                <AppText style={styles.detailMetricItemVal}>{windSpeed} km/h</AppText>
                <AppText style={styles.detailMetricItemSub}>
                  Cấp {Math.min(Math.max(Math.round(windSpeed / 5), 1), 12)} gió
                </AppText>
              </View>

              {/* 4. Hướng gió */}
              <View style={styles.detailMetricItem}>
                <View style={styles.detailMetricItemHeader}>
                  <View style={[styles.metricIconBox, getMetricIconBoxStyle('#6366F1')]}>
                    <Compass size={12} color="#6366F1" />
                  </View>
                  <AppText style={styles.detailMetricItemLabel}>Hướng gió</AppText>
                </View>
                <AppText style={styles.detailMetricItemVal}>{windDirInfo.labelVi}</AppText>
                <AppText style={styles.detailMetricItemSub}>{windDirDeg}° la bàn ({windDirInfo.code})</AppText>
              </View>

              {/* 5. Chỉ số UV */}
              <View style={styles.detailMetricItem}>
                <View style={styles.detailMetricItemHeader}>
                  <View style={[styles.metricIconBox, getMetricIconBoxStyle(uvInfo.color)]}>
                    <Sun size={12} color={uvInfo.color} />
                  </View>
                  <AppText style={styles.detailMetricItemLabel}>Chỉ số UV</AppText>
                </View>
                <AppText style={styles.detailMetricItemVal}>{uvVal} ({uvInfo.levelVi})</AppText>
                <AppText style={styles.detailMetricItemSub}>Thang đo bức xạ UV</AppText>
              </View>

              {/* 6. Mưa & Lượng mưa */}
              <View style={styles.detailMetricItem}>
                <View style={styles.detailMetricItemHeader}>
                  <View style={[styles.metricIconBox, getMetricIconBoxStyle('#3B82F6')]}>
                    <CloudRain size={12} color="#3B82F6" />
                  </View>
                  <AppText style={styles.detailMetricItemLabel}>Lượng mưa</AppText>
                </View>
                <AppText style={styles.detailMetricItemVal}>{rainAmount} mm</AppText>
                <AppText style={styles.detailMetricItemSub}>Xác suất: {rainProb}%</AppText>
              </View>

              {/* 7. Áp suất hoặc Bình minh */}
              {pressureVal !== undefined && (
                <View style={styles.detailMetricItem}>
                  <View style={styles.detailMetricItemHeader}>
                    <View style={[styles.metricIconBox, getMetricIconBoxStyle('#8B5CF6')]}>
                      <Gauge size={12} color="#8B5CF6" />
                    </View>
                    <AppText style={styles.detailMetricItemLabel}>Áp suất khí quyển</AppText>
                  </View>
                  <AppText style={styles.detailMetricItemVal}>{pressureVal} hPa</AppText>
                  <AppText style={styles.detailMetricItemSub}>Mực nước biển</AppText>
                </View>
              )}

              {/* 8. Tầm nhìn hoặc Hoàng hôn */}
              {visibilityVal !== undefined && (
                <View style={styles.detailMetricItem}>
                  <View style={styles.detailMetricItemHeader}>
                    <View style={[styles.metricIconBox, getMetricIconBoxStyle('#059669')]}>
                      <Eye size={12} color="#059669" />
                    </View>
                    <AppText style={styles.detailMetricItemLabel}>Tầm nhìn xa</AppText>
                  </View>
                  <AppText style={styles.detailMetricItemVal}>{visibilityVal} km</AppText>
                  <AppText style={styles.detailMetricItemSub}>Tầm nhìn quan trắc</AppText>
                </View>
              )}

              {/* 9. Bình minh & Hoàng hôn nếu có */}
              {sunriseStr && sunsetStr && (
                <>
                  <View style={styles.detailMetricItem}>
                    <View style={styles.detailMetricItemHeader}>
                      <View style={[styles.metricIconBox, getMetricIconBoxStyle('#F59E0B')]}>
                        <Sunrise size={12} color="#F59E0B" />
                      </View>
                      <AppText style={styles.detailMetricItemLabel}>Bình minh</AppText>
                    </View>
                    <AppText style={styles.detailMetricItemVal}>{sunriseStr}</AppText>
                    <AppText style={styles.detailMetricItemSub}>Bắt đầu ngày mới</AppText>
                  </View>

                  <View style={styles.detailMetricItem}>
                    <View style={styles.detailMetricItemHeader}>
                      <View style={[styles.metricIconBox, getMetricIconBoxStyle('#EC4899')]}>
                        <Sunset size={12} color="#EC4899" />
                      </View>
                      <AppText style={styles.detailMetricItemLabel}>Hoàng hôn</AppText>
                    </View>
                    <AppText style={styles.detailMetricItemVal}>{sunsetStr}</AppText>
                    <AppText style={styles.detailMetricItemSub}>Thời điểm lặn</AppText>
                  </View>
                </>
              )}
            </View>

            {/* Lời Khuyên Sức Khỏe & Khuyến Nghị Sinh Hoạt */}
            <View style={adviceBoxStyle}>
              <View style={styles.detailMetricItemHeader}>
                <ShieldAlert size={15} color={uvInfo.color} />
                <AppText style={adviceTitleStyle}>Lời khuyên & Cảnh báo sức khỏe</AppText>
              </View>
              <AppText style={adviceTextStyle}>• {uvInfo.adviceVi}</AppText>
              <AppText style={adviceTextStyle}>• {activityAdvice}</AppText>
            </View>

            {/* Nút Đóng Modal */}
            <TouchableOpacity style={styles.detailCloseButton} onPress={handleClose} activeOpacity={0.8}>
              <AppText style={styles.detailCloseButtonText}>{t('common.close')}</AppText>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
