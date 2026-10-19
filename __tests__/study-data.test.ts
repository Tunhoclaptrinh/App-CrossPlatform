import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppStore } from '@/hooks/useAppStore';
import { STUDENT } from '@/data/study';
import {
  createStudyBackup,
  parseStudyBackup,
  parseStudyData,
  saveEntity,
  seedStudyData,
  deleteEntity,
} from '@/utils/studyData';
import { gradeTotal, isCompleted } from '@/utils/study';
import type { Course, StudyData } from '@/types/study';
const newCourse = (id: string): Course => ({
  id,
  code: id.toUpperCase(),
  name: `Course ${id}`,
  credits: 3,
  lecturer: 'Teacher',
  semester: '2026',
  active: true,
  description: '',
});
let seed: StudyData;
beforeEach(async () => {
  jest.restoreAllMocks();
  seed = seedStudyData();
  await useAppStore.setState({
    studyData: seed,
    studentProfile: STUDENT,
    assignmentCompletion: {},
    studyHydrated: true,
    studyHydrationFailed: false,
  });
});

test('adds a course with a grade record; rejects duplicate codes and broken relationships', () => {
  const data = saveEntity(seed, 'course', newCourse('personal'));
  expect(data.courses).toHaveLength(8);
  expect(data.grades.find(item => item.courseId === 'personal')).toBeDefined();
  expect(() =>
    saveEntity(data, 'course', { ...newCourse('other'), code: ' personal ' }),
  ).toThrow('duplicateCode');
  expect(() =>
    saveEntity(data, 'assignment', {
      id: 'x',
      courseId: 'missing',
      title: 'Test',
      description: '',
      dueAt: new Date().toISOString(),
      completed: false,
    }),
  ).toThrow('missingCourse');
});
test('rejects overlapping weekly classes, accepts touching intervals and ignores archived courses', () => {
  const session = {
    ...seed.sessions[0],
    id: 'collision',
    courseId: 'database',
    startTime: '09:00',
    endTime: '11:00',
  };
  expect(() => saveEntity(seed, 'session', session)).toThrow(
    'scheduleConflict',
  );
  expect(
    saveEntity(seed, 'session', {
      ...session,
      startTime: '10:00',
      endTime: '11:00',
    }).sessions,
  ).toHaveLength(9);
  const archived = {
    ...seed,
    courses: seed.courses.map(item =>
      item.id === 'mobile' ? { ...item, active: false } : item,
    ),
  };
  expect(saveEntity(archived, 'session', session).sessions).toHaveLength(9);
});
test('deleting a course cascades only its linked data; clearing scores preserves weights', () => {
  const data = deleteEntity(seed, 'course', 'mobile');
  for (const item of [...data.sessions, ...data.assignments, ...data.grades])
    expect(item.courseId).not.toBe('mobile');
  expect(data.courses.find(item => item.id === 'database')).toBeDefined();
  const cleared = deleteEntity(seed, 'grade', 'grade-oop').grades.find(
    item => item.id === 'grade-oop',
  )!;
  expect(cleared.components.every(part => part.score === null)).toBe(true);
  expect(cleared.components.map(part => part.weight)).toEqual([0.1, 0.3, 0.6]);
});
test('validates weights and treats zero scores as grades while zero-weight missing scores do not block totals', () => {
  expect(
    gradeTotal({
      id: 'g',
      courseId: 'x',
      components: [
        { name: 'Unused', weight: 0, score: null },
        { name: 'Exam', weight: 1, score: 0 },
      ],
    }),
  ).toBe(0);
  expect(() =>
    saveEntity(seed, 'grade', {
      ...seed.grades[0],
      components: [{ name: 'Exam', weight: 0.5, score: 9 }],
    }),
  ).toThrow();
});
test('backups round trip effective completion and reject unsupported versions, duplicate IDs and invalid references', () => {
  const backup = createStudyBackup(seed, STUDENT, {
    'mobile-03': true,
    'mobile-02': false,
  });
  const parsed = parseStudyBackup(JSON.stringify(backup));
  expect(
    parsed.data.assignments.find(item => item.id === 'mobile-03')!.completed,
  ).toBe(true);
  expect(
    parsed.data.assignments.find(item => item.id === 'mobile-02')!.completed,
  ).toBe(false);
  expect(() =>
    parseStudyBackup(JSON.stringify({ ...backup, version: 2 })),
  ).toThrow();
  expect(() =>
    parseStudyData({ ...seed, courses: [...seed.courses, seed.courses[0]] }),
  ).toThrow();
  expect(() => parseStudyData({ ...seed, courses: [] })).toThrow(
    'missingCourse',
  );
});
test('editing assignment status removes old overrides; deletes clean completion state', async () => {
  await useAppStore.getState().setAssignmentCompleted('mobile-03', true);
  await useAppStore.getState().saveStudyEntity('assignment', {
    ...seed.assignments[0],
    completed: false,
  });
  expect(
    isCompleted(
      useAppStore.getState().studyData.assignments[0],
      useAppStore.getState().assignmentCompletion,
    ),
  ).toBe(false);
  await useAppStore.getState().deleteStudyEntity('course', 'mobile');
  expect(
    useAppStore.getState().assignmentCompletion['mobile-03'],
  ).toBeUndefined();
});
test('serialized writes preserve a later save when an earlier save fails and rolls back', async () => {
  jest
    .spyOn(AsyncStorage, 'setItem')
    .mockRejectedValueOnce(new Error('Disk full'));
  const first = useAppStore
    .getState()
    .saveStudyEntity('course', newCourse('failed'));
  const second = useAppStore
    .getState()
    .saveStudyEntity('course', newCourse('kept'));
  await expect(first).rejects.toThrow('Disk full');
  await second;
  expect(
    useAppStore.getState().studyData.courses.some(item => item.id === 'failed'),
  ).toBe(false);
  expect(
    useAppStore.getState().studyData.courses.some(item => item.id === 'kept'),
  ).toBe(true);
});
test('restores validated data atomically and keeps appearance choices; empty workspace stays empty after rehydrate', async () => {
  await useAppStore.setState({
    accentColor: 'violet',
    themeStyle: 'apple-glass',
  });
  const backup = createStudyBackup(seed, STUDENT, { 'mobile-03': true });
  await useAppStore.getState().resetStudyData('empty');
  await useAppStore.persist.rehydrate();
  expect(useAppStore.getState().studyData.courses).toHaveLength(0);
  await useAppStore.getState().restoreStudyBackup(backup);
  expect(useAppStore.getState().studyData.assignments[0].completed).toBe(true);
  expect(useAppStore.getState().accentColor).toBe('violet');
  expect(useAppStore.getState().themeStyle).toBe('apple-glass');
});
