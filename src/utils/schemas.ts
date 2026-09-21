import { z } from 'zod';

/**
 * Standard Zod validation schemas for forms and data verification
 */

export const loginSchema = z.object({
  email: z.string().min(1, 'Email không được để trống').email('Email không đúng định dạng'),
  password: z.string().min(6, 'Mật khẩu phải có tối thiểu 6 ký tự'),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Họ và tên phải có tối thiểu 2 ký tự'),
    email: z.string().min(1, 'Email không được để trống').email('Email không đúng định dạng'),
    phone: z
      .string()
      .transform((val) => val.trim().replace(/[\s+-]/g, ''))
      .refine((val) => /^(?:84|0)(?:3|5|7|8|9)\d{8}$/.test(val), {
        message: 'Số điện thoại Việt Nam không hợp lệ',
      }),
    password: z.string().min(6, 'Mật khẩu phải có tối thiểu 6 ký tự'),
    confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

export const searchSchema = z.object({
  query: z.string().trim(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type SearchParams = z.infer<typeof searchSchema>;

/**
 * Helper validate dữ liệu với Zod Schema
 * Trả về danh sách lỗi dạng Map { fieldName: "Error message" } rất tiện cho UI
 */
export function validateWithZod<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
} {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Record<string, string> = {};
  result.error.issues.forEach((issue) => {
    const path = issue.path.join('.') || 'root';
    if (!errors[path]) {
      errors[path] = issue.message;
    }
  });

  return { success: false, errors };
}
