import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import {
  CalendarClock,
  Check,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Calendar,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useAppStore } from '@/hooks/useAppStore';
import {
  isCompleted,
  formatStudyDate,
  getAssignmentDueInfo,
} from '@/utils/study';
import { AppCard } from '../AppCard';
import { AppText } from '../AppText';
import { AppBadge } from '../AppBadge';
import { AppButton } from '../AppButton';
import { useToast } from '../AppToast';
import type { StudyAssignmentCardProps } from './types';
import { styles } from './styles';

export const StudyAssignmentCard = React.memo(
  ({ assignment, now, onPress, editable }: StudyAssignmentCardProps) => {
    const course = useAppStore(s =>
      s.studyData.courses.find(item => item.id === assignment.courseId),
    );
    const { t, i18n } = useTranslation();
    const { theme } = useThemeMode();
    const completion = useAppStore(s => s.assignmentCompletion);
    const update = useAppStore(s => s.setAssignmentCompleted);
    const [saving, setSaving] = useState(false);
    const toast = useToast();
    const done = isCompleted(assignment, completion);
    const dueInfo = getAssignmentDueInfo(
      assignment.dueAt,
      done,
      now,
      i18n.language,
    );

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

    const statusIcon =
      dueInfo.status === 'completed' ? (
        <CheckCircle2 size={12} color={theme.successText} />
      ) : dueInfo.status === 'overdue' ? (
        <AlertTriangle size={12} color={theme.errorText} />
      ) : dueInfo.status === 'dueSoon' ? (
        <Clock size={12} color={theme.warningText} />
      ) : (
        <Calendar size={12} color={theme.infoText} />
      );

    return (
      <AppCard style={styles.card}>
        <Pressable
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel={`${assignment.title}, ${t(dueInfo.labelKey)}`}
          style={styles.body}
        >
          <View style={styles.row}>
            <AppBadge size="sm" label={course?.code ?? ''} variant="neutral" />
            <AppBadge
              size="sm"
              label={t(dueInfo.labelKey)}
              variant={dueInfo.badgeVariant}
              icon={statusIcon}
            />
            {dueInfo.relativeText ? (
              <AppBadge
                size="sm"
                label={dueInfo.relativeText}
                variant={dueInfo.badgeVariant}
              />
            ) : null}
          </View>
          <AppText style={done ? styles.titleDone : styles.title}>
            {assignment.title}
          </AppText>
          <AppText variant="caption" color={theme.textSecondary}>
            {course?.name}
          </AppText>
          <View style={styles.row}>
            <CalendarClock
              size={15}
              color={
                dueInfo.status === 'overdue' ? theme.error : theme.textSecondary
              }
            />
            <AppText
              variant="caption"
              style={styles.dueText}
              color={
                dueInfo.status === 'overdue' ? theme.error : theme.textSecondary
              }
            >
              {t('study.dueAt')}:{' '}
              {formatStudyDate(assignment.dueAt, i18n.language, true)}
            </AppText>
          </View>
        </Pressable>
        {editable && (
          <AppButton
            style={styles.toggle}
            size="sm"
            variant={done ? 'outline' : 'success'}
            title={t(
              done ? 'study.markPendingShort' : 'study.completedShort',
            )}
            leftIcon={
              done ? (
                <RotateCcw size={14} color={theme.textSecondary} />
              ) : (
                <Check size={16} color="#FFFFFF" />
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
