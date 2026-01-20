import { describe, it, expect } from 'vitest';
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from '../user';

describe('User Validators', () => {
  describe('loginSchema', () => {
    it('should accept valid login data', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(result.success).toBe(true);
    });

    it('should accept login with rememberMe', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
        rememberMe: true,
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const result = loginSchema.safeParse({
        email: 'invalid-email',
        password: 'password123',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Correo electrónico inválido');
      }
    });

    it('should reject short password', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: 'short',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'La contraseña debe tener al menos 8 caracteres'
        );
      }
    });

    it('should reject empty email', () => {
      const result = loginSchema.safeParse({
        email: '',
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('registerSchema', () => {
    const validData = {
      name: 'Juan Pérez',
      email: 'juan@example.com',
      password: 'Password123',
      confirmPassword: 'Password123',
      acceptTerms: true,
    };

    it('should accept valid registration data', () => {
      const result = registerSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject name shorter than 3 characters', () => {
      const result = registerSchema.safeParse({
        ...validData,
        name: 'AB',
      });
      expect(result.success).toBe(false);
    });

    it('should reject password without uppercase', () => {
      const result = registerSchema.safeParse({
        ...validData,
        password: 'password123',
        confirmPassword: 'password123',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.message.includes('mayúscula'))).toBe(true);
      }
    });

    it('should reject password without lowercase', () => {
      const result = registerSchema.safeParse({
        ...validData,
        password: 'PASSWORD123',
        confirmPassword: 'PASSWORD123',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.message.includes('minúscula'))).toBe(true);
      }
    });

    it('should reject password without number', () => {
      const result = registerSchema.safeParse({
        ...validData,
        password: 'PasswordABC',
        confirmPassword: 'PasswordABC',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.message.includes('número'))).toBe(true);
      }
    });

    it('should reject mismatched passwords', () => {
      const result = registerSchema.safeParse({
        ...validData,
        confirmPassword: 'DifferentPass123',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.message === 'Las contraseñas no coinciden')).toBe(
          true
        );
      }
    });

    it('should reject if terms not accepted', () => {
      const result = registerSchema.safeParse({
        ...validData,
        acceptTerms: false,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          result.error.issues.some((i) => i.message === 'Debes aceptar los términos y condiciones')
        ).toBe(true);
      }
    });
  });

  describe('forgotPasswordSchema', () => {
    it('should accept valid email', () => {
      const result = forgotPasswordSchema.safeParse({
        email: 'test@example.com',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const result = forgotPasswordSchema.safeParse({
        email: 'not-an-email',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('resetPasswordSchema', () => {
    const validData = {
      token: 'valid-token-123',
      password: 'NewPassword123',
      confirmPassword: 'NewPassword123',
    };

    it('should accept valid reset data', () => {
      const result = resetPasswordSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject empty token', () => {
      const result = resetPasswordSchema.safeParse({
        ...validData,
        token: '',
      });
      expect(result.success).toBe(false);
    });

    it('should reject mismatched passwords', () => {
      const result = resetPasswordSchema.safeParse({
        ...validData,
        confirmPassword: 'DifferentPass123',
      });
      expect(result.success).toBe(false);
    });

    it('should validate password strength', () => {
      const result = resetPasswordSchema.safeParse({
        ...validData,
        password: 'weakpass',
        confirmPassword: 'weakpass',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('changePasswordSchema', () => {
    const validData = {
      currentPassword: 'OldPassword123',
      newPassword: 'NewPassword456',
      confirmPassword: 'NewPassword456',
    };

    it('should accept valid change password data', () => {
      const result = changePasswordSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject empty current password', () => {
      const result = changePasswordSchema.safeParse({
        ...validData,
        currentPassword: '',
      });
      expect(result.success).toBe(false);
    });

    it('should validate new password strength', () => {
      const result = changePasswordSchema.safeParse({
        ...validData,
        newPassword: 'weak',
        confirmPassword: 'weak',
      });
      expect(result.success).toBe(false);
    });

    it('should reject mismatched passwords', () => {
      const result = changePasswordSchema.safeParse({
        ...validData,
        confirmPassword: 'Different456',
      });
      expect(result.success).toBe(false);
    });
  });
});
