import React, { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppChip, AppSearchBar, EmptyState } from '@/components';
import { StudyPage } from '@/components/common/StudyPage';
import { StudyCourseCard } from '@/components/common/StudyCourseCard';
import { COURSES } from '@/data/study';
import { searchCourses } from '@/utils/study';
import type { StudyTabProps } from '@/navigation/types';
import { useStudyStyles } from './styles';
export function CoursesScreen({ navigation }: StudyTabProps<'Courses'>) {
  const { t } = useTranslation();
  const { styles } = useStudyStyles();
  const [query, setQuery] = useState('');
  const [current, setCurrent] = useState(true);
  const courses = useMemo(
    () =>
      searchCourses(current ? COURSES.filter(c => c.active) : COURSES, query),
    [query, current],
  );
  return (
    <StudyPage
      title={t('study.courses')}
      subtitle={t('study.courseCount', { count: courses.length })}
    >
      <View style={styles.filters}>
        <AppSearchBar
          value={query}
          onChangeText={setQuery}
          placeholder={t('study.searchCourses')}
        />
        <View style={styles.chips}>
          <AppChip
            label={t('study.activeCourses')}
            selected={current}
            onPress={() => setCurrent(true)}
          />
          <AppChip
            label={t('study.allCourses')}
            selected={!current}
            onPress={() => setCurrent(false)}
          />
        </View>
      </View>
      <FlatList
        data={courses}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
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
    </StudyPage>
  );
}
