import Image from 'next/image';
import { Heart } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  shopName: string;
  location: string;
  testimonial: string;
  monthlySales: string;
  avatarUrl?: string;
  initials: string;
  gradientFrom: string;
  gradientTo: string;
}

export default function TestimonialCard({
  name,
  shopName,
  location,
  testimonial,
  monthlySales,
  avatarUrl,
  initials,
  gradientFrom,
  gradientTo,
}: TestimonialCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6 hover:shadow-xl dark:hover:shadow-gray-900/70 transition">
      <div className="flex items-center gap-3 mb-4">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={name}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        ) : (
          <div
            className={`w-12 h-12 bg-linear-to-br ${gradientFrom} ${gradientTo} rounded-full flex items-center justify-center text-white font-bold text-lg`}
          >
            {initials}
          </div>
        )}
        <div>
          <p className="font-bold text-gray-900 dark:text-gray-100">{name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {shopName} - {location}
          </p>
        </div>
      </div>
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Heart key={i} className="w-4 h-4 text-red-500 fill-red-500" />
        ))}
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic mb-3">{testimonial}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Ventas mensuales:{' '}
        <span className="font-bold text-green-600 dark:text-green-400">{monthlySales}</span>
      </p>
    </div>
  );
}
