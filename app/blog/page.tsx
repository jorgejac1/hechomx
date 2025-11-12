import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/lib';

export const metadata: Metadata = {
  title: 'Blog | Hecho en México',
  description:
    'Descubre historias de artesanos, técnicas tradicionales y la cultura artesanal mexicana',
};

// Mock blog posts data
const blogPosts = [
  {
    id: '1',
    slug: 'talavera-puebla-tradicion',
    title: 'La Talavera de Puebla: 500 Años de Tradición',
    excerpt:
      'Descubre la historia y el proceso detrás de una de las artesanías más emblemáticas de México, reconocida por la UNESCO como Patrimonio Cultural Inmaterial de la Humanidad.',
    content: '',
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
    content: '',
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
    content: '',
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
    content: '',
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
    content: '',
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
    content: '',
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
    content: '',
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
    content: '',
    author: 'Miguel Sánchez',
    date: '2024-10-18',
    readTime: '5 min',
    category: 'Cuero',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
    featured: false,
  },
];

const categories = [
  'Todos',
  'Cerámica',
  'Textiles',
  'Madera',
  'Joyería',
  'Cuero',
  'Arte Indígena',
  'Papel',
];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-white hover:text-primary-100 mb-6 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog de Hecho en México</h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            Historias, técnicas y cultura artesanal mexicana. Descubre el mundo detrás de cada pieza
            artesanal.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  category === 'Todos'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Artículos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString('es-MX', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{post.author}</span>
                    </div>
                    <Link
                      href={`${ROUTES.BLOG}/${post.slug}`}
                      className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1"
                    >
                      Leer más
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Recent Posts */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Artículos Recientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regularPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString('es-MX', {
                      month: 'short',
                      day: 'numeric',
                    })}
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                  <Link
                    href={`${ROUTES.BLOG}/${post.slug}`}
                    className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1"
                  >
                    Leer más
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="mt-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg p-8 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Suscríbete a Nuestro Newsletter</h2>
            <p className="text-primary-100 mb-6">
              Recibe las últimas historias de artesanos, técnicas tradicionales y novedades del
              mundo artesanal mexicano directamente en tu correo.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Suscribirme
              </button>
            </form>
            <p className="text-xs text-primary-200 mt-4">
              Al suscribirte, aceptas recibir nuestros correos. Puedes darte de baja en cualquier
              momento.
            </p>
          </div>
        </section>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold">
              1
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition">
              2
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition">
              3
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition">
              Siguiente →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
