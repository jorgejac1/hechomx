/**
 * @fileoverview Mexican states constants and craft region mappings.
 * Provides a complete list of all 32 Mexican states as a const array
 * and maps states known for specific traditional crafts.
 * @module lib/constants/states
 */

export const MEXICAN_STATES = [
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuahua',
  'Ciudad de México',
  'Coahuila',
  'Colima',
  'Durango',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'México',
  'Michoacán',
  'Morelos',
  'Nayarit',
  'Nuevo León',
  'Oaxaca',
  'Puebla',
  'Querétaro',
  'Quintana Roo',
  'San Luis Potosí',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz',
  'Yucatán',
  'Zacatecas',
] as const;

export type MexicanState = (typeof MEXICAN_STATES)[number];

/**
 * States known for specific crafts
 */
export const CRAFT_STATES: Record<string, string[]> = {
  Ceramica: ['Oaxaca', 'Puebla', 'Michoacán', 'Guanajuato'],
  Textiles: ['Oaxaca', 'Chiapas', 'Hidalgo', 'Puebla'],
  Madera: ['Michoacán', 'Guerrero', 'Oaxaca'],
  Plata: ['Taxco (Guerrero)', 'Zacatecas'],
};
