'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  User,
  LogOut,
  Heart,
  Package,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Store,
  Shield,
  Users,
  BarChart3,
  Settings,
  FileCheck,
} from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';
import { getShopSlug } from '@/lib/utils/shop';
import type { User as UserType } from '@/contexts/AuthContext';

interface UserDropdownProps {
  user: UserType;
  isAdmin: boolean;
  onLogout: () => void;
}

interface MenuItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'purple';
  external?: boolean;
}

function MenuItem({ href, icon, label, onClick, variant = 'default', external }: MenuItemProps) {
  const variantClasses = {
    default: 'text-gray-700 hover:bg-gray-50',
    primary: 'text-primary-600 hover:bg-primary-50 font-medium',
    purple: 'text-purple-700 hover:bg-purple-50',
  };

  const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${variantClasses[variant]}`}
      {...linkProps}
    >
      {icon}
      <span>{label}</span>
      {external && <ExternalLink className="w-3 h-3 ml-auto" aria-hidden="true" />}
    </Link>
  );
}

function MenuSection({
  title,
  variant = 'default',
}: {
  title: string;
  variant?: 'default' | 'purple';
}) {
  const colorClass = variant === 'purple' ? 'text-purple-600' : 'text-gray-500';
  return (
    <div className="px-4 py-2">
      <p className={`text-xs font-semibold uppercase tracking-wider ${colorClass}`}>{title}</p>
    </div>
  );
}

function MenuDivider() {
  return <div className="border-t border-gray-200 my-2" role="separator" />;
}

export default function UserDropdown({ user, isAdmin, onLogout }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    closeMenu();
    onLogout();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 transition ${
          isAdmin ? 'text-purple-600 hover:text-purple-700' : 'text-gray-700 hover:text-primary-600'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Menú de usuario: ${user.name}`}
      >
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt=""
            width={32}
            height={32}
            className={`rounded-full ${isAdmin ? 'ring-2 ring-purple-500' : ''}`}
          />
        ) : (
          <User className="w-6 h-6" aria-hidden="true" />
        )}
        <ChevronDown className="w-4 h-4" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
          role="menu"
          aria-orientation="vertical"
        >
          {/* User Info Header */}
          <div className={`px-4 py-3 border-b border-gray-200 ${isAdmin ? 'bg-purple-50' : ''}`}>
            <div className="flex items-center gap-2">
              {isAdmin && <Shield className="w-4 h-4 text-purple-600" aria-hidden="true" />}
              <p className="text-sm font-semibold text-gray-900">{user.name}</p>
            </div>
            <p className="text-xs text-gray-600 truncate">{user.email}</p>
            {isAdmin && (
              <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-sm">
                Administrador
              </span>
            )}
          </div>

          {/* Admin Menu */}
          {isAdmin ? (
            <>
              <MenuSection title="Panel de Admin" variant="purple" />
              <MenuItem
                href={ROUTES.ADMIN_VERIFICACIONES}
                icon={<FileCheck className="w-4 h-4" />}
                label="Verificaciones"
                onClick={closeMenu}
                variant="purple"
              />
              <MenuItem
                href={ROUTES.ADMIN_USUARIOS || '#'}
                icon={<Users className="w-4 h-4" />}
                label="Usuarios"
                onClick={closeMenu}
                variant="purple"
              />
              <MenuItem
                href={ROUTES.ADMIN_REPORTES || '#'}
                icon={<BarChart3 className="w-4 h-4" />}
                label="Reportes"
                onClick={closeMenu}
                variant="purple"
              />
              <MenuItem
                href={ROUTES.ADMIN_CONFIGURACION}
                icon={<Settings className="w-4 h-4" />}
                label="Configuración"
                onClick={closeMenu}
                variant="purple"
              />
            </>
          ) : (
            <>
              {/* Regular User Menu */}
              <MenuItem
                href={ROUTES.PROFILE}
                icon={<User className="w-4 h-4" />}
                label="Mi Perfil"
                onClick={closeMenu}
              />

              {user.makerProfile && (
                <MenuItem
                  href={`/tienda/${getShopSlug(user.makerProfile.shopName)}`}
                  icon={<Store className="w-4 h-4" />}
                  label="Ver Mi Tienda"
                  onClick={closeMenu}
                  variant="primary"
                  external
                />
              )}

              <MenuItem
                href={ROUTES.ORDERS}
                icon={<Package className="w-4 h-4" />}
                label="Mis Pedidos"
                onClick={closeMenu}
              />
              <MenuItem
                href={ROUTES.WISHLIST}
                icon={<Heart className="w-4 h-4" />}
                label="Favoritos"
                onClick={closeMenu}
              />
              <MenuItem
                href={ROUTES.MY_IMPACT}
                icon={<Sparkles className="w-4 h-4" />}
                label="Mi Impacto"
                onClick={closeMenu}
              />

              {/* Seller Tools */}
              {user.makerProfile && (
                <>
                  <MenuDivider />
                  <MenuSection title="Herramientas" />
                  <MenuItem
                    href={ROUTES.MY_STORY}
                    icon={<Sparkles className="w-4 h-4" />}
                    label="Mi Historia Artesanal"
                    onClick={closeMenu}
                  />
                  <MenuItem
                    href={ROUTES.PRICING_CALCULATOR}
                    icon={
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    }
                    label="Calculadora de Precios"
                    onClick={closeMenu}
                  />
                </>
              )}
            </>
          )}

          <MenuDivider />

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors"
            role="menuitem"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}
