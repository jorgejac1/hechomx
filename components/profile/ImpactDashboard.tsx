'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getBuyerImpact } from '@/lib/api/sellerApi';
import type { BuyerImpactData } from '@/lib/types/buyer';
import { formatCurrency, formatRelativeTime } from '@/lib';
import {
  Heart,
  Users,
  MapPin,
  Leaf,
  Award,
  TrendingUp,
  ShoppingBag,
  Star,
  Sparkles,
  TreePine,
  Loader2,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface ImpactDashboardProps {
  userEmail: string;
}

const MILESTONE_ICONS = {
  star: Star,
  users: Users,
  map: MapPin,
  award: Award,
  heart: Heart,
};

export default function ImpactDashboard({ userEmail }: ImpactDashboardProps) {
  const [data, setData] = useState<BuyerImpactData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const result = await getBuyerImpact(userEmail);
      setData(result);
      setIsLoading(false);
    }
    loadData();
  }, [userEmail]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center py-12">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Comienza tu Viaje</h3>
          <p className="text-gray-600 mb-6">
            Realiza tu primera compra para ver tu impacto en la comunidad artesanal
          </p>
          <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium">
            Explorar Productos
          </button>
        </div>
      </div>
    );
  }

  const memberSince = new Date(data.joinDate);
  const daysSince = Math.floor(
    (new Date().getTime() - memberSince.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-white/20 rounded-full">
            <Heart className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Tu Impacto</h2>
            <p className="text-primary-100">
              Apoyando artesanos mexicanos desde hace {daysSince} días
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-primary-100 text-sm mb-1">Total Invertido</p>
            <p className="text-2xl font-bold">{formatCurrency(data.totalSpent)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-primary-100 text-sm mb-1">Pedidos</p>
            <p className="text-2xl font-bold">{data.totalOrders}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-primary-100 text-sm mb-1">Artesanos</p>
            <p className="text-2xl font-bold">{data.artisansSupported}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-primary-100 text-sm mb-1">Estados</p>
            <p className="text-2xl font-bold">{data.statesRepresented}</p>
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Leaf className="w-6 h-6 text-green-600" />
          Impacto Ambiental
        </h3>
        <p className="text-gray-600 mb-6">
          Al elegir productos artesanales sobre producción masiva, contribuyes a un futuro más
          sostenible
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-green-600 rounded-full">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{data.impactMetrics.co2Saved} kg</p>
                <p className="text-sm text-gray-600">CO₂ ahorrado</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              vs. productos equivalentes de fabricación masiva
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-blue-600 rounded-full">
                <TreePine className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {data.impactMetrics.treesEquivalent}
                </p>
                <p className="text-sm text-gray-600">Árboles equivalentes</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">en absorción de CO₂ por año</p>
          </div>
        </div>
      </div>

      {/* Cultural Impact */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-600" />
          Impacto Cultural
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-200">
            <div className="flex items-center gap-3 mb-3">
              <Award className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {data.impactMetrics.traditionalTechniquesPreserved}
                </p>
                <p className="text-sm text-gray-600">Técnicas tradicionales preservadas</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              Cada compra apoya la continuidad de técnicas ancestrales mexicanas
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {data.impactMetrics.artisanFamiliesSupported}
                </p>
                <p className="text-sm text-gray-600">Familias artesanas apoyadas</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              Tu apoyo directo mejora la calidad de vida de familias mexicanas
            </p>
          </div>
        </div>
      </div>

      {/* Supported Artisans */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-600" />
          Artesanos que Apoyas ({data.artisansSupported})
        </h3>
        <div className="space-y-4">
          {data.supportedArtisans.map((artisan) => (
            <div
              key={artisan.id}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              {artisan.avatar ? (
                <Image
                  src={artisan.avatar}
                  alt={artisan.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              ) : (
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary-600" />
                </div>
              )}

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-gray-900">{artisan.name}</p>
                  <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full font-semibold">
                    {artisan.shopName}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {artisan.state}
                  </span>
                  <span>•</span>
                  <span>{artisan.specialty}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="bg-white rounded-lg px-3 py-1">
                    <span className="text-gray-600">Compras: </span>
                    <span className="font-bold text-gray-900">{artisan.purchaseCount}</span>
                  </div>
                  <div className="bg-white rounded-lg px-3 py-1">
                    <span className="text-gray-600">Total: </span>
                    <span className="font-bold text-primary-600">
                      {formatCurrency(artisan.totalSpent)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Cliente desde {formatRelativeTime(artisan.firstPurchase)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories & Milestones Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categories */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Tus Categorías Favoritas
          </h3>
          <div className="space-y-4">
            {data.topCategories.map((category, index) => (
              <div key={category.category}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-400">#{index + 1}</span>
                    <span className="text-sm font-semibold text-gray-900">{category.category}</span>
                  </div>
                  <span className="text-sm font-bold text-primary-600">
                    {category.count} compras
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-600" />
            Logros
          </h3>
          <div className="space-y-3">
            {data.milestones.map((milestone) => {
              const IconComponent =
                MILESTONE_ICONS[milestone.icon as keyof typeof MILESTONE_ICONS] || Star;
              return (
                <div
                  key={milestone.id}
                  className={`flex items-start gap-3 p-4 rounded-lg border-2 transition ${
                    milestone.achieved
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      milestone.achieved ? 'bg-yellow-600' : 'bg-gray-400'
                    }`}
                  >
                    {milestone.achieved ? (
                      <IconComponent className="w-5 h-5 text-white" />
                    ) : (
                      <Lock className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 mb-1">{milestone.title}</p>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                    {milestone.achieved && milestone.date && (
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Logrado {formatRelativeTime(milestone.date)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Purchases */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Compras Recientes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.recentPurchases.map((purchase) => (
            <div
              key={purchase.id}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <Image
                src={purchase.image}
                alt={purchase.productName}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-1">{purchase.productName}</p>
                <p className="text-sm text-gray-600 mb-2">{purchase.artisan}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-primary-600">
                    {formatCurrency(purchase.amount)}
                  </p>
                  <p className="text-xs text-gray-500">{formatRelativeTime(purchase.date)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
