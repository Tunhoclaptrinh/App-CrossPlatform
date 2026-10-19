import { z } from 'zod';
import {
  COURSES,
  SESSIONS,
  ASSIGNMENTS,
  GRADES,
  STUDY_TERM,
} from '@/data/study';
import type {
  StudyBackup,
  StudyData,
  StudyEntityKind,
  StudyEntityMap,
} from '@/types/study';
import { studentEditSchema, dateKey, isCompleted } from './study';

const text = z.string().trim().min(1, 'required').max(200, 'tooLong');
const id = z.string().min(1).max(100);
const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'dateInvalid')
  .refine(value => {
    const parsed = new Date(`${value}T12:00:00`);
    return !Number.isNaN(parsed.getTime()) && dateKey(parsed) === value;
  }, 'dateInvalid');
const clock = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'timeInvalid');
export const termSchema = z
  .object({ label: text, startsOn: date, endsOn: date })
  .refine(term => term.startsOn <= term.endsOn, {
    message: 'dateOrder',
    path: ['endsOn'],
  });
export const courseSchema = z.object({
  id,
  code: text.transform(value => value.toUpperCase()),
  name: text,
  credits: z.number().int().min(1, 'creditsInvalid').max(30, 'creditsInvalid'),
  lecturer: z.string().trim().max(200),
  semester: text,
  active: z.boolean(),
  description: z.string().trim().max(5000, 'tooLong'),
});
export const sessionSchema = z
  .object({
    id,
    courseId: id,
    weekday: z.number().int().min(0).max(6),
    startTime: clock,
    endTime: clock,
    room: text,
    kind: z.enum(['lecture', 'practice']),
  })
  .refine(item => item.startTime < item.endTime, {
    message: 'timeOrder',
    path: ['endTime'],
  });
export const assignmentSchema = z.object({
  id,
  courseId: id,
  title: text,
  description: z.string().trim().max(10000, 'tooLong'),
  dueAt: z.string().datetime({ offset: true }),
  completed: z.boolean(),
});
export const gradeSchema = z
  .object({
    id,
    courseId: id,
    components: z
      .array(
        z.object({
          name: text,
          weight: z.number().min(0).max(1),
          score: z
            .number()
            .min(0, 'scoreInvalid')
            .max(10, 'scoreInvalid')
            .nullable(),
        }),
      )
      .min(1)
      .max(12),
  })
  .refine(
    item =>
      Math.abs(
        item.components.reduce((sum, part) => sum + part.weight, 0) - 1,
      ) < 0.000001,
    { message: 'weightInvalid', path: ['components'] },
  );
export const studyDataSchema = z.object({
  courses: z.array(courseSchema).max(300),
  sessions: z.array(sessionSchema).max(2000),
  assignments: z.array(assignmentSchema).max(10000),
  grades: z.array(gradeSchema).max(300),
  term: termSchema,
  isSample: z.boolean(),
});
const profileSchema = studentEditSchema.extend({
  studentId: z.string().trim().max(80),
  className: z.string().trim().max(80),
  major: z.string().trim().max(120),
});
const backupSchema = z.object({
  format: z.literal('studyflow-backup'),
  version: z.literal(1),
  createdAt: z.string().datetime({ offset: true }),
  studentProfile: profileSchema,
  data: studyDataSchema,
});

export function seedStudyData(): StudyData {
  return JSON.parse(
    JSON.stringify({
      courses: COURSES,
      sessions: SESSIONS,
      assignments: ASSIGNMENTS,
      grades: GRADES,
      term: STUDY_TERM,
      isSample: true,
    }),
  );
}
export function validateStudyRelations(data: StudyData) {
  const codes = new Set<string>();
  for (const course of data.courses) {
    const code = course.code.trim().toUpperCase();
    if (codes.has(code)) throw new Error('duplicateCode');
    codes.add(code);
  }
  for (const list of [
    data.courses,
    data.sessions,
    data.assignments,
    data.grades,
  ]) {
    if (new Set(list.map(item => item.id)).size !== list.length)
      throw new Error('duplicateId');
  }
  const courses = new Set(data.courses.map(course => course.id));
  for (const item of [...data.sessions, ...data.assignments, ...data.grades])
    if (!courses.has(item.courseId)) throw new Error('missingCourse');
  if (
    new Set(data.grades.map(grade => grade.courseId)).size !==
    data.grades.length
  )
    throw new Error('duplicateGrade');
  const active = new Set(
    data.courses.filter(course => course.active).map(course => course.id),
  );
  const sessions = data.sessions.filter(session =>
    active.has(session.courseId),
  );
  for (let i = 0; i < sessions.length; i++)
    for (let j = i + 1; j < sessions.length; j++) {
      const a = sessions[i],
        b = sessions[j];
      if (
        a.weekday === b.weekday &&
        a.startTime < b.endTime &&
        b.startTime < a.endTime
      )
        throw new Error('scheduleConflict');
    }
}
export function parseStudyData(value: unknown): StudyData {
  const data = studyDataSchema.parse(value);
  validateStudyRelations(data);
  return data;
}
export function saveEntity<K extends StudyEntityKind>(
  current: StudyData,
  kind: K,
  input: StudyEntityMap[K],
): StudyData {
  const schemas = {
    course: courseSchema,
    session: sessionSchema,
    assignment: assignmentSchema,
    grade: gradeSchema,
  };
  const parsed = schemas[kind].parse(input);
  const key = {
    course: 'courses',
    session: 'sessions',
    assignment: 'assignments',
    grade: 'grades',
  }[kind] as 'courses' | 'sessions' | 'assignments' | 'grades';
  const list = current[key] as { id: string }[];
  const next = {
    ...current,
    [key]: list.some(item => item.id === parsed.id)
      ? list.map(item => (item.id === parsed.id ? parsed : item))
      : [...list, parsed],
    isSample: false,
  };
  if (
    kind === 'course' &&
    !next.grades.some(item => item.courseId === parsed.id)
  )
    next.grades = [
      ...next.grades,
      {
        id: `grade-${parsed.id}`,
        courseId: parsed.id,
        components: [
          { name: 'attendance', weight: 0.1, score: null },
          { name: 'midterm', weight: 0.3, score: null },
          { name: 'final', weight: 0.6, score: null },
        ],
      },
    ];
  return parseStudyData(next);
}
export function deleteEntity(
  current: StudyData,
  kind: StudyEntityKind,
  idToDelete: string,
): StudyData {
  if (kind === 'course')
    return {
      ...current,
      courses: current.courses.filter(item => item.id !== idToDelete),
      sessions: current.sessions.filter(item => item.courseId !== idToDelete),
      assignments: current.assignments.filter(
        item => item.courseId !== idToDelete,
      ),
      grades: current.grades.filter(item => item.courseId !== idToDelete),
      isSample: false,
    };
  if (kind === 'session')
    return {
      ...current,
      sessions: current.sessions.filter(item => item.id !== idToDelete),
      isSample: false,
    };
  if (kind === 'assignment')
    return {
      ...current,
      assignments: current.assignments.filter(item => item.id !== idToDelete),
      isSample: false,
    };
  return {
    ...current,
    grades: current.grades.map(item =>
      item.id === idToDelete
        ? {
            ...item,
            components: item.components.map(part => ({ ...part, score: null })),
          }
        : item,
    ),
    isSample: false,
  };
}
export function parseStudyBackup(raw: string): StudyBackup {
  if (raw.length > 5_000_000) throw new Error('backupTooLarge');
  const backup = backupSchema.parse(JSON.parse(raw));
  validateStudyRelations(backup.data);
  return backup;
}
export function createStudyBackup(
  data: StudyData,
  studentProfile: StudyBackup['studentProfile'],
  completion: Record<string, boolean>,
): StudyBackup {
  return {
    format: 'studyflow-backup',
    version: 1,
    createdAt: new Date().toISOString(),
    studentProfile,
    data: {
      ...data,
      assignments: data.assignments.map(item => ({
        ...item,
        completed: isCompleted(item, completion),
      })),
    },
  };
}
