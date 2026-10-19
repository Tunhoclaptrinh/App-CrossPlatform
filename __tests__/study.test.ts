import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASSIGNMENTS, COURSES, GRADES, SESSIONS, STUDENT } from '@/data/study';
import { useAppStore } from '@/hooks/useAppStore';
import {
  addDays,
  dateKey,
  getAssignmentDueInfo,
  getGradeClassification,
  gradeAverage,
  gradeGpaAverage,
  gradeTotal,
  isCompleted,
  isOverdue,
  isSessionOngoing,
  isTermDate,
  mondayOf,
  searchCourses,
  selectAssignments,
  studentEditSchema,
} from '@/utils/study';

const STORAGE_KEY = '@app/unified_store';

describe('Study dataset and calculations', () => {
  test('all relations, credit counts, times and grade weights are consistent', () => {
    const ids = new Set(COURSES.map(c => c.id));
    expect(ids.size).toBe(COURSES.length);
    expect(new Set(ASSIGNMENTS.map(a => a.id)).size).toBe(ASSIGNMENTS.length);
    expect(new Set(SESSIONS.map(s => s.id)).size).toBe(SESSIONS.length);
    for (const item of [...ASSIGNMENTS, ...SESSIONS, ...GRADES])
      expect(ids.has(item.courseId)).toBe(true);
    for (const course of COURSES) expect(course.credits).toBeGreaterThan(0);
    for (const session of SESSIONS) {
      expect(session.startTime < session.endTime).toBe(true);
      expect(session.weekday).toBeGreaterThanOrEqual(0);
      expect(session.weekday).toBeLessThan(7);
    }
    for (const assignment of ASSIGNMENTS)
      expect(Number.isFinite(Date.parse(assignment.dueAt))).toBe(true);
    for (const grade of GRADES)
      expect(
        grade.components.reduce((sum, part) => sum + part.weight, 0),
      ).toBeCloseTo(1);
  });
  test('finds courses by Vietnamese name, unaccented name and code', () => {
    expect(searchCourses(COURSES, '  CO SO DU LIEU  ').map(c => c.id)).toEqual([
      'database',
    ]);
    expect(searchCourses(COURSES, 'Cơ sở dữ liệu').map(c => c.id)).toEqual([
      'database',
    ]);
    expect(searchCourses(COURSES, 'int3120').map(c => c.id)).toEqual([
      'mobile',
    ]);
    expect(searchCourses(COURSES, 'does not exist')).toEqual([]);
  });
  test('filters completion overrides including false, filters courses, and sorts by due time', () => {
    const done = ASSIGNMENTS.find(a => a.completed)!;
    expect(isCompleted(done, { [done.id]: false })).toBe(false);
    const items = selectAssignments(
      ASSIGNMENTS,
      { 'mobile-03': true },
      'pending',
      'mobile',
    );
    expect(items.map(a => a.id)).toEqual(['mobile-mid']);
    const sorted = selectAssignments(ASSIGNMENTS, {});
    expect(sorted.map(a => Date.parse(a.dueAt))).toEqual(
      sorted.map(a => Date.parse(a.dueAt)).sort((a, b) => a - b),
    );
    expect(ASSIGNMENTS[0].id).toBe('mobile-03'); // source data must not be sorted in place
  });
  test('classifies deadlines at the exact boundary and excludes completed work from overdue', () => {
    const item = ASSIGNMENTS[0];
    const deadline = Date.parse(item.dueAt);
    expect(isOverdue(item, {}, deadline)).toBe(false);
    expect(isOverdue(item, {}, deadline + 1)).toBe(true);
    expect(isOverdue(item, { [item.id]: true }, deadline + 1)).toBe(false);
  });
  test('computes final scores and a credit-weighted average using only graded courses', () => {
    expect(gradeTotal(GRADES.find(g => g.courseId === 'mobile')!)).toBeNull();
    expect(gradeTotal(GRADES.find(g => g.courseId === 'algorithms')!)).toBe(
      8.5,
    );
    expect(gradeTotal(GRADES.find(g => g.courseId === 'oop')!)).toBe(8.5);
    const differentGrades = [
      {
        id: 'a',
        courseId: 'algorithms',
        components: [{ name: 'final', weight: 1, score: 8 }],
      },
      {
        id: 'b',
        courseId: 'oop',
        components: [{ name: 'final', weight: 1, score: 9 }],
      },
    ];
    expect(gradeAverage(differentGrades, COURSES)).toBe(8.43);
    expect(gradeAverage([], COURSES)).toBeNull();
  });
  test('uses Monday weeks, handles Sunday and year boundaries, and enforces semester dates', () => {
    expect(dateKey(mondayOf(new Date('2026-10-25T12:00:00')))).toBe(
      '2026-10-19',
    );
    expect(dateKey(addDays(mondayOf(new Date('2027-01-01T12:00:00')), 6))).toBe(
      '2027-01-03',
    );
    expect(isTermDate(new Date('2026-09-07T12:00:00'))).toBe(true);
    expect(isTermDate(new Date('2026-12-27T12:00:00'))).toBe(true);
    expect(isTermDate(new Date('2026-12-28T12:00:00'))).toBe(false);
  });
  test('validates and trims editable student data', () => {
    expect(
      studentEditSchema.parse({
        fullName: '  Nguyễn Văn An  ',
        email: ' an@example.com ',
        phone: '0912345678',
      }).fullName,
    ).toBe('Nguyễn Văn An');
    expect(
      studentEditSchema.safeParse({
        fullName: ' ',
        email: 'wrong',
        phone: '123',
      }).success,
    ).toBe(false);
  });
  test('classifies academic scores and computes weighted 4.0 GPA', () => {
    expect(getGradeClassification(null).letter).toBe('—');
    expect(getGradeClassification(null).variant).toBe('neutral');

    expect(getGradeClassification(9.0)).toEqual({
      letter: 'A',
      gpa: 4.0,
      rankKey: 'rankExcellent',
      variant: 'success',
    });
    expect(getGradeClassification(7.5)).toEqual({
      letter: 'B',
      gpa: 3.0,
      rankKey: 'rankGood',
      variant: 'info',
    });
    expect(getGradeClassification(6.0)).toEqual({
      letter: 'C',
      gpa: 2.0,
      rankKey: 'rankAverage',
      variant: 'warning',
    });
    expect(getGradeClassification(4.5)).toEqual({
      letter: 'D',
      gpa: 1.0,
      rankKey: 'rankWeak',
      variant: 'warning',
    });
    expect(getGradeClassification(3.0)).toEqual({
      letter: 'F',
      gpa: 0.0,
      rankKey: 'rankFail',
      variant: 'error',
    });

    const gpa = gradeGpaAverage(GRADES, COURSES);
    expect(gpa).toBe(4.0); // algorithms and oop are both 8.5 (A / 4.0)
  });
  test('formats assignment due info and detects ongoing session correctly', () => {
    const now = new Date('2026-10-19T10:00:00').getTime();
    const completedInfo = getAssignmentDueInfo(
      '2026-10-20T10:00:00Z',
      true,
      now,
    );
    expect(completedInfo.status).toBe('completed');
    expect(completedInfo.badgeVariant).toBe('success');

    const overdueInfo = getAssignmentDueInfo(
      '2026-10-18T10:00:00Z',
      false,
      now,
    );
    expect(overdueInfo.status).toBe('overdue');
    expect(overdueInfo.badgeVariant).toBe('error');

    const dueSoonInfo = getAssignmentDueInfo(
      '2026-10-19T15:00:00Z',
      false,
      now,
    );
    expect(dueSoonInfo.status).toBe('dueSoon');
    expect(dueSoonInfo.badgeVariant).toBe('warning');

    // 2026-10-19 is a Monday (weekday 0 in our 0..6 Monday-Sunday convention)
    const session = {
      weekday: 0,
      startTime: '09:00',
      endTime: '11:00',
    };
    expect(isSessionOngoing(session, now)).toBe(true);
    expect(
      isSessionOngoing(
        session,
        new Date('2026-10-19T12:00:00').getTime(),
      ),
    ).toBe(false);
  });
});

describe('Study state in the existing persisted store', () => {
  beforeEach(async () => {
    jest.restoreAllMocks();
    await AsyncStorage.clear();
    await useAppStore.setState({
      studentProfile: STUDENT,
      assignmentCompletion: {},
      studyHydrated: true,
      studyHydrationFailed: false,
    });
  });
  test('persists profile and completion, then restores both after memory is reset', async () => {
    await useAppStore.getState().setAssignmentCompleted('mobile-03', true);
    await useAppStore
      .getState()
      .updateStudentProfile({
        fullName: 'Nguyễn Văn An',
        email: 'an@example.com',
        phone: '0398765432',
      });
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    expect(JSON.parse(saved!).state.assignmentCompletion['mobile-03']).toBe(
      true,
    );
    await useAppStore.setState({
      studentProfile: STUDENT,
      assignmentCompletion: {},
    });
    await AsyncStorage.setItem(STORAGE_KEY, saved!);
    await useAppStore.persist.rehydrate();
    expect(useAppStore.getState().studentProfile.fullName).toBe(
      'Nguyễn Văn An',
    );
    expect(useAppStore.getState().studentProfile.studentId).toBe(
      STUDENT.studentId,
    );
    expect(useAppStore.getState().assignmentCompletion['mobile-03']).toBe(true);
  });
  test('hydrates an old base store that has no study fields', async () => {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ state: { language: 'vi', counter: 4 }, version: 0 }),
    );
    await useAppStore.persist.rehydrate();
    expect(useAppStore.getState().studentProfile).toEqual(STUDENT);
    expect(useAppStore.getState().assignmentCompletion).toEqual({});
    expect(useAppStore.getState().counter).toBe(4);
    expect(useAppStore.getState().studyHydrated).toBe(true);
  });
  test('rejects invalid profile and unknown assignment mutations', async () => {
    await expect(
      useAppStore
        .getState()
        .updateStudentProfile({ fullName: '', email: 'bad', phone: '0' }),
    ).rejects.toThrow();
    await expect(
      useAppStore.getState().setAssignmentCompleted('unknown', true),
    ).rejects.toThrow();
    expect(useAppStore.getState().studentProfile).toEqual(STUDENT);
  });
  test('rolls back memory after failed writes instead of claiming completion or a saved profile', async () => {
    jest
      .spyOn(AsyncStorage, 'setItem')
      .mockRejectedValueOnce(new Error('Disk full'));
    await expect(
      useAppStore.getState().setAssignmentCompleted('mobile-03', true),
    ).rejects.toThrow('Disk full');
    expect(
      isCompleted(ASSIGNMENTS[0], useAppStore.getState().assignmentCompletion),
    ).toBe(false);
    jest
      .spyOn(AsyncStorage, 'setItem')
      .mockRejectedValueOnce(new Error('Disk full'));
    await expect(
      useAppStore
        .getState()
        .updateStudentProfile({
          fullName: 'Nguyễn Văn An',
          email: 'an@example.com',
          phone: '0398765432',
        }),
    ).rejects.toThrow('Disk full');
    expect(useAppStore.getState().studentProfile).toEqual(STUDENT);
  });
  test('does not overwrite unreadable storage and supports a successful retry', async () => {
    await AsyncStorage.setItem(STORAGE_KEY, 'invalid JSON');
    await useAppStore.persist.rehydrate();
    expect(useAppStore.getState().studyHydrationFailed).toBe(true);
    expect(await AsyncStorage.getItem(STORAGE_KEY)).toBe('invalid JSON');
    await expect(
      useAppStore.getState().setAssignmentCompleted('mobile-03', true),
    ).rejects.toThrow('Storage is not ready');
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ state: { studentProfile: STUDENT }, version: 0 }),
    );
    await useAppStore.persist.rehydrate();
    expect(useAppStore.getState().studyHydrationFailed).toBe(false);
  });
});
