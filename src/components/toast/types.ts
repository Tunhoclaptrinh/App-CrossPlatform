export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  type?: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

export interface ToastContextType {
  show: (typeOrOptions: ToastType | ToastOptions, message?: string, title?: string) => void;
  hide: () => void;
}
