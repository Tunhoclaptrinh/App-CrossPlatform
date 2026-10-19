import React, { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppChip, AppSelect, EmptyState } from '@/components';
import { StudyPage } from '@/components/common/StudyPage';
import { StudyAssignmentCard } from '@/components/common/StudyAssignmentCard';

import { useAppStore } from '@/hooks/useAppStore';
import { useStudyClock } from '@/hooks/useStudyClock';
import { selectAssignments } from '@/utils/study';
import type { AssignmentFilter } from '@/types/study';
import type { StudyTabProps } from '@/navigation/types';
import { useStudyStyles } from './styles';
export function AssignmentsScreen({
  navigation,
}: StudyTabProps<'Assignments'>) {
  const { assignments: allAssignments, courses: allCourses } = useAppStore(
    s => s.studyData,
  );
  const { t } = useTranslation();
  const { styles } = useStudyStyles();
  const completion = useAppStore(s => s.assignmentCompletion);
  const [filter, setFilter] = useState<AssignmentFilter>('pending');
  const [courseId, setCourseId] = useState('all');
  const now = useStudyClock();
  const items = useMemo(
    () =>
      selectAssignments(
        allAssignments,
        completion,
        filter,
        courseId === 'all' ? undefined : courseId,
      ),
    [completion, filter, courseId, allAssignments],
  );
  return (
    <StudyPage
      title={t('study.assignments')}
      onAdd={() => navigation.navigate('StudyEditor', { kind: 'assignment' })}
      subtitle={t('study.progressLabel', {
        done: selectAssignments(allAssignments, completion, 'completed').length,
        total: allAssignments.length,
      })}
    >
      <View style={styles.filters}>
        <View style={styles.chips}>
          {(['all', 'pending', 'completed'] as const).map(value => (
            <AppChip
              key={value}
              label={t(`study.${value}`)}
              selected={filter === value}
              onPress={() => setFilter(value)}
            />
          ))}
        </View>
        <AppSelect
          label={t('study.courseFilter')}
          value={courseId}
          onSelect={setCourseId}
          options={[
            { label: t('study.allCourses'), value: 'all' },
            ...allCourses.map(c => ({
              label: c.name,
              value: c.id,
            })),
          ]}
        />
      </View>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <StudyAssignmentCard
            assignment={item}
            now={now}
            editable
            onPress={() =>
              navigation.navigate('AssignmentDetail', { assignmentId: item.id })
            }
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title={t('study.noAssignments')}
            description={t('study.noAssignmentsBody')}
            actionText={t('study.clearFilters')}
            onActionPress={() => {
              setFilter('all');
              setCourseId('all');
            }}
          />
        }
      />
    </StudyPage>
  );
}
