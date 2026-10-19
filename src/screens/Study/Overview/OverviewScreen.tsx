import React from 'react';
import { View } from 'react-native';
import { BookOpen, CheckCheck } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import {
  AppText,
  AppBadge,
  AppButton,
  AppProgressBar,
  EmptyState,
} from '@/components';
import { StudyPage } from '@/components/common/StudyPage';
import { StudyCourseCard } from '@/components/common/StudyCourseCard';
import { StudyAssignmentCard } from '@/components/common/StudyAssignmentCard';
import { StudySessionCard } from '@/components/common/StudySessionCard';
import { ASSIGNMENTS, COURSES, SESSIONS, STUDY_TERM } from '@/data/study';
import { useAppStore } from '@/hooks/useAppStore';
import { useStudyClock } from '@/hooks/useStudyClock';
import {
  dateKey,
  formatStudyDate,
  isCompleted,
  isOverdue,
  isTermDate,
  selectAssignments,
} from '@/utils/study';
import type { StudyTabProps } from '@/navigation/types';
import { useStudyStyles } from './styles';

export function OverviewScreen({ navigation }: StudyTabProps<'Overview'>) {
  const { t, i18n } = useTranslation();
  const { styles, theme } = useStudyStyles();
  const student = useAppStore(s => s.studentProfile);
  const completion = useAppStore(s => s.assignmentCompletion);
  const now = useStudyClock();
  const date = new Date(now);
  const active = COURSES.filter(c => c.active);
  const done = ASSIGNMENTS.filter(item => isCompleted(item, completion)).length;
  const pending = selectAssignments(ASSIGNMENTS, completion, 'pending');
  const upcoming = pending.filter(
    item =>
      Date.parse(item.dueAt) >= now &&
      Date.parse(item.dueAt) <= now + 7 * 86400000,
  );
  const overdue = pending.filter(item => isOverdue(item, completion, now));
  const todaySessions = isTermDate(date)
    ? SESSIONS.filter(s => s.weekday === (date.getDay() + 6) % 7).sort((a, b) =>
        a.startTime.localeCompare(b.startTime),
      )
    : [];
  return (
    <StudyPage
      title={t('study.appName')}
      subtitle={t('study.tagline')}
      scrollable
      action={<BookOpen size={26} color={theme.primary} />}
    >
      <View style={styles.hero}>
        <View>
          <AppText style={styles.heroText}>{t('study.hello')}</AppText>
          <AppText style={styles.heroName}>{student.fullName}</AppText>
          <AppText style={styles.heroCaption}>
            {t('study.studentId')}: {student.studentId} · {student.className}
          </AppText>
        </View>
        <AppText style={styles.heroCaption}>{STUDY_TERM.label}</AppText>
        <AppProgressBar
          progress={done / ASSIGNMENTS.length}
          color={theme.success}
          animated={false}
        />
        <AppText style={styles.heroCaption}>
          {t('study.progressLabel', { done, total: ASSIGNMENTS.length })}
        </AppText>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <AppText style={styles.statValue}>{active.length}</AppText>
          <AppText variant="caption">{t('study.activeCourses')}</AppText>
        </View>
        <View style={styles.stat}>
          <AppText style={styles.statValue}>
            {active.reduce((sum, c) => sum + c.credits, 0)}
          </AppText>
          <AppText variant="caption">{t('study.creditsLabel')}</AppText>
        </View>
        <View style={styles.stat}>
          <AppText style={styles.statValue}>{pending.length}</AppText>
          <AppText variant="caption">{t('study.pending')}</AppText>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.row}>
          <AppText style={styles.sectionHeading}>{t('study.upcoming')}</AppText>
          <AppButton
            title={t('study.viewAll')}
            variant="ghost"
            size="sm"
            onPress={() => navigation.navigate('Assignments')}
          />
        </View>
        <AppText style={styles.note}>{t('study.upcomingHint')}</AppText>
        {upcoming.slice(0, 3).map(item => (
          <StudyAssignmentCard
            key={item.id}
            assignment={item}
            now={now}
            onPress={() =>
              navigation.navigate('AssignmentDetail', { assignmentId: item.id })
            }
          />
        ))}
        {!upcoming.length && (
          <EmptyState
            size="sm"
            title={t('study.noUpcoming')}
            description={t('study.noUpcomingBody')}
            icon={<CheckCheck size={30} color={theme.success} />}
          />
        )}
      </View>
      {overdue.length > 0 && (
        <View style={styles.section}>
          <View style={styles.chips}>
            <AppText style={styles.sectionHeading}>
              {t('study.overdue')}
            </AppText>
            <AppBadge label={String(overdue.length)} variant="error" />
          </View>
          {overdue.slice(0, 2).map(item => (
            <StudyAssignmentCard
              key={item.id}
              assignment={item}
              now={now}
              onPress={() =>
                navigation.navigate('AssignmentDetail', {
                  assignmentId: item.id,
                })
              }
            />
          ))}
        </View>
      )}
      <View style={styles.section}>
        <AppText style={styles.sectionHeading}>
          {t('study.today')} · {formatStudyDate(date, i18n.language)}
        </AppText>
        {todaySessions.length ? (
          todaySessions.map(item => (
            <StudySessionCard
              key={item.id}
              session={item}
              onPress={() =>
                navigation.navigate('SessionDetail', {
                  sessionId: item.id,
                  date: dateKey(date),
                })
              }
            />
          ))
        ) : (
          <AppText color={theme.textSecondary}>{t('study.todayEmpty')}</AppText>
        )}
      </View>
      <View style={styles.section}>
        <AppText style={styles.sectionHeading}>
          {t('study.activeCourses')}
        </AppText>
        {active.map(course => (
          <StudyCourseCard
            key={course.id}
            course={course}
            onPress={() =>
              navigation.navigate('CourseDetail', { courseId: course.id })
            }
          />
        ))}
      </View>
    </StudyPage>
  );
}
