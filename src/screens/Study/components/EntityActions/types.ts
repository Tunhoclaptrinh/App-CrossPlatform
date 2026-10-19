import type { StudyEntityKind } from '@/types/study';
export interface EntityActionsProps {
  kind: StudyEntityKind;
  id: string;
  onDeleted?: () => void;
}
