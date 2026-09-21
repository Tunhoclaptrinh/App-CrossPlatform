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
} from '@/utils';

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

describe('Utils: Validators & Zod Schemas', () => {
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

  it('should validate login payload with Zod', () => {
    const validResult = validateWithZod(loginSchema, {
      email: 'user@example.com',
      password: 'password123',
    });
    expect(validResult.success).toBe(true);

    const invalidResult = validateWithZod(loginSchema, {
      email: 'not-an-email',
      password: '123',
    });
    expect(invalidResult.success).toBe(false);
    expect(invalidResult.errors?.email).toBeDefined();
    expect(invalidResult.errors?.password).toBeDefined();
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
    expect(mismatchResult.errors?.confirmPassword).toBeDefined();
  });
});

describe('Utils: Permissions Helper', () => {
  it('should define permission request methods', async () => {
    expect(typeof permissions.requestCamera).toBe('function');
    expect(typeof permissions.requestPhotoLibrary).toBe('function');
    expect(typeof permissions.requestNotifications).toBe('function');

    // On non-android (test environment default), returns true gracefully
    const cameraRes = await permissions.requestCamera();
    expect(typeof cameraRes).toBe('boolean');

    const photoRes = await permissions.requestPhotoLibrary();
    expect(typeof photoRes).toBe('boolean');

    const notifRes = await permissions.requestNotifications();
    expect(typeof notifRes).toBe('boolean');
  });
});
