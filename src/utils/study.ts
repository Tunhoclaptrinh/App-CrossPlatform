import { z } from 'zod';
import { STUDY_TERM } from '@/data/study';
import type {
  Assignment,
  AssignmentFilter,
  Course,
  CourseGrade,
} from '@/types/study';
import { removeVietnameseTones } from './formatters';
import { validators } from './validators';

export const studentEditSchema = z.object({
  fullName: z.string().trim().min(2, 'nameInvalid').max(80, 'nameInvalid'),
  email: z.union([
    z.literal(''),
    z.string().trim().max(254, 'emailInvalid').email('emailInvalid'),
  ]),
  phone: z
    .string()
    .trim()
    .refine(
      value => !value || validators.isValidVietnamesePhone(value),
      'phoneInvalid',
    ),
  studentId: z.string().trim().max(80).optional(),
  className: z.string().trim().max(80).optional(),
  major: z.string().trim().max(120).optional(),
});

export function searchCourses(courses: Course[], query: string) {
  const normalized = removeVietnameseTones(query.trim());
  return courses.filter(course =>
    removeVietnameseTones(`${course.name} ${course.code}`).includes(normalized),
  );
}

export function selectAssignments(
  assignments: Assignment[],
  completion: Record<string, boolean>,
  filter: AssignmentFilter = 'all',
  courseId?: string,
) {
  return assignments
    .filter(item => !courseId || item.courseId === courseId)
    .filter(
      item =>
        filter === 'all' ||
        (filter === 'completed') === isCompleted(item, completion),
    )
    .slice()
    .sort((a, b) => Date.parse(a.dueAt) - Date.parse(b.dueAt));
}

export const isCompleted = (
  item: Assignment,
  completion: Record<string, boolean>,
) => completion[item.id] ?? item.completed;
export const isOverdue = (
  item: Assignment,
  completion: Record<string, boolean>,
  now: number,
) => !isCompleted(item, completion) && Date.parse(item.dueAt) < now;

export function gradeTotal(grade: CourseGrade): number | null {
  if (
    !grade.components.length ||
    grade.components.some(part => part.weight > 0 && part.score === null)
  )
    return null;
  return (
    Math.round(
      grade.components.reduce(
        (sum, part) => sum + (part.score ?? 0) * part.weight,
        0,
      ) * 100,
    ) / 100
  );
}

export function gradeAverage(
  grades: CourseGrade[],
  courses: Course[],
): number | null {
  let weighted = 0;
  let credits = 0;
  grades.forEach(grade => {
    const course = courses.find(item => item.id === grade.courseId);
    const total = gradeTotal(grade);
    if (course && total !== null) {
      weighted += total * course.credits;
      credits += course.credits;
    }
  });
  return credits ? Math.round((weighted / credits) * 100) / 100 : null;
}

// Calendar arithmetic at noon avoids DST boundary issues on devices outside Vietnam.
export function mondayOf(date: Date): Date {
  const result = new Date(date);
  result.setHours(12, 0, 0, 0);
  result.setDate(result.getDate() - ((result.getDay() + 6) % 7));
  return result;
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function dateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(date.getDate()).padStart(2, '0')}`;
}

export const isTermDate = (
  date: Date,
  term = STUDY_TERM as { startsOn: string; endsOn: string },
) => dateKey(date) >= term.startsOn && dateKey(date) <= term.endsOn;

export const formatStudyDate = (
  date: Date | string,
  language: string,
  withTime = false,
) =>
  new Intl.DateTimeFormat(language === 'vi' ? 'vi-VN' : 'en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...(withTime ? ({ hour: '2-digit', minute: '2-digit' } as const) : {}),
  }).format(new Date(date));
