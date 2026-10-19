import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { CalendarDays, Clock } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '@/hooks/useThemeMode';
import { AppButton } from '../AppButton';
import { AppText } from '../AppText';
import { AppBottomSheet } from '../AppBottomSheet';
import type { AppDateTimeInputProps } from './types';
import { styles } from './styles';

export const AppDateTimeInput = React.memo(
  ({
    label,
    value,
    onChange,
    mode = 'date',
    minimumDate,
    maximumDate,
    disabled,
    error,
  }: AppDateTimeInputProps) => {
    const { t, i18n } = useTranslation();
    const { theme, isDark, isGlassTheme } = useThemeMode();
    const [visible, setVisible] = useState(false);
    const [draft, setDraft] = useState(value);
    const apply = (selected: Date) => {
      const next = new Date(value);
      if (mode === 'date')
        next.setFullYear(
          selected.getFullYear(),
          selected.getMonth(),
          selected.getDate(),
        );
      else next.setHours(selected.getHours(), selected.getMinutes(), 0, 0);
      onChange(next);
    };
    const open = () => {
      if (Platform.OS === 'android') {
        DateTimePickerAndroid.open({
          value,
          mode,
          minimumDate,
          maximumDate,
          is24Hour: true,
          onValueChange: (_event, date) => apply(date),
        });
      } else {
        setDraft(value);
        setVisible(true);
      }
    };
    const title = new Intl.DateTimeFormat(
      i18n.language === 'vi' ? 'vi-VN' : 'en-GB',
      mode === 'date'
        ? { day: '2-digit', month: '2-digit', year: 'numeric' }
        : { hour: '2-digit', minute: '2-digit', hour12: false },
    ).format(value);
    return (
      <View style={styles.root}>
        <AppText variant="caption" color={theme.textSecondary}>
          {label}
        </AppText>
        <AppButton
          title={title}
          accessibilityLabel={`${label}: ${title}`}
          variant={isGlassTheme ? 'glass' : 'outline'}
          leftIcon={
            mode === 'date' ? (
              <CalendarDays size={18} color={theme.primary} />
            ) : (
              <Clock size={18} color={theme.primary} />
            )
          }
          onPress={open}
          disabled={disabled}
        />
        {error && (
          <AppText variant="caption" color={theme.error}>
            {error}
          </AppText>
        )}
        {Platform.OS !== 'android' && (
          <AppBottomSheet
            visible={visible}
            onClose={() => setVisible(false)}
            title={label}
          >
            {visible && (
              <DateTimePicker
                style={styles.picker}
                value={draft}
                mode={mode}
                display="spinner"
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                themeVariant={isDark ? 'dark' : 'light'}
                onValueChange={(_event, date) => setDraft(date)}
              />
            )}
            <View style={styles.actions}>
              <AppButton
                title={t('common.cancel')}
                variant="outline"
                onPress={() => setVisible(false)}
              />
              <AppButton
                title={t('common.confirm')}
                onPress={() => {
                  apply(draft);
                  setVisible(false);
                }}
              />
            </View>
          </AppBottomSheet>
        )}
      </View>
    );
  },
);
