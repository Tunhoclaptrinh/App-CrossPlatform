import type { Assignment } from '@/types/study';
export interface StudyAssignmentCardProps {
  assignment: Assignment;
  now: number;
  onPress: () => void;
  editable?: boolean;
}
