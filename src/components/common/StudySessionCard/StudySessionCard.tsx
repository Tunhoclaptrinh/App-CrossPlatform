import React, { useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { MapPin, ChevronRight } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/hooks/useAppStore';
import { useThemeMode } from '@/hooks/useThemeMode';
import { AppCard } from '../AppCard';
import { AppText } from '../AppText';
import { AppBadge } from '../AppBadge';
import type { StudySessionCardProps } from './types';
import { createStyles } from './styles';
export const StudySessionCard = React.memo(
  ({ session, dayLabel, onPress }: StudySessionCardProps) => {
    const { t } = useTranslation();
    const { theme } = useThemeMode();
    const styles = useMemo(() => createStyles(theme), [theme]);
    const name = useAppStore(
      s =>
        s.studyData.courses.find(item => item.id === session.courseId)?.name ??
        '',
    );
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${name}, ${dayLabel ?? ''}, ${session.startTime}–${
          session.endTime
        }, ${session.room}`}
      >
        <AppCard style={styles.card}>
          <View style={styles.row}>
            <View style={styles.time}>
              <AppText style={styles.start}>{session.startTime}</AppText>
              <AppText variant="caption" color={theme.textSecondary}>
                {session.endTime}
              </AppText>
            </View>
            <View style={styles.body}>
              {dayLabel && (
                <AppText variant="caption" color={theme.primary}>
                  {dayLabel}
                </AppText>
              )}
              <AppText variant="subtitle">{name}</AppText>
            </View>
            <ChevronRight size={18} color={theme.textSecondary} />
          </View>
          <View style={styles.meta}>
            <MapPin size={15} color={theme.textSecondary} />
            <AppText variant="caption" color={theme.textSecondary}>
              {session.room}
            </AppText>
            <AppBadge
              label={t(`study.${session.kind}`)}
              variant="neutral"
              size="sm"
            />
          </View>
        </AppCard>
      </Pressable>
    );
  },
);
