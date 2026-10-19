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
import { StudyAssignmentCard } from '@/components/common/StudyAssignmentCard';
import { StudySessionCard } from '@/components/common/StudySessionCard';

import { useStudyClock } from '@/hooks/useStudyClock';
import type { StudyDetailProps } from '@/navigation/types';
import { EntityActions } from '../components/EntityActions';
import { useAppStore } from '@/hooks/useAppStore';
import { useStudyStyles } from './styles';
export function CourseDetailScreen({
  navigation,
  route,
}: StudyDetailProps<'CourseDetail'>) {
  const {
    assignments: allAssignments,
    sessions: allSessions,
    courses: allCourses,
  } = useAppStore(s => s.studyData);
  const findCourse = (id: string) =>
    allCourses.find(course => course.id === id);
  const { t } = useTranslation();
  const { styles } = useStudyStyles();
  const now = useStudyClock();
  const course = findCourse(route.params.courseId);
  const assignments = allAssignments
    .filter(item => item.courseId === course?.id)
    .sort((a, b) => Date.parse(a.dueAt) - Date.parse(b.dueAt));
  const sessions = allSessions
    .filter(item => item.courseId === course?.id)
    .sort(
      (a, b) => a.weekday - b.weekday || a.startTime.localeCompare(b.startTime),
    );
  const weekdays = t('study.fullWeekdays', { returnObjects: true }) as string[];
  return (
    <StudyPage
      title={t('study.courseDetail')}
      onEdit={() =>
        navigation.navigate('StudyEditor', {
          kind: 'course',
          id: route.params.courseId,
        })
      }
      subtitle={course?.code}
      onBack={navigation.goBack}
      scrollable
    >
      {!course ? (
        <EmptyState
          title={t('study.notFound')}
          description={t('study.notFoundBody')}
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
            <AppText style={styles.sectionHeading}>
              {t('study.courseInfo')}
            </AppText>
            <View style={styles.metaRow}>
              <AppText style={styles.note}>{t('study.lecturer')}</AppText>
              <AppText style={styles.metaValue}>{course.lecturer}</AppText>
            </View>
            <View style={styles.metaRow}>
              <AppText style={styles.note}>{t('study.description')}</AppText>
              <AppText>{course.description}</AppText>
            </View>
            <View style={styles.dateRow}>
              <AppBadge
                label={t(course.active ? 'study.current' : 'study.finished')}
                variant={course.active ? 'info' : 'neutral'}
              />
            </View>
            <AppButton
              title={t('study.results')}
              variant="tonal"
              onPress={() =>
                navigation.navigate('GradeDetail', {
                  gradeId: `grade-${course.id}`,
                })
              }
            />
          </AppCard>
          <View style={styles.section}>
            <AppText style={styles.sectionHeading}>
              {t('study.relatedSessions')}
            </AppText>
            <AppButton
              title={t('study.addSession')}
              variant="tonal"
              onPress={() =>
                navigation.navigate('StudyEditor', {
                  kind: 'session',
                  courseId: course.id,
                })
              }
            />
            {sessions.length ? (
              sessions.map(item => (
                <StudySessionCard
                  key={item.id}
                  session={item}
                  now={now}
                  dayLabel={weekdays[item.weekday]}
                  onPress={() =>
                    navigation.navigate('SessionDetail', { sessionId: item.id })
                  }
                />
              ))
            ) : (
              <AppText style={styles.note}>
                {t('study.noRelatedSessions')}
              </AppText>
            )}
          </View>
          <View style={styles.section}>
            <AppText style={styles.sectionHeading}>
              {t('study.relatedAssignments')}
            </AppText>
            <AppButton
              title={t('study.addAssignment')}
              variant="tonal"
              onPress={() =>
                navigation.navigate('StudyEditor', {
                  kind: 'assignment',
                  courseId: course.id,
                })
              }
            />
            {assignments.length ? (
              assignments.map(item => (
                <StudyAssignmentCard
                  key={item.id}
                  assignment={item}
                  now={now}
                  editable
                  onPress={() =>
                    navigation.navigate('AssignmentDetail', {
                      assignmentId: item.id,
                    })
                  }
                />
              ))
            ) : (
              <AppText style={styles.note}>
                {t('study.noRelatedAssignments')}
              </AppText>
            )}
          </View>
          <EntityActions
            kind="course"
            id={route.params.courseId}
            onDeleted={navigation.goBack}
          />
        </>
      )}
    </StudyPage>
  );
}
