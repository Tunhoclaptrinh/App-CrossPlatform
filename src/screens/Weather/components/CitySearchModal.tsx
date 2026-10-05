import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { X, MapPin, Navigation } from 'lucide-react-native';
import { AppText, AppSearchBar } from '@/components';
import { useThemeMode } from '@/hooks';
import { GeoCityLocation, DEFAULT_CITIES, weatherService } from '@/services/weather';
import { haptics } from '@/utils';
import type { CitySearchModalProps } from '../types';
import { createWeatherStyles } from '../styles';

export const CitySearchModal: React.FC<CitySearchModalProps> = ({
  visible,
  onClose,
  onSelectCity,
}) => {
  const { t } = useTranslation();
  const { theme: themeColors, isDark, radiusTokens } = useThemeMode();
  const styles = createWeatherStyles(themeColors, isDark, radiusTokens);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeoCityLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    if (!visible) {
      setQuery('');
      setResults([]);
      setIsSearching(false);
      setIsLocating(false);
      return;
    }
  }, [visible]);

  // Tìm kiếm khi query thay đổi
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    let isMounted = true;
    setIsSearching(true);

    const timer = setTimeout(async () => {
      try {
        const data = await weatherService.searchCities(trimmed);
        if (isMounted) {
          setResults(data);
          setIsSearching(false);
        }
      } catch {
        if (isMounted) {
          setResults([]);
          setIsSearching(false);
        }
      }
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [query]);

  const handlePickCity = (city: GeoCityLocation) => {
    haptics.light();
    onSelectCity(city);
    onClose();
  };

  const handleGetLocation = async () => {
    try {
      setIsLocating(true);
      haptics.light();
      const city = await weatherService.getCurrentLocationCity();
      haptics.success();
      onSelectCity(city);
      onClose();
    } catch (err: unknown) {
      haptics.warning();
      const msg = err instanceof Error ? err.message : 'Không thể lấy vị trí hiện tại';
      Alert.alert('Vị trí', msg);
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <AppText style={styles.modalTitle}>{t('weather.searchTitle')}</AppText>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
              <X size={22} color={themeColors.text} />
            </TouchableOpacity>
          </View>

          {/* Ô tìm kiếm */}
          <View style={styles.searchBarWrap}>
            <AppSearchBar
              value={query}
              onChangeText={setQuery}
              placeholder={t('weather.searchPlaceholder')}
            />
          </View>

          {/* Nút định vị GPS hiện tại */}
          <TouchableOpacity
            style={styles.gpsButton}
            onPress={handleGetLocation}
            disabled={isLocating}
            activeOpacity={0.7}
          >
            {isLocating ? (
              <ActivityIndicator size="small" color={isDark ? '#38BDF8' : '#0284C7'} />
            ) : (
              <Navigation size={14} color={isDark ? '#38BDF8' : '#0284C7'} />
            )}
            <AppText style={styles.gpsButtonText}>
              {isLocating ? 'Đang định vị GPS...' : t('weather.currentLocation')}
            </AppText>
          </TouchableOpacity>

          {/* Gợi ý Thành Phố Phổ Biến khi chưa gõ tìm kiếm */}
          {query.trim().length < 2 && (
            <View style={styles.popularSection}>
              <AppText style={styles.popularSectionTitle}>{t('weather.popularCities')}</AppText>
              <View style={styles.popularChipsWrap}>
                {DEFAULT_CITIES.map((city) => (
                  <TouchableOpacity
                    key={`popular-${city.id}`}
                    style={styles.popularChip}
                    onPress={() => handlePickCity(city)}
                  >
                    <AppText style={styles.popularChipText}>{city.name}</AppText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Vòng xoay tìm kiếm */}
          {isSearching && (
            <View style={styles.emptyResultBox}>
              <ActivityIndicator size="small" color={themeColors.primary} />
              <AppText style={styles.emptyResultText}>{t('weather.searching')}</AppText>
            </View>
          )}

          {/* Danh sách kết quả tìm kiếm */}
          {!isSearching && query.trim().length >= 2 && results.length > 0 && (
            <FlatList
              data={results}
              keyExtractor={(item) => `city-${item.id}-${item.latitude}`}
              style={styles.resultsList}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => {
                const subText = [item.admin1, item.country].filter(Boolean).join(', ');
                return (
                  <TouchableOpacity
                    style={styles.resultItem}
                    onPress={() => handlePickCity(item)}
                  >
                    <View style={styles.resultPinIcon}>
                      <MapPin size={18} color={themeColors.primary} />
                    </View>
                    <View style={styles.resultTextCol}>
                      <AppText style={styles.resultCityName}>{item.name}</AppText>
                      <AppText style={styles.resultCountryName}>{subText}</AppText>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}

          {/* Không tìm thấy kết quả */}
          {!isSearching && query.trim().length >= 2 && results.length === 0 && (
            <View style={styles.emptyResultBox}>
              <AppText style={styles.emptyResultText}>{t('weather.noLocationsFound')}</AppText>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
