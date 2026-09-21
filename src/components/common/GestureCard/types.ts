export interface GestureCardProps {
  title: string;
  description: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onDoubleTap?: () => void;
}
