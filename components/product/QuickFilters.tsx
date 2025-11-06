'use client';

import { useUrlState } from '@/hooks/common/useUrlState';
import { FILTER_PARAM_NAMES, FILTER_PARAM_VALUES } from '@/lib/constants/filters';
import { formatCurrency } from '@/lib';
import { DollarSign, Diamond, Star, CheckCircle } from 'lucide-react';

export default function QuickFilters() {
  const { searchParams, setUrlParams } = useUrlState('/productos');

  const isActive = (paramName: string, value: string) => {
    return searchParams.get(paramName) === value;
  };

  const handleQuickFilter = (paramName: string, value: string) => {
    const currentValue = searchParams.get(paramName);
    setUrlParams({
      [paramName]: currentValue === value ? undefined : value,
      [FILTER_PARAM_NAMES.PAGE]: undefined,
    });
  };

  const quickFilters = [
    {
      id: 'bajo-1000',
      label: `Menos de ${formatCurrency(1000)}`,
      icon: DollarSign,
      param: FILTER_PARAM_NAMES.PRICE,
      value: '1000',
    },
    {
      id: 'bajo-5000',
      label: `Menos de ${formatCurrency(5000)}`,
      icon: Diamond,
      param: FILTER_PARAM_NAMES.PRICE,
      value: '5000',
    },
    {
      id: 'destacados',
      label: 'Destacados',
      icon: Star,
      param: FILTER_PARAM_NAMES.FEATURED,
      value: FILTER_PARAM_VALUES.YES,
    },
    {
      id: 'verificados',
      label: 'Verificados',
      icon: CheckCircle,
      param: FILTER_PARAM_NAMES.VERIFIED,
      value: FILTER_PARAM_VALUES.YES,
    },
  ];

  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {quickFilters.map((filter) => {
        const Icon = filter.icon;
        const active = isActive(filter.param, filter.value);

        return (
          <button
            key={filter.id}
            onClick={() => handleQuickFilter(filter.param, filter.value)}
            className={`inline-flex items-center gap-2 px-4 py-2 border-2 rounded-full text-sm font-medium transition-all ${
              active
                ? 'border-primary-600 bg-primary-50 text-primary-700'
                : 'border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50'
            }`}
          >
            <Icon className="w-4 h-4" />
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
