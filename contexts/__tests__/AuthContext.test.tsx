import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';

// Mock next/navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Test component that uses useAuth
function AuthTestComponent() {
  const { user, isAuthenticated, isLoading, isAdmin, login, register, logout, updateProfile } =
    useAuth();

  return (
    <div>
      <span data-testid="is-loading">{isLoading ? 'loading' : 'ready'}</span>
      <span data-testid="is-authenticated">{isAuthenticated ? 'yes' : 'no'}</span>
      <span data-testid="is-admin">{isAdmin ? 'yes' : 'no'}</span>
      <span data-testid="user-name">{user?.name ?? 'none'}</span>
      <span data-testid="user-email">{user?.email ?? 'none'}</span>
      <button
        data-testid="login-valid"
        onClick={() => login('juan@ejemplo.com', 'Password123').catch(() => {})}
      >
        Login Valid
      </button>
      <button
        data-testid="login-admin"
        onClick={() => login('admin@papalote.com', 'Admin123').catch(() => {})}
      >
        Login Admin
      </button>
      <button
        data-testid="login-invalid-user"
        onClick={() => login('nonexistent@test.com', 'password').catch(() => {})}
      >
        Login Invalid User
      </button>
      <button
        data-testid="login-invalid-password"
        onClick={() => login('juan@ejemplo.com', 'wrongpassword').catch(() => {})}
      >
        Login Invalid Password
      </button>
      <button
        data-testid="register"
        onClick={() => register('New User', 'newuser@test.com', 'Password123').catch(() => {})}
      >
        Register
      </button>
      <button
        data-testid="register-existing"
        onClick={() => register('Test', 'juan@ejemplo.com', 'Password123').catch(() => {})}
      >
        Register Existing
      </button>
      <button data-testid="logout" onClick={logout}>
        Logout
      </button>
      <button data-testid="update-profile" onClick={() => updateProfile({ name: 'Updated Name' })}>
        Update Profile
      </button>
    </div>
  );
}

// Error display component
function ErrorTestComponent() {
  const { login, register, updateProfile } = useAuth();
  const [loginError, setLoginError] = React.useState<string | null>(null);
  const [registerError, setRegisterError] = React.useState<string | null>(null);
  const [updateError, setUpdateError] = React.useState<string | null>(null);

  return (
    <div>
      <span data-testid="login-error">{loginError ?? ''}</span>
      <span data-testid="register-error">{registerError ?? ''}</span>
      <span data-testid="update-error">{updateError ?? ''}</span>
      <button
        data-testid="login-invalid-user"
        onClick={async () => {
          try {
            await login('nonexistent@test.com', 'password');
          } catch (e) {
            setLoginError((e as Error).message);
          }
        }}
      >
        Login Invalid
      </button>
      <button
        data-testid="login-invalid-password"
        onClick={async () => {
          try {
            await login('juan@ejemplo.com', 'wrongpassword');
          } catch (e) {
            setLoginError((e as Error).message);
          }
        }}
      >
        Login Wrong Password
      </button>
      <button
        data-testid="register-existing"
        onClick={async () => {
          try {
            await register('Test', 'juan@ejemplo.com', 'Password123');
          } catch (e) {
            setRegisterError((e as Error).message);
          }
        }}
      >
        Register Existing
      </button>
      <button
        data-testid="update-not-logged-in"
        onClick={async () => {
          try {
            await updateProfile({ name: 'Test' });
          } catch (e) {
            setUpdateError((e as Error).message);
          }
        }}
      >
        Update Not Logged In
      </button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('AuthProvider', () => {
    it('provides auth context to children', async () => {
      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading').textContent).toBe('ready');
      });
      expect(screen.getByTestId('is-authenticated').textContent).toBe('no');
    });

    it('loads user from localStorage on mount', async () => {
      const savedUser = {
        id: '1',
        name: 'Saved User',
        email: 'saved@test.com',
        createdAt: '2024-01-01',
      };
      localStorage.setItem('auth_user', JSON.stringify(savedUser));

      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading').textContent).toBe('ready');
        expect(screen.getByTestId('user-name').textContent).toBe('Saved User');
        expect(screen.getByTestId('is-authenticated').textContent).toBe('yes');
      });
    });

    it('handles corrupted localStorage gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      localStorage.setItem('auth_user', 'invalid-json{{{');

      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading').textContent).toBe('ready');
        expect(screen.getByTestId('is-authenticated').textContent).toBe('no');
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        '[AuthContext] Failed to load user session - data corrupted:',
        expect.any(SyntaxError)
      );
      consoleSpy.mockRestore();
    });
  });

  describe('useAuth hook', () => {
    it('throws error when used outside AuthProvider', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useAuth());
      }).toThrow('useAuth must be used within an AuthProvider');

      consoleSpy.mockRestore();
    });
  });

  describe('login', () => {
    it('logs in user with valid credentials', async () => {
      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading').textContent).toBe('ready');
      });

      fireEvent.click(screen.getByTestId('login-valid'));

      await waitFor(() => {
        expect(screen.getByTestId('is-authenticated').textContent).toBe('yes');
        expect(screen.getByTestId('user-name').textContent).toBe('Juan Pérez');
        expect(screen.getByTestId('user-email').textContent).toBe('juan@ejemplo.com');
      });
    });

    it('logs in admin user', async () => {
      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading').textContent).toBe('ready');
      });

      fireEvent.click(screen.getByTestId('login-admin'));

      await waitFor(() => {
        expect(screen.getByTestId('is-authenticated').textContent).toBe('yes');
        expect(screen.getByTestId('is-admin').textContent).toBe('yes');
      });
    });

    it('saves user to localStorage on login', async () => {
      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading').textContent).toBe('ready');
      });

      fireEvent.click(screen.getByTestId('login-valid'));

      await waitFor(() => {
        expect(screen.getByTestId('is-authenticated').textContent).toBe('yes');
      });

      const saved = localStorage.getItem('auth_user');
      expect(saved).not.toBeNull();
      const parsed = JSON.parse(saved!);
      expect(parsed.email).toBe('juan@ejemplo.com');
    });

    it('throws error for non-existent user', async () => {
      render(
        <AuthProvider>
          <ErrorTestComponent />
        </AuthProvider>
      );

      fireEvent.click(screen.getByTestId('login-invalid-user'));

      await waitFor(() => {
        expect(screen.getByTestId('login-error').textContent).toBe('Usuario no encontrado');
      });
    });

    it('throws error for wrong password', async () => {
      render(
        <AuthProvider>
          <ErrorTestComponent />
        </AuthProvider>
      );

      fireEvent.click(screen.getByTestId('login-invalid-password'));

      await waitFor(() => {
        expect(screen.getByTestId('login-error').textContent).toBe('Contraseña incorrecta');
      });
    });
  });

  describe('register', () => {
    it('registers a new user and saves to localStorage', async () => {
      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading').textContent).toBe('ready');
      });

      fireEvent.click(screen.getByTestId('register'));

      await waitFor(
        () => {
          expect(screen.getByTestId('is-authenticated').textContent).toBe('yes');
          expect(screen.getByTestId('user-name').textContent).toBe('New User');
          expect(screen.getByTestId('user-email').textContent).toBe('newuser@test.com');
        },
        { timeout: 2000 }
      );

      // Verify saved to localStorage
      const saved = localStorage.getItem('auth_user');
      expect(saved).not.toBeNull();
      const parsed = JSON.parse(saved!);
      expect(parsed.email).toBe('newuser@test.com');
      expect(parsed.name).toBe('New User');
    });

    it('throws error for existing email', async () => {
      render(
        <AuthProvider>
          <ErrorTestComponent />
        </AuthProvider>
      );

      fireEvent.click(screen.getByTestId('register-existing'));

      await waitFor(
        () => {
          expect(screen.getByTestId('register-error').textContent).toBe(
            'El correo electrónico ya está registrado'
          );
        },
        { timeout: 2000 }
      );
    });
  });

  describe('logout', () => {
    it('logs out user and clears state', async () => {
      localStorage.setItem(
        'auth_user',
        JSON.stringify({
          id: '1',
          name: 'Test',
          email: 'test@test.com',
          createdAt: '2024-01-01',
        })
      );

      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-authenticated').textContent).toBe('yes');
      });

      fireEvent.click(screen.getByTestId('logout'));

      await waitFor(() => {
        expect(screen.getByTestId('is-authenticated').textContent).toBe('no');
        expect(screen.getByTestId('user-name').textContent).toBe('none');
      });
    });

    it('removes user from localStorage', async () => {
      localStorage.setItem(
        'auth_user',
        JSON.stringify({
          id: '1',
          name: 'Test',
          email: 'test@test.com',
          createdAt: '2024-01-01',
        })
      );

      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-authenticated').textContent).toBe('yes');
      });

      fireEvent.click(screen.getByTestId('logout'));

      await waitFor(() => {
        expect(localStorage.getItem('auth_user')).toBeNull();
      });
    });

    it('redirects to home page on logout', async () => {
      localStorage.setItem(
        'auth_user',
        JSON.stringify({
          id: '1',
          name: 'Test',
          email: 'test@test.com',
          createdAt: '2024-01-01',
        })
      );

      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-authenticated').textContent).toBe('yes');
      });

      fireEvent.click(screen.getByTestId('logout'));

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/');
      });
    });
  });

  describe('updateProfile', () => {
    it('updates user profile', async () => {
      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading').textContent).toBe('ready');
      });

      // First login
      fireEvent.click(screen.getByTestId('login-valid'));

      await waitFor(() => {
        expect(screen.getByTestId('user-name').textContent).toBe('Juan Pérez');
      });

      // Then update profile
      fireEvent.click(screen.getByTestId('update-profile'));

      await waitFor(() => {
        expect(screen.getByTestId('user-name').textContent).toBe('Updated Name');
      });
    });

    it('saves updated profile to localStorage', async () => {
      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading').textContent).toBe('ready');
      });

      fireEvent.click(screen.getByTestId('login-valid'));

      await waitFor(() => {
        expect(screen.getByTestId('is-authenticated').textContent).toBe('yes');
      });

      fireEvent.click(screen.getByTestId('update-profile'));

      await waitFor(() => {
        const saved = localStorage.getItem('auth_user');
        expect(saved).not.toBeNull();
        const parsed = JSON.parse(saved!);
        expect(parsed.name).toBe('Updated Name');
      });
    });

    it('throws error when not logged in', async () => {
      render(
        <AuthProvider>
          <ErrorTestComponent />
        </AuthProvider>
      );

      fireEvent.click(screen.getByTestId('update-not-logged-in'));

      await waitFor(() => {
        expect(screen.getByTestId('update-error').textContent).toBe('No user logged in');
      });
    });
  });

  describe('isAdmin', () => {
    it('returns false for regular users', async () => {
      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading').textContent).toBe('ready');
      });

      fireEvent.click(screen.getByTestId('login-valid'));

      await waitFor(() => {
        expect(screen.getByTestId('is-admin').textContent).toBe('no');
      });
    });

    it('returns true for admin users', async () => {
      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading').textContent).toBe('ready');
      });

      fireEvent.click(screen.getByTestId('login-admin'));

      await waitFor(() => {
        expect(screen.getByTestId('is-admin').textContent).toBe('yes');
      });
    });
  });
});
