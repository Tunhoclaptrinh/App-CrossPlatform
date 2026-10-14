import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Details: {
    itemId: string;
    title: string;
    description: string;
  };
  LayoutLab: undefined;
  Auth: undefined;
  SecuritySettings: undefined;
};

export type SplashScreenProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;
export type LayoutLabScreenProps = NativeStackScreenProps<RootStackParamList, 'LayoutLab'>;
export type AuthScreenProps = NativeStackScreenProps<RootStackParamList, 'Auth'>;
export type SecuritySettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'SecuritySettings'>;