import type { ClassSession } from '@/types/study';
export interface StudySessionCardProps {
  session: ClassSession;
  dayLabel?: string;
  onPress: () => void;
}
