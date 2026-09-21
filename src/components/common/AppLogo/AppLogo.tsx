import React from 'react';
import { View, useColorScheme } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { AppText } from '../AppText';
import { Colors } from '@/constants/colors';
import { AppConfig } from '@/constants/config';
import type { AppLogoProps } from './types';
import { styles } from './styles';

export const AppLogo: React.FC<AppLogoProps> = ({
  size = 'md',
  showText = false,
  orientation = 'horizontal',
  style,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;

  const getDimension = () => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'sm':
        return 32;
      case 'lg':
        return 64;
      case 'xl':
        return 88;
      case 'md':
      default:
        return 48;
    }
  };

  const dim = getDimension();
  const isVertical = orientation === 'vertical';

  return (
    <View style={[styles.container, isVertical && styles.vertical, style]}>
      <View
        style={[
          styles.iconWrapper,
          {
            width: dim,
            height: dim,
            borderRadius: dim * 0.28,
            backgroundColor: themeColors.primaryLight,
          },
        ]}
      >
        <Svg width={dim * 0.65} height={dim * 0.65} viewBox="0 0 24 24" fill="none">
          <Defs>
            <LinearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={themeColors.primary} />
              <Stop offset="100%" stopColor="#8B5CF6" />
            </LinearGradient>
          </Defs>
          <Path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            fill="url(#logoGrad)"
          />
          <Path
            d="M2 17L12 22L22 17"
            stroke="url(#logoGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M2 12L12 17L22 12"
            stroke="url(#logoGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>

      {showText && (
        <View style={[styles.textContainer, isVertical && styles.verticalText]}>
          <AppText
            variant={dim >= 48 ? 'title' : 'subtitle'}
            color={themeColors.text}
            style={styles.brandTitle}
          >
            {AppConfig.APP_DISPLAY_NAME}
          </AppText>
          <AppText
            variant="caption"
            color={themeColors.textSecondary}
          >
            v{AppConfig.VERSION}
          </AppText>
        </View>
      )}
    </View>
  );
};
