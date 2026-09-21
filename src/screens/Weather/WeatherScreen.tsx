import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Animated,
  LayoutAnimation,
} from 'react-native';
import {
  MapPin,
  Search,
  Sun,
  Moon,
  Sparkles,
} from 'lucide-react-native';

import { ScreenWrapper, AppText, EmptyState } from '@/components';
import { useThemeMode, useAppStore, useDoubleBackExit } from '@/hooks';
import { useWeatherStore } from '@/hooks/useWeatherStore';
import { haptics } from '@/utils';
import type { WeatherScreenProps } from './types';
import { createWeatherStyles, getFadeAnimStyle } from './styles';
import {
  WeatherAtmosphereBackground,
  CurrentWeatherCard,
  HourlyForecast,
  DailyForecast,
  WeatherMetricsGrid,
  CitySearchModal,
} from './components';

export const WeatherScreen: React.FC<WeatherScreenProps> = () => {
  const { theme: themeColors, isDark, toggleTheme } = useThemeMode();
  const { themeStyle, toggleThemeStyle } = useAppStore();
  const styles = createWeatherStyles(themeColors, isDark);

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
              <MapPin size={16} color={isDark ? '#38BDF8' : themeColors.primary} />
            </View>
            <View style={styles.locationTextCol}>
              <View style={styles.locationCityRow}>
                <AppText style={styles.locationCityName}>{selectedCity.name}</AppText>
              </View>
              <AppText style={styles.locationCountryName}>
                {[selectedCity.admin1, selectedCity.country].filter(Boolean).join(', ')}
              </AppText>
            </View>
            <View style={styles.locationSearchBadge}>
              <Search size={13} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          {/* Các nút hành động phụ: Đổi °C/°F, Đổi Theme, Đổi Style & Mở Showcase */}
          <View style={styles.topActionsRow}>
            {/* Đổi đơn vị °C / °F */}
            <TouchableOpacity
              style={styles.actionPillBtn}
              onPress={handleToggleTempUnit}
              activeOpacity={0.7}
            >
              <AppText style={styles.actionPillText}>
                {tempUnit === 'celsius' ? '°C' : '°F'}
              </AppText>
            </TouchableOpacity>

            {/* Đổi phong cách Apple Glass / Flat UI */}
            <TouchableOpacity
              style={styles.actionIconBtn}
              onPress={handleToggleThemeStyle}
              activeOpacity={0.7}
            >
              <Sparkles
                size={18}
                color={themeStyle === 'apple-glass' ? '#007AFF' : themeColors.textSecondary}
              />
            </TouchableOpacity>

            {/* Đổi chế độ Sáng / Tối */}
            <TouchableOpacity
              style={styles.actionIconBtn}
              onPress={handleToggleTheme}
              activeOpacity={0.7}
            >
              {isDark ? (
                <Moon size={18} color="#FBBF24" />
              ) : (
                <Sun size={18} color="#F59E0B" />
              )}
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
            {/* 4.1. Hero Thời Tiết Hiện Tại Không Khung Viền (Cardless Floating Hero) */}
            <CurrentWeatherCard weather={weatherData} tempUnit={tempUnit} />

            {/* 4.2. Lưới 4 Chỉ Số Khí Quyển Kính Mờ 2x2 Đưa Lên Trên (Weather Metrics Grid) */}
            <WeatherMetricsGrid current={weatherData.current} daily={weatherData.daily} />

            {/* 4.3. Dự Báo Theo Giờ 24h Viên Nang Kính Mờ (Frosted Glass Capsule) */}
            <HourlyForecast hourly={weatherData.hourly} tempUnit={tempUnit} />

            {/* 4.4. Dự Báo 7 Ngày Tới Phiến Kính Mờ (Frosted Glass Panel) */}
            <DailyForecast daily={weatherData.daily} tempUnit={tempUnit} />
          </Animated.View>
        )}
      </ScrollView>

      {/* 6. Modal Tìm Kiếm Địa Điểm Toàn Cầu */}
      <CitySearchModal
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
        savedCities={savedCities}
        onSelectCity={(city) => {
          handleSelectCity(city);
        }}
      />
    </ScreenWrapper>
  );
};
