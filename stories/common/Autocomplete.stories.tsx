import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState, useEffect } from 'react';
import Autocomplete, { AutocompleteOption } from '@/components/common/Autocomplete';
import { MapPin, User, Package, Tag, Store } from 'lucide-react';

/**
 * Autocomplete component for searchable dropdown selection.
 * Features single and multiple selection, async search, option groups,
 * creatable options, keyboard navigation, and full accessibility support.
 */
const meta: Meta<typeof Autocomplete> = {
  title: 'Inputs/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A searchable dropdown component with single/multiple selection, async search support, option groups, creatable options, and keyboard navigation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    multiple: {
      control: 'boolean',
      description: 'Whether multiple options can be selected',
    },
    creatable: {
      control: 'boolean',
      description: 'Whether users can create new options',
    },
    clearable: {
      control: 'boolean',
      description: 'Whether to show a clear button',
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show a loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

// Sample options
const stateOptions: AutocompleteOption[] = [
  { value: 'cdmx', label: 'Ciudad de México' },
  { value: 'jalisco', label: 'Jalisco' },
  { value: 'oaxaca', label: 'Oaxaca' },
  { value: 'puebla', label: 'Puebla' },
  { value: 'chiapas', label: 'Chiapas' },
  { value: 'yucatan', label: 'Yucatán' },
  { value: 'michoacan', label: 'Michoacán' },
  { value: 'guerrero', label: 'Guerrero' },
  { value: 'veracruz', label: 'Veracruz' },
  { value: 'guanajuato', label: 'Guanajuato' },
];

const categoryOptions: AutocompleteOption[] = [
  { value: 'textiles', label: 'Textiles', description: 'Rebozos, huipiles, sarapes' },
  { value: 'ceramica', label: 'Cerámica', description: 'Barro negro, talavera' },
  { value: 'joyeria', label: 'Joyería', description: 'Plata, piedras preciosas' },
  { value: 'madera', label: 'Madera', description: 'Alebrijes, máscaras' },
  { value: 'vidrio', label: 'Vidrio soplado', description: 'Artículos decorativos' },
  { value: 'cuero', label: 'Cuero', description: 'Bolsas, cinturones' },
  { value: 'papel', label: 'Papel', description: 'Papel amate, papel picado' },
  { value: 'metal', label: 'Metal', description: 'Hojalata, cobre' },
];

// Default
export const Default: Story = {
  render: function DefaultAutocomplete() {
    const [value, setValue] = useState<string | null>(null);

    return (
      <div className="w-80">
        <Autocomplete
          options={stateOptions}
          value={value}
          onChange={(v) => setValue(v as string | null)}
          placeholder="Buscar estado..."
        />
      </div>
    );
  },
};

// With label
export const WithLabel: Story = {
  render: function LabeledAutocomplete() {
    const [value, setValue] = useState<string | null>(null);

    return (
      <div className="w-80">
        <Autocomplete
          label="Estado"
          options={stateOptions}
          value={value}
          onChange={(v) => setValue(v as string | null)}
          placeholder="Buscar estado..."
        />
      </div>
    );
  },
};

// With helper text
export const WithHelperText: Story = {
  render: function HelperAutocomplete() {
    const [value, setValue] = useState<string | null>(null);

    return (
      <div className="w-80">
        <Autocomplete
          label="Estado de origen"
          options={stateOptions}
          value={value}
          onChange={(v) => setValue(v as string | null)}
          placeholder="Buscar estado..."
          helperText="Selecciona el estado donde se elabora tu producto"
        />
      </div>
    );
  },
};

// With error
export const WithError: Story = {
  render: function ErrorAutocomplete() {
    const [value, setValue] = useState<string | null>(null);

    return (
      <div className="w-80">
        <Autocomplete
          label="Estado de origen"
          options={stateOptions}
          value={value}
          onChange={(v) => setValue(v as string | null)}
          placeholder="Buscar estado..."
          error="Debes seleccionar un estado"
          required
        />
      </div>
    );
  },
};

// With pre-selected value
export const WithSelectedValue: Story = {
  render: function SelectedAutocomplete() {
    const [value, setValue] = useState<string | null>('oaxaca');

    return (
      <div className="w-80">
        <Autocomplete
          label="Estado de origen"
          options={stateOptions}
          value={value}
          onChange={(v) => setValue(v as string | null)}
          placeholder="Buscar estado..."
        />
      </div>
    );
  },
};

// With descriptions
export const WithDescriptions: Story = {
  render: function DescriptionsAutocomplete() {
    const [value, setValue] = useState<string | null>(null);

    return (
      <div className="w-96">
        <Autocomplete
          label="Categoría de producto"
          options={categoryOptions}
          value={value}
          onChange={(v) => setValue(v as string | null)}
          placeholder="Buscar categoría..."
        />
      </div>
    );
  },
};

// With icons
export const WithIcons: Story = {
  render: function IconsAutocomplete() {
    const [value, setValue] = useState<string | null>(null);

    const options: AutocompleteOption[] = [
      { value: 'cdmx', label: 'Ciudad de México', icon: <MapPin className="w-4 h-4" /> },
      { value: 'oaxaca', label: 'Oaxaca', icon: <MapPin className="w-4 h-4" /> },
      { value: 'jalisco', label: 'Jalisco', icon: <MapPin className="w-4 h-4" /> },
      { value: 'yucatan', label: 'Yucatán', icon: <MapPin className="w-4 h-4" /> },
    ];

    return (
      <div className="w-80">
        <Autocomplete
          label="Ubicación"
          options={options}
          value={value}
          onChange={(v) => setValue(v as string | null)}
          placeholder="Buscar ubicación..."
        />
      </div>
    );
  },
};

// Multiple selection
export const MultipleSelection: Story = {
  render: function MultipleAutocomplete() {
    const [value, setValue] = useState<string[]>([]);

    return (
      <div className="w-96">
        <Autocomplete
          label="Categorías del producto"
          options={categoryOptions}
          value={value}
          onChange={(v) => setValue(v as string[])}
          multiple
          placeholder="Buscar categorías..."
          helperText="Puedes seleccionar múltiples categorías"
        />
      </div>
    );
  },
};

// Multiple with pre-selected
export const MultipleWithSelected: Story = {
  render: function MultipleSelectedAutocomplete() {
    const [value, setValue] = useState<string[]>(['textiles', 'ceramica']);

    return (
      <div className="w-96">
        <Autocomplete
          label="Categorías del producto"
          options={categoryOptions}
          value={value}
          onChange={(v) => setValue(v as string[])}
          multiple
          placeholder="Agregar más categorías..."
        />
      </div>
    );
  },
};

// Creatable
export const Creatable: Story = {
  render: function CreatableAutocomplete() {
    const [options, setOptions] = useState<AutocompleteOption[]>([
      { value: 'rebozo', label: 'Rebozo' },
      { value: 'huipil', label: 'Huipil' },
      { value: 'sarape', label: 'Sarape' },
    ]);
    const [value, setValue] = useState<string | null>(null);

    const handleCreate = (query: string) => {
      const newOption = { value: query.toLowerCase(), label: query };
      setOptions([...options, newOption]);
      setValue(newOption.value);
    };

    return (
      <div className="w-80">
        <Autocomplete
          label="Tipo de producto"
          options={options}
          value={value}
          onChange={(v) => setValue(v as string | null)}
          creatable
          onCreate={handleCreate}
          placeholder="Buscar o crear..."
          helperText="Escribe para buscar o crear uno nuevo"
        />
      </div>
    );
  },
};

// With groups
export const WithGroups: Story = {
  render: function GroupedAutocomplete() {
    const [value, setValue] = useState<string | null>(null);

    const groupedOptions: AutocompleteOption[] = [
      { value: 'cdmx', label: 'Ciudad de México', group: 'Centro' },
      { value: 'puebla', label: 'Puebla', group: 'Centro' },
      { value: 'morelos', label: 'Morelos', group: 'Centro' },
      { value: 'jalisco', label: 'Jalisco', group: 'Occidente' },
      { value: 'michoacan', label: 'Michoacán', group: 'Occidente' },
      { value: 'guanajuato', label: 'Guanajuato', group: 'Occidente' },
      { value: 'oaxaca', label: 'Oaxaca', group: 'Sur' },
      { value: 'chiapas', label: 'Chiapas', group: 'Sur' },
      { value: 'guerrero', label: 'Guerrero', group: 'Sur' },
    ];

    return (
      <div className="w-80">
        <Autocomplete
          label="Estado"
          options={groupedOptions}
          value={value}
          onChange={(v) => setValue(v as string | null)}
          placeholder="Buscar estado..."
        />
      </div>
    );
  },
};

// With disabled options
export const WithDisabledOptions: Story = {
  render: function DisabledOptionsAutocomplete() {
    const [value, setValue] = useState<string | null>(null);

    const options: AutocompleteOption[] = [
      { value: 'textiles', label: 'Textiles', description: 'Disponible' },
      { value: 'ceramica', label: 'Cerámica', description: 'Disponible' },
      {
        value: 'joyeria',
        label: 'Joyería',
        description: 'No disponible en tu región',
        disabled: true,
      },
      { value: 'madera', label: 'Madera', description: 'Disponible' },
      {
        value: 'vidrio',
        label: 'Vidrio soplado',
        description: 'No disponible en tu región',
        disabled: true,
      },
    ];

    return (
      <div className="w-96">
        <Autocomplete
          label="Categoría"
          options={options}
          value={value}
          onChange={(v) => setValue(v as string | null)}
          placeholder="Buscar categoría..."
        />
      </div>
    );
  },
};

// Sizes
export const SizeSmall: Story = {
  render: function SmallAutocomplete() {
    const [value, setValue] = useState<string | null>(null);

    return (
      <div className="w-64">
        <Autocomplete
          label="Pequeño"
          options={stateOptions}
          value={value}
          onChange={(v) => setValue(v as string | null)}
          size="sm"
          placeholder="Buscar..."
        />
      </div>
    );
  },
};

export const SizeMedium: Story = {
  render: function MediumAutocomplete() {
    const [value, setValue] = useState<string | null>(null);

    return (
      <div className="w-72">
        <Autocomplete
          label="Mediano"
          options={stateOptions}
          value={value}
          onChange={(v) => setValue(v as string | null)}
          size="md"
          placeholder="Buscar..."
        />
      </div>
    );
  },
};

export const SizeLarge: Story = {
  render: function LargeAutocomplete() {
    const [value, setValue] = useState<string | null>(null);

    return (
      <div className="w-80">
        <Autocomplete
          label="Grande"
          options={stateOptions}
          value={value}
          onChange={(v) => setValue(v as string | null)}
          size="lg"
          placeholder="Buscar..."
        />
      </div>
    );
  },
};

// Loading state
export const Loading: Story = {
  render: function LoadingAutocomplete() {
    const [value, setValue] = useState<string | null>(null);

    return (
      <div className="w-80">
        <Autocomplete
          label="Buscando..."
          options={stateOptions}
          value={value}
          onChange={(v) => setValue(v as string | null)}
          loading
          placeholder="Buscar estado..."
        />
      </div>
    );
  },
};

// Disabled
export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <Autocomplete
        label="Estado"
        options={stateOptions}
        value="oaxaca"
        disabled
        placeholder="Buscar estado..."
      />
    </div>
  ),
};

// Min characters
export const MinCharacters: Story = {
  render: function MinCharsAutocomplete() {
    const [value, setValue] = useState<string | null>(null);

    return (
      <div className="w-80">
        <Autocomplete
          label="Artesano"
          options={[
            { value: '1', label: 'María García López' },
            { value: '2', label: 'Pedro Hernández' },
            { value: '3', label: 'Juana Martínez' },
            { value: '4', label: 'Carlos Ruiz' },
          ]}
          value={value}
          onChange={(v) => setValue(v as string | null)}
          minChars={2}
          placeholder="Escribe al menos 2 caracteres..."
          helperText="Escribe al menos 2 caracteres para buscar"
        />
      </div>
    );
  },
};

// Async search simulation
export const AsyncSearch: Story = {
  render: function AsyncAutocomplete() {
    const [value, setValue] = useState<string | null>(null);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<AutocompleteOption[]>([]);

    // Simulate async search
    useEffect(() => {
      if (query.length < 2) {
        setOptions([]);
        return;
      }

      setLoading(true);
      const timer = setTimeout(() => {
        const results = stateOptions.filter((o) =>
          o.label.toLowerCase().includes(query.toLowerCase())
        );
        setOptions(results);
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }, [query]);

    return (
      <div className="w-80">
        <Autocomplete
          label="Buscar estado (async)"
          options={options}
          value={value}
          onChange={(v) => setValue(v as string | null)}
          onInputChange={setQuery}
          loading={loading}
          minChars={2}
          placeholder="Escribe para buscar..."
          helperText="Simula búsqueda asíncrona con delay de 500ms"
        />
      </div>
    );
  },
};

// All sizes comparison
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <Autocomplete
          label="Pequeño (sm)"
          options={stateOptions}
          size="sm"
          placeholder="Buscar..."
        />
      </div>
      <div>
        <Autocomplete
          label="Mediano (md)"
          options={stateOptions}
          size="md"
          placeholder="Buscar..."
        />
      </div>
      <div>
        <Autocomplete
          label="Grande (lg)"
          options={stateOptions}
          size="lg"
          placeholder="Buscar..."
        />
      </div>
    </div>
  ),
};

// Real-world: Product tagging
export const ProductTagging: Story = {
  render: function ProductTaggingExample() {
    const [tags, setTags] = useState<string[]>(['hecho-a-mano', 'oaxaca']);
    const [options, setOptions] = useState<AutocompleteOption[]>([
      { value: 'hecho-a-mano', label: 'Hecho a mano', icon: <Tag className="w-4 h-4" /> },
      { value: 'tradicional', label: 'Tradicional', icon: <Tag className="w-4 h-4" /> },
      { value: 'artesanal', label: 'Artesanal', icon: <Tag className="w-4 h-4" /> },
      { value: 'oaxaca', label: 'Oaxaca', icon: <Tag className="w-4 h-4" /> },
      { value: 'ceramica', label: 'Cerámica', icon: <Tag className="w-4 h-4" /> },
      { value: 'textil', label: 'Textil', icon: <Tag className="w-4 h-4" /> },
    ]);

    const handleCreate = (query: string) => {
      const newOption = {
        value: query.toLowerCase().replace(/\s+/g, '-'),
        label: query,
        icon: <Tag className="w-4 h-4" />,
      };
      setOptions([...options, newOption]);
      setTags([...tags, newOption.value]);
    };

    return (
      <div className="max-w-lg p-4 border rounded-lg bg-white">
        <h3 className="font-semibold text-gray-900 mb-4">Etiquetas del producto</h3>
        <Autocomplete
          options={options}
          value={tags}
          onChange={(v) => setTags(v as string[])}
          multiple
          creatable
          onCreate={handleCreate}
          placeholder="Agregar etiquetas..."
          helperText="Busca o crea etiquetas para tu producto"
        />
      </div>
    );
  },
};

// Real-world: Artisan selector
export const ArtisanSelector: Story = {
  render: function ArtisanSelectorExample() {
    const [value, setValue] = useState<string | null>(null);

    const artisanOptions: AutocompleteOption[] = [
      {
        value: '1',
        label: 'María García López',
        description: 'Oaxaca • Textiles',
        icon: <User className="w-5 h-5 text-gray-400" />,
      },
      {
        value: '2',
        label: 'Pedro Hernández',
        description: 'Chiapas • Ámbar',
        icon: <User className="w-5 h-5 text-gray-400" />,
      },
      {
        value: '3',
        label: 'Juana Martínez',
        description: 'Oaxaca • Barro negro',
        icon: <User className="w-5 h-5 text-gray-400" />,
      },
      {
        value: '4',
        label: 'Carlos Ruiz',
        description: 'Guerrero • Plata',
        icon: <User className="w-5 h-5 text-gray-400" />,
      },
    ];

    return (
      <div className="max-w-md p-4 border rounded-lg bg-white">
        <h3 className="font-semibold text-gray-900 mb-4">Seleccionar artesano</h3>
        <Autocomplete
          label="Artesano"
          options={artisanOptions}
          value={value}
          onChange={(v) => setValue(v as string | null)}
          placeholder="Buscar artesano..."
        />
        {value && (
          <p className="mt-4 text-sm text-gray-600">
            Artesano seleccionado:{' '}
            <strong>{artisanOptions.find((o) => o.value === value)?.label}</strong>
          </p>
        )}
      </div>
    );
  },
};

// Real-world: Location filter
export const LocationFilter: Story = {
  render: function LocationFilterExample() {
    const [regions, setRegions] = useState<string[]>([]);

    const regionOptions: AutocompleteOption[] = [
      {
        value: 'cdmx',
        label: 'Ciudad de México',
        icon: <MapPin className="w-4 h-4" />,
        group: 'Centro',
      },
      { value: 'puebla', label: 'Puebla', icon: <MapPin className="w-4 h-4" />, group: 'Centro' },
      { value: 'oaxaca', label: 'Oaxaca', icon: <MapPin className="w-4 h-4" />, group: 'Sur' },
      { value: 'chiapas', label: 'Chiapas', icon: <MapPin className="w-4 h-4" />, group: 'Sur' },
      {
        value: 'jalisco',
        label: 'Jalisco',
        icon: <MapPin className="w-4 h-4" />,
        group: 'Occidente',
      },
      {
        value: 'michoacan',
        label: 'Michoacán',
        icon: <MapPin className="w-4 h-4" />,
        group: 'Occidente',
      },
    ];

    return (
      <div className="max-w-sm p-4 border rounded-lg bg-white">
        <h3 className="font-semibold text-gray-900 mb-4">Filtrar por ubicación</h3>
        <Autocomplete
          options={regionOptions}
          value={regions}
          onChange={(v) => setRegions(v as string[])}
          multiple
          placeholder="Agregar ubicaciones..."
        />
        <button className="w-full mt-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">
          Aplicar filtro ({regions.length} seleccionados)
        </button>
      </div>
    );
  },
};

// All states
export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 max-w-2xl">
      <Autocomplete label="Normal" options={stateOptions} placeholder="Buscar..." />
      <Autocomplete label="Con valor" options={stateOptions} value="oaxaca" />
      <Autocomplete label="Requerido" options={stateOptions} required placeholder="Buscar..." />
      <Autocomplete label="Con ayuda" options={stateOptions} helperText="Texto de ayuda" />
      <Autocomplete label="Con error" options={stateOptions} error="Campo requerido" />
      <Autocomplete label="Cargando" options={stateOptions} loading placeholder="Buscando..." />
      <Autocomplete label="Deshabilitado" options={stateOptions} disabled value="oaxaca" />
      <Autocomplete
        label="Múltiple"
        options={stateOptions}
        multiple
        value={['oaxaca', 'jalisco']}
      />
    </div>
  ),
};
