import type { ClassSession } from '@/types/study';
export interface StudySessionCardProps {
  session: ClassSession;
  dayLabel?: string;
  now?: number;
  onPress: () => void;
}
