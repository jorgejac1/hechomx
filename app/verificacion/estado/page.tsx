'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthPageWrapper from '@/components/auth/AuthPageWrapper';
import { STATUS_MESSAGES, VERIFICATION_LEVELS } from '@/lib/constants/verification';
import type { VerificationRequest } from '@/lib/types/verification';
import type { User } from '@/contexts/AuthContext';
import { Clock, CheckCircle, XCircle, AlertCircle, FileText } from 'lucide-react';

export default function VerificationStatusPage() {
  return (
    <AuthPageWrapper requireSeller>
      {(user) => <VerificationStatusContent user={user} />}
    </AuthPageWrapper>
  );
}

function VerificationStatusContent({ user }: { user: User }) {
  const [request, setRequest] = useState<VerificationRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      try {
        const response = await fetch(`/api/seller/verification?email=${user.email}`);
        const data = await response.json();
        setRequest(data.request);
      } catch (error) {
        console.error('Error fetching verification status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVerificationStatus();
  }, [user.email]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xs p-8 text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No tienes solicitudes de verificación
            </h2>
            <p className="text-gray-600 mb-6">
              Comienza tu proceso de verificación para aumentar la confianza de los compradores
            </p>
            <Link
              href="/verificacion/solicitar"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Solicitar Verificación
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const statusInfo = STATUS_MESSAGES[request.status];
  const levelInfo = VERIFICATION_LEVELS[request.requestedLevel];

  const StatusIcon = {
    draft: Clock,
    submitted: Clock,
    under_review: FileText,
    info_requested: AlertCircle,
    approved: CheckCircle,
    rejected: XCircle,
    expired: XCircle,
  }[request.status];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-xs p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Estado de Verificación</h1>
          <p className="text-gray-600">Seguimiento de tu solicitud de verificación</p>
        </div>

        {/* Status Card */}
        <div className={`rounded-lg shadow-xs p-6 mb-6 ${statusInfo.bgColor}`}>
          <div className="flex items-start gap-4">
            <StatusIcon className={`w-8 h-8 ${statusInfo.color} shrink-0 mt-1`} />
            <div className="flex-1">
              <h2 className={`text-2xl font-bold mb-2 ${statusInfo.color}`}>{statusInfo.title}</h2>
              <p className="text-gray-700 mb-4">{statusInfo.description}</p>

              {request.status === 'submitted' && (
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    <strong>Tiempo estimado de revisión:</strong> {levelInfo.estimatedTime}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Te notificaremos por correo cuando tu solicitud sea revisada
                  </p>
                </div>
              )}

              {request.status === 'info_requested' && request.requestedInfo && (
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    Información adicional requerida:
                  </p>
                  <p className="text-sm text-gray-700 whitespace-pre-line">
                    {request.requestedInfo}
                  </p>
                  <Link
                    href="/verificacion/solicitar"
                    className="inline-block mt-4 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Subir Documentos
                  </Link>
                </div>
              )}

              {request.status === 'approved' && (
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{levelInfo.badge.icon}</span>
                    <div>
                      <p className="font-bold text-gray-900">{levelInfo.nameEs}</p>
                      <p className="text-sm text-gray-600">Comisión: {levelInfo.commissionRate}%</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{request.reviewNotes}</p>
                  <Link
                    href="/dashboard"
                    className="inline-block bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Ir al Dashboard
                  </Link>
                </div>
              )}

              {request.status === 'rejected' && request.rejectionReason && (
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Motivo del rechazo:</p>
                  <p className="text-sm text-gray-700 mb-4">{request.rejectionReason}</p>
                  <Link
                    href="/verificacion/solicitar"
                    className="inline-block bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Volver a Aplicar
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Request Details */}
        <div className="bg-white rounded-lg shadow-xs p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Detalles de la Solicitud</h3>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-600">ID de Solicitud</dt>
              <dd className="text-sm text-gray-900 font-mono">{request.id}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-600">Nivel Solicitado</dt>
              <dd className="text-sm text-gray-900">{levelInfo.nameEs}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-600">Tipo de Vendedor</dt>
              <dd className="text-sm text-gray-900 capitalize">{request.sellerType}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-600">Fecha de Envío</dt>
              <dd className="text-sm text-gray-900">
                {request.submittedAt
                  ? new Date(request.submittedAt).toLocaleDateString('es-MX')
                  : 'No enviada'}
              </dd>
            </div>

            {request.reviewedAt && (
              <>
                <div>
                  <dt className="text-sm font-medium text-gray-600">Fecha de Revisión</dt>
                  <dd className="text-sm text-gray-900">
                    {new Date(request.reviewedAt).toLocaleDateString('es-MX')}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-600">Revisado por</dt>
                  <dd className="text-sm text-gray-900">{request.reviewedByName || 'Admin'}</dd>
                </div>
              </>
            )}
          </dl>
        </div>

        {/* Questionnaire Info */}
        <div className="bg-white rounded-lg shadow-xs p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Tu Información</h3>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-600">Tipo de Artesanía</dt>
              <dd className="text-sm text-gray-900">
                {request.questionnaire.craftType.join(', ')}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-600">Técnicas</dt>
              <dd className="text-sm text-gray-900">
                {request.questionnaire.techniques.join(', ')}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-600">Años de Experiencia</dt>
              <dd className="text-sm text-gray-900">
                {request.questionnaire.yearsOfExperience} años
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-600">Capacidad de Producción</dt>
              <dd className="text-sm text-gray-900 capitalize">
                {request.questionnaire.productionCapacity}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-600">Ubicación</dt>
              <dd className="text-sm text-gray-900">
                {request.questionnaire.location.city}, {request.questionnaire.location.state}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-600">Taller Físico</dt>
              <dd className="text-sm text-gray-900">
                {request.questionnaire.location.hasPhysicalWorkshop ? 'Sí' : 'No'}
              </dd>
            </div>
          </dl>

          {request.questionnaire.heritageInfo && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <dt className="text-sm font-medium text-gray-600 mb-2">Información sobre Herencia</dt>
              <dd className="text-sm text-gray-900">{request.questionnaire.heritageInfo}</dd>
            </div>
          )}

          {request.questionnaire.culturalSignificance && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <dt className="text-sm font-medium text-gray-600 mb-2">Significado Cultural</dt>
              <dd className="text-sm text-gray-900">
                {request.questionnaire.culturalSignificance}
              </dd>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
