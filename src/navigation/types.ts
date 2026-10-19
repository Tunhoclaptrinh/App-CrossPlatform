import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type StudyTabParamList = {
  Overview: undefined;
  Courses: undefined;
  Timetable: undefined;
  Assignments: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  StudyTabs: NavigatorScreenParams<StudyTabParamList> | undefined;
  StudyEditor: {
    kind: import('@/types/study').StudyEntityKind | 'term';
    id?: string;
    courseId?: string;
  };
  StudyDataTools: undefined;
  CourseDetail: { courseId: string };
  SessionDetail: { sessionId: string; date?: string };
  AssignmentDetail: { assignmentId: string };
  GradeDetail: { gradeId: string };
  Home: undefined;
  Details: {
    itemId: string;
    title: string;
    description: string;
  };
  LayoutLab: undefined;
  Auth: undefined;
  SecuritySettings: undefined;
};

export type StudyTabProps<T extends keyof StudyTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<StudyTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;
export type StudyDetailProps<
  T extends
    | 'CourseDetail'
    | 'SessionDetail'
    | 'AssignmentDetail'
    | 'GradeDetail',
> = NativeStackScreenProps<RootStackParamList, T>;

export type SplashScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Splash'
>;
export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
export type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Details'
>;
export type LayoutLabScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'LayoutLab'
>;
export type AuthScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Auth'
>;
export type SecuritySettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SecuritySettings'
>;
