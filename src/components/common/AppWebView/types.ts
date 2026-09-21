export interface AppWebViewProps {
  url: string;
  title?: string;
  onClose?: () => void;
  onOpenExternal?: () => void;
}
