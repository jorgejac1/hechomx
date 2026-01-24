import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, User, Clock, ArrowRight, Search } from 'lucide-react';
import { ROUTES, formatDate } from '@/lib';
import { getBlogCategories, getBlogPosts } from '@/lib/data/blog-posts';

export const metadata: Metadata = {
  title: 'Blog | Papalote Market',
  description:
    'Descubre historias de artesanos, técnicas tradicionales y la cultura artesanal mexicana',
};

type BlogSearchParams = {
  category?: string | string[];
  page?: string | string[];
  q?: string | string[];
  subscribed?: string | string[];
  newsletterEmail?: string | string[];
};

function getParam(value?: string | string[]): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function buildQuery(params: Record<string, string | undefined>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val) searchParams.set(key, val);
  });
  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<BlogSearchParams>;
}) {
  const params = await searchParams;
  const posts = getBlogPosts();
  const categories = ['Todos', ...getBlogCategories()];

  const query = getParam(params?.q)?.trim() ?? '';
  const pageParam = Number(getParam(params?.page) ?? '1');
  const selectedCategory = (getParam(params?.category) ?? 'Todos').toString().trim();
  const subscribed = getParam(params?.subscribed) === 'true';
  const subscribedEmail = getParam(params?.newsletterEmail);

  const activeCategory =
    categories.find((category) => category.toLowerCase() === selectedCategory.toLowerCase()) ??
    'Todos';
  const normalizedQuery = query.toLowerCase();

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === 'Todos' || post.category === activeCategory;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;

    const haystack = [post.title, post.excerpt, post.author, post.category].join(' ').toLowerCase();
    return haystack.includes(normalizedQuery);
  });

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  const pageSize = 4;
  const totalPages = Math.max(1, Math.ceil(regularPosts.length / pageSize));
  const currentPage = Math.min(Math.max(pageParam || 1, 1), totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedPosts = regularPosts.slice(startIndex, startIndex + pageSize);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const baseQuery = {
    category: activeCategory !== 'Todos' ? activeCategory : undefined,
    q: query || undefined,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-linear-to-r from-primary-600 to-primary-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-white hover:text-primary-100 mb-6 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog de Papalote Market</h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            Historias, técnicas y cultura artesanal mexicana. Descubre el mundo detrás de cada pieza
            artesanal.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <form action={ROUTES.BLOG} method="get" className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Buscar por tema, autor o categoría"
                className="w-full pl-9 pr-4 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-200 dark:border-gray-700 focus:outline-hidden focus:ring-2 focus:ring-primary-500"
              />
            </div>
            {activeCategory !== 'Todos' && (
              <input type="hidden" name="category" value={activeCategory} />
            )}
            <button
              type="submit"
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Buscar
            </button>
          </form>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const href = `${ROUTES.BLOG}${buildQuery({
                category: category === 'Todos' ? undefined : category,
                q: query || undefined,
              })}`;

              return (
                <Link
                  key={category}
                  href={href}
                  scroll={false}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    category === activeCategory
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Artículos Destacados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={ROUTES.BLOG_POST(post.slug)}
                  className="block bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
                >
                  <article>
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
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {post.author}
                          </span>
                        </div>
                        <span className="text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 font-semibold text-sm flex items-center gap-1">
                          Leer más
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Recent Posts */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Artículos Recientes
            </h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {filteredPosts.length} resultados
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                No encontramos artículos con esos filtros.
              </p>
              <Link
                href={ROUTES.BLOG}
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold"
              >
                Limpiar filtros
              </Link>
            </div>
          ) : regularPosts.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                No hay artículos recientes para esta selección.
              </p>
              <Link
                href={ROUTES.BLOG}
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold"
              >
                Ver todos los artículos
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {paginatedPosts.map((post) => (
                <Link
                  key={post.id}
                  href={ROUTES.BLOG_POST(post.slug)}
                  className="block bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
                >
                  <article>
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
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.date, { month: 'short', day: 'numeric' })}
                        <span>•</span>
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <span className="text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 font-semibold text-sm flex items-center gap-1">
                        Leer más
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Newsletter Subscription */}
        <section className="mt-12 bg-linear-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg p-8 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Suscríbete a Nuestro Newsletter</h2>
            <p className="text-primary-100 mb-6">
              Recibe las últimas historias de artesanos, técnicas tradicionales y novedades del
              mundo artesanal mexicano directamente en tu correo.
            </p>
            {subscribed && (
              <div className="mb-4 rounded-lg bg-white/15 px-4 py-3 text-sm text-white">
                Gracias por suscribirte{subscribedEmail ? `, ${subscribedEmail}` : ''}. Pronto
                recibirás nuevas historias.
              </div>
            )}
            <form className="flex flex-col sm:flex-row gap-3" action={ROUTES.BLOG} method="get">
              <input
                type="email"
                name="newsletterEmail"
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border-2 border-white/20 dark:border-gray-600 focus:outline-hidden focus:ring-2 focus:ring-primary-300 dark:focus:ring-primary-400 focus:border-transparent"
              />
              <input type="hidden" name="subscribed" value="true" />
              <button
                type="submit"
                className="px-6 py-3 bg-white dark:bg-gray-100 text-primary-600 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-white transition"
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
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="flex flex-wrap gap-2">
              {currentPage > 1 && (
                <Link
                  href={`${ROUTES.BLOG}${buildQuery({
                    ...baseQuery,
                    page: String(currentPage - 1),
                  })}`}
                  scroll={false}
                  className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  ← Anterior
                </Link>
              )}

              {pageNumbers.map((page) => (
                <Link
                  key={page}
                  href={`${ROUTES.BLOG}${buildQuery({
                    ...baseQuery,
                    page: page === 1 ? undefined : String(page),
                  })}`}
                  scroll={false}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    page === currentPage
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {page}
                </Link>
              ))}

              {currentPage < totalPages && (
                <Link
                  href={`${ROUTES.BLOG}${buildQuery({
                    ...baseQuery,
                    page: String(currentPage + 1),
                  })}`}
                  scroll={false}
                  className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Siguiente →
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
