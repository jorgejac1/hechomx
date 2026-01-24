'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/lib';
import {
  Search,
  HelpCircle,
  ShoppingBag,
  Package,
  CreditCard,
  Truck,
  RotateCcw,
  MessageCircle,
  User,
  Store,
  Mail,
  Phone,
  Clock,
} from 'lucide-react';
import Accordion from '@/components/common/Accordion';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todas', icon: HelpCircle },
    { id: 'buying', name: 'Comprar', icon: ShoppingBag },
    { id: 'orders', name: 'Pedidos', icon: Package },
    { id: 'payment', name: 'Pagos', icon: CreditCard },
    { id: 'shipping', name: 'Envíos', icon: Truck },
    { id: 'returns', name: 'Devoluciones', icon: RotateCcw },
    { id: 'account', name: 'Cuenta', icon: User },
    { id: 'selling', name: 'Vender', icon: Store },
  ];

  const quickLinks = [
    {
      title: 'Ver Mis Pedidos',
      description: 'Rastrea tus pedidos y revisa su estado',
      icon: Package,
      href: ROUTES.ORDERS,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Explorar Productos',
      description: 'Descubre artesanías auténticas',
      icon: ShoppingBag,
      href: ROUTES.PRODUCTS,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Mi Perfil',
      description: 'Administra tu cuenta y preferencias',
      icon: User,
      href: ROUTES.PROFILE,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Vender en la Plataforma',
      description: 'Comienza a vender tus artesanías',
      icon: Store,
      href: ROUTES.SELL,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const faqs: FAQ[] = [
    {
      id: 'buying-1',
      category: 'buying',
      question: '¿Cómo realizo una compra?',
      answer:
        'Para realizar una compra, navega por nuestros productos, agrega los que te gusten al carrito, revisa tu pedido y procede al pago. Puedes pagar con tarjeta, transferencia, OXXO o PayPal.',
    },
    {
      id: 'buying-2',
      category: 'buying',
      question: '¿Los productos son auténticos?',
      answer:
        'Sí, todos nuestros productos son 100% auténticos y hechos a mano por artesanos verificados. Verificamos cada artesano y cada pieza antes de listarla en la plataforma.',
    },
    {
      id: 'buying-3',
      category: 'buying',
      question: '¿Puedo personalizar un producto?',
      answer:
        'Muchos artesanos ofrecen opciones de personalización. Busca el icono "Personalizable" en la página del producto o contacta directamente al artesano a través de nuestro sistema de mensajería.',
    },
    {
      id: 'orders-1',
      category: 'orders',
      question: '¿Cómo rastree mi pedido?',
      answer:
        'Una vez que tu pedido sea enviado, recibirás un número de rastreo por correo electrónico. También puedes ver el estado de todos tus pedidos en la sección "Mis Pedidos" de tu cuenta.',
    },
    {
      id: 'orders-2',
      category: 'orders',
      question: '¿Cuánto tarda en llegar mi pedido?',
      answer:
        'El tiempo de entrega varía según la ubicación y el tipo de producto. Generalmente, los pedidos nacionales tardan de 5 a 10 días hábiles. Los productos personalizados pueden tomar más tiempo.',
    },
    {
      id: 'orders-3',
      category: 'orders',
      question: '¿Puedo cancelar mi pedido?',
      answer:
        'Puedes cancelar tu pedido dentro de las primeras 2 horas después de realizarlo sin costo. Después de este tiempo, contacta al artesano para discutir opciones de cancelación.',
    },
    {
      id: 'payment-1',
      category: 'payment',
      question: '¿Qué métodos de pago aceptan?',
      answer:
        'Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencias bancarias, pagos en OXXO y PayPal. Todos los pagos son procesados de forma segura.',
    },
    {
      id: 'payment-2',
      category: 'payment',
      question: '¿Es seguro pagar en la plataforma?',
      answer:
        'Completamente seguro. Utilizamos encriptación SSL de 256 bits y cumplimos con los estándares de seguridad PCI DSS. Nunca almacenamos tu información financiera completa.',
    },
    {
      id: 'payment-3',
      category: 'payment',
      question: '¿Puedo obtener una factura?',
      answer:
        'Sí, puedes solicitar tu factura fiscal dentro de los primeros 5 días después de tu compra. Ve a "Mis Pedidos", selecciona el pedido y haz clic en "Solicitar Factura".',
    },
    {
      id: 'shipping-1',
      category: 'shipping',
      question: '¿Cuánto cuesta el envío?',
      answer:
        'El costo de envío varía según el tamaño, peso y destino del producto. Muchos artesanos ofrecen envío gratis en compras mayores a cierta cantidad. Verás el costo exacto antes de confirmar tu compra.',
    },
    {
      id: 'shipping-2',
      category: 'shipping',
      question: '¿Envían a todo México?',
      answer:
        'Sí, enviamos a todo México. También tenemos artesanos que envían internacionalmente. Verifica la disponibilidad en la página de cada producto.',
    },
    {
      id: 'shipping-3',
      category: 'shipping',
      question: '¿Qué pasa si no estoy en casa cuando llegue mi paquete?',
      answer:
        'La paquetería dejará un aviso y hará hasta 3 intentos de entrega. También puedes recoger tu paquete en la sucursal más cercana presentando tu identificación y el número de rastreo.',
    },
    {
      id: 'returns-1',
      category: 'returns',
      question: '¿Puedo devolver un producto?',
      answer:
        'Sí, aceptamos devoluciones dentro de los 15 días posteriores a la entrega si el producto llega dañado o no corresponde a la descripción. Los productos personalizados no son reembolsables.',
    },
    {
      id: 'returns-2',
      category: 'returns',
      question: '¿Cómo inicio una devolución?',
      answer:
        'Ve a "Mis Pedidos", selecciona el pedido, haz clic en "Solicitar Devolución" y sigue las instrucciones. El artesano revisará tu solicitud y coordinará la devolución contigo.',
    },
    {
      id: 'returns-3',
      category: 'returns',
      question: '¿Cuándo recibiré mi reembolso?',
      answer:
        'Una vez que el artesano confirme la recepción del producto devuelto, procesaremos tu reembolso en 5-10 días hábiles al mismo método de pago que utilizaste.',
    },
    {
      id: 'account-1',
      category: 'account',
      question: '¿Cómo creo una cuenta?',
      answer:
        'Haz clic en "Registro" en la parte superior de la página, completa tu información y verifica tu correo electrónico. ¡Listo! Ya puedes empezar a comprar.',
    },
    {
      id: 'account-2',
      category: 'account',
      question: '¿Olvidé mi contraseña, qué hago?',
      answer:
        'En la página de inicio de sesión, haz clic en "¿Olvidaste tu contraseña?" e ingresa tu correo electrónico. Te enviaremos un enlace para crear una nueva contraseña.',
    },
    {
      id: 'account-3',
      category: 'account',
      question: '¿Cómo actualizo mi información de perfil?',
      answer:
        'Inicia sesión, ve a "Mi Perfil" y haz clic en "Editar Perfil". Puedes actualizar tu nombre, dirección, teléfono y preferencias.',
    },
    {
      id: 'selling-1',
      category: 'selling',
      question: '¿Cómo puedo vender en la plataforma?',
      answer:
        'Ve a la página "Vender en Papalote Market", completa el formulario de registro de artesanos y nuestro equipo revisará tu solicitud en 2-3 días hábiles.',
    },
    {
      id: 'selling-2',
      category: 'selling',
      question: '¿Cuánto cuesta vender en la plataforma?',
      answer:
        'No cobramos ninguna cuota mensual. Solo cobramos una comisión del 12% en cada venta realizada. Esta comisión cubre los costos de la plataforma, procesamiento de pagos y soporte.',
    },
    {
      id: 'selling-3',
      category: 'selling',
      question: '¿Cómo recibo mis pagos?',
      answer:
        'Los pagos se transfieren directamente a tu cuenta bancaria cada semana. Necesitas proporcionar tu información bancaria en tu perfil de vendedor.',
    },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">¿Cómo podemos ayudarte?</h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Encuentra respuestas rápidas a tus preguntas
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar en preguntas frecuentes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-4 rounded-xl text-gray-900 text-lg border-2 border-white/50 focus:border-white focus:ring-4 focus:ring-primary-300 outline-hidden"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Section - NEW */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Accesos Rápidos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={index}
                href={link.href}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 ${link.bgColor} rounded-lg flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-6 h-6 ${link.color}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {link.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{link.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-3 hide-scrollbar">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                    activeCategory === cat.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              No se encontraron preguntas
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Intenta con otros términos de búsqueda o contacta a nuestro equipo de soporte
            </p>
          </div>
        ) : (
          <Accordion variant="separated">
            {filteredFAQs.map((faq) => (
              <Accordion.Item
                key={faq.id}
                itemId={faq.id}
                title={
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {faq.question}
                  </span>
                }
              >
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
      </div>

      {/* Contact Section - Enhanced with Clock */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              ¿Aún necesitas ayuda?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Nuestro equipo está aquí para ayudarte
            </p>

            {/* Operating Hours with Clock Icon */}
            <div className="flex items-center justify-center gap-2 mt-4 text-gray-600 dark:text-gray-400">
              <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <p className="text-sm font-medium">
                Horario de atención: Lunes a Viernes, 9:00 AM - 6:00 PM (Hora del Centro)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Email</h3>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Respuesta en 24 horas</p>
              </div>
              <a
                href="mailto:ayuda@papalotemarket.mx"
                className="text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300"
              >
                ayuda@papalotemarket.mx
              </a>
            </div>

            {/* Chat */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                Chat en Vivo
              </h3>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Lun-Vie 9am-6pm</p>
              </div>
              <button className="text-green-600 dark:text-green-400 font-semibold hover:text-green-700 dark:hover:text-green-300">
                Iniciar Chat
              </button>
            </div>

            {/* Phone */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Teléfono</h3>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Lun-Vie 9am-6pm</p>
              </div>
              <a
                href="tel:+525555555555"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300"
              >
                55 5555 5555
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
