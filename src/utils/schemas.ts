import { z } from 'zod';

/**
 * Standard Zod validation schemas for forms and data verification
 * Ho tro ca thong bao truc tiep va i18n translation keys
 */

export const loginSchema = z.object({
  email: z.string().min(1, 'validation.emailRequired').email('validation.emailInvalid'),
  password: z.string().min(6, 'validation.passwordMin'),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, 'validation.nameMin'),
    email: z.string().min(1, 'validation.emailRequired').email('validation.emailInvalid'),
    phone: z
      .string()
      .transform((val) => val.trim().replace(/[\s+-]/g, ''))
      .refine((val) => /^(?:84|0)(?:3|5|7|8|9)\d{8}$/.test(val), {
        message: 'validation.phoneInvalid',
      }),
    password: z.string().min(6, 'validation.passwordMin'),
    confirmPassword: z.string().min(1, 'validation.confirmPasswordRequired'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'validation.confirmPasswordMismatch',
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
 * Helper validate du lieu voi Zod Schema
 * Ho tro truyen ham translator (vi du: t tu useTranslation()) de song ngu hoa thong bao loi
 */
export function validateWithZod<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  translator?: (key: string, options?: any) => string
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
      errors[path] = translator ? translator(issue.message) : issue.message;
    }
  });

  return { success: false, errors };
}
