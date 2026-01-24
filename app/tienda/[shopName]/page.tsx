import { Metadata } from 'next';
import { getShopBySlug, getProductsByShop } from '@/lib/utils/shop';
import { getAllProducts } from '@/lib/server';
import ShopPageClient from '@/components/shop/ShopPageClient';
import DynamicShopPage from '@/components/shop/DynamicShopPage';

interface ShopPageProps {
  params: Promise<{ shopName: string }>;
}

export async function generateMetadata({ params }: ShopPageProps): Promise<Metadata> {
  const { shopName } = await params;
  const shop = getShopBySlug(shopName);

  if (!shop || !shop.makerProfile) {
    return {
      title: 'Mi Tienda - Papalote Market',
    };
  }

  return {
    title: `${shop.makerProfile.shopName} - Papalote Market`,
    description: shop.makerProfile.description,
  };
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { shopName } = await params;
  const shop = getShopBySlug(shopName);

  // If shop not found in mock data, use client component to check localStorage
  if (!shop || !shop.makerProfile) {
    return <DynamicShopPage shopSlug={shopName} />;
  }

  const allProducts = getAllProducts();
  const products = getProductsByShop(shopName, allProducts);

  return <ShopPageClient shop={shop} products={products} />;
}
