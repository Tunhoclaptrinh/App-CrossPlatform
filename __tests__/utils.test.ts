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
} from '@/utils';
import { fileService } from '@/services/file';

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
