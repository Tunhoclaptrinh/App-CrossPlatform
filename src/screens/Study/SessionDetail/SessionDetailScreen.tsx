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
import { SESSIONS, STUDY_TERM, findCourse } from '@/data/study';
import { dateKey, formatStudyDate, isTermDate } from '@/utils/study';
import type { StudyDetailProps } from '@/navigation/types';
import { useStudyStyles } from './styles';
export function SessionDetailScreen({
  navigation,
  route,
}: StudyDetailProps<'SessionDetail'>) {
  const { t, i18n } = useTranslation();
  const { styles } = useStudyStyles();
  const session = SESSIONS.find(item => item.id === route.params.sessionId);
  const course = findCourse(session?.courseId ?? '');
  const date = route.params.date
    ? new Date(`${route.params.date}T12:00:00`)
    : null;
  const dateValid =
    !date ||
    (!Number.isNaN(date.getTime()) &&
      dateKey(date) === route.params.date &&
      isTermDate(date) &&
      (date.getDay() + 6) % 7 === session?.weekday);
  const weekdays = t('study.fullWeekdays', { returnObjects: true }) as string[];
  return (
    <StudyPage
      title={t('study.sessionDetail')}
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
          <View style={styles.hero}>
            <AppText style={styles.heroCaption}>{course.code}</AppText>
            <AppText style={styles.heroName}>{course.name}</AppText>
            <AppText style={styles.heroText}>
              {weekdays[session.weekday]} · {session.startTime}–
              {session.endTime}
            </AppText>
          </View>
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
            <AppText style={styles.note}>
              {t('study.scheduleHint', { term: STUDY_TERM.label })}
            </AppText>
            <AppText style={styles.note}>
              {formatStudyDate(
                `${STUDY_TERM.startsOn}T12:00:00`,
                i18n.language,
              )}{' '}
              –{' '}
              {formatStudyDate(`${STUDY_TERM.endsOn}T12:00:00`, i18n.language)}
            </AppText>
          </AppCard>
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
