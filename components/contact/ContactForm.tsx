'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send, User, Mail, Phone } from 'lucide-react';
import { ROUTES } from '@/lib';
import TextInput from '@/components/common/TextInput';
import Select from '@/components/common/Select';
import Textarea from '@/components/common/Textarea';

const SUBJECT_OPTIONS = [
  { value: 'consulta-producto', label: 'Consulta sobre producto' },
  { value: 'estado-pedido', label: 'Estado de mi pedido' },
  { value: 'devolucion', label: 'Devolución o cambio' },
  { value: 'problema-tecnico', label: 'Problema técnico' },
  { value: 'quiero-vender', label: 'Quiero vender mis productos' },
  { value: 'colaboracion', label: 'Propuesta de colaboración' },
  { value: 'otro', label: 'Otro' },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
    acepto: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          id="nombre"
          name="nombre"
          label="Nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          placeholder="Tu nombre completo"
          leftIcon={<User className="w-5 h-5" />}
          required
        />

        <TextInput
          type="email"
          id="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="tu@email.com"
          leftIcon={<Mail className="w-5 h-5" />}
          required
        />
      </div>

      <TextInput
        type="tel"
        id="telefono"
        name="telefono"
        label="Teléfono"
        value={formData.telefono}
        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
        placeholder="+52 55 1234 5678"
        leftIcon={<Phone className="w-5 h-5" />}
      />

      <Select
        id="asunto"
        name="asunto"
        label="Asunto"
        value={formData.asunto}
        onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
        options={SUBJECT_OPTIONS}
        placeholder="Selecciona un asunto"
        required
      />

      <Textarea
        id="mensaje"
        name="mensaje"
        label="Mensaje"
        value={formData.mensaje}
        onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
        placeholder="Cuéntanos cómo podemos ayudarte..."
        minRows={8}
        required
      />

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="acepto"
          name="acepto"
          checked={formData.acepto}
          onChange={(e) => setFormData({ ...formData, acepto: e.target.checked })}
          required
          className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded-sm focus:ring-primary-500"
        />
        <label htmlFor="acepto" className="text-sm text-gray-600">
          Acepto la{' '}
          <Link href={ROUTES.PRIVACY} className="text-primary-600 hover:underline">
            Política de Privacidad
          </Link>{' '}
          y autorizo el tratamiento de mis datos personales
        </label>
      </div>

      <button
        type="submit"
        className="w-full px-6 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition flex items-center justify-center gap-2"
      >
        <Send className="w-5 h-5" />
        Enviar Mensaje
      </button>
    </form>
  );
}
