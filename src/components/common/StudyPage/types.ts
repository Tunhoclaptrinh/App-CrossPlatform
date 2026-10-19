import type { ReactNode } from 'react';
export interface StudyPageProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  scrollable?: boolean;
  onBack?: () => void;
  action?: ReactNode;
  onAdd?: () => void;
  onEdit?: () => void;
}
