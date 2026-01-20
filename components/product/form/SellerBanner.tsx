import { Store } from 'lucide-react';

interface SellerBannerProps {
  shopName: string;
}

export default function SellerBanner({ shopName }: SellerBannerProps) {
  return (
    <div className="bg-linear-to-r from-primary-50 to-primary-100 rounded-xl p-4 border-2 border-primary-200">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-600 rounded-lg">
          <Store className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Publicando producto en:</p>
          <p className="font-bold text-gray-900">{shopName}</p>
        </div>
      </div>
    </div>
  );
}
