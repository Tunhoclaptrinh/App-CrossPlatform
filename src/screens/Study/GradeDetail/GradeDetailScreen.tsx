import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  AppBadge,
  AppButton,
  AppCard,
  AppText,
  EmptyState,
} from '@/components';
import { StudyPage } from '@/components/common/StudyPage';

import { gradeTotal } from '@/utils/study';
import type { StudyDetailProps } from '@/navigation/types';
import { EntityActions } from '../components/EntityActions';
import { useAppStore } from '@/hooks/useAppStore';
import { useStudyStyles } from './styles';
export function GradeDetailScreen({
  navigation,
  route,
}: StudyDetailProps<'GradeDetail'>) {
  const { grades: courseGrades, courses: allCourses } = useAppStore(
    s => s.studyData,
  );
  const findCourse = (id: string) =>
    allCourses.find(course => course.id === id);
  const { t } = useTranslation();
  const { styles } = useStudyStyles();
  const grade = courseGrades.find(g => g.id === route.params.gradeId);
  const course = findCourse(
    grade?.courseId ??
      (route.params.gradeId.startsWith('grade-')
        ? route.params.gradeId.slice(6)
        : ''),
  );
  const total = grade ? gradeTotal(grade) : null;
  return (
    <StudyPage
      title={t('study.gradeDetail')}
      onEdit={() =>
        navigation.navigate('StudyEditor', {
          kind: 'grade',
          ...(grade ? { id: grade.id } : { courseId: course?.id }),
        })
      }
      onBack={navigation.goBack}
      scrollable
    >
      {!course ? (
        <EmptyState
          title={t('study.notFound')}
          description={t('study.notFoundBody')}
        />
      ) : !grade ? (
        <EmptyState
          title={t('study.noGrades')}
          actionText={t('study.addGrades')}
          onActionPress={() =>
            navigation.navigate('StudyEditor', {
              kind: 'grade',
              courseId: course.id,
            })
          }
        />
      ) : (
        <>
          <AppCard style={styles.hero}>
            <AppText style={styles.heroCaption}>
              {course.code} · {course.semester}
            </AppText>
            <AppText style={styles.heroName}>{course.name}</AppText>
            <AppText style={styles.heroText}>
              {t('study.credits', { count: course.credits })}
            </AppText>
          </AppCard>
          <AppCard>
            <AppText style={styles.note}>{t('study.totalScore')}</AppText>
            <AppText style={styles.score}>
              {total === null ? '—' : `${total.toFixed(2)} / 10`}
            </AppText>
            <AppBadge
              label={t(
                total === null ? 'study.scorePending' : 'study.finished',
              )}
              variant={total === null ? 'neutral' : 'success'}
            />
          </AppCard>
          <AppCard>
            {grade.components.map((part, index) => (
              <View key={`${index}-${part.name}`} style={styles.metaRow}>
                <View style={styles.row}>
                  <AppText variant="subtitle">
                    {t(`study.${part.name}`, { defaultValue: part.name })}
                  </AppText>
                  <AppText variant="subtitle">
                    {part.score === null ? '—' : part.score.toFixed(1)}
                  </AppText>
                </View>
                <AppText style={styles.note}>
                  {t('study.weight')}: {Math.round(part.weight * 100)}%
                </AppText>
              </View>
            ))}
          </AppCard>
          <AppText style={styles.note}>{t('study.gradeFormula')}</AppText>
          <AppText style={styles.note}>{t('study.personalGradeNote')}</AppText>
          <AppButton
            title={t('study.courseDetail')}
            variant="tonal"
            onPress={() =>
              navigation.navigate('CourseDetail', { courseId: course.id })
            }
          />
          <EntityActions kind="grade" id={route.params.gradeId} />
        </>
      )}
    </StudyPage>
  );
}
