import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from './types';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['reactnative://', 'https://reactnativebase.app'],
  config: {
    screens: {
      StudyTabs: {
        path: 'study',
        screens: {
          Overview: '',
          Courses: 'courses',
          Timetable: 'timetable',
          Assignments: 'assignments',
          Profile: 'profile',
        },
      },
      CourseDetail: 'course/:courseId',
      SessionDetail: 'session/:sessionId',
      AssignmentDetail: 'assignment/:assignmentId',
      GradeDetail: 'grade/:gradeId',
      Splash: 'splash',
      Home: 'home',
      Details: 'details/:itemId',
    },
  },
};
