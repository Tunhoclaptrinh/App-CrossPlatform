import type { Course } from '@/types/study';
export interface StudyCourseCardProps {
  course: Course;
  onPress: () => void;
}
