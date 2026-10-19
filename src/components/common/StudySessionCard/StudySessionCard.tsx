import React, { useMemo } from 'react';
import { Pressable, View } from 'react-native';
import {
  MapPin,
  ChevronRight,
  BookOpen,
  Laptop,
  Radio,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/hooks/useAppStore';
import { useThemeMode } from '@/hooks/useThemeMode';
import { isSessionOngoing } from '@/utils/study';
import { AppCard } from '../AppCard';
import { AppText } from '../AppText';
import { AppBadge } from '../AppBadge';
import type { StudySessionCardProps } from './types';
import { createStyles } from './styles';
export const StudySessionCard = React.memo(
  ({ session, dayLabel, now, onPress }: StudySessionCardProps) => {
    const { t } = useTranslation();
    const { theme } = useThemeMode();
    const styles = useMemo(() => createStyles(theme), [theme]);
    const ongoing = isSessionOngoing(session, now);
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
              variant={session.kind === 'lecture' ? 'info' : 'warning'}
              size="sm"
              icon={
                session.kind === 'lecture' ? (
                  <BookOpen size={11} color={theme.infoText} />
                ) : (
                  <Laptop size={11} color={theme.warningText} />
                )
              }
            />
            {ongoing && (
              <AppBadge
                label={t('study.ongoingNow')}
                variant="success"
                size="sm"
                icon={<Radio size={11} color={theme.successText} />}
              />
            )}
          </View>
        </AppCard>
      </Pressable>
    );
  },
);
