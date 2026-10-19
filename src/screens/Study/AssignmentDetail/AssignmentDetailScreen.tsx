import React, { useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  AppBadge,
  AppButton,
  AppCard,
  AppText,
  EmptyState,
} from '@/components';
import { useToast } from '@/components/common/AppToast';
import { StudyPage } from '@/components/common/StudyPage';

import { useAppStore } from '@/hooks/useAppStore';
import { useStudyClock } from '@/hooks/useStudyClock';
import {
  AlertTriangle,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  RotateCcw,
} from 'lucide-react-native';
import {
  formatStudyDate,
  getAssignmentDueInfo,
  isCompleted,
} from '@/utils/study';
import type { StudyDetailProps } from '@/navigation/types';
import { EntityActions } from '../components/EntityActions';
import { useStudyStyles } from './styles';
export function AssignmentDetailScreen({
  navigation,
  route,
}: StudyDetailProps<'AssignmentDetail'>) {
  const { assignments: allAssignments, courses: allCourses } = useAppStore(
    s => s.studyData,
  );
  const findCourse = (id: string) =>
    allCourses.find(course => course.id === id);
  const { t, i18n } = useTranslation();
  const { styles, theme } = useStudyStyles();
  const completion = useAppStore(s => s.assignmentCompletion);
  const update = useAppStore(s => s.setAssignmentCompleted);
  const now = useStudyClock();
  const [saving, setSaving] = useState(false);
  const toast = useToast();
  const item = allAssignments.find(a => a.id === route.params.assignmentId);
  const course = findCourse(item?.courseId ?? '');
  const done = item ? isCompleted(item, completion) : false;
  const dueInfo = item
    ? getAssignmentDueInfo(item.dueAt, done, now, i18n.language)
    : null;

  const toggle = async () => {
    if (!item) return;
    setSaving(true);
    try {
      await update(item.id, !done);
      toast.success(t('study.updateSuccess'));
    } catch {
      toast.error(t('study.saveError'));
    } finally {
      setSaving(false);
    }
  };

  const statusIcon =
    dueInfo?.status === 'completed' ? (
      <CheckCircle2 size={13} color={theme.successText} />
    ) : dueInfo?.status === 'overdue' ? (
      <AlertTriangle size={13} color={theme.errorText} />
    ) : dueInfo?.status === 'dueSoon' ? (
      <Clock size={13} color={theme.warningText} />
    ) : (
      <Calendar size={13} color={theme.infoText} />
    );

  return (
    <StudyPage
      title={t('study.assignmentDetail')}
      onEdit={() =>
        navigation.navigate('StudyEditor', {
          kind: 'assignment',
          id: route.params.assignmentId,
        })
      }
      onBack={navigation.goBack}
      scrollable
    >
      {!item || !course || !dueInfo ? (
        <EmptyState
          title={t('study.notFound')}
          description={t('study.notFoundBody')}
        />
      ) : (
        <>
          <AppCard style={styles.hero}>
            <AppText style={styles.heroCaption}>
              {course.code} · {course.name}
            </AppText>
            <AppText style={styles.heroName}>{item.title}</AppText>
          </AppCard>
          <AppCard>
            <View style={styles.stack}>
              <View style={styles.dateRow}>
                <AppBadge
                  label={t(dueInfo.labelKey)}
                  variant={dueInfo.badgeVariant}
                  icon={statusIcon}
                />
                {dueInfo.relativeText ? (
                  <AppBadge
                    label={dueInfo.relativeText}
                    variant={dueInfo.badgeVariant}
                  />
                ) : null}
              </View>
              <View style={styles.metaRow}>
                <AppText style={styles.note}>{t('study.dueAt')}</AppText>
                <AppText style={styles.metaValue}>
                  {formatStudyDate(item.dueAt, i18n.language, true)}
                </AppText>
              </View>
              <AppText style={styles.sectionHeading}>
                {t('study.description')}
              </AppText>
              <AppText selectable>{item.description}</AppText>
            </View>
          </AppCard>
          <AppButton
            title={t(done ? 'study.markPending' : 'study.markCompleted')}
            variant={done ? 'outline' : 'success'}
            leftIcon={
              done ? (
                <RotateCcw size={18} color={theme.textSecondary} />
              ) : (
                <Check size={18} color="#FFFFFF" />
              )
            }
            textStyle={done ? { color: theme.textSecondary } : undefined}
            onPress={toggle}
            loading={saving}
          />
          <AppButton
            title={t('study.courseDetail')}
            variant="tonal"
            onPress={() =>
              navigation.navigate('CourseDetail', { courseId: course.id })
            }
          />
          <EntityActions
            kind="assignment"
            id={route.params.assignmentId}
            onDeleted={navigation.goBack}
          />
        </>
      )}
    </StudyPage>
  );
}
