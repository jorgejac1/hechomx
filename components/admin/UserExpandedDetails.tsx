/**
 * @fileoverview Expanded user details component for admin user management.
 * Displays detailed user information including contact, activity, and seller stats.
 * Used in expandable table rows in the admin users page.
 * @module components/admin/UserExpandedDetails
 */

import {
  Mail,
  Calendar,
  Shield,
  ShoppingBag,
  Store,
  CheckCircle,
  AlertTriangle,
  Eye,
} from 'lucide-react';
import { type MockUser } from '@/lib/data/users';

interface UserExpandedDetailsProps {
  user: MockUser;
  getRoleBadge: (role: MockUser['role']) => React.ReactNode;
  getStatusBadge: (status: MockUser['status']) => React.ReactNode;
  onViewProfile: (user: MockUser) => void;
  onSuspend: (user: MockUser) => void;
  onReactivate: (user: MockUser) => void;
}

export default function UserExpandedDetails({
  user,
  getRoleBadge,
  getStatusBadge,
  onViewProfile,
  onSuspend,
  onReactivate,
}: UserExpandedDetailsProps) {
  return (
    <tr className="bg-purple-50 border-b border-purple-100">
      <td colSpan={6} className="px-4 py-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Información</h4>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                {user.email}
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                Registro: {user.joinedAt}
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <Eye className="w-4 h-4" />
                Última actividad: {user.lastActive}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Estadísticas</h4>
            <div className="space-y-2 text-sm">
              {user.role === 'buyer' && (
                <p className="flex items-center gap-2 text-gray-600">
                  <ShoppingBag className="w-4 h-4" />
                  {user.orders || 0} pedidos realizados
                </p>
              )}
              {user.role === 'seller' && (
                <>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Store className="w-4 h-4" />
                    {user.shopName}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <ShoppingBag className="w-4 h-4" />
                    {user.sales || 0} ventas realizadas
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    {user.verified ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    )}
                    {user.verified ? 'Vendedor verificado' : 'Pendiente de verificación'}
                  </p>
                </>
              )}
              {user.role === 'admin' && (
                <p className="flex items-center gap-2 text-purple-600">
                  <Shield className="w-4 h-4" />
                  Acceso completo al sistema
                </p>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Estado de Cuenta</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {getStatusBadge(user.status)}
                {getRoleBadge(user.role)}
              </div>
              {user.status === 'suspended' && (
                <p className="text-sm text-red-600">Cuenta suspendida por violación de términos</p>
              )}
              {user.status === 'pending' && (
                <p className="text-sm text-amber-600">Esperando verificación de documentos</p>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Acciones</h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewProfile(user);
                }}
                className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Ver Perfil Completo
              </button>
              {user.role === 'seller' && (
                <button className="px-3 py-1.5 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                  Ver Tienda
                </button>
              )}
              {user.status !== 'suspended' && user.role !== 'admin' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSuspend(user);
                  }}
                  className="px-3 py-1.5 text-sm bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
                >
                  Suspender
                </button>
              )}
              {user.status === 'suspended' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onReactivate(user);
                  }}
                  className="px-3 py-1.5 text-sm bg-white border border-green-300 text-green-600 rounded-lg hover:bg-green-50 transition"
                >
                  Reactivar
                </button>
              )}
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}
