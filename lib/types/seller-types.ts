export type SellerType =
  | 'hobby_maker' // Makes things at home
  | 'artisan_individual' // Professional artisan
  | 'workshop' // Small team/taller
  | 'company'; // Larger company

export type CraftStyle = 'traditional' | 'contemporary' | 'mixed';

export type IndigenousConnection =
  | 'native' // Indigenous, speaks language
  | 'descendant' // Indigenous descendant
  | 'learned' // Learned techniques
  | 'none'; // No connection

export type CraftCategory =
  | 'textiles'
  | 'jewelry'
  | 'pottery'
  | 'woodwork'
  | 'metalwork'
  | 'leather'
  | 'paper'
  | 'candles'
  | 'food'
  | 'crafts'
  | 'mixed'
  | 'other';

export interface SellerClassification {
  sellerType: SellerType;
  craftCategory?: CraftCategory;
  craftStyle?: CraftStyle;
  indigenousConnection?: IndigenousConnection;
  speaksIndigenousLanguage?: boolean;
  indigenousLanguage?: string;
}

export const SELLER_TYPE_CONFIG = {
  hobby_maker: {
    emoji: '🏠',
    title: 'Hago cosas en casa',
    subtitle: 'Vendo mis creaciones como hobby o negocio secundario',
    examples: 'Bufandas tejidas, velas, jabones, manualidades',
    storyTitle: 'Sobre Mí',
    storySubtitle: 'Comparte un poco sobre ti y lo que haces',
  },
  artisan_individual: {
    emoji: '🎨',
    title: 'Soy artesano profesional',
    subtitle: 'Dedicado a mi oficio, es mi profesión principal',
    examples: 'Joyería, textiles tradicionales, cerámica, tallado',
    storyTitle: 'Mi Historia Artesanal',
    storySubtitle: 'Comparte tu historia, herencia y proceso creativo',
  },
  workshop: {
    emoji: '👥',
    title: 'Tengo un taller',
    subtitle: 'Trabajo con un equipo pequeño (2-10 personas)',
    examples: 'Taller familiar, cooperativa, equipo de producción',
    storyTitle: 'Nuestra Historia',
    storySubtitle: 'Comparte la historia de tu taller y equipo',
  },
  company: {
    emoji: '🏢',
    title: 'Soy una empresa',
    subtitle: 'Negocio establecido con equipo grande',
    examples: 'Fábrica, marca establecida, producción a escala',
    storyTitle: 'Acerca de la Empresa',
    storySubtitle: 'Historia, misión y valores de tu empresa',
  },
} as const;

export const CRAFT_CATEGORIES = {
  textiles: {
    label: 'Textiles y Ropa',
    icon: '🧵',
    examples: 'Tejidos, bordados, rebozos, huipiles, bufandas',
  },
  jewelry: {
    label: 'Joyería',
    icon: '💍',
    examples: 'Plata, cobre, filigrana, piedras, bisutería',
  },
  pottery: {
    label: 'Cerámica y Alfarería',
    icon: '🏺',
    examples: 'Talavera, barro negro, cerámica vidriada',
  },
  woodwork: {
    label: 'Madera',
    icon: '🪵',
    examples: 'Alebrijes, muebles, máscaras, tallados',
  },
  metalwork: {
    label: 'Metalistería',
    icon: '⚒️',
    examples: 'Hojalata, herrería, latón',
  },
  leather: {
    label: 'Piel y Cuero',
    icon: '👜',
    examples: 'Bolsas, cinturones, huaraches, talabartería',
  },
  paper: {
    label: 'Papel Artesanal',
    icon: '📄',
    examples: 'Papel amate, papel picado, cartón',
  },
  candles: {
    label: 'Velas y Jabones',
    icon: '🕯️',
    examples: 'Velas aromáticas, jabones artesanales',
  },
  food: {
    label: 'Alimentos Artesanales',
    icon: '🌮',
    examples: 'Chocolates, moles, mezcal, conservas',
  },
  crafts: {
    label: 'Manualidades',
    icon: '✂️',
    examples: 'Macramé, crochet, costura, bordado',
  },
  mixed: {
    label: 'Varios',
    icon: '🎨',
    examples: 'Múltiples categorías',
  },
  other: {
    label: 'Otros',
    icon: '✨',
    examples: 'Otras artesanías mexicanas',
  },
} as const;
