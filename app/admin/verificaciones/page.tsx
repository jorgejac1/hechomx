'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Shield,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  User,
  Building2,
  Star,
  Award,
  FileText,
  MapPin,
  Calendar,
  Flag,
  Eye,
  Check,
  X,
  MessageSquare,
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { ROUTES } from '@/lib/constants/routes';
import verificationRequestsData from '@/lib/data/verification-requests.json';

type VerificationStatus = 'submitted' | 'under_review' | 'info_requested' | 'approved' | 'rejected';
type VerificationLevel =
  | 'basic_seller'
  | 'verified_artisan'
  | 'master_artisan'
  | 'certified_workshop';
type Priority = 'urgent' | 'high' | 'normal' | 'low';

interface VerificationRequest {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  sellerAvatar?: string;
  sellerType: 'individual' | 'hobby' | 'company';
  shopName: string;
  requestedLevel: VerificationLevel;
  status: VerificationStatus;
  priority: Priority;
  daysWaiting: number;
  flagged?: boolean;
  flagReason?: string;
  assignedTo?: string;
  requestedInfo?: string;
  documents: {
    governmentId?: { name: string; status: string };
    proofOfAddress?: { name: string; status: string };
    curp?: { name: string; status: string };
    rfc?: { name: string; status: string };
    businessRegistration?: { name: string; status: string };
    craftPhotos?: { name: string; status: string }[];
    workshopPhotos?: { name: string; status: string }[];
    processVideo?: { name: string; status: string };
    certifications?: { name: string; status: string }[];
    awards?: { name: string; status: string }[];
  };
  questionnaire: {
    craftType: string[];
    techniques: string[];
    yearsOfExperience: number;
    productionCapacity: string;
    location: {
      state: string;
      city: string;
      address?: string;
      hasPhysicalWorkshop: boolean;
    };
    heritageInfo?: string;
    culturalSignificance?: string;
    indigenousCommunity?: string;
    traditionalTechniques?: boolean;
    culturalOrganization?: string;
  };
  createdAt: string;
  submittedAt?: string;
  updatedAt: string;
}

const STATUS_CONFIG: Record<
  VerificationStatus,
  {
    label: string;
    color: string;
    bgColor: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  submitted: { label: 'Enviada', color: 'text-blue-700', bgColor: 'bg-blue-100', icon: Clock },
  under_review: {
    label: 'En Revisión',
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    icon: Eye,
  },
  info_requested: {
    label: 'Info Solicitada',
    color: 'text-amber-700',
    bgColor: 'bg-amber-100',
    icon: MessageSquare,
  },
  approved: {
    label: 'Aprobada',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    icon: CheckCircle2,
  },
  rejected: { label: 'Rechazada', color: 'text-red-700', bgColor: 'bg-red-100', icon: XCircle },
};

const LEVEL_CONFIG: Record<
  VerificationLevel,
  { label: string; color: string; icon: React.ComponentType<{ className?: string }> }
> = {
  basic_seller: { label: 'Vendedor Básico', color: 'text-gray-600', icon: User },
  verified_artisan: { label: 'Artesano Verificado', color: 'text-blue-600', icon: CheckCircle2 },
  master_artisan: { label: 'Maestro Artesano', color: 'text-purple-600', icon: Star },
  certified_workshop: { label: 'Taller Certificado', color: 'text-amber-600', icon: Award },
};

const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; bgColor: string }> = {
  urgent: { label: 'Urgente', color: 'text-red-700', bgColor: 'bg-red-100' },
  high: { label: 'Alta', color: 'text-orange-700', bgColor: 'bg-orange-100' },
  normal: { label: 'Normal', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  low: { label: 'Baja', color: 'text-gray-600', bgColor: 'bg-gray-100' },
};

export default function AdminVerificacionesPage() {
  const router = useRouter();
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const { showToast } = useToast();

  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<VerificationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<VerificationStatus | 'all'>('all');
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null);
  const [processingAction, setProcessingAction] = useState<string | null>(null);

  // Auth check
  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push(ROUTES.HOME);
    }
  }, [authLoading, isAdmin, router]);

  // Load requests
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setRequests(verificationRequestsData as VerificationRequest[]);
      setFilteredRequests(verificationRequestsData as VerificationRequest[]);
      setLoading(false);
    }, 500);
  }, []);

  // Filter requests
  useEffect(() => {
    let filtered = requests;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.sellerName.toLowerCase().includes(query) ||
          r.sellerEmail.toLowerCase().includes(query) ||
          r.shopName.toLowerCase().includes(query) ||
          r.id.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((r) => r.status === statusFilter);
    }

    // Sort by priority and days waiting
    filtered = [...filtered].sort((a, b) => {
      const priorityOrder = { urgent: 0, high: 1, normal: 2, low: 3 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return b.daysWaiting - a.daysWaiting;
    });

    setFilteredRequests(filtered);
  }, [requests, searchQuery, statusFilter]);

  const handleApprove = async (requestId: string) => {
    setProcessingAction(requestId);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'approved' as VerificationStatus } : r))
    );
    setExpandedRequest(null);
    setProcessingAction(null);
    showToast('Solicitud aprobada exitosamente', 'success');
  };

  const handleReject = async (requestId: string) => {
    setProcessingAction(requestId);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'rejected' as VerificationStatus } : r))
    );
    setExpandedRequest(null);
    setProcessingAction(null);
    showToast('Solicitud rechazada', 'success');
  };

  const handleRequestInfo = async (requestId: string) => {
    setProcessingAction(requestId);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId ? { ...r, status: 'info_requested' as VerificationStatus } : r
      )
    );
    setExpandedRequest(null);
    setProcessingAction(null);
    showToast('Se ha solicitado información adicional', 'success');
  };

  const handleStartReview = async (requestId: string) => {
    setProcessingAction(requestId);
    await new Promise((resolve) => setTimeout(resolve, 500));

    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? { ...r, status: 'under_review' as VerificationStatus, assignedTo: user?.email }
          : r
      )
    );
    setProcessingAction(null);
    showToast('Has tomado esta solicitud para revisión', 'success');
  };

  // Stats
  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === 'submitted').length,
    underReview: requests.filter((r) => r.status === 'under_review').length,
    infoRequested: requests.filter((r) => r.status === 'info_requested').length,
    approved: requests.filter((r) => r.status === 'approved').length,
    rejected: requests.filter((r) => r.status === 'rejected').length,
    urgent: requests.filter((r) => r.priority === 'urgent' || r.flagged).length,
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
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
            <Shield className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Panel de Verificación</h1>
          </div>
          <p className="text-gray-600">
            Revisa y gestiona las solicitudes de verificación de vendedores
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-xs p-4">
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-600">Total</p>
          </div>
          <div className="bg-white rounded-xl shadow-xs p-4 border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-600">{stats.pending}</p>
            <p className="text-sm text-gray-600">Pendientes</p>
          </div>
          <div className="bg-white rounded-xl shadow-xs p-4 border-l-4 border-purple-500">
            <p className="text-2xl font-bold text-purple-600">{stats.underReview}</p>
            <p className="text-sm text-gray-600">En Revisión</p>
          </div>
          <div className="bg-white rounded-xl shadow-xs p-4 border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-600">{stats.infoRequested}</p>
            <p className="text-sm text-gray-600">Info Pedida</p>
          </div>
          <div className="bg-white rounded-xl shadow-xs p-4 border-l-4 border-green-500">
            <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            <p className="text-sm text-gray-600">Aprobadas</p>
          </div>
          <div className="bg-white rounded-xl shadow-xs p-4 border-l-4 border-red-500">
            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            <p className="text-sm text-gray-600">Rechazadas</p>
          </div>
          <div className="bg-white rounded-xl shadow-xs p-4 border-l-4 border-orange-500">
            <p className="text-2xl font-bold text-orange-600">{stats.urgent}</p>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4 text-orange-500" />
              Urgentes
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-xs p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, email, tienda o ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as VerificationStatus | 'all')}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Todos los estados</option>
                <option value="submitted">Enviadas</option>
                <option value="under_review">En Revisión</option>
                <option value="info_requested">Info Solicitada</option>
                <option value="approved">Aprobadas</option>
                <option value="rejected">Rechazadas</option>
              </select>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="bg-white rounded-xl shadow-xs p-12 text-center">
              <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay solicitudes</h3>
              <p className="text-gray-600">
                No se encontraron solicitudes con los filtros seleccionados
              </p>
            </div>
          ) : (
            filteredRequests.map((request) => {
              const statusConfig = STATUS_CONFIG[request.status];
              const levelConfig = LEVEL_CONFIG[request.requestedLevel];
              const priorityConfig = PRIORITY_CONFIG[request.priority];
              const StatusIcon = statusConfig.icon;
              const LevelIcon = levelConfig.icon;
              const isExpanded = expandedRequest === request.id;
              const isProcessing = processingAction === request.id;

              return (
                <div
                  key={request.id}
                  className={`bg-white rounded-xl shadow-xs overflow-hidden transition-all ${
                    request.flagged ? 'ring-2 ring-red-300' : ''
                  } ${isExpanded ? 'ring-2 ring-primary-300' : ''}`}
                >
                  {/* Request Header */}
                  <div
                    className="p-6 cursor-pointer hover:bg-gray-50 transition"
                    onClick={() => setExpandedRequest(isExpanded ? null : request.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="relative">
                          <Image
                            src={request.sellerAvatar || 'https://i.pravatar.cc/150'}
                            alt={request.sellerName}
                            width={56}
                            height={56}
                            className="rounded-full"
                          />
                          {request.flagged && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                              <Flag className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-900">{request.sellerName}</h3>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${priorityConfig.bgColor} ${priorityConfig.color}`}
                            >
                              {priorityConfig.label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                            {request.sellerType === 'company' && (
                              <Building2 className="w-4 h-4 text-gray-400" />
                            )}
                            {request.shopName}
                          </p>
                          <p className="text-xs text-gray-500">{request.sellerEmail}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Requested Level */}
                        <div className="text-right hidden sm:block">
                          <div className={`flex items-center gap-1 ${levelConfig.color}`}>
                            <LevelIcon className="w-4 h-4" />
                            <span className="text-sm font-medium">{levelConfig.label}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {request.daysWaiting} día{request.daysWaiting !== 1 ? 's' : ''}{' '}
                            esperando
                          </p>
                        </div>

                        {/* Status */}
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${statusConfig.bgColor} ${statusConfig.color}`}
                        >
                          <StatusIcon className="w-4 h-4" />
                          {statusConfig.label}
                        </span>

                        {/* Expand Icon */}
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>

                    {/* Flag Reason */}
                    {request.flagged && request.flagReason && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700">
                          <Flag className="w-4 h-4 inline mr-1" />
                          {request.flagReason}
                        </p>
                      </div>
                    )}

                    {/* Requested Info Note */}
                    {request.status === 'info_requested' && request.requestedInfo && (
                      <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-sm text-amber-700">
                          <MessageSquare className="w-4 h-4 inline mr-1" />
                          {request.requestedInfo}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Left Column - Documents */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Documentos Enviados
                          </h4>
                          <div className="space-y-2">
                            {request.documents.governmentId && (
                              <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span>Identificación oficial</span>
                              </div>
                            )}
                            {request.documents.proofOfAddress && (
                              <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span>Comprobante de domicilio</span>
                              </div>
                            )}
                            {request.documents.curp && (
                              <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span>CURP</span>
                              </div>
                            )}
                            {request.documents.rfc && (
                              <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span>RFC</span>
                              </div>
                            )}
                            {request.documents.businessRegistration && (
                              <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span>Acta constitutiva</span>
                              </div>
                            )}
                            {request.documents.craftPhotos &&
                              request.documents.craftPhotos.length > 0 && (
                                <div className="flex items-center gap-2 text-sm">
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                  <span>
                                    Fotos de artesanías ({request.documents.craftPhotos.length})
                                  </span>
                                </div>
                              )}
                            {request.documents.workshopPhotos &&
                              request.documents.workshopPhotos.length > 0 && (
                                <div className="flex items-center gap-2 text-sm">
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                  <span>
                                    Fotos del taller ({request.documents.workshopPhotos.length})
                                  </span>
                                </div>
                              )}
                            {request.documents.processVideo && (
                              <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span>Video del proceso</span>
                              </div>
                            )}
                            {request.documents.certifications &&
                              request.documents.certifications.length > 0 && (
                                <div className="flex items-center gap-2 text-sm">
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                  <span>
                                    Certificaciones ({request.documents.certifications.length})
                                  </span>
                                </div>
                              )}
                            {request.documents.awards && request.documents.awards.length > 0 && (
                              <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span>Premios ({request.documents.awards.length})</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right Column - Questionnaire */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Información del Artesano
                          </h4>
                          <div className="space-y-3 text-sm">
                            <div>
                              <span className="text-gray-500">Tipo de artesanía:</span>
                              <p className="font-medium">
                                {request.questionnaire.craftType.join(', ')}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Técnicas:</span>
                              <p className="font-medium">
                                {request.questionnaire.techniques.join(', ')}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Años de experiencia:</span>
                              <p className="font-medium">
                                {request.questionnaire.yearsOfExperience} años
                              </p>
                            </div>
                            <div className="flex items-start gap-1">
                              <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                              <div>
                                <p className="font-medium">
                                  {request.questionnaire.location.city},{' '}
                                  {request.questionnaire.location.state}
                                </p>
                                {request.questionnaire.location.hasPhysicalWorkshop && (
                                  <p className="text-xs text-green-600">✓ Tiene taller físico</p>
                                )}
                              </div>
                            </div>
                            {request.questionnaire.heritageInfo && (
                              <div>
                                <span className="text-gray-500">Historia/Herencia:</span>
                                <p className="font-medium">{request.questionnaire.heritageInfo}</p>
                              </div>
                            )}
                            {request.questionnaire.indigenousCommunity && (
                              <div>
                                <span className="text-gray-500">Comunidad indígena:</span>
                                <p className="font-medium">
                                  {request.questionnaire.indigenousCommunity}
                                </p>
                              </div>
                            )}
                            {request.submittedAt && (
                              <div className="flex items-center gap-1 text-gray-500 pt-2 border-t border-gray-200">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  Enviada:{' '}
                                  {new Date(request.submittedAt).toLocaleDateString('es-MX', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                  })}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      {(request.status === 'submitted' ||
                        request.status === 'under_review' ||
                        request.status === 'info_requested') && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <div className="flex flex-wrap gap-3">
                            {request.status === 'submitted' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStartReview(request.id);
                                }}
                                disabled={isProcessing}
                                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium disabled:opacity-50"
                              >
                                {isProcessing ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                                Tomar para Revisión
                              </button>
                            )}

                            {(request.status === 'under_review' ||
                              request.status === 'info_requested') && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleApprove(request.id);
                                  }}
                                  disabled={isProcessing}
                                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50"
                                >
                                  {isProcessing ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Check className="w-4 h-4" />
                                  )}
                                  Aprobar
                                </button>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRequestInfo(request.id);
                                  }}
                                  disabled={isProcessing}
                                  className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition font-medium disabled:opacity-50"
                                >
                                  {isProcessing ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <MessageSquare className="w-4 h-4" />
                                  )}
                                  Solicitar Info
                                </button>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleReject(request.id);
                                  }}
                                  disabled={isProcessing}
                                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium disabled:opacity-50"
                                >
                                  {isProcessing ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <X className="w-4 h-4" />
                                  )}
                                  Rechazar
                                </button>
                              </>
                            )}
                          </div>

                          {request.assignedTo && (
                            <p className="text-xs text-gray-500 mt-3">
                              Asignado a: {request.assignedTo}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Completed Status */}
                      {(request.status === 'approved' || request.status === 'rejected') && (
                        <div
                          className={`mt-6 pt-6 border-t border-gray-200 text-center ${
                            request.status === 'approved' ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {request.status === 'approved' ? (
                            <p className="font-medium">✅ Esta solicitud fue aprobada</p>
                          ) : (
                            <p className="font-medium">❌ Esta solicitud fue rechazada</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
