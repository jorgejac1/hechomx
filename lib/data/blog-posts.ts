/**
 * @fileoverview Mock blog posts data and helpers.
 * Provides lightweight data access for blog list and detail pages.
 * @module lib/data/blog-posts
 */

import type { BlogPost } from '@/lib/types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'talavera-puebla-tradicion',
    title: 'La Talavera de Puebla: 500 Años de Tradición',
    excerpt:
      'Descubre la historia y el proceso detrás de una de las artesanías más emblemáticas de México, reconocida por la UNESCO como Patrimonio Cultural Inmaterial de la Humanidad.',
    content: [
      'La talavera poblana es una técnica de cerámica vidriada que llegó a México en el siglo XVI. Con el paso del tiempo, los artesanos locales integraron colores, símbolos y procesos propios que hoy la distinguen en todo el mundo.',
      'Cada pieza atraviesa múltiples etapas: modelado, primera cocción, esmaltado, decoración a mano y una segunda cocción. El resultado es una obra única, con variaciones sutiles que hablan de la mano de quien la creó.',
      'En Puebla, los talleres familiares mantienen viva esta tradición, formando nuevas generaciones de artesanos y conservando recetas de esmaltes que han pasado de padres a hijos.',
    ],
    highlights: [
      'Técnica introducida en el siglo XVI',
      'Doble cocción y decoración a mano',
      'Reconocimiento UNESCO',
    ],
    author: 'María González',
    date: '2024-11-10',
    readTime: '8 min',
    category: 'Cerámica',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80',
    featured: true,
  },
  {
    id: '2',
    slug: 'alebrijes-oaxaca-arte-color',
    title: 'Alebrijes de Oaxaca: Arte y Color que Cobran Vida',
    excerpt:
      'Conoce a los maestros artesanos que dan vida a estas fantásticas criaturas llenas de color y significado, símbolos de la creatividad mexicana.',
    content: [
      'Los alebrijes son figuras talladas en madera de copal, pintadas con patrones detallados y colores vibrantes. Cada artesano interpreta la pieza a su manera, combinando animales reales y seres imaginarios.',
      'En Oaxaca, la tradición se ha fortalecido gracias a talleres comunitarios que enseñan a jóvenes las técnicas de talla y pintura. El resultado es una expresión artística única, profundamente arraigada en la identidad local.',
    ],
    highlights: ['Madera de copal', 'Pintura a mano', 'Simbolismo comunitario'],
    author: 'Carlos Hernández',
    date: '2024-11-08',
    readTime: '6 min',
    category: 'Madera',
    image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=800&q=80',
    featured: true,
  },
  {
    id: '3',
    slug: 'textiles-chiapas-telar-cintura',
    title: 'Textiles de Chiapas: El Arte del Telar de Cintura',
    excerpt:
      'Una técnica milenaria que se transmite de generación en generación. Conoce el proceso detrás de los hermosos textiles chiapanecos.',
    content: [
      'El telar de cintura es una técnica ancestral utilizada por comunidades indígenas en Chiapas. La tejedora utiliza su propio cuerpo como soporte para tensar los hilos y crear patrones complejos.',
      'Cada prenda cuenta una historia: colores, símbolos y figuras que representan el entorno, la cosmovisión y la identidad de cada comunidad.',
    ],
    highlights: ['Técnica ancestral', 'Patrones simbólicos', 'Trabajo artesanal'],
    author: 'Ana Martínez',
    date: '2024-11-05',
    readTime: '7 min',
    category: 'Textiles',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
    featured: true,
  },
  {
    id: '4',
    slug: 'plata-taxco-tradicion-minera',
    title: 'La Plata de Taxco: Tradición Minera y Orfebrería',
    excerpt:
      'Taxco es sinónimo de plata de calidad mundial. Explora la historia y el arte detrás de las joyas más codiciadas de México.',
    content: [
      'Taxco, Guerrero, es uno de los centros de orfebrería más importantes del país. Sus talleres combinan técnicas tradicionales con diseños contemporáneos.',
      'El trabajo en plata requiere precisión, paciencia y experiencia. Cada pieza se pule a mano hasta lograr su brillo característico.',
    ],
    author: 'Roberto Silva',
    date: '2024-11-02',
    readTime: '5 min',
    category: 'Joyería',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80',
    featured: false,
  },
  {
    id: '5',
    slug: 'barro-negro-oaxaca',
    title: 'Barro Negro de Oaxaca: Técnica Ancestral de Cocción',
    excerpt:
      'Descubre cómo los artesanos de San Bartolo Coyotepec crean estas piezas únicas con una técnica de cocción de más de mil años.',
    content: [
      'El barro negro se obtiene mediante una técnica de cocción que transforma el color de la arcilla. El pulido previo y el control del oxígeno en el horno son claves para su acabado brillante.',
      'Las piezas pueden ser utilitarias o decorativas, pero todas comparten una textura y color inconfundibles.',
    ],
    author: 'Laura Ramírez',
    date: '2024-10-28',
    readTime: '6 min',
    category: 'Cerámica',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80',
    featured: false,
  },
  {
    id: '6',
    slug: 'papel-picado-tradicion-mexicana',
    title: 'Papel Picado: Una Tradición que Flota en el Aire',
    excerpt:
      'El arte de transformar papel en delicadas obras de arte que decoran nuestras celebraciones más importantes.',
    content: [
      'El papel picado se elabora cortando patrones detallados con cinceles y plantillas. Es un símbolo común en fiestas populares y celebraciones.',
      'Cada diseño refleja temas tradicionales como flores, aves y escenas festivas, combinando color y movimiento.',
    ],
    author: 'José Torres',
    date: '2024-10-25',
    readTime: '4 min',
    category: 'Papel',
    image: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=800&q=80',
    featured: false,
  },
  {
    id: '7',
    slug: 'huichol-arte-cuentas',
    title: 'Arte Huichol: El Lenguaje Sagrado de las Cuentas',
    excerpt:
      'Cada pieza cuenta una historia espiritual. Conoce el significado detrás del arte Huichol y su importancia cultural.',
    content: [
      'El arte huichol utiliza cuentas de vidrio para crear mosaicos vibrantes con símbolos sagrados. Cada pieza representa relatos ancestrales y conexiones con la naturaleza.',
      'Las figuras de venados, mazorcas y el sol son comunes y se consideran protectores espirituales.',
    ],
    highlights: ['Simbolismo espiritual', 'Mosaicos de cuentas', 'Iconografía tradicional'],
    author: 'Diana Flores',
    date: '2024-10-22',
    readTime: '9 min',
    category: 'Arte Indígena',
    image: 'https://images.unsplash.com/photo-1582739542921-2c8d9113e5c2?w=800&q=80',
    featured: false,
  },
  {
    id: '8',
    slug: 'cuero-leon-guanajuato',
    title: 'Cuero de León: Capital del Calzado Artesanal',
    excerpt:
      'León, Guanajuato es reconocido mundialmente por su calidad en productos de cuero. Descubre por qué.',
    content: [
      'La ciudad de León es famosa por su industria del cuero. En talleres familiares, los artesanos seleccionan materiales de alta calidad y trabajan cada pieza con detalle.',
      'El resultado son productos duraderos y elegantes que combinan tradición y diseño contemporáneo.',
    ],
    author: 'Miguel Sánchez',
    date: '2024-10-18',
    readTime: '5 min',
    category: 'Cuero',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
    featured: false,
  },
];

export function getBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogCategories(): string[] {
  return Array.from(new Set(blogPosts.map((post) => post.category)));
}
