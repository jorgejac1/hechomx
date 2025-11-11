import { DollarSign, ShoppingBag, Star, MessageSquare } from 'lucide-react';

interface StatsGridProps {
  stats: {
    salesCount: number;
    productsCount: number;
    rating: number;
    reviewsCount: number;
    responseRate: number;
  };
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const cards = [
    {
      icon: DollarSign,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      value: stats.salesCount,
      label: 'Ventas Totales',
    },
    {
      icon: ShoppingBag,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      value: stats.productsCount,
      label: 'Productos',
    },
    {
      icon: Star,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      value: stats.rating.toFixed(1),
      label: `${stats.reviewsCount} reseñas`,
    },
    {
      icon: MessageSquare,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      value: `${stats.responseRate}%`,
      label: 'Tasa de respuesta',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-3 ${card.bgColor} rounded-lg`}>
                <Icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-sm text-gray-600">{card.label}</p>
          </div>
        );
      })}
    </div>
  );
}
