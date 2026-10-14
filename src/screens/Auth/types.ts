export type AuthMode = 'signin' | 'signup';

export type CipherAlgorithm = 'AES-256-GCM' | 'AES-256-CBC' | 'ChaCha20-Poly1305';

export type KeyDerivationType = 'SHA-256' | 'PBKDF2-10k' | 'PBKDF2-100k';

export interface SecurityConfig {
  cipherAlgorithm: CipherAlgorithm;
  keyDerivation: KeyDerivationType;
  secretPepper: string;
  requireBiometrics: boolean;
  enableZeroKnowledgeHash: boolean;
  simulatedLatencyMs: number;
  autoEnrollBiometrics: boolean;
}

export interface CryptoPacket {
  id: string;
  timestamp: string;
  action: 'signin' | 'signup' | 'biometric';
  username: string;
  passwordHash: string;
  salt: string;
  iv: string;
  ciphertext: string;
  tag: string;
  combined: string;
  serverVerified: boolean;
  decryptedData?: any;
  token?: string;
  tokenPayload?: {
    sub: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
    iss: string;
    cipher: string;
  };
}

export interface AppIconPreset {
  id: string;
  name: string;
  description: string;
  theme: 'aurora' | 'neon' | 'gold' | 'glass' | 'emerald' | 'monochrome';
  primaryColor: string;
  secondaryColor: string;
  badge: string;
  aliasName: string;
}
