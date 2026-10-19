import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { AppButton, AppChip, AppText, EmptyState } from '@/components';
import { StudyPage } from '@/components/common/StudyPage';
import { StudySessionCard } from '@/components/common/StudySessionCard';

import { useStudyClock } from '@/hooks/useStudyClock';
import {
  addDays,
  dateKey,
  formatStudyDate,
  isTermDate,
  mondayOf,
} from '@/utils/study';
import type { StudyTabProps } from '@/navigation/types';
import { useAppStore } from '@/hooks/useAppStore';
import { useStudyStyles } from './styles';
export function TimetableScreen({ navigation }: StudyTabProps<'Timetable'>) {
  const {
    sessions: allSessions,
    term,
    courses: studyCourses,
  } = useAppStore(s => s.studyData);
  const { t, i18n } = useTranslation();
  const { styles, theme } = useStudyStyles();
  const now = useStudyClock();
  const [week, setWeek] = useState(() => mondayOf(new Date()));
  const [day, setDay] = useState<number | null>(null);
  const sessions = useMemo(
    () =>
      allSessions
        .filter(
          s =>
            studyCourses.some(
              course => course.id === s.courseId && course.active,
            ) &&
            (day === null || s.weekday === day) &&
            isTermDate(addDays(week, s.weekday), term),
        )
        .sort(
          (a, b) =>
            a.weekday - b.weekday || a.startTime.localeCompare(b.startTime),
        ),
    [week, day, allSessions, term, studyCourses],
  );
  const weekdays = t('study.weekdays', { returnObjects: true }) as string[];
  const fullWeekdays = t('study.fullWeekdays', {
    returnObjects: true,
  }) as string[];
  return (
    <StudyPage
      title={t('study.timetable')}
      onAdd={() => navigation.navigate('StudyEditor', { kind: 'session' })}
      onEdit={() => navigation.navigate('StudyEditor', { kind: 'term' })}
      subtitle={t('study.scheduleHint', { term: term.label })}
    >
      {({ contentContainerStyle, scrollIndicatorInsets }) => (
        <FlatList
          ListHeaderComponent={
            <View style={styles.filters}>
              <View style={styles.row}>
                <AppButton
                  accessibilityLabel={t('study.previousWeek')}
                  variant="outline"
                  onPress={() => setWeek(addDays(week, -7))}
                  leftIcon={<ChevronLeft size={18} color={theme.primary} />}
                />
                <AppText variant="subtitle2">
                  {formatStudyDate(week, i18n.language).slice(0, 5)} –{' '}
                  {formatStudyDate(addDays(week, 6), i18n.language)}
                </AppText>
                <AppButton
                  accessibilityLabel={t('study.nextWeek')}
                  variant="outline"
                  onPress={() => setWeek(addDays(week, 7))}
                  leftIcon={<ChevronRight size={18} color={theme.primary} />}
                />
              </View>
              <View style={styles.dayGrid}>
                {weekdays.map((label, index) => {
                  const date = addDays(week, index);
                  const hasSession =
                    isTermDate(date, term) &&
                    allSessions.some(
                      s =>
                        s.weekday === index &&
                        studyCourses.some(
                          course => course.id === s.courseId && course.active,
                        ),
                    );
                  return (
                    <Pressable
                      key={label}
                      accessibilityRole="button"
                      accessibilityState={{ selected: day === index }}
                      accessibilityLabel={`${
                        fullWeekdays[index]
                      }, ${formatStudyDate(date, i18n.language)}`}
                      onPress={() => setDay(index)}
                      style={[styles.day, day === index && styles.daySelected]}
                    >
                      <AppText
                        variant="caption"
                        style={
                          day === index ? styles.dayTextSelected : undefined
                        }
                      >
                        {label}
                      </AppText>
                      <AppText
                        variant="subtitle2"
                        style={
                          day === index ? styles.dayTextSelected : undefined
                        }
                      >
                        {date.getDate()}
                      </AppText>
                      <View
                        style={[
                          styles.dot,
                          day === index && styles.dotSelected,
                          !hasSession && styles.dotEmpty,
                        ]}
                      />
                    </Pressable>
                  );
                })}
              </View>
              <View style={styles.row}>
                <AppChip
                  label={t('study.wholeWeek')}
                  selected={day === null}
                  onPress={() => setDay(null)}
                />
                <AppText variant="caption">
                  {day === null
                    ? t('study.weekSessions', { count: sessions.length })
                    : fullWeekdays[day]}
                </AppText>
                <AppButton
                  title={t('study.today')}
                  variant="ghost"
                  size="sm"
                  onPress={() => {
                    setWeek(mondayOf(new Date(now)));
                    setDay((new Date(now).getDay() + 6) % 7);
                  }}
                />
              </View>
            </View>
          }
          data={sessions}
          keyExtractor={item => item.id}
          contentContainerStyle={[styles.list, contentContainerStyle]}
          contentInsetAdjustmentBehavior="never"
          scrollIndicatorInsets={scrollIndicatorInsets}
          renderItem={({ item }) => (
            <StudySessionCard
              session={item}
              now={now}
              dayLabel={`${fullWeekdays[item.weekday]} · ${formatStudyDate(
                addDays(week, item.weekday),
                i18n.language,
              )}`}
              onPress={() =>
                navigation.navigate('SessionDetail', {
                  sessionId: item.id,
                  date: dateKey(addDays(week, item.weekday)),
                })
              }
            />
          )}
          ListEmptyComponent={
            <EmptyState
              title={t('study.noSessions')}
              description={t('study.noSessionsBody')}
            />
          }
        />
      )}
    </StudyPage>
  );
}
