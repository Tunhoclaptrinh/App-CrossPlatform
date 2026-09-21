import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from './types';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['reactnative://', 'https://reactnativebase.app'],
  config: {
    screens: {
      Splash: 'splash',
      Home: 'home',
      Details: 'details/:itemId',
    },
  },
};
