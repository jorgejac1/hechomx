import { Product } from '@/types';
import { User } from '@/contexts/AuthContext';
import { MOCK_SELLER_USERS } from '@/lib/data/mockUsers';

/**
 * Mapping between product maker names and shop names
 */
const MAKER_TO_SHOP_MAP: Record<string, string> = {
  'Taller de Barro Negro': 'alebrijes-don-pedro',
  'Alebrijes Don Pedro': 'alebrijes-don-pedro',
  'Alfarería San Bartolo': 'alebrijes-don-pedro',
  'Plata Oaxaqueña': 'tejidos-sofia',
  'Bordados Tradicionales': 'tejidos-sofia',
  'Textiles Oaxaqueños': 'tejidos-sofia',
  'Bordados Oaxaqueños': 'tejidos-sofia',
  'Arte Popular Mexicano': 'alebrijes-don-pedro',
  'Artesanos de Pátzcuaro': 'artesanias-de-mexico',
  'Cerámica Uriarte': 'artesanias-de-mexico',
  'Talavera Uriarte': 'artesanias-de-mexico',
  'Platería Taxco': 'artesanias-de-mexico',
  'Hamacas Mérida': 'artesanias-de-mexico',
  'Telares de Santa Clara': 'tejidos-sofia',
  'Aromas Mexicanos': 'artesanias-de-mexico',
  'Arte Huichol': 'artesanias-de-mexico',
  'Arte Contemporáneo MX': 'artesanias-de-mexico',
  'Platería del Centro': 'artesanias-de-mexico',
  'Canteras Mexicanas': 'artesanias-de-mexico',
  'Telares Tradicionales': 'tejidos-sofia',
  'Joyería Artesanal MX': 'artesanias-de-mexico',
  'Cerámica de Tonalá': 'artesanias-de-mexico',
  'Artesanas Mayas': 'tejidos-sofia',
  'Plata Filigrana': 'artesanias-de-mexico',
};

/**
 * Get shop URL slug from shop name
 */
export function getShopSlug(shopName: string): string {
  return shopName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/**
 * Get shop by slug
 */
export function getShopBySlug(slug: string): User | null {
  const normalizedSlug = getShopSlug(slug);
  const shops = Object.values(MOCK_SELLER_USERS);

  return (
    shops.find((shop) => {
      const shopSlug = getShopSlug(shop.makerProfile?.shopName || '');
      return shopSlug === normalizedSlug;
    }) || null
  );
}

/**
 * Get all products for a specific shop
 * @param shopSlug - The shop's URL slug
 * @param allProducts - All products to filter from
 */
export function getProductsByShop(shopSlug: string, allProducts: Product[]): Product[] {
  const shop = getShopBySlug(shopSlug);

  if (!shop || !shop.makerProfile) {
    return [];
  }

  const shopName = shop.makerProfile.shopName;

  // Filter products where maker exactly matches shop name
  return allProducts.filter((product) => product.maker === shopName);
}

/**
 * Get shop URL from product maker name
 */
export function getShopUrlFromMaker(makerName: string): string | null {
  const shopSlug = MAKER_TO_SHOP_MAP[makerName];
  return shopSlug ? `/tienda/${shopSlug}` : null;
}

/**
 * Check if a maker has a shop
 */
export function hasShop(makerName: string): boolean {
  return makerName in MAKER_TO_SHOP_MAP;
}

/**
 * Get all available shops
 */
export function getAllShops(): User[] {
  return Object.values(MOCK_SELLER_USERS).filter((user) => user.makerProfile);
}
