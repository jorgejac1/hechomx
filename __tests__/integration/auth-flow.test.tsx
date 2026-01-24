/**
 * @fileoverview Integration tests for authentication functionality.
 * Tests login, logout, registration, and protected route access.
 * @module __tests__/integration/auth-flow.test
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';

// Mock next/navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Test credentials
const validCredentials = {
  email: 'juan@ejemplo.com',
  password: 'Password123',
};

const invalidCredentials = {
  email: 'wrong@email.com',
  password: 'wrongpassword',
};

const newUserCredentials = {
  name: 'Test User',
  email: 'newuser@test.com',
  password: 'NewPassword123',
};

// Test component that uses auth context
function AuthTestComponent() {
  const { user, isAuthenticated, isLoading, isAdmin, login, logout, register, updateProfile } =
    useAuth();

  const handleLogin = async () => {
    try {
      await login(validCredentials.email, validCredentials.password);
    } catch {
      // Error handled by context
    }
  };

  const handleInvalidLogin = async () => {
    try {
      await login(invalidCredentials.email, invalidCredentials.password);
    } catch {
      // Expected error
    }
  };

  const handleRegister = async () => {
    try {
      await register(
        newUserCredentials.name,
        newUserCredentials.email,
        newUserCredentials.password
      );
    } catch {
      // Error handled by context
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateProfile({ name: 'Updated Name' });
    } catch {
      // Error handled by context
    }
  };

  if (isLoading) {
    return <div data-testid="loading">Loading...</div>;
  }

  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? 'authenticated' : 'not-authenticated'}</div>
      <div data-testid="admin-status">{isAdmin ? 'admin' : 'not-admin'}</div>
      <div data-testid="user-name">{user?.name || 'no-user'}</div>
      <div data-testid="user-email">{user?.email || 'no-email'}</div>

      <button data-testid="login-btn" onClick={handleLogin}>
        Login
      </button>
      <button data-testid="invalid-login-btn" onClick={handleInvalidLogin}>
        Invalid Login
      </button>
      <button data-testid="register-btn" onClick={handleRegister}>
        Register
      </button>
      <button data-testid="logout-btn" onClick={logout}>
        Logout
      </button>
      <button data-testid="update-profile-btn" onClick={handleUpdateProfile}>
        Update Profile
      </button>
    </div>
  );
}

// Login form component
function LoginFormComponent() {
  const { login, isAuthenticated, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div>
        <div data-testid="welcome">Welcome, {user?.name}</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-testid="email-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        data-testid="password-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button data-testid="submit-btn" type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </button>
      {error && <div data-testid="error-message">{error}</div>}
    </form>
  );
}

// Need to import useState for LoginFormComponent
import { useState } from 'react';

describe('Auth Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    mockPush.mockClear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Login Flow', () => {
    it('should login with valid credentials', async () => {
      render(
        <ToastProvider>
          <AuthProvider>
            <AuthTestComponent />
          </AuthProvider>
        </ToastProvider>
      );

      // Initially not authenticated
      await waitFor(() => {
        expect(screen.getByTestId('auth-status').textContent).toBe('not-authenticated');
        expect(screen.getByTestId('user-name').textContent).toBe('no-user');
      });

      // Click login
      fireEvent.click(screen.getByTestId('login-btn'));

      // Should be authenticated after login
      await waitFor(
        () => {
          expect(screen.getByTestId('auth-status').textContent).toBe('authenticated');
          expect(screen.getByTestId('user-name').textContent).toBe('Juan Pérez');
          expect(screen.getByTestId('user-email').textContent).toBe('juan@ejemplo.com');
        },
        { timeout: 2000 }
      );
    });

    it('should fail login with invalid credentials', async () => {
      render(
        <ToastProvider>
          <AuthProvider>
            <AuthTestComponent />
          </AuthProvider>
        </ToastProvider>
      );

      // Click invalid login
      fireEvent.click(screen.getByTestId('invalid-login-btn'));

      // Should still not be authenticated
      await waitFor(
        () => {
          expect(screen.getByTestId('auth-status').textContent).toBe('not-authenticated');
        },
        { timeout: 2000 }
      );
    });

    it('should persist login to localStorage', async () => {
      render(
        <ToastProvider>
          <AuthProvider>
            <AuthTestComponent />
          </AuthProvider>
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('login-btn'));

      await waitFor(
        () => {
          expect(screen.getByTestId('auth-status').textContent).toBe('authenticated');
        },
        { timeout: 2000 }
      );

      // Check localStorage
      const savedUser = localStorage.getItem('auth_user');
      expect(savedUser).not.toBeNull();
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        expect(parsedUser.email).toBe('juan@ejemplo.com');
      }
    });
  });

  describe('Logout Flow', () => {
    it('should logout and clear session', async () => {
      // Pre-login
      const mockUser = {
        id: '1',
        name: 'Juan Pérez',
        email: 'juan@ejemplo.com',
        createdAt: '2024-01-15T10:30:00Z',
      };
      localStorage.setItem('auth_user', JSON.stringify(mockUser));

      render(
        <ToastProvider>
          <AuthProvider>
            <AuthTestComponent />
          </AuthProvider>
        </ToastProvider>
      );

      // Should be authenticated
      await waitFor(() => {
        expect(screen.getByTestId('auth-status').textContent).toBe('authenticated');
      });

      // Logout
      fireEvent.click(screen.getByTestId('logout-btn'));

      // Should be logged out
      await waitFor(() => {
        expect(screen.getByTestId('auth-status').textContent).toBe('not-authenticated');
        expect(screen.getByTestId('user-name').textContent).toBe('no-user');
      });

      // localStorage should be cleared
      expect(localStorage.getItem('auth_user')).toBeNull();

      // Should redirect to home
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  describe('Registration Flow', () => {
    it('should register a new user', async () => {
      render(
        <ToastProvider>
          <AuthProvider>
            <AuthTestComponent />
          </AuthProvider>
        </ToastProvider>
      );

      // Register
      fireEvent.click(screen.getByTestId('register-btn'));

      // Should be authenticated as new user
      await waitFor(
        () => {
          expect(screen.getByTestId('auth-status').textContent).toBe('authenticated');
          expect(screen.getByTestId('user-name').textContent).toBe('Test User');
          expect(screen.getByTestId('user-email').textContent).toBe('newuser@test.com');
        },
        { timeout: 2000 }
      );
    });
  });

  describe('Profile Update Flow', () => {
    it('should update user profile', async () => {
      // Pre-login
      const mockUser = {
        id: '1',
        name: 'Juan Pérez',
        email: 'juan@ejemplo.com',
        createdAt: '2024-01-15T10:30:00Z',
      };
      localStorage.setItem('auth_user', JSON.stringify(mockUser));

      render(
        <ToastProvider>
          <AuthProvider>
            <AuthTestComponent />
          </AuthProvider>
        </ToastProvider>
      );

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByTestId('user-name').textContent).toBe('Juan Pérez');
      });

      // Update profile
      fireEvent.click(screen.getByTestId('update-profile-btn'));

      // Should show updated name
      await waitFor(
        () => {
          expect(screen.getByTestId('user-name').textContent).toBe('Updated Name');
        },
        { timeout: 2000 }
      );

      // localStorage should be updated
      const savedUser = localStorage.getItem('auth_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        expect(parsedUser.name).toBe('Updated Name');
      }
    });
  });

  describe('Admin Detection', () => {
    it('should detect admin user', async () => {
      // Login as admin
      const adminUser = {
        id: 'admin-1',
        name: 'Administrador',
        email: 'admin@papalote.com',
        isAdmin: true,
        createdAt: '2022-01-01T00:00:00Z',
      };
      localStorage.setItem('auth_user', JSON.stringify(adminUser));

      render(
        <ToastProvider>
          <AuthProvider>
            <AuthTestComponent />
          </AuthProvider>
        </ToastProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('admin-status').textContent).toBe('admin');
      });
    });

    it('should not detect regular user as admin', async () => {
      const regularUser = {
        id: '1',
        name: 'Juan Pérez',
        email: 'juan@ejemplo.com',
        createdAt: '2024-01-15T10:30:00Z',
      };
      localStorage.setItem('auth_user', JSON.stringify(regularUser));

      render(
        <ToastProvider>
          <AuthProvider>
            <AuthTestComponent />
          </AuthProvider>
        </ToastProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('admin-status').textContent).toBe('not-admin');
      });
    });
  });

  describe('Session Persistence', () => {
    it('should restore session from localStorage', async () => {
      const savedUser = {
        id: '1',
        name: 'Saved User',
        email: 'saved@test.com',
        createdAt: '2024-01-15T10:30:00Z',
      };
      localStorage.setItem('auth_user', JSON.stringify(savedUser));

      render(
        <ToastProvider>
          <AuthProvider>
            <AuthTestComponent />
          </AuthProvider>
        </ToastProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('auth-status').textContent).toBe('authenticated');
        expect(screen.getByTestId('user-name').textContent).toBe('Saved User');
        expect(screen.getByTestId('user-email').textContent).toBe('saved@test.com');
      });
    });

    it('should handle corrupted localStorage gracefully', async () => {
      // Suppress expected console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      localStorage.setItem('auth_user', 'invalid-json');

      render(
        <ToastProvider>
          <AuthProvider>
            <AuthTestComponent />
          </AuthProvider>
        </ToastProvider>
      );

      // Should not be authenticated
      await waitFor(() => {
        expect(screen.getByTestId('auth-status').textContent).toBe('not-authenticated');
      });

      // localStorage should be cleared
      expect(localStorage.getItem('auth_user')).toBeNull();

      // Verify error was logged
      expect(consoleSpy).toHaveBeenCalledWith(
        '[AuthContext] Failed to load user session - data corrupted:',
        expect.any(SyntaxError)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('Login Form Integration', () => {
    it('should show welcome message after successful form login', async () => {
      const user = userEvent.setup();

      render(
        <ToastProvider>
          <AuthProvider>
            <LoginFormComponent />
          </AuthProvider>
        </ToastProvider>
      );

      // Fill form
      await user.type(screen.getByTestId('email-input'), validCredentials.email);
      await user.type(screen.getByTestId('password-input'), validCredentials.password);

      // Submit
      await user.click(screen.getByTestId('submit-btn'));

      // Should show welcome message
      await waitFor(
        () => {
          expect(screen.getByTestId('welcome')).toBeInTheDocument();
          expect(screen.getByTestId('welcome').textContent).toContain('Juan Pérez');
        },
        { timeout: 2000 }
      );
    });

    it('should show error message for invalid credentials', async () => {
      const user = userEvent.setup();

      render(
        <ToastProvider>
          <AuthProvider>
            <LoginFormComponent />
          </AuthProvider>
        </ToastProvider>
      );

      // Fill form with invalid credentials
      await user.type(screen.getByTestId('email-input'), invalidCredentials.email);
      await user.type(screen.getByTestId('password-input'), invalidCredentials.password);

      // Submit
      await user.click(screen.getByTestId('submit-btn'));

      // Should show error message
      await waitFor(
        () => {
          expect(screen.getByTestId('error-message')).toBeInTheDocument();
        },
        { timeout: 2000 }
      );
    });
  });
});
