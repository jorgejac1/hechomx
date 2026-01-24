/**
 * @fileoverview Contact modal for messaging sellers.
 * Provides a modal dialog for buyers to send messages to shop owners.
 * Pre-fills user info when authenticated.
 * @module components/contact/ContactModal
 */

'use client';

import { useState } from 'react';
import { Send, Mail, User } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';
import { useAuth } from '@/contexts/AuthContext';
import Modal from '@/components/common/Modal';
import TextInput from '@/components/common/TextInput';
import Textarea from '@/components/common/Textarea';
import Alert from '@/components/common/Alert';
import LoadingButton from '@/components/common/LoadingButton';
import Button from '@/components/common/Button';

interface ContactModalProps {
  sellerName: string;
  onClose: () => void;
}

export default function ContactModal({ sellerName, onClose }: ContactModalProps) {
  const { showToast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      showToast('Por favor ingresa tu nombre', 'error');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      showToast('Por favor ingresa un email válido', 'error');
      return;
    }

    if (!formData.subject.trim()) {
      showToast('Por favor ingresa un asunto', 'error');
      return;
    }

    if (formData.message.trim().length < 20) {
      showToast('El mensaje debe tener al menos 20 caracteres', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement actual API call
      // await sendContactMessage({ ...formData, recipient: sellerName });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      showToast('Mensaje enviado exitosamente. El artesano te responderá pronto.', 'success');
      onClose();
    } catch (error) {
      console.error('[ContactModal] Error sending message:', error);
      showToast('Error al enviar el mensaje. Intenta de nuevo.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const footer = (
    <>
      <Button variant="outline" onClick={onClose} disabled={isSubmitting} fullWidth>
        Cancelar
      </Button>
      <LoadingButton
        type="button"
        onClick={() => handleSubmit()}
        isLoading={isSubmitting}
        loadingText="Enviando..."
        icon={<Send className="w-5 h-5" />}
        fullWidth
      >
        Enviar Mensaje
      </LoadingButton>
    </>
  );

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Contactar Artesano"
      description={`Envía un mensaje a ${sellerName}`}
      size="lg"
      footer={footer}
      closeOnBackdrop={!isSubmitting}
      closeOnEscape={!isSubmitting}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <TextInput
          id="name"
          name="name"
          label="Tu nombre"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ingresa tu nombre completo"
          leftIcon={<User className="w-5 h-5" />}
          disabled={isSubmitting}
          required
        />

        <TextInput
          type="email"
          id="email"
          name="email"
          label="Tu email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          leftIcon={<Mail className="w-5 h-5" />}
          disabled={isSubmitting}
          required
        />

        <TextInput
          id="subject"
          name="subject"
          label="Asunto"
          value={formData.subject}
          onChange={handleChange}
          placeholder="¿Sobre qué quieres preguntar?"
          disabled={isSubmitting}
          required
        />

        <Textarea
          id="message"
          name="message"
          label="Mensaje"
          value={formData.message}
          onChange={handleChange}
          minRows={6}
          placeholder="Escribe tu mensaje aquí. Incluye detalles sobre tu consulta, pedido personalizado, o cualquier pregunta que tengas..."
          disabled={isSubmitting}
          hint={`Mínimo 20 caracteres (${formData.message.length} / 1000)`}
          required
        />

        {/* Info Box */}
        <Alert variant="info" hideIcon>
          <strong>Tip:</strong> Sé específico sobre lo que necesitas. Si es un pedido personalizado,
          incluye detalles como colores, tamaños, cantidades y fecha esperada de entrega.
        </Alert>
      </form>
    </Modal>
  );
}
