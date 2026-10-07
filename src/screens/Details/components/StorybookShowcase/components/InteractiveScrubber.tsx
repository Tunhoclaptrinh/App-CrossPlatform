import React, { useRef, useState, useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  PanResponder,
  StyleSheet,
  GestureResponderEvent,
  PanResponderGestureState,
  LayoutChangeEvent,
} from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import { AppText } from '@/components';
import { haptics } from '@/utils';
import type { ThemeColors } from '@/constants/colors';

export interface InteractiveScrubberProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  themeColors: ThemeColors;
  isDark: boolean;
  onChange: (val: number) => void;
  formatValue?: (val: number) => string;
}

export const InteractiveScrubber: React.FC<InteractiveScrubberProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  themeColors,
  isDark,
  onChange,
  formatValue,
}) => {
  const [trackWidth, setTrackWidth] = useState<number>(0);
  const trackRef = useRef<View | null>(null);
  const trackLeftRef = useRef<number>(0);

  // Helper to round to nearest step
  const snapToStep = (val: number): number => {
    const clamped = Math.max(min, Math.min(max, val));
    if (step <= 0) return clamped;
    const stepped = Math.round((clamped - min) / step) * step + min;
    return parseFloat(stepped.toFixed(2));
  };

  const handleTrackLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    if (width > 0) {
      setTrackWidth(width);
      if (trackRef.current && 'measure' in trackRef.current) {
        (trackRef.current as any).measure(
          (_x: number, _y: number, _w: number, _h: number, pageX: number) => {
            if (pageX !== undefined) {
              trackLeftRef.current = pageX;
            }
          }
        );
      }
    }
  };

  const calculateValueFromTouch = (pageX: number) => {
    if (trackWidth <= 0) return;
    const relativeX = pageX - trackLeftRef.current;
    const ratio = Math.max(0, Math.min(1, relativeX / trackWidth));
    const rawVal = min + ratio * (max - min);
    const snapped = snapToStep(rawVal);
    if (snapped !== value) {
      haptics.light();
      onChange(snapped);
    }
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt: GestureResponderEvent) => {
          if (trackRef.current && 'measure' in trackRef.current) {
            (trackRef.current as any).measure(
              (_x: number, _y: number, _w: number, _h: number, pageX: number) => {
                if (pageX !== undefined) {
                  trackLeftRef.current = pageX;
                  calculateValueFromTouch(evt.nativeEvent.pageX);
                }
              }
            );
          } else {
            calculateValueFromTouch(evt.nativeEvent.pageX);
          }
        },
        onPanResponderMove: (
          _evt: GestureResponderEvent,
          gestureState: PanResponderGestureState
        ) => {
          calculateValueFromTouch(gestureState.moveX);
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [trackWidth, min, max, step, value]
  );

  const handleDecrement = () => {
    const nextVal = snapToStep(value - step);
    if (nextVal !== value) {
      haptics.light();
      onChange(nextVal);
    }
  };

  const handleIncrement = () => {
    const nextVal = snapToStep(value + step);
    if (nextVal !== value) {
      haptics.light();
      onChange(nextVal);
    }
  };

  const percentage = Math.max(
    0,
    Math.min(100, ((value - min) / (max - min || 1)) * 100)
  );

  const displayVal = formatValue
    ? formatValue(value)
    : `${value}${unit ? ` ${unit}` : ''}`;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: 14,
          backgroundColor: isDark
            ? 'rgba(255, 255, 255, 0.04)'
            : 'rgba(0, 0, 0, 0.025)',
          borderWidth: 1,
          borderColor: isDark
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(0, 0, 0, 0.06)',
          gap: 10,
        },
        headerRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
        },
        label: {
          flex: 1,
          flexShrink: 1,
          fontSize: 11,
          fontWeight: '700',
          color: themeColors.textSecondary,
          letterSpacing: 0.2,
          textTransform: 'uppercase',
        },
        valueBadge: {
          flexShrink: 0,
          paddingHorizontal: 8,
          paddingVertical: 3,
          borderRadius: 8,
          backgroundColor: isDark
            ? 'rgba(99, 102, 241, 0.2)'
            : 'rgba(99, 102, 241, 0.1)',
        },
        valueText: {
          fontSize: 11.5,
          fontWeight: '800',
          color: '#6366F1',
        },
        scrubberRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        },
        stepBtn: {
          width: 30,
          height: 30,
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDark
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(0, 0, 0, 0.06)',
        },
        stepBtnDisabled: {
          opacity: 0.3,
        },
        trackWrapper: {
          flex: 1,
          height: 36,
          justifyContent: 'center',
        },
        trackBackground: {
          height: 8,
          borderRadius: 4,
          backgroundColor: isDark
            ? 'rgba(255, 255, 255, 0.12)'
            : 'rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
        },
        trackFill: {
          height: '100%',
          backgroundColor: themeColors.primary,
          borderRadius: 4,
        },
        thumb: {
          position: 'absolute',
          top: 7,
          width: 22,
          height: 22,
          borderRadius: 11,
          backgroundColor: '#FFFFFF',
          borderWidth: 2,
          borderColor: themeColors.primary,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3,
          elevation: 4,
          marginLeft: -11,
        },
        dragHint: {
          fontSize: 10,
          color: themeColors.textSecondary,
          fontStyle: 'italic',
          textAlign: 'center',
          opacity: 0.75,
        },
      }),
    [themeColors, isDark]
  );

  const fillStyle = useMemo(
    () => ({
      width: `${percentage}%` as any,
    }),
    [percentage]
  );

  const thumbPositionStyle = useMemo(
    () => ({
      left: `${percentage}%` as any,
    }),
    [percentage]
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <AppText style={styles.label} numberOfLines={1}>{label}</AppText>
        <View style={styles.valueBadge}>
          <AppText style={styles.valueText} numberOfLines={1}>{displayVal}</AppText>
        </View>
      </View>

      <View style={styles.scrubberRow}>
        <TouchableOpacity
          style={[styles.stepBtn, value <= min && styles.stepBtnDisabled]}
          disabled={value <= min}
          onPress={handleDecrement}
          activeOpacity={0.7}
        >
          <Minus size={14} color={themeColors.text} strokeWidth={2.5} />
        </TouchableOpacity>

        <View
          ref={trackRef as any}
          style={styles.trackWrapper}
          onLayout={handleTrackLayout}
          {...panResponder.panHandlers}
        >
          <View style={styles.trackBackground}>
            <View style={[styles.trackFill, fillStyle]} />
          </View>
          <View style={[styles.thumb, thumbPositionStyle]} />
        </View>

        <TouchableOpacity
          style={[styles.stepBtn, value >= max && styles.stepBtnDisabled]}
          disabled={value >= max}
          onPress={handleIncrement}
          activeOpacity={0.7}
        >
          <Plus size={14} color={themeColors.text} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      <AppText style={styles.dragHint}>
        Chạm hoặc kéo thanh trượt để chỉnh tay trực tiếp
      </AppText>
    </View>
  );
};
