import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { CalendarClock, Check, RotateCcw } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useAppStore } from '@/hooks/useAppStore';
import { findCourse } from '@/data/study';
import { isCompleted, isOverdue, formatStudyDate } from '@/utils/study';
import { AppCard } from '../AppCard';
import { AppText } from '../AppText';
import { AppBadge } from '../AppBadge';
import { AppButton } from '../AppButton';
import { useToast } from '../AppToast';
import type { StudyAssignmentCardProps } from './types';
import { styles } from './styles';
export const StudyAssignmentCard = React.memo(
  ({ assignment, now, onPress, editable }: StudyAssignmentCardProps) => {
    const { t, i18n } = useTranslation();
    const { theme } = useThemeMode();
    const completion = useAppStore(s => s.assignmentCompletion);
    const update = useAppStore(s => s.setAssignmentCompleted);
    const [saving, setSaving] = useState(false);
    const toast = useToast();
    const done = isCompleted(assignment, completion);
    const overdue = isOverdue(assignment, completion, now);
    const toggle = async () => {
      setSaving(true);
      try {
        await update(assignment.id, !done);
        toast.success(t('study.updateSuccess'));
      } catch {
        toast.error(t('study.saveError'));
      } finally {
        setSaving(false);
      }
    };
    return (
      <AppCard style={styles.card}>
        <Pressable
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel={`${assignment.title}, ${t(
            done ? 'study.completed' : 'study.pending',
          )}`}
          style={styles.body}
        >
          <View style={styles.row}>
            <AppBadge
              size="sm"
              label={findCourse(assignment.courseId)?.code ?? ''}
              variant="neutral"
            />
            <AppBadge
              size="sm"
              label={t(
                done
                  ? 'study.completed'
                  : overdue
                  ? 'study.overdue'
                  : 'study.pending',
              )}
              variant={done ? 'success' : overdue ? 'error' : 'warning'}
            />
          </View>
          <AppText style={styles.title}>{assignment.title}</AppText>
          <AppText variant="caption" color={theme.textSecondary}>
            {findCourse(assignment.courseId)?.name}
          </AppText>
          <View style={styles.row}>
            <CalendarClock
              size={15}
              color={overdue ? theme.error : theme.textSecondary}
            />
            <AppText
              variant="caption"
              color={overdue ? theme.error : theme.textSecondary}
            >
              {t('study.dueAt')}:{' '}
              {formatStudyDate(assignment.dueAt, i18n.language, true)}
            </AppText>
          </View>
        </Pressable>
        {editable && (
          <AppButton
            style={styles.toggle}
            variant={done ? 'outline' : 'tonal'}
            title={t(
              done ? 'study.markPendingShort' : 'study.markCompletedShort',
            )}
            leftIcon={
              done ? (
                <RotateCcw size={16} color={theme.primary} />
              ) : (
                <Check size={16} color={theme.primary} />
              )
            }
            onPress={toggle}
            loading={saving}
            accessibilityLabel={t(
              done ? 'study.markPending' : 'study.markCompleted',
            )}
          />
        )}
      </AppCard>
    );
  },
);
