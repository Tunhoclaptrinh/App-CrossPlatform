import type { ReactNode } from 'react';
import type { Insets, StyleProp, ViewStyle } from 'react-native';

export interface StudyPageContentLayout {
  contentContainerStyle: StyleProp<ViewStyle>;
  scrollIndicatorInsets: Insets;
}

export interface StudyPageProps {
  title: string;
  subtitle?: string;
  children: ReactNode | ((layout: StudyPageContentLayout) => ReactNode);
  scrollable?: boolean;
  onBack?: () => void;
  action?: ReactNode;
  onAdd?: () => void;
  onEdit?: () => void;
}
