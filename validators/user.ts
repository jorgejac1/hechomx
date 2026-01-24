/**
 * @fileoverview User and authentication validation schemas
 * Provides Zod schemas for validating login, registration, password reset, profile updates, and password changes
 * @module validators/user
 */

import { z } from 'zod';

/**
 * Schema for validating user login credentials
 * @property {string} email - Valid email address
 * @property {string} password - Password with minimum 8 characters
 * @property {boolean} [rememberMe] - Optional remember me flag
 */
export const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  rememberMe: z.boolean().optional(),
});

/**
 * Schema for validating new user registration
 * @property {string} name - User's full name (min 3 characters)
 * @property {string} email - Valid email address
 * @property {string} password - Strong password (min 8 chars, uppercase, lowercase, number)
 * @property {string} confirmPassword - Must match password
 * @property {boolean} acceptTerms - Must be true
 */
export const registerSchema = z
  .object({
    name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    email: z.string().email('Correo electrónico inválido'),
    password: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
      .regex(/[a-z]/, 'Debe contener al menos una minúscula')
      .regex(/[0-9]/, 'Debe contener al menos un número'),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'Debes aceptar los términos y condiciones',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

/**
 * Schema for validating forgot password request
 * @property {string} email - Valid email address for password reset
 */
export const forgotPasswordSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
});

/**
 * Schema for validating password reset with token
 * @property {string} token - Reset token from email
 * @property {string} password - New strong password
 * @property {string} confirmPassword - Must match new password
 */
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Token es requerido'),
    password: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
      .regex(/[a-z]/, 'Debe contener al menos una minúscula')
      .regex(/[0-9]/, 'Debe contener al menos un número'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

/**
 * Schema for validating profile update data
 * @property {string} name - User's full name (min 3 characters)
 * @property {string} email - Valid email address
 * @property {string} [phone] - Optional Mexican phone number (supports +52 format with spaces)
 * @property {File} [avatar] - Optional avatar image file
 */
export const updateProfileSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
  phone: z
    .string()
    .regex(/^\+?52?\s?[\d\s]{10,14}$/, 'Número de teléfono inválido')
    .optional(),
  avatar: z.instanceof(File).optional(),
});

/**
 * Schema for validating password change request
 * @property {string} currentPassword - User's current password
 * @property {string} newPassword - New strong password
 * @property {string} confirmPassword - Must match new password
 */
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Contraseña actual es requerida'),
    newPassword: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
      .regex(/[a-z]/, 'Debe contener al menos una minúscula')
      .regex(/[0-9]/, 'Debe contener al menos un número'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

/** Inferred type for login input data */
export type LoginInput = z.infer<typeof loginSchema>;
/** Inferred type for registration input data */
export type RegisterInput = z.infer<typeof registerSchema>;
/** Inferred type for forgot password input data */
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
/** Inferred type for password reset input data */
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
/** Inferred type for profile update input data */
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
/** Inferred type for password change input data */
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
