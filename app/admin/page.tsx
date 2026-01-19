'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Shield,
  FileCheck,
  Users,
  ShoppingBag,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Settings,
  Store,
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants/routes';
import verificationRequests from '@/lib/data/verification-requests.json';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: number; label: string };
  variant?: 'default' | 'warning' | 'success' | 'purple';
  href?: string;
}

function StatCard({ title, value, icon, trend, variant = 'default', href }: StatCardProps) {
  const variantStyles = {
    default: 'bg-white border-gray-200',
    warning: 'bg-amber-50 border-amber-200',
    success: 'bg-green-50 border-green-200',
    purple: 'bg-purple-50 border-purple-200',
  };

  const content = (
    <div
      className={`rounded-xl border-2 p-6 transition-shadow hover:shadow-md ${variantStyles[variant]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={`mt-1 text-sm ${trend.value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
            </p>
          )}
        </div>
        <div className="p-3 bg-white rounded-lg shadow-sm">{icon}</div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  variant?: 'default' | 'purple' | 'amber' | 'green';
}

function QuickAction({ title, description, icon, href, variant = 'default' }: QuickActionProps) {
  const variantStyles = {
    default: 'hover:bg-gray-50 border-gray-200',
    purple: 'hover:bg-purple-50 border-purple-200',
    amber: 'hover:bg-amber-50 border-amber-200',
    green: 'hover:bg-green-50 border-green-200',
  };

  return (
    <Link
      href={href}
      className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-colors ${variantStyles[variant]}`}
    >
      <div className="p-3 bg-white rounded-lg shadow-sm">{icon}</div>
      <div className="flex-1">
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <ArrowRight className="w-5 h-5 text-gray-400" />
    </Link>
  );
}

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  variant?: 'default' | 'success' | 'warning' | 'info';
}

function ActivityItem({ icon, title, description, time, variant = 'default' }: ActivityItemProps) {
  const variantStyles = {
    default: 'bg-gray-100',
    success: 'bg-green-100 text-green-600',
    warning: 'bg-amber-100 text-amber-600',
    info: 'bg-blue-100 text-blue-600',
  };

  return (
    <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
      <div className={`p-2 rounded-lg ${variantStyles[variant]}`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600 truncate">{description}</p>
      </div>
      <p className="text-xs text-gray-500 whitespace-nowrap">{time}</p>
    </div>
  );
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);

  // Auth check
  useEffect(() => {
    if (!authLoading) {
      if (!isAdmin) {
        router.push(ROUTES.HOME);
      } else {
        setLoading(false);
      }
    }
  }, [authLoading, isAdmin, router]);

  // Calculate stats from verification requests
  const pendingVerifications = verificationRequests.filter(
    (r) => r.status === 'submitted' || r.status === 'under_review'
  ).length;
  const urgentVerifications = verificationRequests.filter(
    (r) => r.priority === 'urgent' || r.flagged
  ).length;
  const approvedThisMonth = verificationRequests.filter((r) => r.status === 'approved').length;

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando panel de administración...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          </div>
          <p className="text-gray-600">
            Bienvenido, {user?.name}. Aquí está el resumen de la plataforma.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Verificaciones Pendientes"
            value={pendingVerifications}
            icon={<FileCheck className="w-6 h-6 text-purple-600" />}
            variant="purple"
            href={ROUTES.ADMIN_VERIFICACIONES}
          />
          <StatCard
            title="Urgentes"
            value={urgentVerifications}
            icon={<AlertTriangle className="w-6 h-6 text-amber-600" />}
            variant="warning"
            href={ROUTES.ADMIN_VERIFICACIONES}
          />
          <StatCard
            title="Aprobadas (Mes)"
            value={approvedThisMonth}
            icon={<CheckCircle2 className="w-6 h-6 text-green-600" />}
            trend={{ value: 12, label: 'vs mes anterior' }}
            variant="success"
          />
          <StatCard
            title="Usuarios Totales"
            value="1,234"
            icon={<Users className="w-6 h-6 text-blue-600" />}
            trend={{ value: 8, label: 'este mes' }}
          />
        </div>

        {/* Second Row Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard
            title="Productos Activos"
            value="2,456"
            icon={<ShoppingBag className="w-6 h-6 text-indigo-600" />}
            trend={{ value: 15, label: 'nuevos esta semana' }}
          />
          <StatCard
            title="Tiendas Activas"
            value="156"
            icon={<Store className="w-6 h-6 text-teal-600" />}
            trend={{ value: 5, label: 'nuevas este mes' }}
          />
          <StatCard
            title="Ventas Hoy"
            value="$45,320"
            icon={<TrendingUp className="w-6 h-6 text-green-600" />}
            trend={{ value: 23, label: 'vs ayer' }}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
            <div className="space-y-3">
              <QuickAction
                title="Revisar Verificaciones"
                description={`${pendingVerifications} solicitudes pendientes`}
                icon={<FileCheck className="w-5 h-5 text-purple-600" />}
                href={ROUTES.ADMIN_VERIFICACIONES}
                variant="purple"
              />
              <QuickAction
                title="Gestionar Usuarios"
                description="Ver y editar usuarios"
                icon={<Users className="w-5 h-5 text-blue-600" />}
                href={ROUTES.ADMIN_USUARIOS || '#'}
              />
              <QuickAction
                title="Ver Reportes"
                description="Análisis y estadísticas"
                icon={<BarChart3 className="w-5 h-5 text-green-600" />}
                href={ROUTES.ADMIN_REPORTES || '#'}
                variant="green"
              />
              <QuickAction
                title="Configuración"
                description="Ajustes de la plataforma"
                icon={<Settings className="w-5 h-5 text-gray-600" />}
                href={ROUTES.ADMIN_CONFIGURACION}
              />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Actividad Reciente</h2>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <ActivityItem
                icon={<FileCheck className="w-4 h-4" />}
                title="Nueva solicitud de verificación"
                description="Miguel Ángel Torres - Alebrijes Miguel (Urgente)"
                time="Hace 1 hora"
                variant="warning"
              />
              <ActivityItem
                icon={<CheckCircle2 className="w-4 h-4" />}
                title="Verificación aprobada"
                description="Carmen Ruiz - Cerámica Tradicional Carmen"
                time="Hace 3 horas"
                variant="success"
              />
              <ActivityItem
                icon={<Users className="w-4 h-4" />}
                title="Nuevo vendedor registrado"
                description="Artesanías del Valle - Oaxaca"
                time="Hace 5 horas"
                variant="info"
              />
              <ActivityItem
                icon={<Store className="w-4 h-4" />}
                title="Tienda activada"
                description="Tejidos Tradicionales Maya"
                time="Hace 1 día"
                variant="success"
              />
              <ActivityItem
                icon={<AlertTriangle className="w-4 h-4" />}
                title="Solicitud marcada como urgente"
                description="Talleres Artesanales del Sur - Feria Internacional"
                time="Hace 2 días"
                variant="warning"
              />

              <Link
                href={ROUTES.ADMIN_VERIFICACIONES}
                className="flex items-center justify-center gap-2 mt-4 py-3 text-purple-600 hover:text-purple-700 font-medium"
              >
                Ver toda la actividad
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Pending Verifications Preview */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              Verificaciones que Requieren Atención
            </h2>
            <Link
              href={ROUTES.ADMIN_VERIFICACIONES}
              className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1"
            >
              Ver todas <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Vendedor
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 hidden sm:table-cell">
                    Nivel Solicitado
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 hidden md:table-cell">
                    Días Esperando
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Prioridad
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {verificationRequests
                  .filter((r) => r.status === 'submitted' || r.status === 'under_review')
                  .slice(0, 5)
                  .map((request) => (
                    <tr key={request.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-900">{request.sellerName}</p>
                        <p className="text-sm text-gray-500">{request.shopName}</p>
                      </td>
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <span className="text-sm text-gray-600">
                          {request.requestedLevel === 'verified_artisan' && 'Artesano Verificado'}
                          {request.requestedLevel === 'master_artisan' && 'Maestro Artesano'}
                          {request.requestedLevel === 'certified_workshop' && 'Taller Certificado'}
                          {request.requestedLevel === 'basic_seller' && 'Vendedor Básico'}
                        </span>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        <span className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          {request.daysWaiting} días
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            request.priority === 'urgent'
                              ? 'bg-red-100 text-red-700'
                              : request.priority === 'high'
                                ? 'bg-orange-100 text-orange-700'
                                : request.priority === 'normal'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {request.priority === 'urgent' && 'Urgente'}
                          {request.priority === 'high' && 'Alta'}
                          {request.priority === 'normal' && 'Normal'}
                          {request.priority === 'low' && 'Baja'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={ROUTES.ADMIN_VERIFICACIONES}
                          className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                        >
                          Revisar
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
