import React, { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppSegmentedControl, AppSearchBar, EmptyState } from '@/components';
import { StudyPage } from '@/components/common/StudyPage';
import { StudyCourseCard } from '@/components/common/StudyCourseCard';

import { searchCourses } from '@/utils/study';
import type { StudyTabProps } from '@/navigation/types';
import { useAppStore } from '@/hooks/useAppStore';
import { useStudyStyles } from './styles';
export function CoursesScreen({ navigation }: StudyTabProps<'Courses'>) {
  const { courses: allCourses } = useAppStore(s => s.studyData);
  const { t } = useTranslation();
  const { styles, isGlassTheme } = useStudyStyles();
  const [query, setQuery] = useState('');
  const [current, setCurrent] = useState(true);
  const courses = useMemo(
    () =>
      searchCourses(
        current ? allCourses.filter(c => c.active) : allCourses,
        query,
      ),
    [query, current, allCourses],
  );
  return (
    <StudyPage
      title={t('study.courses')}
      subtitle={t('study.courseCount', { count: courses.length })}
      onAdd={() => navigation.navigate('StudyEditor', { kind: 'course' })}
    >
      {({ contentContainerStyle, scrollIndicatorInsets }) => (
        <FlatList
          ListHeaderComponent={
            <View style={styles.filters}>
              <AppSearchBar
                value={query}
                onChangeText={setQuery}
                placeholder={t('study.searchCourses')}
              />
              <AppSegmentedControl
                value={current ? 'current' : 'all'}
                onChange={value => setCurrent(value === 'current')}
                variant={isGlassTheme ? 'glass' : 'standard'}
                options={[
                  { value: 'current', label: t('study.activeCourses') },
                  { value: 'all', label: t('study.allCourses') },
                ]}
              />
            </View>
          }
          data={courses}
          keyExtractor={item => item.id}
          contentContainerStyle={[styles.list, contentContainerStyle]}
          contentInsetAdjustmentBehavior="never"
          scrollIndicatorInsets={scrollIndicatorInsets}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          renderItem={({ item }) => (
            <StudyCourseCard
              course={item}
              onPress={() =>
                navigation.navigate('CourseDetail', { courseId: item.id })
              }
            />
          )}
          ListEmptyComponent={
            <EmptyState
              title={t('study.noCourses')}
              description={t('study.noCoursesBody')}
              actionText={t('study.clearFilters')}
              onActionPress={() => {
                setQuery('');
                setCurrent(false);
              }}
            />
          }
        />
      )}
    </StudyPage>
  );
}
