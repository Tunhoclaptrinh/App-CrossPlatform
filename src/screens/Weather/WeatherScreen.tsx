import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  MapPin,
  Search,
  Sun,
  Moon,
  Layers,
  Sparkles,
} from 'lucide-react-native';

import { ScreenWrapper, AppText, AppButton, EmptyState } from '@/components';
import { useThemeMode, useAppStore, useDoubleBackExit } from '@/hooks';
import { useWeatherStore } from '@/hooks/useWeatherStore';
import { haptics } from '@/utils';
import type { WeatherScreenProps } from './types';
import { createWeatherStyles } from './styles';
import {
  CurrentWeatherCard,
  HourlyForecast,
  DailyForecast,
  CitySearchModal,
} from './components';

export const WeatherScreen: React.FC<WeatherScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
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

  // Tự động tải thời tiết lần đầu khi mở app
  useEffect(() => {
    fetchWeather(false);
  }, [fetchWeather]);

  const handleToggleTempUnit = () => {
    haptics.light();
    toggleTempUnit();
  };

  const handleToggleTheme = () => {
    haptics.light();
    toggleTheme();
  };

  const handleToggleThemeStyle = () => {
    haptics.light();
    toggleThemeStyle();
  };

  const handleNavigateToDeveloperShowcase = () => {
    haptics.light();
    navigation.navigate('Home');
  };

  return (
    <ScreenWrapper>
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
        {/* 1. Thanh Tiêu Đề Trên Cùng (Top Control Bar) */}
        <View style={styles.topBar}>
          {/* Nút bấm vị trí hiện tại -> Mở Modal Tìm Kiếm */}
          <TouchableOpacity
            style={styles.locationHeaderBtn}
            onPress={() => setSearchModalVisible(true)}
            activeOpacity={0.7}
          >
            <View style={styles.locationPinIconWrap}>
              <MapPin size={20} color={themeColors.primary} />
            </View>
            <View style={styles.locationTextCol}>
              <View style={styles.locationCityRow}>
                <AppText style={styles.locationCityName}>{selectedCity.name}</AppText>
                <Search size={14} color={themeColors.textSecondary} />
              </View>
              <AppText style={styles.locationCountryName}>
                {[selectedCity.admin1, selectedCity.country].filter(Boolean).join(', ')}
              </AppText>
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

            {/* Mở màn hình Base Developer Showcase */}
            <TouchableOpacity
              style={styles.actionIconBtn}
              onPress={handleNavigateToDeveloperShowcase}
              activeOpacity={0.7}
            >
              <Layers size={18} color={themeColors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. Dãy Nút Chọn Nhanh Thành Phố Phổ Biến (Quick City Pills) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.quickCityScroll}
          contentContainerStyle={styles.quickCityContent}
        >
          {savedCities.map((city) => {
            const isActive = city.id === selectedCity.id;
            const pillStyle = [styles.cityPill, isActive && styles.cityPillActive];
            const pillTextStyle = [styles.cityPillText, isActive && styles.cityPillTextActive];

            return (
              <TouchableOpacity
                key={`quick-${city.id}`}
                style={pillStyle}
                onPress={() => {
                  haptics.light();
                  setSelectedCity(city);
                }}
              >
                <AppText style={pillTextStyle}>{city.name}</AppText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* 3. Trạng thái Loading ban đầu khi chưa có cache */}
        {isLoading && !weatherData && (
          <View style={styles.stateContainer}>
            <ActivityIndicator size="large" color={themeColors.primary} />
            <AppText style={styles.stateTitle}>Đang kết nối vệ tinh thời tiết...</AppText>
            <AppText style={styles.stateSubtitle}>Dữ liệu từ Open-Meteo Public API</AppText>
          </View>
        )}

        {/* 4. Trạng thái Lỗi khi không tải được dữ liệu */}
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

        {/* 5. Khối Hiển Thị Dữ Liệu Thời Tiết Chính (Khi đã có data) */}
        {weatherData && (
          <>
            {/* Thẻ Thời Tiết Hiện Tại (Current Weather Hero Card) */}
            <CurrentWeatherCard weather={weatherData} tempUnit={tempUnit} />

            {/* Dự Báo Theo Giờ (Hourly Forecast 24h) */}
            <HourlyForecast hourly={weatherData.hourly} tempUnit={tempUnit} />

            {/* Dự Báo 7 Ngày Tới (Daily Forecast 7-Day) */}
            <DailyForecast daily={weatherData.daily} tempUnit={tempUnit} />

            {/* Nút điều hướng khám phá đồ án / module nền tảng */}
            <AppButton
              title={t('weather.developerShowcase')}
              variant="tonal"
              size="md"
              leftIcon={<Layers size={18} color={themeColors.text} />}
              onPress={handleNavigateToDeveloperShowcase}
            />
          </>
        )}
      </ScrollView>

      {/* 6. Modal Tìm Kiếm Địa Điểm Toàn Cầu */}
      <CitySearchModal
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
        savedCities={savedCities}
        onSelectCity={(city) => {
          setSelectedCity(city);
        }}
      />
    </ScreenWrapper>
  );
};
