export type BiometricType = 'TouchID' | 'FaceID' | 'Biometrics' | 'None';

export interface BiometricAvailability {
  available: boolean;
  biometryType: BiometricType;
  error?: string;
}

export interface BiometricAuthOptions {
  promptMessage?: string;
  cancelTitle?: string;
  fallbackTitle?: string;
}

export interface BiometricAuthResult {
  success: boolean;
  error?: string;
}
