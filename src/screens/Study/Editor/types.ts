import type { NavigationAction } from '@react-navigation/native';
export interface EditorDraft {
  name: string;
  code: string;
  credits: string;
  lecturer: string;
  semester: string;
  active: boolean;
  description: string;
  courseId: string;
  weekday: number;
  startTime: Date;
  endTime: Date;
  room: string;
  kind: 'lecture' | 'practice';
  title: string;
  dueAt: Date;
  completed: boolean;
  label: string;
  startsOn: Date;
  endsOn: Date;
  components: { name: string; weight: string; score: string }[];
}
export type PendingEditorAction = NavigationAction | null;
