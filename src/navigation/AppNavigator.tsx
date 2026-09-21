import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { SplashScreen } from '@/screens/Splash';
import { WeatherScreen } from '@/screens/Weather';
import { HomeScreen } from '@/screens/Home';
import { DetailsScreen } from '@/screens/Details';
import { useThemeMode } from '@/hooks';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();


export const AppNavigator: React.FC = () => {
  const { t } = useTranslation();
  const { theme: themeColors } = useThemeMode();

  return (
    <Stack.Navigator
      initialRouteName="Weather"
      screenOptions={{
        headerStyle: {
          backgroundColor: themeColors.card,
        },
        headerTintColor: themeColors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        contentStyle: {
          backgroundColor: themeColors.background,
        },
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Weather"
        component={WeatherScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ route }) => ({
          title: route.params?.title || t('details.screenTitle', 'Chi Tiết Thư Viện'),
        })}
      />
    </Stack.Navigator>
  );
};