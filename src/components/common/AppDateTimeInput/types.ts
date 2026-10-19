export interface AppDateTimeInputProps {
  label: string;
  value: Date;
  onChange: (value: Date) => void;
  mode?: 'date' | 'time';
  minimumDate?: Date;
  maximumDate?: Date;
  disabled?: boolean;
  error?: string;
}
