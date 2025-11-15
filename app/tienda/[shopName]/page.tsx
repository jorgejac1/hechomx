import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getShopBySlug, getProductsByShop } from '@/lib/utils/shop';
import { getAllProducts } from '@/lib/server';
import ShopPageClient from '@/components/shop/ShopPageClient';

interface ShopPageProps {
  params: Promise<{ shopName: string }>;
}

export async function generateMetadata({ params }: ShopPageProps): Promise<Metadata> {
  const { shopName } = await params;
  const shop = getShopBySlug(shopName);

  if (!shop || !shop.makerProfile) {
    return {
      title: 'Tienda no encontrada',
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

  if (!shop || !shop.makerProfile) {
    notFound();
  }

  const allProducts = getAllProducts();
  const products = getProductsByShop(shopName, allProducts);

  return <ShopPageClient shop={shop} products={products} />;
}
