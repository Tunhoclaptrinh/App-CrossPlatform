import type { ControlContrast } from '../surfaceUtils';

export interface GestureCardProps {
  title: string;
  description: string;
  size?: 'sm' | 'md' | 'lg';
  contrast?: ControlContrast;
  borderRadius?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onDoubleTap?: () => void;
}
