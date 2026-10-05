import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Animated,
  LayoutAnimation,
  Alert,
} from 'react-native';
import {
  MapPin,
  Search,
  Sun,
  Moon,
  Sparkles,
  Layers,
  Navigation,
} from 'lucide-react-native';

import { ScreenWrapper, AppText, EmptyState } from '@/components';
import { useThemeMode, useAppStore, useDoubleBackExit } from '@/hooks';
import { useWeatherStore } from '@/hooks/useWeatherStore';
import { weatherService, HourlyForecastItem, DailyForecastItem } from '@/services/weather';
import { haptics } from '@/utils';
import type { WeatherScreenProps, WeatherDetailTarget } from './types';
import { createWeatherStyles, getFadeAnimStyle } from './styles';
import {
  WeatherAtmosphereBackground,
  CurrentWeatherCard,
  HourlyForecast,
  DailyForecast,
  WeatherMetricsGrid,
  CitySearchModal,
  WeatherDetailModal,
} from './components';

export const WeatherScreen: React.FC<WeatherScreenProps> = ({ navigation }) => {
  const { theme: themeColors, isDark, toggleTheme, radiusTokens } = useThemeMode();
  const { themeStyle, toggleThemeStyle } = useAppStore();
  const styles = createWeatherStyles(themeColors, isDark, radiusTokens);

  // Chống vô tình thoát ứng dụng khi nhấn nút Back trên Android
  useDoubleBackExit();

  const {
    selectedCity,
    savedCities,
    weatherData,
    tempUnit,
    isLoading,
    isRefreshing,
    error,
    setSelectedCity,
    toggleTempUnit,
    fetchWeather,
  } = useWeatherStore();

  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [detailTarget, setDetailTarget] = useState<WeatherDetailTarget | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Kích hoạt hiệu ứng xuất hiện mượt mà khi đổi thành phố hoặc nạp dữ liệu
  useEffect(() => {
    if (weatherData) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedCity, weatherData, fadeAnim]);

  // Tự động tải thời tiết lần đầu khi mở app
  useEffect(() => {
    fetchWeather(false);
  }, [fetchWeather]);

  const handleToggleTempUnit = () => {
    haptics.light();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    toggleTempUnit();
  };

  const handleToggleTheme = () => {
    haptics.light();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    toggleTheme();
  };

  const handleToggleThemeStyle = () => {
    haptics.light();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    toggleThemeStyle();
  };

  const handleSelectCity = (city: typeof selectedCity) => {
    haptics.light();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedCity(city);
  };

  // Định vị GPS trực tiếp từ thanh trên cùng
  const handleGpsLocate = async () => {
    try {
      setIsLocating(true);
      haptics.light();
      const city = await weatherService.getCurrentLocationCity();
      haptics.success();
      handleSelectCity(city);
    } catch (err: unknown) {
      haptics.warning();
      const msg = err instanceof Error ? err.message : 'Không thể lấy vị trí hiện tại';
      Alert.alert('Vị trí', msg);
    } finally {
      setIsLocating(false);
    }
  };

  // Mở modal chi tiết thời tiết hiện tại
  const handleOpenCurrentDetail = () => {
    if (!weatherData) return;
    haptics.light();
    setDetailTarget({
      type: 'current',
      current: weatherData.current,
      city: weatherData.city,
      sunrise: weatherData.daily[0]?.sunrise,
      sunset: weatherData.daily[0]?.sunset,
    });
    setDetailModalVisible(true);
  };

  // Mở modal chi tiết theo giờ
  const handleOpenHourDetail = (hour: HourlyForecastItem) => {
    if (!weatherData) return;
    setDetailTarget({
      type: 'hourly',
      hour,
      cityName: weatherData.city.name,
    });
    setDetailModalVisible(true);
  };

  // Mở modal chi tiết theo ngày
  const handleOpenDayDetail = (day: DailyForecastItem) => {
    if (!weatherData) return;
    setDetailTarget({
      type: 'daily',
      day,
      cityName: weatherData.city.name,
    });
    setDetailModalVisible(true);
  };

  const animatedContentStyle = [styles.animatedContainer, getFadeAnimStyle(fadeAnim)];

  return (
    <ScreenWrapper backgroundColor="transparent">
      {/* 0. Hình Nền Đồ Họa Khí Quyển Động Vector SVG */}
      <WeatherAtmosphereBackground
        weatherCode={weatherData ? weatherData.current.weatherCode : 0}
        isDay={weatherData ? weatherData.current.isDay : true}
        isDarkTheme={isDark}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => fetchWeather(true)}
            tintColor={themeColors.primary}
            colors={[themeColors.primary]}
          />
        }
      >
        {/* 1. Thanh Tiêu Đề Trên Cùng Mờ Kính (Translucent Glass Top Bar) */}
        <View style={styles.topBar}>
          {/* Nút bấm vị trí hiện tại -> Mở Modal Tìm Kiếm */}
          <TouchableOpacity
            style={styles.locationHeaderBtn}
            onPress={() => setSearchModalVisible(true)}
            activeOpacity={0.7}
          >
            <View style={styles.locationPinIconWrap}>
              <MapPin size={15} color={isDark ? '#38BDF8' : themeColors.primary} />
            </View>
            <View style={styles.locationTextCol}>
              <View style={styles.locationCityRow}>
                <AppText numberOfLines={1} style={styles.locationCityName}>{selectedCity.name}</AppText>
              </View>
              <AppText numberOfLines={1} style={styles.locationCountryName}>
                {[selectedCity.admin1, selectedCity.country].filter(Boolean).join(', ')}
              </AppText>
            </View>
            <View style={styles.locationSearchBadge}>
              <Search size={12} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          {/* Capsule Điều Khiển Tinh Gọn (Apple Bento Glass Capsule) */}
          <View style={styles.topControlCapsule}>
            {/* GPS Định Vị Nhanh */}
            <TouchableOpacity
              style={styles.capsuleBtn}
              onPress={handleGpsLocate}
              disabled={isLocating}
              activeOpacity={0.7}
              accessibilityLabel="Định vị GPS vị trí hiện tại"
            >
              {isLocating ? (
                <ActivityIndicator size="small" color={isDark ? '#38BDF8' : themeColors.primary} />
              ) : (
                <Navigation size={15} color={isDark ? '#38BDF8' : themeColors.primary} />
              )}
            </TouchableOpacity>

            <View style={styles.capsuleDivider} />

            {/* Đổi Đơn Vị °C / °F */}
            <TouchableOpacity
              style={styles.capsuleBtn}
              onPress={handleToggleTempUnit}
              activeOpacity={0.7}
              accessibilityLabel="Chuyển đổi đơn vị nhiệt độ"
            >
              <AppText style={styles.capsulePillText}>
                {tempUnit === 'celsius' ? '°C' : '°F'}
              </AppText>
            </TouchableOpacity>

            <View style={styles.capsuleDivider} />

            {/* Đổi Phong Cách Apple Glass / Flat UI */}
            <TouchableOpacity
              style={[styles.capsuleBtn, themeStyle === 'apple-glass' && styles.capsuleBtnActive]}
              onPress={handleToggleThemeStyle}
              activeOpacity={0.7}
              accessibilityLabel="Chuyển đổi phong cách giao diện"
            >
              <Sparkles
                size={15}
                color={themeStyle === 'apple-glass' ? '#38BDF8' : 'rgba(255, 255, 255, 0.75)'}
              />
            </TouchableOpacity>

            <View style={styles.capsuleDivider} />

            {/* Đổi Chế Độ Sáng / Tối */}
            <TouchableOpacity
              style={styles.capsuleBtn}
              onPress={handleToggleTheme}
              activeOpacity={0.7}
              accessibilityLabel="Chuyển đổi nền sáng tối"
            >
              {isDark ? (
                <Sun size={15} color="#FBBF24" />
              ) : (
                <Moon size={15} color="rgba(255, 255, 255, 0.85)" />
              )}
            </TouchableOpacity>

            <View style={styles.capsuleDivider} />

            {/* Nút Navigation: Trở Về Màn Hình Chính Base App */}
            <TouchableOpacity
              style={styles.capsuleBtn}
              onPress={() => {
                haptics.light();
                navigation.navigate('Home');
              }}
              activeOpacity={0.7}
              accessibilityLabel="Chuyển sang màn hình chính"
            >
              <Layers size={15} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. Trạng thái Loading ban đầu khi chưa có cache */}
        {isLoading && !weatherData && (
          <View style={styles.stateContainer}>
            <ActivityIndicator size="large" color={themeColors.primary} />
            <AppText style={styles.stateTitle}>Đang nạp dữ liệu khí quyển...</AppText>
            <AppText style={styles.stateSubtitle}>Dữ liệu từ Open-Meteo Public API</AppText>
          </View>
        )}

        {/* 3. Trạng thái Lỗi khi không tải được dữ liệu */}
        {!isLoading && error && !weatherData && (
          <View style={styles.stateContainer}>
            <EmptyState
              title="Không thể tải dự báo thời tiết"
              description={error}
              actionText="Thử Lại Ngay"
              onActionPress={() => fetchWeather(false)}
            />
          </View>
        )}

        {/* 4. Khối Hiển Thị Dữ Liệu Thời Tiết Mờ Kính & Chuyển Động Mượt Mà */}
        {weatherData && (
          <Animated.View style={animatedContentStyle}>
            {/* 4.1. Hero Thời Tiết Hiện Tại Không Khung Viền - Chạm để xem chi tiết */}
            <CurrentWeatherCard
              weather={weatherData}
              tempUnit={tempUnit}
              onPressCard={handleOpenCurrentDetail}
            />

            {/* 4.2. Lưới 6 Chỉ Số Khí Quyển Kính Mờ Đầy Đủ (Nhiệt độ, Độ ẩm, Gió, Hướng gió, UV, Mưa) */}
            <WeatherMetricsGrid
              current={weatherData.current}
              daily={weatherData.daily}
              tempUnit={tempUnit}
              onSelectMetric={handleOpenCurrentDetail}
            />

            {/* 4.3. Dự Báo Theo Giờ 24h - Chạm vào giờ bất kỳ để xem chi tiết */}
            <HourlyForecast
              hourly={weatherData.hourly}
              tempUnit={tempUnit}
              onSelectHour={handleOpenHourDetail}
            />

            {/* 4.4. Dự Báo 7 Ngày Tới - Chạm vào ngày bất kỳ để xem chi tiết */}
            <DailyForecast
              daily={weatherData.daily}
              tempUnit={tempUnit}
              onSelectDay={handleOpenDayDetail}
            />
          </Animated.View>
        )}
      </ScrollView>

      {/* 5. Modal Tìm Kiếm Địa Điểm Toàn Cầu & GPS */}
      <CitySearchModal
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
        savedCities={savedCities}
        onSelectCity={(city) => {
          handleSelectCity(city);
        }}
      />

      {/* 6. Modal Xem Chi Tiết Toàn Diện Thời Điểm / Ngày Được Chọn */}
      <WeatherDetailModal
        visible={detailModalVisible}
        onClose={() => setDetailModalVisible(false)}
        target={detailTarget}
        tempUnit={tempUnit}
      />
    </ScreenWrapper>
  );
};
