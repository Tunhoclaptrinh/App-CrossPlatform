/**
 * Collection of common input and data validation utilities.
 */

export const validators = {
  /**
   * Kiểm tra định dạng Email hợp lệ theo tiêu chuẩn RFC 5322
   */
  isValidEmail(email: string): boolean {
    if (!email) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
  },

  /**
   * Kiểm tra số điện thoại Việt Nam (10 chữ số, đầu 03, 05, 07, 08, 09 hoặc +84)
   */
  isValidVietnamesePhone(phone: string): boolean {
    if (!phone) return false;
    const cleanPhone = phone.trim().replace(/[\s+-]/g, '');
    const re = /^(?:84|0)(?:3|5|7|8|9)\d{8}$/;
    return re.test(cleanPhone);
  },

  /**
   * Kiểm tra độ mạnh mật khẩu
   */
  isValidPassword(
    password: string,
    minLength: number = 6
  ): { isValid: boolean; message?: string } {
    if (!password) {
      return { isValid: false, message: 'Mật khẩu không được để trống' };
    }
    if (password.length < minLength) {
      return {
        isValid: false,
        message: `Mật khẩu phải có tối thiểu ${minLength} ký tự`,
      };
    }
    return { isValid: true };
  },

  /**
   * Kiểm tra chuỗi có bị rỗng hoặc toàn khoảng trắng hay không
   */
  isNotEmpty(value: string | null | undefined): boolean {
    return value !== null && value !== undefined && value.trim().length > 0;
  },

  /**
   * Kiểm tra định dạng URL (http / https)
   */
  isValidUrl(url: string): boolean {
    if (!url) return false;
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  },

  /**
   * Kiểm tra chuỗi chỉ chứa số
   */
  isNumberOnly(value: string): boolean {
    if (!value) return false;
    return /^\d+$/.test(value.trim());
  },
};
