import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Details: {
    itemId: string;
    title: string;
    description: string;
  };
};

export type SplashScreenProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;