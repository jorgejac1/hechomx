import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import DatePicker from '@/components/common/DatePicker';

/**
 * DatePicker component for date selection with calendar interface.
 * Features inline and dropdown variants, date range constraints,
 * disabled dates, and full keyboard navigation.
 */
const meta: Meta<typeof DatePicker> = {
  title: 'Inputs/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A date picker with dropdown and inline variants, date constraints, localization support (Spanish by default), and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'inline'],
      description: 'Display variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    dateFormat: {
      control: 'select',
      options: ['short', 'medium', 'long'],
      description: 'Format style for displaying the selected date',
    },
    clearable: {
      control: 'boolean',
      description: 'Whether to show a clear button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the date picker is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    placeholder: 'Seleccionar fecha',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// With label
export const WithLabel: Story = {
  args: {
    label: 'Fecha de nacimiento',
    placeholder: 'Seleccionar fecha',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// With selected date
export const WithSelectedDate: Story = {
  args: {
    label: 'Fecha de entrega',
    value: new Date(2024, 5, 15),
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// With helper text
export const WithHelperText: Story = {
  args: {
    label: 'Fecha de evento',
    placeholder: 'Seleccionar fecha',
    helperText: 'Selecciona la fecha para tu evento especial',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// With error
export const WithError: Story = {
  args: {
    label: 'Fecha de reservación',
    placeholder: 'Seleccionar fecha',
    error: 'Debes seleccionar una fecha válida',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// Required
export const Required: Story = {
  args: {
    label: 'Fecha de entrega',
    placeholder: 'Seleccionar fecha',
    required: true,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// Sizes
export const SizeSmall: Story = {
  args: {
    label: 'Fecha',
    size: 'sm',
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};

export const SizeMedium: Story = {
  args: {
    label: 'Fecha',
    size: 'md',
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

export const SizeLarge: Story = {
  args: {
    label: 'Fecha',
    size: 'lg',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// Date formats
export const FormatShort: Story = {
  args: {
    label: 'Formato corto',
    value: new Date(2024, 5, 15),
    dateFormat: 'short',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const FormatMedium: Story = {
  args: {
    label: 'Formato mediano',
    value: new Date(2024, 5, 15),
    dateFormat: 'medium',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const FormatLong: Story = {
  args: {
    label: 'Formato largo',
    value: new Date(2024, 5, 15),
    dateFormat: 'long',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Fecha bloqueada',
    value: new Date(2024, 5, 15),
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// Not clearable
export const NotClearable: Story = {
  args: {
    label: 'Sin botón de limpiar',
    value: new Date(2024, 5, 15),
    clearable: false,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// Inline variant
export const Inline: Story = {
  args: {
    variant: 'inline',
    label: 'Selecciona una fecha',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// With min date (future dates only)
export const FutureDatesOnly: Story = {
  render: function FutureDatesStory() {
    const [date, setDate] = useState<Date | null>(null);
    const today = new Date();

    return (
      <div className="w-80">
        <DatePicker
          label="Fecha de entrega"
          placeholder="Seleccionar fecha"
          value={date}
          onChange={setDate}
          minDate={today}
          helperText="Solo fechas futuras disponibles"
        />
      </div>
    );
  },
};

// With max date (past dates only)
export const PastDatesOnly: Story = {
  render: function PastDatesStory() {
    const [date, setDate] = useState<Date | null>(null);
    const today = new Date();

    return (
      <div className="w-80">
        <DatePicker
          label="Fecha de nacimiento"
          placeholder="Seleccionar fecha"
          value={date}
          onChange={setDate}
          maxDate={today}
          helperText="Solo fechas pasadas disponibles"
        />
      </div>
    );
  },
};

// With date range
export const WithDateRange: Story = {
  render: function DateRangeStory() {
    const [date, setDate] = useState<Date | null>(null);
    const minDate = new Date(2024, 0, 1);
    const maxDate = new Date(2024, 11, 31);

    return (
      <div className="w-80">
        <DatePicker
          label="Fecha en 2024"
          placeholder="Seleccionar fecha"
          value={date}
          onChange={setDate}
          minDate={minDate}
          maxDate={maxDate}
          helperText="Solo fechas del año 2024"
        />
      </div>
    );
  },
};

// With disabled specific dates
export const WithDisabledDates: Story = {
  render: function DisabledDatesStory() {
    const [date, setDate] = useState<Date | null>(null);

    // Disable weekends
    const isWeekend = (date: Date) => {
      const day = date.getDay();
      return day === 0 || day === 6;
    };

    return (
      <div className="w-80">
        <DatePicker
          label="Fecha de cita"
          placeholder="Seleccionar fecha"
          value={date}
          onChange={setDate}
          disabledDates={isWeekend}
          helperText="No disponible los fines de semana"
        />
      </div>
    );
  },
};

// Controlled example
export const Controlled: Story = {
  render: function ControlledDatePicker() {
    const [date, setDate] = useState<Date | null>(new Date());

    return (
      <div className="w-80 space-y-4">
        <DatePicker label="Fecha seleccionada" value={date} onChange={setDate} />
        <div className="text-sm text-gray-600">
          <p>Valor seleccionado:</p>
          <code className="bg-gray-100 px-2 py-1 rounded">
            {date ? date.toLocaleDateString('es-MX') : 'null'}
          </code>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setDate(new Date())}
            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            Hoy
          </button>
          <button
            onClick={() => setDate(null)}
            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            Limpiar
          </button>
        </div>
      </div>
    );
  },
};

// All sizes comparison
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="w-64">
        <DatePicker label="Pequeño (sm)" size="sm" value={new Date()} />
      </div>
      <div className="w-72">
        <DatePicker label="Mediano (md)" size="md" value={new Date()} />
      </div>
      <div className="w-80">
        <DatePicker label="Grande (lg)" size="lg" value={new Date()} />
      </div>
    </div>
  ),
};

// Real-world: Shipping date selector
export const ShippingDateSelector: Story = {
  render: function ShippingDateStory() {
    const [date, setDate] = useState<Date | null>(null);
    const today = new Date();
    const minDate = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 days from now
    const maxDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

    return (
      <div className="max-w-sm p-4 border rounded-lg bg-white">
        <h3 className="font-semibold text-gray-900 mb-4">Fecha de entrega deseada</h3>
        <DatePicker
          label="Selecciona cuándo quieres recibir tu pedido"
          value={date}
          onChange={setDate}
          minDate={minDate}
          maxDate={maxDate}
          helperText="Disponible de 3 a 30 días a partir de hoy"
          required
        />
        {date && (
          <p className="mt-4 text-sm text-green-600">
            ✓ Tu pedido llegará el{' '}
            {date.toLocaleDateString('es-MX', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}
      </div>
    );
  },
};

// Real-world: Event booking
export const EventBooking: Story = {
  render: function EventBookingStory() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const today = new Date();

    return (
      <div className="max-w-md p-4 border rounded-lg bg-white space-y-4">
        <h3 className="font-semibold text-gray-900">Reservar espacio para evento</h3>
        <div className="grid grid-cols-2 gap-4">
          <DatePicker
            label="Fecha de inicio"
            value={startDate}
            onChange={(date) => {
              setStartDate(date);
              if (date && endDate && date > endDate) {
                setEndDate(null);
              }
            }}
            minDate={today}
            required
          />
          <DatePicker
            label="Fecha de fin"
            value={endDate}
            onChange={setEndDate}
            minDate={startDate || today}
            disabled={!startDate}
            required
          />
        </div>
        {startDate && endDate && (
          <div className="p-3 bg-primary-50 rounded-lg text-sm text-primary-700">
            Evento de{' '}
            {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1} días
          </div>
        )}
      </div>
    );
  },
};

// Real-world: Inline calendar for availability
export const InlineAvailability: Story = {
  render: function InlineAvailabilityStory() {
    const [date, setDate] = useState<Date | null>(null);
    const today = new Date();

    // Simulate some dates that are unavailable
    const unavailableDates = [
      new Date(today.getFullYear(), today.getMonth(), 10),
      new Date(today.getFullYear(), today.getMonth(), 11),
      new Date(today.getFullYear(), today.getMonth(), 15),
      new Date(today.getFullYear(), today.getMonth(), 20),
      new Date(today.getFullYear(), today.getMonth(), 21),
      new Date(today.getFullYear(), today.getMonth(), 22),
    ];

    const isUnavailable = (checkDate: Date) => {
      return unavailableDates.some(
        (d) =>
          d.getFullYear() === checkDate.getFullYear() &&
          d.getMonth() === checkDate.getMonth() &&
          d.getDate() === checkDate.getDate()
      );
    };

    return (
      <div className="max-w-sm">
        <DatePicker
          variant="inline"
          label="Disponibilidad del artesano"
          value={date}
          onChange={setDate}
          minDate={today}
          disabledDates={isUnavailable}
        />
        {date && (
          <p className="mt-4 text-sm text-gray-600">
            Fecha seleccionada: {date.toLocaleDateString('es-MX', { dateStyle: 'full' })}
          </p>
        )}
        <p className="mt-2 text-xs text-gray-500">Las fechas deshabilitadas no están disponibles</p>
      </div>
    );
  },
};

// All states
export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 max-w-2xl">
      <DatePicker label="Normal" placeholder="Seleccionar fecha" />
      <DatePicker label="Con valor" value={new Date()} />
      <DatePicker label="Requerido" placeholder="Seleccionar" required />
      <DatePicker label="Con ayuda" helperText="Texto de ayuda" />
      <DatePicker label="Con error" error="Campo requerido" />
      <DatePicker label="Deshabilitado" value={new Date()} disabled />
    </div>
  ),
};
