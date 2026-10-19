export const Routes = {
  STUDY_TABS: 'StudyTabs',
  COURSE_DETAIL: 'CourseDetail',
  SESSION_DETAIL: 'SessionDetail',
  ASSIGNMENT_DETAIL: 'AssignmentDetail',
  GRADE_DETAIL: 'GradeDetail',
  HOME: 'Home',
  DETAILS: 'Details',
  LAYOUT_LAB: 'LayoutLab',
  LOGIN: 'Login',
  REGISTER: 'Register',
  PROFILE: 'Profile',
} as const;

export type RouteNames = (typeof Routes)[keyof typeof Routes];
