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
import { GRADES, findCourse } from '@/data/study';
import { gradeTotal } from '@/utils/study';
import type { StudyDetailProps } from '@/navigation/types';
import { useStudyStyles } from './styles';
export function GradeDetailScreen({
  navigation,
  route,
}: StudyDetailProps<'GradeDetail'>) {
  const { t } = useTranslation();
  const { styles } = useStudyStyles();
  const grade = GRADES.find(g => g.id === route.params.gradeId);
  const course = findCourse(grade?.courseId ?? '');
  const total = grade ? gradeTotal(grade) : null;
  return (
    <StudyPage
      title={t('study.gradeDetail')}
      onBack={navigation.goBack}
      scrollable
    >
      {!grade || !course ? (
        <EmptyState
          title={t('study.notFound')}
          description={t('study.notFoundBody')}
        />
      ) : (
        <>
          <View style={styles.hero}>
            <AppText style={styles.heroCaption}>
              {course.code} · {course.semester}
            </AppText>
            <AppText style={styles.heroName}>{course.name}</AppText>
            <AppText style={styles.heroText}>
              {t('study.credits', { count: course.credits })}
            </AppText>
          </View>
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
            {grade.components.map(part => (
              <View key={part.name} style={styles.metaRow}>
                <View style={styles.row}>
                  <AppText variant="subtitle">
                    {t(`study.${part.name}`)}
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
          <AppText style={styles.note}>{t('study.sampleNote')}</AppText>
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
