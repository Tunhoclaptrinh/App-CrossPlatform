import React from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { AppText } from '../../AppText';
import { haptics } from '@/utils/haptics';
import { styles } from '../styles';

export interface HeaderSearchRowProps {
  isPillMode: boolean;
  children: React.ReactNode;
  onClose: () => void;
  showBackButton?: boolean;
  showCancelButton?: boolean;
  cancelText?: string;
  isDark?: boolean;
  islandRadius?: number;
  islandBtnRadius?: number;
  actionBtnRadius?: number;
  isCapsuleVariant?: boolean;
  tintColor?: string;
  pillStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  backButtonStyle?: StyleProp<ViewStyle>;
  cancelStyle?: StyleProp<ViewStyle>;
  cancelTextStyle?: StyleProp<TextStyle>;
}

export const HeaderSearchRow: React.FC<HeaderSearchRowProps> = React.memo(({
  isPillMode,
  children,
  onClose,
  showBackButton = true,
  showCancelButton = true,
  cancelText = 'Hủy',
  isDark = false,
  islandRadius = 24,
  islandBtnRadius = 16,
  actionBtnRadius = 19,
  isCapsuleVariant = false,
  tintColor = '#007AFF',
  pillStyle,
  containerStyle,
  backButtonStyle,
  cancelStyle,
  cancelTextStyle,
}) => {
  const handleClose = () => {
    haptics.light();
    onClose();
  };

  if (isPillMode) {
    const islandIconColor = tintColor || (isDark ? '#FFFFFF' : '#0F172A');
    const islandBtnStyle = {
      borderRadius: islandBtnRadius,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.05)',
      borderColor: isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(0, 0, 0, 0.08)',
    };

    return (
      <View
        style={[
          styles.dynamicIslandPill,
          isDark ? styles.dynamicIslandPillDark : styles.dynamicIslandPillLight,
          { borderRadius: islandRadius },
          pillStyle,
        ]}
      >
        {showBackButton && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleClose}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={[styles.islandBackBtn, islandBtnStyle, backButtonStyle]}
            accessibilityLabel="Đóng"
          >
            <ChevronLeft size={18} color={islandIconColor} strokeWidth={2.4} />
          </TouchableOpacity>
        )}

        <View style={[styles.islandSearchFlex, containerStyle]}>
          {children}
        </View>

        {showCancelButton && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleClose}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={[styles.islandCancelBtn, cancelStyle]}
            accessibilityLabel={cancelText}
          >
            <AppText
              style={[
                styles.islandCancelText,
                { color: tintColor },
                cancelTextStyle,
              ]}
            >
              {cancelText}
            </AppText>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  // Bar Mode (Standard iOS navbar or Capsule row)
  return (
    <View style={[styles.searchHeaderRow, containerStyle]}>
      {showBackButton && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleClose}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={[
            styles.searchBackBtn,
            isCapsuleVariant && [
              styles.actionCircleBtn,
              isDark ? styles.actionCircleBtnDark : styles.actionCircleBtnLight,
              { borderRadius: actionBtnRadius },
            ],
            backButtonStyle,
          ]}
          accessibilityLabel="Đóng"
        >
          <ChevronLeft
            size={20}
            color={tintColor}
            strokeWidth={2.4}
          />
        </TouchableOpacity>
      )}

      <View style={styles.searchBarFlex}>
        {children}
      </View>

      {showCancelButton && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleClose}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={[
            styles.searchCancelBtn,
            isCapsuleVariant && [
              styles.capsuleCancelBtn,
              isDark ? styles.capsuleCancelBtnDark : styles.capsuleCancelBtnLight,
            ],
            cancelStyle,
          ]}
          accessibilityLabel={cancelText}
        >
          <AppText
            style={[
              styles.searchCancelText,
              { color: tintColor },
              cancelTextStyle,
            ]}
          >
            {cancelText}
          </AppText>
        </TouchableOpacity>
      )}
    </View>
  );
});

HeaderSearchRow.displayName = 'HeaderSearchRow';
