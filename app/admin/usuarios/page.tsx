'use client';

import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  Search,
  ArrowLeft,
  Mail,
  Store,
  Ban,
  CheckCircle,
  Loader2,
  ChevronDown,
  Eye,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants/routes';
import UserProfileModal from '@/components/admin/UserProfileModal';
import ConfirmActionModal from '@/components/common/ConfirmActionModal';
import UserExpandedDetails from '@/components/admin/UserExpandedDetails';
import { mockUsers, type MockUser } from '@/lib/data/users';

type UserRole = 'all' | 'buyer' | 'seller' | 'admin';
type UserStatus = 'all' | 'active' | 'suspended' | 'pending';

export default function AdminUsuariosPage() {
  const router = useRouter();
  const { isAdmin, isLoading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole>('all');
  const [statusFilter, setStatusFilter] = useState<UserStatus>('all');
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  // User data state (allows modifications)
  const [users, setUsers] = useState<MockUser[]>(mockUsers);

  // Modal states
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'suspend' | 'reactivate' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!isAdmin) {
        router.push(ROUTES.HOME);
      } else {
        setLoading(false);
      }
    }
  }, [authLoading, isAdmin, router]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.shopName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: users.length,
    buyers: users.filter((u) => u.role === 'buyer').length,
    sellers: users.filter((u) => u.role === 'seller').length,
    suspended: users.filter((u) => u.status === 'suspended').length,
  };

  // Modal handlers
  const openProfileModal = (user: MockUser) => {
    setSelectedUser(user);
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
    setSelectedUser(null);
  };

  const openSuspendModal = (user: MockUser) => {
    setSelectedUser(user);
    setConfirmAction('suspend');
    setIsConfirmModalOpen(true);
  };

  const openReactivateModal = (user: MockUser) => {
    setSelectedUser(user);
    setConfirmAction('reactivate');
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setConfirmAction(null);
    setSelectedUser(null);
  };

  const handleConfirmAction = async () => {
    if (!selectedUser || !confirmAction) return;

    setIsProcessing(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update user status
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUser.id
          ? { ...user, status: confirmAction === 'suspend' ? 'suspended' : 'active' }
          : user
      )
    );

    setIsProcessing(false);
    closeConfirmModal();
    closeProfileModal();
  };

  const getRoleBadge = (role: MockUser['role']) => {
    const styles = {
      buyer: 'bg-blue-100 text-blue-700',
      seller: 'bg-purple-100 text-purple-700',
      admin: 'bg-amber-100 text-amber-700',
    };
    const labels = { buyer: 'Comprador', seller: 'Vendedor', admin: 'Admin' };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[role]}`}>
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
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={ROUTES.ADMIN}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Panel
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
          </div>
          <p className="text-gray-600">Administra usuarios, vendedores y permisos</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-600">Total Usuarios</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-2xl font-bold text-blue-600">{stats.buyers}</p>
            <p className="text-sm text-gray-600">Compradores</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-2xl font-bold text-purple-600">{stats.sellers}</p>
            <p className="text-sm text-gray-600">Vendedores</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-2xl font-bold text-red-600">{stats.suspended}</p>
            <p className="text-sm text-gray-600">Suspendidos</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, email o tienda..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as UserRole)}
                className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
              >
                <option value="all">Todos los roles</option>
                <option value="buyer">Compradores</option>
                <option value="seller">Vendedores</option>
                <option value="admin">Admins</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as UserStatus)}
                className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
              >
                <option value="all">Todos los estados</option>
                <option value="active">Activos</option>
                <option value="pending">Pendientes</option>
                <option value="suspended">Suspendidos</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Usuario
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 hidden md:table-cell">
                    Rol
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 hidden sm:table-cell">
                    Estado
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 hidden lg:table-cell">
                    Registro
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 hidden lg:table-cell">
                    Última Actividad
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <Fragment key={user.id}>
                    <tr
                      className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                        expandedUser === user.id ? 'bg-purple-50' : ''
                      }`}
                      onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-gray-900">{user.name}</p>
                              {user.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                            </div>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            {user.shopName && (
                              <p className="text-xs text-purple-600 flex items-center gap-1 mt-0.5">
                                <Store className="w-3 h-3" />
                                {user.shopName}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 hidden md:table-cell">{getRoleBadge(user.role)}</td>
                      <td className="py-4 px-4 hidden sm:table-cell">
                        {getStatusBadge(user.status)}
                      </td>
                      <td className="py-4 px-4 hidden lg:table-cell">
                        <span className="text-sm text-gray-600">{user.joinedAt}</span>
                      </td>
                      <td className="py-4 px-4 hidden lg:table-cell">
                        <span className="text-sm text-gray-600">{user.lastActive}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedUser(expandedUser === user.id ? null : user.id);
                            }}
                            className={`p-2 rounded-lg transition ${
                              expandedUser === user.id
                                ? 'text-purple-600 bg-purple-100'
                                : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50'
                            }`}
                            title="Ver detalles"
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${
                                expandedUser === user.id ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openProfileModal(user);
                            }}
                            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
                            title="Ver perfil"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = `mailto:${user.email}`;
                            }}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Enviar mensaje"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                          {user.status === 'active' && user.role !== 'admin' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openSuspendModal(user);
                              }}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Suspender"
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                          )}
                          {user.status === 'suspended' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openReactivateModal(user);
                              }}
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                              title="Reactivar"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* Expanded Details Row */}
                    {expandedUser === user.id && (
                      <UserExpandedDetails
                        user={user}
                        getRoleBadge={getRoleBadge}
                        getStatusBadge={getStatusBadge}
                        onViewProfile={openProfileModal}
                        onSuspend={openSuspendModal}
                        onReactivate={openReactivateModal}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No se encontraron usuarios</p>
            </div>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          isOpen={isProfileModalOpen}
          onClose={closeProfileModal}
          onSuspend={(userId) => {
            const user = users.find((u) => u.id === userId);
            if (user) openSuspendModal(user);
          }}
          onReactivate={(userId) => {
            const user = users.find((u) => u.id === userId);
            if (user) openReactivateModal(user);
          }}
        />
      )}

      {/* Confirm Action Modal */}
      <ConfirmActionModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirmAction}
        title={confirmAction === 'suspend' ? 'Suspender Usuario' : 'Reactivar Usuario'}
        message={
          confirmAction === 'suspend'
            ? '¿Estás seguro de que deseas suspender esta cuenta? El usuario no podrá acceder a la plataforma.'
            : '¿Estás seguro de que deseas reactivar esta cuenta? El usuario podrá acceder nuevamente a la plataforma.'
        }
        confirmLabel={confirmAction === 'suspend' ? 'Suspender' : 'Reactivar'}
        confirmVariant={confirmAction === 'suspend' ? 'danger' : 'success'}
        isLoading={isProcessing}
        userName={selectedUser?.name}
      />
    </div>
  );
}
