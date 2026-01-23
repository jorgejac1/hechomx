import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  CreditCard,
  Shield,
  Lock,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Building,
  Receipt,
} from 'lucide-react';
import { ROUTES } from '@/lib';
import Alert from '@/components/common/Alert';

export const metadata: Metadata = {
  title: 'Métodos de Pago | Papalote Market',
  description: 'Conoce nuestros métodos de pago seguros y confiables',
};

export default function PaymentInfoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href={ROUTES.HOME}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al inicio
        </Link>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary-100 rounded-lg">
              <CreditCard className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Métodos de Pago</h1>
              <p className="text-gray-600 mt-1">Paga de forma segura y conveniente</p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <Alert
          variant="success"
          layout="bordered"
          icon={Shield}
          title="Tus Pagos son 100% Seguros"
          className="mb-6"
        >
          Utilizamos encriptación SSL de nivel bancario y trabajamos con procesadores de pago
          certificados PCI-DSS. Nunca almacenamos información completa de tarjetas de crédito.
        </Alert>

        {/* Payment Methods */}
        <div className="space-y-6">
          {/* Tarjetas */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Tarjetas de Crédito y Débito</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                Aceptamos las principales tarjetas bancarias mexicanas e internacionales:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <CreditCard className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="font-semibold text-gray-900">Visa</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <CreditCard className="w-8 h-8 text-orange-600" />
                  </div>
                  <p className="font-semibold text-gray-900">Mastercard</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <CreditCard className="w-8 h-8 text-blue-800" />
                  </div>
                  <p className="font-semibold text-gray-900">American Express</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <CreditCard className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="font-semibold text-gray-900">Carnet</p>
                </div>
              </div>

              <Alert variant="info" layout="sidebar" title="Pagos a meses sin intereses">
                Compras mayores a $1,000 MXN pueden pagarse a 3, 6, 9 o 12 meses sin intereses con
                tarjetas participantes.
              </Alert>

              <ul className="space-y-2 text-gray-700 text-sm ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Procesamiento instantáneo</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Sin cargos adicionales</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Protección contra fraude</span>
                </li>
              </ul>
            </div>
          </section>

          {/* PayPal */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Smartphone className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">PayPal</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                Paga de forma rápida y segura con tu cuenta de PayPal. No necesitas compartir tu
                información bancaria.
              </p>

              <ul className="space-y-2 text-gray-700 text-sm ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Sin necesidad de ingresar datos bancarios</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Protección al comprador de PayPal</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Confirmación inmediata del pago</span>
                </li>
              </ul>
            </div>
          </section>

          {/* OXXO Pay */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">OXXO Pay</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                ¿Prefieres pagar en efectivo? Genera un código de pago y completa tu compra en
                cualquier tienda OXXO.
              </p>

              <Alert variant="warning" layout="sidebar" title="Cómo pagar en OXXO:">
                <ol className="space-y-1 ml-4 list-decimal">
                  <li>Selecciona OXXO Pay al finalizar tu compra</li>
                  <li>Recibe tu código de pago por email</li>
                  <li>Acude a cualquier tienda OXXO</li>
                  <li>Proporciona el código en caja</li>
                  <li>Paga en efectivo (máximo $10,000 MXN)</li>
                </ol>
              </Alert>

              <p className="text-sm text-gray-600">
                <AlertCircle className="w-4 h-4 inline mr-2" />
                Tu pedido se procesará una vez que confirmemos tu pago (generalmente en 24 horas).
              </p>
            </div>
          </section>

          {/* Transferencia Bancaria */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Transferencia Bancaria</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                Realiza una transferencia directa desde tu banca en línea o app bancaria.
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-3">Datos bancarios:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Beneficiario:</span>
                    <span className="font-semibold text-gray-900">
                      Papalote Market S.A. de C.V.
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Banco:</span>
                    <span className="font-semibold text-gray-900">BBVA México</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cuenta:</span>
                    <span className="font-semibold text-gray-900">0123456789</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">CLABE:</span>
                    <span className="font-semibold text-gray-900">012345678901234567</span>
                  </div>
                </div>
              </div>

              <Alert variant="info" layout="sidebar">
                <strong>Importante:</strong> Envía tu comprobante de pago a{' '}
                <a href="mailto:pagos@@papalotemarket.com" className="underline">
                  pagos@@papalotemarket.com
                </a>{' '}
                con tu número de pedido para confirmar tu compra.
              </Alert>
            </div>
          </section>

          {/* Facturación */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Receipt className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Facturación</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                ¿Necesitas factura? Puedes solicitarla fácilmente desde tu cuenta o al momento de
                realizar tu compra.
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-3">Requisitos para facturar:</h4>
                <ul className="space-y-2 text-sm ml-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span>RFC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span>Razón Social</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span>Código Postal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span>Uso de CFDI</span>
                  </li>
                </ul>
              </div>

              <p className="text-sm text-gray-600">
                Las facturas se envían por correo electrónico en formato XML y PDF dentro de las 24
                horas siguientes a tu solicitud.
              </p>
            </div>
          </section>

          {/* Seguridad */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Seguridad en los Pagos</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                La seguridad de tus datos es nuestra prioridad. Implementamos múltiples capas de
                protección:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <Shield className="w-8 h-8 text-green-600 mb-2" />
                  <h4 className="font-bold text-gray-900 mb-2">Certificación SSL</h4>
                  <p className="text-sm text-gray-600">
                    Todos los datos se transmiten encriptados mediante certificados SSL de 256 bits
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <Lock className="w-8 h-8 text-blue-600 mb-2" />
                  <h4 className="font-bold text-gray-900 mb-2">PCI-DSS Compliant</h4>
                  <p className="text-sm text-gray-600">
                    Cumplimos con los estándares de seguridad de la industria de tarjetas de pago
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <Shield className="w-8 h-8 text-purple-600 mb-2" />
                  <h4 className="font-bold text-gray-900 mb-2">Verificación 3D Secure</h4>
                  <p className="text-sm text-gray-600">
                    Capa adicional de autenticación para transacciones con tarjeta
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <AlertCircle className="w-8 h-8 text-orange-600 mb-2" />
                  <h4 className="font-bold text-gray-900 mb-2">Detección de Fraude</h4>
                  <p className="text-sm text-gray-600">
                    Sistema automático de prevención y detección de transacciones sospechosas
                  </p>
                </div>
              </div>

              <Alert variant="success" layout="sidebar">
                <strong>Garantía:</strong> Si detectas algún cargo no autorizado, contáctanos
                inmediatamente. Investigaremos y resolveremos el problema en 48 horas.
              </Alert>
            </div>
          </section>

          {/* Contact Card */}
          <div className="bg-linear-to-r from-primary-600 to-primary-700 text-white rounded-xl shadow-md p-8">
            <div className="text-center">
              <CreditCard className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">¿Problemas con tu pago?</h2>
              <p className="mb-6 text-primary-100">Nuestro equipo está disponible para ayudarte</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:pagos@@papalotemarket.com"
                  className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  pagos@@papalotemarket.com
                </a>
                <a
                  href="tel:+525512345678"
                  className="px-6 py-3 bg-primary-800 text-white rounded-lg font-semibold hover:bg-primary-900 transition"
                >
                  55 1234 5678
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
