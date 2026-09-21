import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GeoCityLocation,
  WeatherData,
  DEFAULT_CITIES,
  weatherService,
} from '@/services/weather';

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface WeatherStoreState {
  selectedCity: GeoCityLocation;
  savedCities: GeoCityLocation[];
  weatherData: WeatherData | null;
  tempUnit: TemperatureUnit;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;

  setSelectedCity: (city: GeoCityLocation) => void;
  addSavedCity: (city: GeoCityLocation) => void;
  removeSavedCity: (cityId: number) => void;
  toggleTempUnit: () => void;
  setTempUnit: (unit: TemperatureUnit) => void;
  fetchWeather: (isPullRefresh?: boolean) => Promise<void>;
}

const DEFAULT_CITY = DEFAULT_CITIES[0]; // Hà Nội

export const useWeatherStore = create<WeatherStoreState>()(
  persist(
    (set, get) => ({
      selectedCity: DEFAULT_CITY,
      savedCities: DEFAULT_CITIES.slice(0, 6),
      weatherData: null,
      tempUnit: 'celsius',
      isLoading: false,
      isRefreshing: false,
      error: null,

      setSelectedCity: (city: GeoCityLocation) => {
        set({ selectedCity: city });
        // Tự động tải dữ liệu cho thành phố mới
        get().fetchWeather(false);
      },

      addSavedCity: (city: GeoCityLocation) => {
        const current = get().savedCities;
        if (!current.some((c) => c.id === city.id)) {
          set({ savedCities: [city, ...current] });
        }
      },

      removeSavedCity: (cityId: number) => {
        const current = get().savedCities;
        set({ savedCities: current.filter((c) => c.id !== cityId) });
      },

      toggleTempUnit: () => {
        const current = get().tempUnit;
        set({ tempUnit: current === 'celsius' ? 'fahrenheit' : 'celsius' });
      },

      setTempUnit: (unit: TemperatureUnit) => {
        set({ tempUnit: unit });
      },

      fetchWeather: async (isPullRefresh = false) => {
        const city = get().selectedCity;
        if (!city) {
          return;
        }

        if (isPullRefresh) {
          set({ isRefreshing: true, error: null });
        } else {
          set({ isLoading: true, error: null });
        }

        try {
          const data = await weatherService.fetchWeatherForecast(city);
          set({
            weatherData: data,
            isLoading: false,
            isRefreshing: false,
            error: null,
          });
        } catch (err: unknown) {
          const message =
            err instanceof Error ? err.message : 'Không thể kết nối máy chủ thời tiết';
          set({
            isLoading: false,
            isRefreshing: false,
            error: message,
          });
        }
      },
    }),
    {
      name: 'weather-app-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        selectedCity: state.selectedCity,
        savedCities: state.savedCities,
        weatherData: state.weatherData,
        tempUnit: state.tempUnit,
      }),
    },
  ),
);
