import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { ROUTES, formatDate } from '@/lib';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/data/blog-posts';

type BlogPostParams = {
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<BlogPostParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Artículo no encontrado | Papalote Market',
      description: 'El artículo que buscas no está disponible.',
    };
  }

  return {
    title: `${post.title} | Blog Papalote Market`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<BlogPostParams> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getBlogPosts();
  const relatedByCategory = allPosts.filter(
    (item) => item.slug !== post.slug && item.category === post.category
  );
  const relatedPosts = (
    relatedByCategory.length
      ? relatedByCategory
      : allPosts.filter((item) => item.slug !== post.slug)
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Link
          href={ROUTES.BLOG}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al blog
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="relative h-64 sm:h-80 md:h-96">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
              priority
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                {post.category}
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {post.title}
            </h1>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{post.excerpt}</p>

            <div className="space-y-5 text-gray-700 dark:text-gray-300">
              {post.content.map((paragraph, index) => (
                <p key={`${post.slug}-p-${index}`}>{paragraph}</p>
              ))}
            </div>

            {post.highlights && post.highlights.length > 0 && (
              <div className="mt-8 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Puntos clave
                </h2>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  {post.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Más historias para ti
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <article
                  key={related.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                        {related.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
                      <Calendar className="w-3 h-3" />
                      {formatDate(related.date, { month: 'short', day: 'numeric' })}
                      <span>•</span>
                      <Clock className="w-3 h-3" />
                      {related.readTime}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition">
                      {related.title}
                    </h3>
                    <Link
                      href={ROUTES.BLOG_POST(related.slug)}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold text-sm flex items-center gap-1"
                    >
                      Leer más
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
