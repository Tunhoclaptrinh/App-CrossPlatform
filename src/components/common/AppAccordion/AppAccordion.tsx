import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import { haptics } from '@/utils/haptics';
import type { AppAccordionProps } from './types';
import { createAccordionStyles, ACCORDION_SIZES } from './styles';

export const AppAccordion: React.FC<AppAccordionProps> = ({
  title,
  subtitle,
  icon,
  children,
  expanded: controlledExpanded,
  defaultExpanded = false,
  onToggle,
  variant,
  size = 'md',
  contrast,
  borderRadius,
  style,
  headerStyle,
  contentStyle,
  titleStyle,
  disabled = false,
}) => {
  const { theme, radiusTokens, isDark, globalContrast, isGlassTheme } = useThemeMode();
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;
  const resolvedVariant = variant ?? (isGlassTheme ? 'glass' : 'card');
  const resolvedContrast = contrast ?? globalContrast;

  const styles = createAccordionStyles(
    theme,
    isDark,
    radiusTokens.card,
    resolvedVariant,
    resolvedContrast,
    size,
    borderRadius
  );

  const chevronSize = (ACCORDION_SIZES[size] || ACCORDION_SIZES.md).chevronSize;

  const rotateAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [isExpanded, rotateAnim]);

  const handleToggle = () => {
    if (disabled) return;
    haptics.light();
    if (controlledExpanded === undefined) {
      setInternalExpanded(!internalExpanded);
    }
    onToggle?.(!isExpanded);
  };

  const chevronRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={disabled}
        onPress={handleToggle}
        style={[styles.header, headerStyle]}
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
      >
        <View style={styles.headerLeft}>
          {icon && <View style={styles.iconBox}>{icon}</View>}
          <View style={styles.titleCol}>
            {typeof title === 'string' ? (
              <AppText style={[styles.title, titleStyle]}>{title}</AppText>
            ) : (
              title
            )}
            {subtitle && (
              <AppText style={styles.subtitle}>{subtitle}</AppText>
            )}
          </View>
        </View>

        <Animated.View style={{ transform: [{ rotate: chevronRotation }] }}>
          <ChevronDown size={chevronSize} color={theme.textSecondary} />
        </Animated.View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={[styles.contentWrapper, contentStyle]}>
          {children}
        </View>
      )}
    </View>
  );
};
