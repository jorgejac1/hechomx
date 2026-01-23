/**
 * @fileoverview Floating feedback widget for collecting user feedback during testing.
 * Displays a floating button that opens a modal with a feedback form.
 * Submits feedback to Formspree for email delivery.
 * @module components/common/FeedbackWidget
 */

'use client';

import { useState } from 'react';
import { MessageSquare, X, ShoppingCart, Store, CheckCircle, Lock } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

type UserRole = 'comprador' | 'vendedor' | null;
type FeedbackType = 'experiencia' | 'diseno' | 'funcionalidad' | 'sugerencia' | 'problema';

interface FeedbackFormData {
  role: UserRole;
  type: FeedbackType;
  message: string;
}

const FEEDBACK_TYPES: { value: FeedbackType; label: string }[] = [
  { value: 'experiencia', label: 'Experiencia general' },
  { value: 'diseno', label: 'Diseño / Interfaz' },
  { value: 'funcionalidad', label: 'Funcionalidad' },
  { value: 'sugerencia', label: 'Sugerencia de mejora' },
  { value: 'problema', label: 'Reportar un problema' },
];

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xdaeeazr';

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FeedbackFormData>({
    role: null,
    type: 'experiencia',
    message: '',
  });

  const pathname = usePathname();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.role || !formData.message.trim()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: formData.role === 'comprador' ? 'Comprador' : 'Vendedor',
          feedbackType: FEEDBACK_TYPES.find((t) => t.value === formData.type)?.label,
          message: formData.message,
          page: pathname,
          userEmail: user?.email || 'No autenticado',
          timestamp: new Date().toISOString(),
          device: window.innerWidth < 768 ? 'Mobile' : 'Desktop',
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ role: null, type: 'experiencia', message: '' });
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset state after animation
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ role: null, type: 'experiencia', message: '' });
    }, 300);
  };

  const isFormValid = formData.role && formData.message.trim().length > 0;

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
        aria-label="Enviar opinión"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="hidden sm:inline font-medium">Opinar</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 animate-fade-in"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal Container - Bottom drawer on mobile, centered on desktop */}
          <div className="flex min-h-full items-end sm:items-center justify-center sm:p-4">
            <div
              className="relative bg-white dark:bg-gray-800 w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-xl animate-slide-up sm:animate-modal-scale-in"
              role="dialog"
              aria-modal="true"
              aria-labelledby="feedback-title"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>

              {isSuccess ? (
                /* Success State */
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    ¡Gracias por tu opinión!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Tu opinión nos ayuda a mejorar la plataforma.
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              ) : (
                /* Form State */
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3
                      id="feedback-title"
                      className="text-xl font-bold text-gray-900 dark:text-gray-100"
                    >
                      ¿Cómo podemos mejorar?
                    </h3>
                  </div>

                  {/* Role Selection */}
                  <div className="mb-5">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      Estoy probando como:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, role: 'comprador' })}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
                          formData.role === 'comprador'
                            ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span className="font-medium">Comprador</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, role: 'vendedor' })}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
                          formData.role === 'vendedor'
                            ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <Store className="w-5 h-5" />
                        <span className="font-medium">Vendedor</span>
                      </button>
                    </div>
                  </div>

                  {/* Feedback Type */}
                  <div className="mb-5">
                    <label
                      htmlFor="feedback-type"
                      className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2"
                    >
                      ¿Sobre qué tema?
                    </label>
                    <select
                      id="feedback-type"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value as FeedbackType })
                      }
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    >
                      {FEEDBACK_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label
                      htmlFor="feedback-message"
                      className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2"
                    >
                      Tu opinión
                    </label>
                    <textarea
                      id="feedback-message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Cuéntanos tu experiencia..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="w-full py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      'Enviar Opinión'
                    )}
                  </button>

                  {/* Privacy Note */}
                  <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" />
                    Tu opinión es anónima
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
