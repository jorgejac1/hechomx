'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  X,
  Mail,
  Calendar,
  Store,
  ShoppingBag,
  Shield,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Ban,
  UserCheck,
} from 'lucide-react';
import { type MockUser } from '@/lib/data/users';

interface UserProfileModalProps {
  user: MockUser;
  isOpen: boolean;
  onClose: () => void;
  onSuspend?: (userId: string) => void;
  onReactivate?: (userId: string) => void;
}

export default function UserProfileModal({
  user,
  isOpen,
  onClose,
  onSuspend,
  onReactivate,
}: UserProfileModalProps) {
  if (!isOpen) return null;

  const getRoleBadge = (role: MockUser['role']) => {
    const styles = {
      buyer: 'bg-blue-100 text-blue-700',
      seller: 'bg-purple-100 text-purple-700',
      admin: 'bg-amber-100 text-amber-700',
    };
    const labels = { buyer: 'Comprador', seller: 'Vendedor', admin: 'Admin' };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[role]}`}>
        {labels[role]}
      </span>
    );
  };

  const getStatusBadge = (status: MockUser['status']) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      suspended: 'bg-red-100 text-red-700',
      pending: 'bg-amber-100 text-amber-700',
    };
    const labels = { active: 'Activo', suspended: 'Suspendido', pending: 'Pendiente' };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <h2 className="text-xl font-bold text-gray-900">Perfil de Usuario</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* User Header */}
            <div className="flex items-start gap-4 mb-6">
              <Image
                src={user.avatar}
                alt={user.name}
                width={80}
                height={80}
                className="rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
                  {user.verified && <CheckCircle className="w-5 h-5 text-green-500" />}
                </div>
                <p className="text-gray-500 mb-3">{user.email}</p>
                <div className="flex items-center gap-2">
                  {getStatusBadge(user.status)}
                  {getRoleBadge(user.role)}
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Basic Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Información Básica</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Email:</span>
                    <span className="text-gray-900 font-medium">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Registro:</span>
                    <span className="text-gray-900 font-medium">{user.joinedAt}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Última actividad:</span>
                    <span className="text-gray-900 font-medium">{user.lastActive}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-600 ml-7">ID:</span>
                    <code className="text-xs bg-gray-200 px-2 py-0.5 rounded">{user.id}</code>
                  </div>
                </div>
              </div>

              {/* Activity/Stats */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Actividad</h4>
                <div className="space-y-3">
                  {user.role === 'buyer' && (
                    <>
                      <div className="flex items-center gap-3 text-sm">
                        <ShoppingBag className="w-4 h-4 text-blue-500" />
                        <span className="text-gray-600">Pedidos realizados:</span>
                        <span className="text-gray-900 font-bold">{user.orders || 0}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-gray-600 ml-7">Gasto total:</span>
                        <span className="text-gray-900 font-bold">
                          ${((user.orders || 0) * 850).toLocaleString()} MXN
                        </span>
                      </div>
                    </>
                  )}
                  {user.role === 'seller' && (
                    <>
                      <div className="flex items-center gap-3 text-sm">
                        <Store className="w-4 h-4 text-purple-500" />
                        <span className="text-gray-600">Tienda:</span>
                        <span className="text-gray-900 font-medium">{user.shopName}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <ShoppingBag className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600">Ventas totales:</span>
                        <span className="text-gray-900 font-bold">{user.sales || 0}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-gray-600 ml-7">Ingresos:</span>
                        <span className="text-gray-900 font-bold">
                          ${((user.sales || 0) * 650).toLocaleString()} MXN
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        {user.verified ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                        )}
                        <span className="text-gray-600">Verificación:</span>
                        <span
                          className={
                            user.verified
                              ? 'text-green-600 font-medium'
                              : 'text-amber-600 font-medium'
                          }
                        >
                          {user.verified ? 'Verificado' : 'Pendiente'}
                        </span>
                      </div>
                    </>
                  )}
                  {user.role === 'admin' && (
                    <div className="flex items-center gap-3 text-sm">
                      <Shield className="w-4 h-4 text-amber-500" />
                      <span className="text-gray-600">Nivel de acceso:</span>
                      <span className="text-amber-600 font-bold">Administrador</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Status Messages */}
            {user.status === 'suspended' && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Ban className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800">Cuenta Suspendida</h4>
                    <p className="text-sm text-red-600 mt-1">
                      Esta cuenta fue suspendida por violación de los términos de servicio. El
                      usuario no puede acceder a la plataforma.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {user.status === 'pending' && user.role === 'seller' && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800">Verificación Pendiente</h4>
                    <p className="text-sm text-amber-600 mt-1">
                      Este vendedor está esperando la verificación de sus documentos. Revisar en el
                      panel de verificaciones.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex flex-wrap gap-3 justify-end rounded-b-2xl">
            {user.role === 'seller' && user.shopName && (
              <Link
                href={`/tienda/${user.shopName.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition"
              >
                <Store className="w-4 h-4" />
                Ver Tienda
                <ExternalLink className="w-3 h-3" />
              </Link>
            )}

            <button
              onClick={() => {
                window.location.href = `mailto:${user.email}`;
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
            >
              <Mail className="w-4 h-4" />
              Enviar Email
            </button>

            {user.status === 'suspended' && onReactivate && (
              <button
                onClick={() => onReactivate(user.id)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition"
              >
                <UserCheck className="w-4 h-4" />
                Reactivar Cuenta
              </button>
            )}

            {user.status !== 'suspended' && user.role !== 'admin' && onSuspend && (
              <button
                onClick={() => onSuspend(user.id)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
              >
                <Ban className="w-4 h-4" />
                Suspender Cuenta
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
