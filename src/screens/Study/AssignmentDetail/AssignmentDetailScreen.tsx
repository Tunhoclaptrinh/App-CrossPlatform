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
import { ASSIGNMENTS, findCourse } from '@/data/study';
import { useAppStore } from '@/hooks/useAppStore';
import { useStudyClock } from '@/hooks/useStudyClock';
import { formatStudyDate, isCompleted, isOverdue } from '@/utils/study';
import type { StudyDetailProps } from '@/navigation/types';
import { useStudyStyles } from './styles';
export function AssignmentDetailScreen({
  navigation,
  route,
}: StudyDetailProps<'AssignmentDetail'>) {
  const { t, i18n } = useTranslation();
  const { styles } = useStudyStyles();
  const completion = useAppStore(s => s.assignmentCompletion);
  const update = useAppStore(s => s.setAssignmentCompleted);
  const now = useStudyClock();
  const [saving, setSaving] = useState(false);
  const toast = useToast();
  const item = ASSIGNMENTS.find(a => a.id === route.params.assignmentId);
  const course = findCourse(item?.courseId ?? '');
  const done = item ? isCompleted(item, completion) : false;
  const overdue = item ? isOverdue(item, completion, now) : false;
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
  return (
    <StudyPage
      title={t('study.assignmentDetail')}
      onBack={navigation.goBack}
      scrollable
    >
      {!item || !course ? (
        <EmptyState
          title={t('study.notFound')}
          description={t('study.notFoundBody')}
        />
      ) : (
        <>
          <View style={styles.hero}>
            <AppText style={styles.heroCaption}>
              {course.code} · {course.name}
            </AppText>
            <AppText style={styles.heroName}>{item.title}</AppText>
          </View>
          <AppCard>
            <View style={styles.stack}>
              <AppBadge
                label={t(
                  done
                    ? 'study.completed'
                    : overdue
                    ? 'study.overdue'
                    : 'study.pending',
                )}
                variant={done ? 'success' : overdue ? 'error' : 'warning'}
              />
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
        </>
      )}
    </StudyPage>
  );
}
