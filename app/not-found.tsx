import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">Página no encontrada</h2>

        <p className="text-gray-600 mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
          >
            Ir al inicio
          </Link>
          <Link
            href="/productos"
            className="inline-block px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-primary-500 hover:text-primary-600 transition font-medium"
          >
            Ver productos
          </Link>
        </div>
      </div>
    </div>
  );
}
