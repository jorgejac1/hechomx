'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AuthPageWrapper from '@/components/auth/AuthPageWrapper';
import { ROUTES } from '@/lib';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import type { User } from '@/contexts/AuthContext';
import {
  Store,
  MapPin,
  Clock,
  CreditCard,
  Building2,
  FileText,
  CheckCircle2,
  AlertCircle,
  Edit2,
  Save,
  X,
  Landmark,
  Shield,
  TrendingUp,
  DollarSign,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { formatCurrency } from '@/lib';
import Alert from '@/components/common/Alert';

interface FinancialData {
  accountType: string;
  bankName: string;
  accountNumber: string;
  clabe: string;
  beneficiaryName: string;
  rfc: string;
}

export default function SellerProfilePage() {
  return (
    <AuthPageWrapper requireSeller loadingText="Cargando perfil de vendedor...">
      {(user) => <SellerProfileContent user={user} />}
    </AuthPageWrapper>
  );
}

function SellerProfileContent({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<'business' | 'financial' | 'policies'>(
    'business'
  );

  // Mock financial data (would come from backend)
  const [financialData, setFinancialData] = useState<FinancialData>({
    accountType: 'bank',
    bankName: 'BBVA México',
    accountNumber: '****1234',
    clabe: '012180001234567890',
    beneficiaryName: 'Sofia Ramírez García',
    rfc: 'RAGS850615HM3',
  });

  // Edit form state
  const [editForm, setEditForm] = useState<FinancialData>(financialData);

  const { makerProfile } = user;

  const handleEditStart = () => {
    setEditForm(financialData);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setEditForm(financialData);
    setIsEditing(false);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setFinancialData(editForm);
      setIsSaving(false);
      setIsEditing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href={ROUTES.PROFILE}
            className="text-primary-600 hover:text-primary-700 mb-4 flex items-center gap-2"
          >
            ← Volver al Perfil
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Perfil de Vendedor</h1>
          <p className="text-gray-600 mt-1">Administra tu negocio y cuenta financiera</p>
        </div>

        {/* Shop Header Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                width={80}
                height={80}
                className="rounded-full border-4 border-primary-100"
              />
            ) : (
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center border-4 border-primary-200">
                <Store className="w-10 h-10 text-primary-600" />
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{makerProfile!.shopName}</h2>
              <p className="text-gray-600">{makerProfile!.location}</p>
              <div className="flex items-center gap-2 mt-2">
                {makerProfile!.verified && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verificado
                  </span>
                )}
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full capitalize">
                  {makerProfile!.sellerType === 'individual' && 'Individual'}
                  {makerProfile!.sellerType === 'artisan' && 'Artesano'}
                  {makerProfile!.sellerType === 'company' && 'Empresa'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Ventas Totales</p>
                <p className="text-2xl font-bold text-gray-900">{makerProfile!.stats.salesCount}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Calificación</p>
                <p className="text-2xl font-bold text-gray-900">
                  {makerProfile!.stats.rating.toFixed(1)}
                </p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Productos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {makerProfile!.stats.productsCount}
                </p>
              </div>
              <Store className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Mi Historia Artesanal Card */}
          <Link
            href={ROUTES.MY_STORY}
            className="bg-linear-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg p-6 text-left hover:shadow-xl hover:scale-[1.02] transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-xs">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <svg
                className="w-6 h-6 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Mi Historia Artesanal</h3>
            <p className="text-purple-100 text-sm leading-relaxed">
              Comparte tu herencia, proceso creativo y conecta emocionalmente con tus clientes
              mostrando la autenticidad detrás de tus creaciones
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-white/90">
              <BookOpen className="w-4 h-4" />
              <span>Historias, fotos, técnicas tradicionales</span>
            </div>
          </Link>

          {/* Pricing Calculator Card */}
          <Link
            href={ROUTES.PRICING_CALCULATOR}
            className="bg-linear-to-br from-blue-600 to-cyan-600 rounded-xl shadow-lg p-6 text-left hover:shadow-xl hover:scale-[1.02] transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-xs">
                <svg
                  className="w-8 h-8 text-white"
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
              </div>
              <svg
                className="w-6 h-6 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Calculadora de Precios Justos</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Calcula precios justos considerando materiales, tiempo de trabajo y salario digno
              recomendado para tu región
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-white/90">
              <DollarSign className="w-4 h-4" />
              <span>Materiales, mano de obra, márgenes</span>
            </div>
          </Link>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              <button
                onClick={() => setActiveSection('business')}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition ${
                  activeSection === 'business'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Información del Negocio
              </button>
              <button
                onClick={() => setActiveSection('financial')}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition ${
                  activeSection === 'financial'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Información Financiera
              </button>
              <button
                onClick={() => setActiveSection('policies')}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition ${
                  activeSection === 'policies'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Políticas y Configuración
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Business Information */}
            {activeSection === 'business' && (
              <div className="space-y-6">
                {/* Shop Details */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Detalles de la Tienda</h3>
                  <div className="space-y-4">
                    {/* Business Type */}
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <Building2 className="w-6 h-6 text-gray-600 mt-1" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-700">Tipo de Negocio</p>
                        <p className="text-gray-900 capitalize">
                          {makerProfile!.sellerType === 'individual' && 'Vendedor Individual'}
                          {makerProfile!.sellerType === 'artisan' && 'Artesano Certificado'}
                          {makerProfile!.sellerType === 'company' && 'Empresa'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <Store className="w-6 h-6 text-gray-600 mt-1" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-700">Nombre de la Tienda</p>
                        <p className="text-gray-900">{makerProfile!.shopName}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <MapPin className="w-6 h-6 text-gray-600 mt-1" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-700">Ubicación</p>
                        <p className="text-gray-900">{makerProfile!.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <FileText className="w-6 h-6 text-gray-600 mt-1" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-700">Descripción</p>
                        <p className="text-gray-900">{makerProfile!.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                {makerProfile!.businessHours && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <h3 className="text-lg font-bold text-gray-900">Horario de Atención</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {makerProfile!.businessHours.map((day) => (
                        <div
                          key={day.day}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="font-medium text-gray-900">{day.day}</span>
                          {day.closed ? (
                            <span className="text-red-600 text-sm">Cerrado</span>
                          ) : (
                            <span className="text-gray-700 text-sm">
                              {day.open} - {day.close}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {makerProfile!.certifications.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Certificaciones</h3>
                    <div className="flex flex-wrap gap-2">
                      {makerProfile!.certifications.map((cert, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-2 bg-green-50 text-green-800 rounded-full text-sm font-medium flex items-center gap-1"
                        >
                          <Shield className="w-4 h-4" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specialties */}
                {makerProfile!.specialties.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Especialidades</h3>
                    <div className="flex flex-wrap gap-2">
                      {makerProfile!.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-2 bg-blue-50 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Financial Information */}
            {activeSection === 'financial' && (
              <div className="space-y-6">
                <Alert
                  variant="info"
                  layout="bordered"
                  icon={AlertCircle}
                  title="Información Segura"
                >
                  Tus datos financieros están encriptados y protegidos. Nunca compartiremos esta
                  información.
                </Alert>

                {/* Bank Account */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Cuenta Bancaria</h3>
                    {!isEditing ? (
                      <button
                        onClick={handleEditStart}
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
                      >
                        <Edit2 className="w-4 h-4" />
                        Editar
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={handleEditCancel}
                          className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                        >
                          <X className="w-4 h-4" />
                          Cancelar
                        </button>
                        <button
                          onClick={handleEditSave}
                          disabled={isSaving}
                          className="flex items-center gap-2 px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium disabled:opacity-50"
                        >
                          {isSaving ? (
                            <>
                              <LoadingSpinner size="sm" color="white" />
                              Guardando...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              Guardar
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Landmark className="w-6 h-6 text-gray-600" />
                        <p className="font-semibold text-gray-900">{financialData.bankName}</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Cuenta</p>
                          <p className="text-gray-900 font-medium">{financialData.accountNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">CLABE</p>
                          <p className="text-gray-900 font-medium">{financialData.clabe}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Beneficiario</p>
                          <p className="text-gray-900 font-medium">
                            {financialData.beneficiaryName}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">RFC</p>
                          <p className="text-gray-900 font-medium">{financialData.rfc}</p>
                        </div>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="space-y-4 border-t border-gray-200 pt-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Banco
                          </label>
                          <select
                            name="bankName"
                            value={editForm.bankName}
                            onChange={handleEditChange}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          >
                            <option>BBVA México</option>
                            <option>Santander</option>
                            <option>Banorte</option>
                            <option>HSBC</option>
                            <option>Scotiabank</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Número de Cuenta
                          </label>
                          <input
                            type="text"
                            name="accountNumber"
                            value={editForm.accountNumber}
                            onChange={handleEditChange}
                            placeholder="10 dígitos"
                            maxLength={10}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-2">
                            CLABE Interbancaria
                          </label>
                          <input
                            type="text"
                            name="clabe"
                            value={editForm.clabe}
                            onChange={handleEditChange}
                            placeholder="18 dígitos"
                            maxLength={18}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Nombre del Beneficiario
                          </label>
                          <input
                            type="text"
                            name="beneficiaryName"
                            value={editForm.beneficiaryName}
                            onChange={handleEditChange}
                            placeholder="Nombre completo"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tax Information */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Información Fiscal</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-semibold text-gray-700">RFC</p>
                        <p className="text-gray-900">{financialData.rfc}</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Régimen Fiscal</p>
                        <p className="text-gray-900">Persona Física con Actividad Empresarial</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Policies */}
            {activeSection === 'policies' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Política de Devoluciones</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-900">{makerProfile!.returnPolicy}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Política de Cancelaciones
                  </h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-900">{makerProfile!.cancellationPolicy}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Opciones de Envío</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-900">Envío Nacional</span>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-900">Envío Internacional</span>
                      {makerProfile!.shippingOptions.international ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <X className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    {makerProfile!.shippingOptions.freeShippingOver && (
                      <Alert variant="success" layout="bordered">
                        <strong>Envío gratis</strong> en compras mayores a{' '}
                        {formatCurrency(makerProfile!.shippingOptions.freeShippingOver)}
                      </Alert>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Métodos de Pago Aceptados
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {makerProfile!.paymentMethods.map((method, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg text-sm font-medium flex items-center gap-2"
                      >
                        <CreditCard className="w-4 h-4" />
                        {method === 'card' && 'Tarjeta'}
                        {method === 'cash' && 'Efectivo'}
                        {method === 'transfer' && 'Transferencia'}
                        {method === 'oxxo' && 'OXXO'}
                        {method === 'paypal' && 'PayPal'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
