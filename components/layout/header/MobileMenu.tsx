'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  User,
  LogOut,
  Heart,
  Package,
  Sparkles,
  ExternalLink,
  Store,
  Shield,
  Users,
  BarChart3,
  Settings,
  FileCheck,
  Gift,
  ShoppingBag,
} from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';
import { getShopSlug } from '@/lib/utils/shop';
import type { User as UserType } from '@/contexts/AuthContext';

interface MobileMenuProps {
  user: UserType | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  onClose: () => void;
  onLogout: () => void;
}

interface MobileMenuItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'purple' | 'blue' | 'red';
  external?: boolean;
}

function MobileMenuItem({
  href,
  icon,
  label,
  onClick,
  variant = 'default',
  external,
}: MobileMenuItemProps) {
  const variantClasses = {
    default: 'text-gray-700 hover:text-primary-600',
    primary: 'bg-primary-50 text-primary-700 hover:bg-primary-100 px-4 rounded-lg',
    purple: 'text-purple-700 hover:text-purple-800',
    blue: 'text-blue-600 hover:text-blue-700',
    red: 'text-red-600 hover:text-red-700',
  };

  const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 font-medium py-2 transition-colors ${variantClasses[variant]}`}
      {...linkProps}
    >
      {icon}
      <span>{label}</span>
      {external && <ExternalLink className="w-4 h-4 ml-auto" aria-hidden="true" />}
    </Link>
  );
}

function MobileMenuButton({
  icon,
  label,
  onClick,
  variant = 'default',
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'red' | 'primary';
}) {
  const variantClasses = {
    default: 'text-gray-700 hover:text-primary-600',
    red: 'text-red-600 hover:text-red-700',
    primary: 'bg-primary-600 text-white hover:bg-primary-700 px-4 rounded-lg',
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 font-medium py-2 w-full text-left transition-colors ${variantClasses[variant]}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function MobileMenuSection({
  title,
  variant = 'default',
}: {
  title: string;
  variant?: 'default' | 'purple';
}) {
  const colorClass = variant === 'purple' ? 'text-purple-600' : 'text-gray-500';
  return (
    <p className={`text-xs font-semibold uppercase tracking-wider px-1 py-2 ${colorClass}`}>
      {title}
    </p>
  );
}

function MobileMenuDivider() {
  return <div className="border-t border-gray-200 my-2" role="separator" />;
}

function UserHeader({ user, isAdmin }: { user: UserType; isAdmin: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 py-3 ${
        isAdmin
          ? 'border-b border-purple-200 bg-purple-50 -mx-4 px-4 mb-2'
          : 'pt-2 pb-4 border-t border-gray-200'
      }`}
    >
      {user.avatar && (
        <Image
          src={user.avatar}
          alt=""
          width={40}
          height={40}
          className={`rounded-full ${isAdmin ? 'ring-2 ring-purple-500' : ''}`}
        />
      )}
      <div>
        <div className="flex items-center gap-2">
          {isAdmin && <Shield className="w-4 h-4 text-purple-600" aria-hidden="true" />}
          <p className="text-sm font-semibold text-gray-900">{user.name}</p>
        </div>
        {isAdmin ? (
          <p className="text-xs text-purple-600 font-medium">Administrador</p>
        ) : (
          <p className="text-xs text-gray-600">{user.email}</p>
        )}
      </div>
    </div>
  );
}

export default function MobileMenu({
  user,
  isAuthenticated,
  isAdmin,
  onClose,
  onLogout,
}: MobileMenuProps) {
  const handleLogout = () => {
    onClose();
    onLogout();
  };

  // Admin Mobile Menu
  if (isAdmin && user) {
    return (
      <nav className="md:hidden pb-4 pt-2 border-t" aria-label="Menú móvil de administrador">
        <div className="flex flex-col space-y-3">
          <UserHeader user={user} isAdmin={true} />

          <MobileMenuSection title="Panel de Administración" variant="purple" />

          <MobileMenuItem
            href={ROUTES.ADMIN_VERIFICACIONES}
            icon={<FileCheck className="w-5 h-5" />}
            label="Verificaciones"
            onClick={onClose}
            variant="purple"
          />
          <MobileMenuItem
            href={ROUTES.ADMIN_USUARIOS || '#'}
            icon={<Users className="w-5 h-5" />}
            label="Usuarios"
            onClick={onClose}
            variant="purple"
          />
          <MobileMenuItem
            href={ROUTES.ADMIN_REPORTES || '#'}
            icon={<BarChart3 className="w-5 h-5" />}
            label="Reportes"
            onClick={onClose}
            variant="purple"
          />
          <MobileMenuItem
            href={ROUTES.ADMIN_CONFIGURACION}
            icon={<Settings className="w-5 h-5" />}
            label="Configuración"
            onClick={onClose}
            variant="purple"
          />

          <MobileMenuDivider />

          <MobileMenuItem
            href={ROUTES.PRODUCTS}
            icon={<ShoppingBag className="w-5 h-5" />}
            label="Ver Productos"
            onClick={onClose}
          />

          <MobileMenuButton
            icon={<LogOut className="w-5 h-5" />}
            label="Cerrar Sesión"
            onClick={handleLogout}
            variant="red"
          />
        </div>
      </nav>
    );
  }

  // Regular User Mobile Menu
  return (
    <nav className="md:hidden pb-4 pt-2 border-t" aria-label="Menú móvil">
      <div className="flex flex-col space-y-3">
        {/* Public Links */}
        <MobileMenuItem
          href="/regalos"
          icon={<Gift className="w-5 h-5" />}
          label="Regalos"
          onClick={onClose}
        />
        <MobileMenuItem
          href={ROUTES.PRODUCTS}
          icon={<ShoppingBag className="w-5 h-5" />}
          label="Productos"
          onClick={onClose}
        />

        {isAuthenticated && user ? (
          <>
            <UserHeader user={user} isAdmin={false} />

            {user.makerProfile && (
              <MobileMenuItem
                href={`/tienda/${getShopSlug(user.makerProfile.shopName)}`}
                icon={<Store className="w-5 h-5" />}
                label="Ver Mi Tienda"
                onClick={onClose}
                variant="primary"
                external
              />
            )}

            <MobileMenuItem
              href={ROUTES.PROFILE}
              icon={<User className="w-5 h-5" />}
              label="Mi Perfil"
              onClick={onClose}
            />
            <MobileMenuItem
              href={ROUTES.ORDERS}
              icon={<Package className="w-5 h-5" />}
              label="Mis Pedidos"
              onClick={onClose}
            />
            <MobileMenuItem
              href={ROUTES.WISHLIST}
              icon={<Heart className="w-5 h-5" />}
              label="Favoritos"
              onClick={onClose}
            />
            <MobileMenuItem
              href={ROUTES.MY_IMPACT}
              icon={<Sparkles className="w-5 h-5" />}
              label="Mi Impacto"
              onClick={onClose}
            />

            {/* Seller Tools */}
            {user.makerProfile && (
              <>
                <MobileMenuDivider />
                <MobileMenuSection title="Herramientas de Vendedor" />
                <MobileMenuItem
                  href={ROUTES.MY_STORY}
                  icon={<Sparkles className="w-5 h-5" />}
                  label="Mi Historia Artesanal"
                  onClick={onClose}
                  variant="purple"
                />
                <MobileMenuItem
                  href={ROUTES.PRICING_CALCULATOR}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  }
                  label="Calculadora de Precios"
                  onClick={onClose}
                  variant="blue"
                />
              </>
            )}

            <MobileMenuButton
              icon={<LogOut className="w-5 h-5" />}
              label="Cerrar Sesión"
              onClick={handleLogout}
              variant="red"
            />
          </>
        ) : (
          <MobileMenuItem
            href={ROUTES.LOGIN}
            icon={<User className="w-5 h-5" />}
            label="Iniciar Sesión"
            onClick={onClose}
          />
        )}

        {/* Sell CTA */}
        {!isAdmin && (
          <Link
            href="/vender"
            onClick={onClose}
            className="flex items-center gap-3 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Vender
          </Link>
        )}
      </div>
    </nav>
  );
}
