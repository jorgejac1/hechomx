'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthPageWrapper from '@/components/auth/AuthPageWrapper';
import { getSellerTasks } from '@/lib/api/sellerApi';
import type { SellerTask } from '@/lib/types';
import type { User } from '@/contexts/AuthContext';
import { formatRelativeTime, formatCurrency, ROUTES } from '@/lib';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  AlertCircle,
  Package,
  MessageSquare,
  Star,
  TrendingDown,
  TrendingUp,
  Filter,
  Search,
  ArrowLeft,
  ChevronRight,
  Calendar,
  Zap,
  User as UserIcon,
} from 'lucide-react';

const TASK_TYPE_CONFIG = {
  order: {
    label: 'Pedido',
    icon: Package,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  message: {
    label: 'Mensaje',
    icon: MessageSquare,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
  },
  review: {
    label: 'Reseña',
    icon: Star,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  inventory: {
    label: 'Inventario',
    icon: TrendingDown,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
  promotion: {
    label: 'Promoción',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
};

const PRIORITY_CONFIG = {
  critical: {
    label: 'Crítico',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-300',
    icon: AlertCircle,
  },
  high: {
    label: 'Alto',
    color: 'text-orange-700',
    bgColor: 'bg-orange-100',
    borderColor: 'border-orange-300',
    icon: AlertTriangle,
  },
  medium: {
    label: 'Medio',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-300',
    icon: Clock,
  },
  low: {
    label: 'Bajo',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-300',
    icon: CheckCircle2,
  },
};

export default function TasksCenterPage() {
  return (
    <AuthPageWrapper requireSeller loadingText="Cargando tareas...">
      {(user) => <TasksCenterContent user={user} />}
    </AuthPageWrapper>
  );
}

function TasksCenterContent({ user }: { user: User }) {
  const [tasks, setTasks] = useState<SellerTask[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<SellerTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadTasks() {
      setIsLoading(true);
      const data = await getSellerTasks(user.email);
      // Only show pending tasks
      const pendingTasks = data.filter((task) => task.status === 'pending');
      setTasks(pendingTasks);
      setFilteredTasks(pendingTasks);
      setIsLoading(false);
    }
    loadTasks();
  }, [user.email]);

  // Filter tasks
  useEffect(() => {
    let filtered = tasks;

    if (filterPriority !== 'all') {
      filtered = filtered.filter((task) => task.priority === filterPriority);
    }

    if (filterType !== 'all') {
      filtered = filtered.filter((task) => task.type === filterType);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by priority
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    setFilteredTasks(filtered);
  }, [filterPriority, filterType, searchQuery, tasks]);

  if (isLoading) {
    return <LoadingSpinner size="lg" fullScreen text="Cargando tareas..." />;
  }

  const criticalCount = tasks.filter((t) => t.priority === 'critical').length;
  const highCount = tasks.filter((t) => t.priority === 'high').length;
  const urgentCount = criticalCount + highCount;

  const tasksByType = {
    order: tasks.filter((t) => t.type === 'order').length,
    message: tasks.filter((t) => t.type === 'message').length,
    review: tasks.filter((t) => t.type === 'review').length,
    inventory: tasks.filter((t) => t.type === 'inventory').length,
    promotion: tasks.filter((t) => t.type === 'promotion').length,
  };

  const handleCompleteTask = (taskId: string) => {
    console.log('Completing task:', taskId);
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <Link
            href={ROUTES.DASHBOARD}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Centro de Tareas</h1>
              <p className="text-gray-600 mt-1">
                {tasks.length} {tasks.length === 1 ? 'tarea pendiente' : 'tareas pendientes'}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 border-l-4 border-primary-600">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Total Tareas</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{tasks.length}</p>
              </div>
              <Zap className="w-10 h-10 text-primary-600 shrink-0" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 border-l-4 border-red-600">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Críticas</p>
                <p className="text-2xl sm:text-3xl font-bold text-red-600">{criticalCount}</p>
              </div>
              <AlertCircle className="w-10 h-10 text-red-600 shrink-0" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 border-l-4 border-orange-600">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Alta Prioridad</p>
                <p className="text-2xl sm:text-3xl font-bold text-orange-600">{highCount}</p>
              </div>
              <AlertTriangle className="w-10 h-10 text-orange-600 shrink-0" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 border-l-4 border-yellow-600">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Urgentes</p>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-600">{urgentCount}</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-600 shrink-0" />
            </div>
          </div>
        </div>

        {/* Task Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {Object.entries(tasksByType).map(([type, count]) => {
            const config = TASK_TYPE_CONFIG[type as keyof typeof TASK_TYPE_CONFIG];
            const Icon = config.icon;
            return (
              <button
                key={type}
                onClick={() => setFilterType(type === filterType ? 'all' : type)}
                className={`p-4 rounded-xl border-2 transition text-center ${
                  filterType === type
                    ? `${config.bgColor} ${config.borderColor}`
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className={`w-6 h-6 ${config.color} mx-auto mb-2`} />
                <p className="text-xs font-semibold text-gray-600 mb-1">{config.label}</p>
                <p className="text-lg font-bold text-gray-900">{count}</p>
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
            {/* Search */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar tareas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Priority Filter */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Filter className="w-3 h-3 text-gray-600" />
                <label className="text-xs font-semibold text-gray-700">Prioridad</label>
              </div>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Todas las prioridades</option>
                <option value="critical">Crítico</option>
                <option value="high">Alto</option>
                <option value="medium">Medio</option>
                <option value="low">Bajo</option>
              </select>
            </div>

            {/* Type Filter (visible on mobile) */}
            <div className="lg:hidden">
              <div className="flex items-center gap-2 mb-1">
                <Filter className="w-3 h-3 text-gray-600" />
                <label className="text-xs font-semibold text-gray-700">Tipo</label>
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Todos los tipos</option>
                <option value="order">Pedidos</option>
                <option value="message">Mensajes</option>
                <option value="review">Reseñas</option>
                <option value="inventory">Inventario</option>
                <option value="promotion">Promociones</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {tasks.length === 0 ? '¡Todo al día!' : 'No se encontraron tareas'}
            </h3>
            <p className="text-gray-600">
              {tasks.length === 0
                ? 'No tienes tareas pendientes en este momento'
                : 'Intenta con otros filtros'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => {
              const typeConfig = TASK_TYPE_CONFIG[task.type];
              const priorityConfig = PRIORITY_CONFIG[task.priority];
              const TypeIcon = typeConfig.icon;
              const PriorityIcon = priorityConfig.icon;

              return (
                <div
                  key={task.id}
                  className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border-l-4 ${
                    task.priority === 'critical'
                      ? 'border-red-500'
                      : task.priority === 'high'
                        ? 'border-orange-500'
                        : task.priority === 'medium'
                          ? 'border-yellow-500'
                          : 'border-green-500'
                  }`}
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        {/* Header */}
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`p-2 ${typeConfig.bgColor} rounded-lg`}>
                            <TypeIcon className={`w-5 h-5 ${typeConfig.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <h3 className="font-bold text-gray-900">{task.title}</h3>
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${priorityConfig.bgColor} ${priorityConfig.color} ${priorityConfig.borderColor}`}
                              >
                                <PriorityIcon className="w-3 h-3" />
                                {priorityConfig.label}
                              </span>
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${typeConfig.bgColor} ${typeConfig.color}`}
                              >
                                {typeConfig.label}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{task.description}</p>

                            {/* Related Data */}
                            {task.relatedData && (
                              <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-2">
                                {task.relatedData.customerName && (
                                  <span className="flex items-center gap-1">
                                    <UserIcon className="w-3 h-3" />
                                    {task.relatedData.customerName}
                                  </span>
                                )}
                                {task.relatedData.orderNumber && (
                                  <span className="flex items-center gap-1">
                                    <Package className="w-3 h-3" />
                                    {task.relatedData.orderNumber}
                                  </span>
                                )}
                                {task.relatedData.amount && (
                                  <span className="font-semibold text-primary-600">
                                    {formatCurrency(task.relatedData.amount)}
                                  </span>
                                )}
                                {task.relatedData.rating && (
                                  <span className="flex items-center gap-1">
                                    <Star className="w-3 h-3" />
                                    {task.relatedData.rating} estrellas
                                  </span>
                                )}
                                {task.relatedData.productName && (
                                  <span className="flex items-center gap-1">
                                    <Package className="w-3 h-3" />
                                    {task.relatedData.productName}
                                  </span>
                                )}
                                {task.relatedData.currentStock !== undefined && (
                                  <span>
                                    Stock: {task.relatedData.currentStock}/
                                    {task.relatedData.recommendedStock}
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Metadata */}
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatRelativeTime(task.createdAt)}
                              </span>
                              {task.dueDate && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Vence: {formatRelativeTime(task.dueDate)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex sm:flex-col gap-2">
                        <Link
                          href={task.actionUrl}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm whitespace-nowrap"
                        >
                          Ir a Tarea
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleCompleteTask(task.id)}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition font-medium text-sm whitespace-nowrap"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Completar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
