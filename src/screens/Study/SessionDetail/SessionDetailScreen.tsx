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

import { dateKey, formatStudyDate, isTermDate } from '@/utils/study';
import type { StudyDetailProps } from '@/navigation/types';
import { EntityActions } from '../components/EntityActions';
import { useAppStore } from '@/hooks/useAppStore';
import { useStudyStyles } from './styles';
export function SessionDetailScreen({
  navigation,
  route,
}: StudyDetailProps<'SessionDetail'>) {
  const {
    sessions: allSessions,
    term,
    courses: allCourses,
  } = useAppStore(s => s.studyData);
  const findCourse = (id: string) =>
    allCourses.find(course => course.id === id);
  const { t, i18n } = useTranslation();
  const { styles } = useStudyStyles();
  const session = allSessions.find(item => item.id === route.params.sessionId);
  const course = findCourse(session?.courseId ?? '');
  const date = route.params.date
    ? new Date(`${route.params.date}T12:00:00`)
    : null;
  const dateValid =
    !date ||
    (!Number.isNaN(date.getTime()) &&
      dateKey(date) === route.params.date &&
      isTermDate(date, term) &&
      (date.getDay() + 6) % 7 === session?.weekday);
  const weekdays = t('study.fullWeekdays', { returnObjects: true }) as string[];
  return (
    <StudyPage
      title={t('study.sessionDetail')}
      onEdit={() =>
        navigation.navigate('StudyEditor', {
          kind: 'session',
          id: route.params.sessionId,
        })
      }
      onBack={navigation.goBack}
      scrollable
    >
      {!session || !course || !dateValid ? (
        <EmptyState
          title={t('study.notFound')}
          description={t('study.notFoundBody')}
        />
      ) : (
        <>
          <AppCard style={styles.hero}>
            <AppText style={styles.heroCaption}>{course.code}</AppText>
            <AppText style={styles.heroName}>{course.name}</AppText>
            <AppText style={styles.heroText}>
              {weekdays[session.weekday]} · {session.startTime}–
              {session.endTime}
            </AppText>
          </AppCard>
          <AppCard>
            {[
              [
                t('study.date'),
                date
                  ? formatStudyDate(date, i18n.language)
                  : weekdays[session.weekday],
              ],
              [t('study.time'), `${session.startTime}–${session.endTime}`],
              [t('study.room'), session.room],
              [t('study.lecturer'), course.lecturer],
              [t('study.semester'), course.semester],
            ].map(([label, value]) => (
              <View key={label} style={styles.metaRow}>
                <AppText style={styles.note}>{label}</AppText>
                <AppText style={styles.metaValue}>{value}</AppText>
              </View>
            ))}
            <View style={styles.dateRow}>
              <AppBadge label={t(`study.${session.kind}`)} />
            </View>
            {course.active ? (
              <>
                <AppText style={styles.note}>
                  {t('study.scheduleHint', { term: term.label })}
                </AppText>
                <AppText style={styles.note}>
                  {formatStudyDate(`${term.startsOn}T12:00:00`, i18n.language)}{' '}
                  – {formatStudyDate(`${term.endsOn}T12:00:00`, i18n.language)}
                </AppText>
              </>
            ) : (
              <AppText style={styles.note}>
                {t('study.archivedScheduleHint')}
              </AppText>
            )}
          </AppCard>
          <AppButton
            title={t('study.courseDetail')}
            variant="tonal"
            onPress={() =>
              navigation.navigate('CourseDetail', { courseId: course.id })
            }
          />
          <EntityActions
            kind="session"
            id={route.params.sessionId}
            onDeleted={navigation.goBack}
          />
        </>
      )}
    </StudyPage>
  );
}
