import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import {
  removeVietnameseTones,
  timeAgo,
  truncate,
  formatFileSize,
  validators,
  validateWithZod,
  loginSchema,
  registerSchema,
  permissions,
  haptics,
  generateId,
  generateNanoId,
  generateShortCode,
  generateTimestampId,
  cryptoHelper,
  imageHelper,
  fileUtils,
  clipboardHelper,
} from '@/utils';
import { fileService } from '@/services/file';
import { biometricService } from '@/services/biometrics';
import { widgetBridgeService } from '@/services/widget';
import { secureStorage } from '@/services/storage';
import { socketService } from '@/services/realtime';
import { apiClient } from '@/services/api';
import { useShakeDetection } from '@/hooks';

describe('Utils: Formatters', () => {
  it('should remove Vietnamese tones accurately for search indexing', () => {
    expect(removeVietnameseTones('Bánh Mì Hà Nội')).toBe('banh mi ha noi');
    expect(removeVietnameseTones('Phở Bò Nam Định')).toBe('pho bo nam dinh');
    expect(removeVietnameseTones('Đường Lê Lợi')).toBe('duong le loi');
    expect(removeVietnameseTones('')).toBe('');
  });

  it('should format relative time correctly', () => {
    const now = new Date();
    expect(timeAgo(now)).toBe('Vừa xong');

    const tenSecondsAgo = new Date(Date.now() - 10 * 1000);
    expect(timeAgo(tenSecondsAgo)).toBe('Vừa xong');

    const yesterday = new Date(Date.now() - 25 * 3600 * 1000);
    expect(timeAgo(yesterday)).toBe('Hôm qua');
  });

  it('should truncate strings properly', () => {
    expect(truncate('React Native Starter Template', 12)).toBe('React Native...');
    expect(truncate('Short', 10)).toBe('Short');
    expect(truncate('', 10)).toBe('');
  });

  it('should format file sizes accurately', () => {
    expect(formatFileSize(0)).toBe('0 B');
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(1048576)).toBe('1 MB');
  });
});

describe('Utils: Validators & Bilingual Zod Schemas', () => {
  it('should validate emails correctly', () => {
    expect(validators.isValidEmail('developer@example.com')).toBe(true);
    expect(validators.isValidEmail('invalid-email')).toBe(false);
    expect(validators.isValidEmail('')).toBe(false);
  });

  it('should validate Vietnamese phone numbers', () => {
    expect(validators.isValidVietnamesePhone('0912345678')).toBe(true);
    expect(validators.isValidVietnamesePhone('0398765432')).toBe(true);
    expect(validators.isValidVietnamesePhone('+84912345678')).toBe(true);
    expect(validators.isValidVietnamesePhone('12345')).toBe(false);
  });

  it('should validate password length', () => {
    expect(validators.isValidPassword('123456').isValid).toBe(true);
    expect(validators.isValidPassword('123').isValid).toBe(false);
    expect(validators.isValidPassword('').isValid).toBe(false);
  });

  it('should validate login payload with Zod and support bilingual translation', () => {
    const validResult = validateWithZod(loginSchema, {
      email: 'user@example.com',
      password: 'password123',
    });
    expect(validResult.success).toBe(true);

    // Test with translator function
    const mockTranslator = (key: string) => {
      if (key === 'validation.emailRequired') return 'Email is required';
      return key;
    };

    const invalidResult = validateWithZod(
      loginSchema,
      { email: '', password: '123' },
      mockTranslator
    );
    expect(invalidResult.success).toBe(false);
    expect(invalidResult.errors?.email).toBe('Email is required');
  });

  it('should validate register payload and confirm password match', () => {
    const mismatchResult = validateWithZod(registerSchema, {
      name: 'Nguyen Van A',
      email: 'a@example.com',
      phone: '0912345678',
      password: 'password123',
      confirmPassword: 'differentPassword',
    });
    expect(mismatchResult.success).toBe(false);
    expect(mismatchResult.errors?.confirmPassword).toBe('validation.confirmPasswordMismatch');
  });
});

describe('Utils: Device Sensors & Haptics', () => {
  it('should trigger vibration methods without errors', () => {
    expect(() => haptics.light()).not.toThrow();
    expect(() => haptics.medium()).not.toThrow();
    expect(() => haptics.heavy()).not.toThrow();
    expect(() => haptics.success()).not.toThrow();
    expect(() => haptics.error()).not.toThrow();
    expect(() => haptics.cancel()).not.toThrow();
  });

  it('should define permission request methods', async () => {
    expect(typeof permissions.requestCamera).toBe('function');
    expect(typeof permissions.requestPhotoLibrary).toBe('function');
    expect(typeof permissions.requestNotifications).toBe('function');

    const cameraRes = await permissions.requestCamera();
    expect(typeof cameraRes).toBe('boolean');
  });
});

describe('Services: Local File Management (fileService)', () => {
  it('should save, read, and delete text files locally', async () => {
    const saved = await fileService.saveFile('test_note.txt', 'Hello React Native Base');
    expect(saved.filename).toBe('test_note.txt');
    expect(saved.size).toBeGreaterThan(0);

    const read = await fileService.readFile('test_note.txt');
    expect(read).toBe('Hello React Native Base');

    const files = await fileService.listFiles();
    expect(Array.isArray(files)).toBe(true);

    const deleted = await fileService.deleteFile('test_note.txt');
    expect(typeof deleted).toBe('boolean');
  });

  it('should save and read JSON documents', async () => {
    const configData = { theme: 'dark', version: 1 };
    await fileService.saveJson('config.json', configData);

    const readData = await fileService.readJson<{ theme: string; version: number }>('config.json');
    expect(readData).toEqual(configData);

    await fileService.deleteFile('config.json');
  });
});

describe('Utils: ID Generation', () => {
  it('should generate valid RFC4122 UUID v4 format', () => {
    const uuid = generateId();
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuidRegex.test(uuid)).toBe(true);

    const prefixed = generateId('user');
    expect(prefixed.startsWith('user_')).toBe(true);
  });

  it('should generate NanoId with specified length', () => {
    const nano = generateNanoId(16);
    expect(nano.length).toBe(16);
  });

  it('should generate ShortCode uppercase/digits', () => {
    const code = generateShortCode(6);
    expect(code.length).toBe(6);
    expect(/^[A-Z0-9]+$/.test(code)).toBe(true);
  });

  it('should generate timestamp-based sortable ID', () => {
    const tid = generateTimestampId('trx');
    expect(tid.startsWith('trx_')).toBe(true);
  });
});

describe('Utils: Cryptographic & Security (cryptoHelper & secureStorage)', () => {
  it('should compute deterministic SHA-256 hash', () => {
    const hash1 = cryptoHelper.hash('hello-world');
    const hash2 = cryptoHelper.hash('hello-world');
    const hashOther = cryptoHelper.hash('different');

    expect(hash1).toBe(hash2);
    expect(hash1.length).toBe(64);
    expect(hash1).not.toBe(hashOther);
  });

  it('should symmetrically encrypt and decrypt strings correctly', () => {
    const secretMessage = 'Secret_API_Key_12345';
    const key = 'custom_secret_key';

    const encrypted = cryptoHelper.encrypt(secretMessage, key);
    expect(encrypted.startsWith('ENC:')).toBe(true);

    const decrypted = cryptoHelper.decrypt(encrypted, key);
    expect(decrypted).toBe(secretMessage);

    // Fail decryption with wrong key
    const wrongKeyDecrypted = cryptoHelper.decrypt(encrypted, 'wrong_key');
    expect(wrongKeyDecrypted).toBeNull();
  });

  it('should save and retrieve encrypted data via secureStorage', async () => {
    const tokenPayload = { token: 'jwt_abc_xyz', expires: 3600 };
    await secureStorage.setItem('auth_token', tokenPayload);

    const retrieved = await secureStorage.getItem<{ token: string; expires: number }>('auth_token');
    expect(retrieved).toEqual(tokenPayload);

    await secureStorage.removeItem('auth_token');
  });
});

describe('Utils: Image & File Processing (imageHelper & fileUtils)', () => {
  it('should format data URI and check base64 validity', () => {
    const rawBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
    const uri = imageHelper.formatDataUri(rawBase64, 'image/png');
    expect(uri.startsWith('data:image/png;base64,')).toBe(true);
    expect(imageHelper.isBase64Image(uri)).toBe(true);
    expect(imageHelper.isBase64Image('plain-text')).toBe(false);
  });

  it('should validate image size constraints', () => {
    expect(imageHelper.validateImageSize(1024 * 1024 * 2, 5)).toBe(true);
    expect(imageHelper.validateImageSize(1024 * 1024 * 6, 5)).toBe(false);
    expect(imageHelper.getImageExtension('avatar.WEBP')).toBe('webp');
  });

  it('should correctly lookup MIME types and classify files', () => {
    expect(fileUtils.getMimeType('document.pdf')).toBe('application/pdf');
    expect(fileUtils.getMimeType('photo.jpg')).toBe('image/jpeg');
    expect(fileUtils.isImageFile('pic.png')).toBe(true);
    expect(fileUtils.isDocumentFile('report.docx')).toBe(true);

    const validCheck = fileUtils.checkFileConstraints('test.png', 1024, {
      maxSizeInMb: 1,
      allowedExtensions: ['png', 'jpg'],
    });
    expect(validCheck.valid).toBe(true);

    const invalidCheck = fileUtils.checkFileConstraints('test.exe', 1024, {
      allowedExtensions: ['png', 'jpg'],
    });
    expect(invalidCheck.valid).toBe(false);
  });
});

describe('Utils: In-App Clipboard', () => {
  it('should set and get clipboard strings', async () => {
    await clipboardHelper.setString('Copied Text Content');
    const read = await clipboardHelper.getString();
    expect(read).toBe('Copied Text Content');
  });
});

describe('Services: Biometrics & Widget Bridge', () => {
  it('should report biometric sensor availability', async () => {
    const status = await biometricService.isSensorAvailable();
    expect(typeof status.available).toBe('boolean');
    expect(typeof status.biometryType).toBe('string');
  });

  it('should sync and retrieve widget data snapshots', async () => {
    const synced = await widgetBridgeService.syncWidgetData({
      activeCount: 42,
      headline: 'Test Snapshot',
      status: 'online',
    });
    expect(synced.activeCount).toBe(42);

    const retrieved = await widgetBridgeService.getWidgetData();
    expect(retrieved.activeCount).toBe(42);
    expect(retrieved.headline).toBe('Test Snapshot');
  });
});

describe('Utils: Server-Compatible Encryption (cryptoHelper)', () => {
  it('should encrypt and produce standard AESP256 payload matching server format', () => {
    const plainText = 'UserSensitiveData_Token#9981';
    const secret = 'backend_shared_secret_2026';

    const payload = cryptoHelper.encryptForServer(plainText, secret);
    expect(payload.iv.length).toBe(32);
    expect(payload.salt.length).toBe(16);
    expect(payload.combined.startsWith('AESP256:')).toBe(true);

    const parts = payload.combined.split(':');
    expect(parts.length).toBe(5);
  });

  it('should decrypt server payload accurately via round-trip', () => {
    const plainText = 'Vietnamese UTF-8: Xin chào bảo mật React Native!';
    const secret = 'secure_symmetric_key_999';

    const payload = cryptoHelper.encryptForServer(plainText, secret);
    const decrypted = cryptoHelper.decryptFromServer(payload.combined, secret);
    expect(decrypted).toBe(plainText);

    const decryptedFromObj = cryptoHelper.decryptFromServer(payload, secret);
    expect(decryptedFromObj).toBe(plainText);
  });

  it('should return null if secret key is incorrect or data is tampered', () => {
    const plainText = 'Confidential Bank Info';
    const secret = 'valid_key';

    const payload = cryptoHelper.encryptForServer(plainText, secret);

    const failedWrongKey = cryptoHelper.decryptFromServer(payload.combined, 'wrong_key');
    expect(failedWrongKey).toBeNull();

    const corruptedPayload = payload.combined.slice(0, -4) + 'ffff';
    const failedTampered = cryptoHelper.decryptFromServer(corruptedPayload, secret);
    expect(failedTampered).toBeNull();
  });

  it('should handle empty input safely', () => {
    const emptyPayload = cryptoHelper.encryptForServer('');
    expect(emptyPayload.combined).toBe('');
    expect(cryptoHelper.decryptFromServer('')).toBeNull();
  });
});

describe('Services: Universal Realtime WebSocket (socketService)', () => {
  it('should initialize with disconnected state and allow state observation', () => {
    expect(socketService.getState()).toBe('disconnected');

    const listener = jest.fn();
    const unsub = socketService.onStateChange(listener);
    expect(listener).toHaveBeenCalledWith('disconnected');

    unsub();
  });

  it('should queue messages and return false when disconnected', () => {
    const sent = socketService.emit('test_event', { sample: 123 });
    expect(sent).toBe(false);
  });

  it('should register and unregister event listeners properly', () => {
    const handler = jest.fn();
    socketService.on('custom_message', handler);
    socketService.off('custom_message', handler);
    expect(() => socketService.disconnect()).not.toThrow();
  });
});

describe('Hooks: Smart Shake Detection (useShakeDetection)', () => {
  it('should initialize and track shake events with cooldown and reset', () => {
    let hookResult: ReturnType<typeof useShakeDetection>;
    const onShakeMock = jest.fn();

    function TestComponent() {
      hookResult = useShakeDetection({ onShake: onShakeMock, timeout: 500 });
      return null;
    }

    ReactTestRenderer.act(() => {
      ReactTestRenderer.create(React.createElement(TestComponent));
    });

    expect(hookResult!.shakeCount).toBe(0);
    expect(hookResult!.lastShakeTime).toBeNull();

    // Trigger simulateShake
    ReactTestRenderer.act(() => {
      hookResult!.simulateShake();
    });

    expect(hookResult!.shakeCount).toBe(1);
    expect(hookResult!.lastShakeTime).not.toBeNull();
    expect(onShakeMock).toHaveBeenCalledTimes(1);

    // Trigger again immediately within cooldown (500ms) -> should be ignored
    ReactTestRenderer.act(() => {
      hookResult!.simulateShake();
    });
    expect(hookResult!.shakeCount).toBe(1);

    // Reset shake count
    ReactTestRenderer.act(() => {
      hookResult!.resetShakeCount();
    });
    expect(hookResult!.shakeCount).toBe(0);
    expect(hookResult!.lastShakeTime).toBeNull();
  });
});

describe('Services: Universal API Client (apiClient)', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('should perform GET and PATCH requests properly', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: { get: () => 'application/json' },
      json: async () => ({ updated: true }),
    } as any);

    const patchRes = await apiClient.patch('/test/resource', { status: 'active' });
    expect(patchRes.ok).toBe(true);
    expect(patchRes.data).toEqual({ updated: true });
    expect(globalThis.fetch).toHaveBeenCalled();
  });

  it('should support multipart FormData upload', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: { get: () => 'application/json' },
      json: async () => ({ fileId: 'doc_123', url: 'https://cdn.example.com/doc.pdf' }),
    } as any);

    const formData = new FormData();
    const uploadRes = await apiClient.upload('/upload', formData);
    expect(uploadRes.ok).toBe(true);
    expect(uploadRes.data?.fileId).toBe('doc_123');
  });
});

