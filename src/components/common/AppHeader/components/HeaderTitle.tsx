import React from 'react';
import { View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { AppText } from '../../AppText';
import { styles } from '../styles';
import type { HeaderTitleAlign } from '../types';

export interface HeaderTitleProps {
  title?: string;
  subtitle?: string;
  titleAlign?: HeaderTitleAlign;
  subtitleAlign?: HeaderTitleAlign;
  centerContent?: React.ReactNode;
  textColor?: string;
  subtitleColor?: string;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';
}

export const HeaderTitle: React.FC<HeaderTitleProps> = React.memo(({
  title,
  subtitle,
  titleAlign = 'center',
  subtitleAlign,
  centerContent,
  textColor,
  subtitleColor,
  titleStyle,
  subtitleStyle,
  containerStyle,
  pointerEvents = 'auto',
}) => {
  if (centerContent) {
    return (
      <View style={containerStyle} pointerEvents={pointerEvents}>
        {centerContent}
      </View>
    );
  }

  const effectiveSubtitleAlign = subtitleAlign || titleAlign;

  return (
    <View style={containerStyle} pointerEvents={pointerEvents}>
      {title ? (
        <AppText
          style={[
            styles.title,
            titleAlign === 'left' && styles.textLeft,
            titleAlign === 'right' && styles.textRight,
            textColor ? { color: textColor } : null,
            titleStyle,
          ]}
          numberOfLines={1}
        >
          {title}
        </AppText>
      ) : null}

      {subtitle ? (
        <AppText
          style={[
            styles.subtitle,
            effectiveSubtitleAlign === 'left' && styles.textLeft,
            effectiveSubtitleAlign === 'right' && styles.textRight,
            subtitleColor ? { color: subtitleColor } : null,
            subtitleStyle,
          ]}
          numberOfLines={1}
        >
          {subtitle}
        </AppText>
      ) : null}
    </View>
  );
});

HeaderTitle.displayName = 'HeaderTitle';
