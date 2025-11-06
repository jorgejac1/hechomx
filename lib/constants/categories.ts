/**
 * Product categories and metadata
 */

export const CATEGORIES = {
  TEXTILES: 'Textiles y Ropa',
  CERAMICA: 'Cerámica y Alfarería',
  JOYERIA: 'Joyería',
  MADERA: 'Madera y Tallado',
  CUERO: 'Cuero y Piel',
  PAPEL: 'Papel y Cartón',
  METAL: 'Metalistería',
  VIDRIO: 'Vidrio y Cristal',
} as const;

export const CATEGORY_ICONS: Record<string, string> = {
  [CATEGORIES.TEXTILES]: '🧵',
  [CATEGORIES.CERAMICA]: '🏺',
  [CATEGORIES.JOYERIA]: '💍',
  [CATEGORIES.MADERA]: '🪵',
  [CATEGORIES.CUERO]: '👜',
  [CATEGORIES.PAPEL]: '📄',
  [CATEGORIES.METAL]: '⚒️',
  [CATEGORIES.VIDRIO]: '🔮',
};

export const CATEGORY_COLORS: Record<string, string> = {
  [CATEGORIES.TEXTILES]: 'bg-purple-100 text-purple-700',
  [CATEGORIES.CERAMICA]: 'bg-orange-100 text-orange-700',
  [CATEGORIES.JOYERIA]: 'bg-pink-100 text-pink-700',
  [CATEGORIES.MADERA]: 'bg-amber-100 text-amber-700',
  [CATEGORIES.CUERO]: 'bg-yellow-100 text-yellow-700',
  [CATEGORIES.PAPEL]: 'bg-blue-100 text-blue-700',
  [CATEGORIES.METAL]: 'bg-gray-100 text-gray-700',
  [CATEGORIES.VIDRIO]: 'bg-cyan-100 text-cyan-700',
};
