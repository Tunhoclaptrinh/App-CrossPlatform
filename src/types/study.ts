export interface StudentProfile {
  studentId: string;
  fullName: string;
  className: string;
  major: string;
  email: string;
  phone: string;
}

export type StudentEdit = Pick<StudentProfile, 'fullName' | 'email' | 'phone'> &
  Partial<Pick<StudentProfile, 'studentId' | 'className' | 'major'>>;

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  lecturer: string;
  semester: string;
  active: boolean;
  description: string;
}

export interface ClassSession {
  id: string;
  courseId: string;
  weekday: number; // Monday = 0, Sunday = 6
  startTime: string;
  endTime: string;
  room: string;
  kind: 'lecture' | 'practice';
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueAt: string;
  completed: boolean;
}

export interface CourseGrade {
  id: string;
  courseId: string;
  components: { name: string; weight: number; score: number | null }[];
}

export type AssignmentFilter = 'all' | 'pending' | 'completed';

export interface StudyTerm {
  label: string;
  startsOn: string;
  endsOn: string;
}
export interface StudyData {
  courses: Course[];
  sessions: ClassSession[];
  assignments: Assignment[];
  grades: CourseGrade[];
  term: StudyTerm;
  isSample: boolean;
}
export type StudyEntityKind = 'course' | 'session' | 'assignment' | 'grade';
export interface StudyEntityMap {
  course: Course;
  session: ClassSession;
  assignment: Assignment;
  grade: CourseGrade;
}
export interface StudyBackup {
  format: 'studyflow-backup';
  version: 1;
  createdAt: string;
  studentProfile: StudentProfile;
  data: StudyData;
}
