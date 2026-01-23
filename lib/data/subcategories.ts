/**
 * @fileoverview Product subcategory data and navigation structure.
 * Defines hierarchical subcategories for main product categories
 * with images, counts, and nested sub-subcategories for filtering.
 * @module lib/data/subcategories
 */

export interface Subcategory {
  name: string;
  slug: string;
  image: string;
  count?: number;
  children?: Subcategory[];
}

export const subcategoriesByCategory: Record<string, Subcategory[]> = {
  Accesorios: [
    {
      name: 'Bufandas y Chales',
      slug: 'bufandas-chales',
      image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=200',
      count: 156,
      children: [
        {
          name: 'Bufandas',
          slug: 'bufandas',
          image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=200',
          count: 89,
        },
        {
          name: 'Chales',
          slug: 'chales',
          image: 'https://images.unsplash.com/photo-1591369822096-fad4b1860856?w=200',
          count: 67,
        },
      ],
    },
    {
      name: 'Accesorios para el Cabello',
      slug: 'cabello',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200',
      count: 203,
      children: [
        {
          name: 'Diademas',
          slug: 'diademas',
          image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200',
          count: 78,
        },
        {
          name: 'Pasadores',
          slug: 'pasadores',
          image: 'https://images.unsplash.com/photo-1583662018970-e09d61788e61?w=200',
          count: 125,
        },
      ],
    },
    {
      name: 'Llaveros',
      slug: 'llaveros',
      image: 'https://images.unsplash.com/photo-1582845512747-e42001c95638?w=200',
      count: 145,
    },
  ],
  Joyería: [
    {
      name: 'Collares',
      slug: 'collares',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200',
      count: 245,
      children: [
        {
          name: 'Collares Largos',
          slug: 'collares-largos',
          image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200',
          count: 120,
        },
        {
          name: 'Collares Cortos',
          slug: 'collares-cortos',
          image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200',
          count: 125,
        },
      ],
    },
    {
      name: 'Aretes',
      slug: 'aretes',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200',
      count: 189,
    },
    {
      name: 'Pulseras',
      slug: 'pulseras',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200',
      count: 156,
    },
    {
      name: 'Anillos',
      slug: 'anillos',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200',
      count: 203,
    },
  ],
  Ropa: [
    {
      name: 'Blusas',
      slug: 'blusas',
      image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=200',
      count: 178,
    },
    {
      name: 'Vestidos',
      slug: 'vestidos',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200',
      count: 145,
    },
    {
      name: 'Huipiles',
      slug: 'huipiles',
      image: 'https://images.unsplash.com/photo-1584184924103-e310e9892b13?w=200',
      count: 92,
    },
    {
      name: 'Rebozos',
      slug: 'rebozos',
      image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=200',
      count: 76,
    },
  ],
  Arte: [
    {
      name: 'Alebrijes',
      slug: 'alebrijes',
      image: 'https://images.unsplash.com/photo-1582845512747-e42001c95638?w=200',
      count: 89,
    },
    {
      name: 'Máscaras',
      slug: 'mascaras',
      image: 'https://images.unsplash.com/photo-1567696153798-8085ed6c31b9?w=200',
      count: 67,
    },
    {
      name: 'Pinturas',
      slug: 'pinturas',
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=200',
      count: 124,
    },
  ],
  'Decoración del Hogar': [
    {
      name: 'Jarrones',
      slug: 'jarrones',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=200',
      count: 94,
    },
    {
      name: 'Velas',
      slug: 'velas',
      image: 'https://images.unsplash.com/photo-1602874801006-36c6b8c486d5?w=200',
      count: 156,
    },
    {
      name: 'Textiles',
      slug: 'textiles',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=200',
      count: 203,
    },
    {
      name: 'Talavera',
      slug: 'talavera',
      image: 'https://images.unsplash.com/photo-1586985564150-1ad0421d2cbb?w=200',
      count: 87,
    },
  ],
  Cocina: [
    {
      name: 'Platos',
      slug: 'platos',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200',
      count: 145,
    },
    {
      name: 'Tazas',
      slug: 'tazas',
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=200',
      count: 178,
    },
    {
      name: 'Molcajetes',
      slug: 'molcajetes',
      image: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=200',
      count: 67,
    },
  ],
};

export function getSubcategories(category: string): Subcategory[] {
  return subcategoriesByCategory[category] || [];
}

export function getSubSubcategories(category: string, subcategorySlug: string): Subcategory[] {
  const subcategories = getSubcategories(category);
  const subcategory = subcategories.find((s) => s.slug === subcategorySlug);
  return subcategory?.children || [];
}

export function getCategoryConfig(category: string) {
  return {
    category,
    subcategories: getSubcategories(category),
    count: getSubcategories(category).reduce((sum, sub) => sum + (sub.count || 0), 0),
  };
}

export function getAllSubcategories(): Subcategory[] {
  return Object.values(subcategoriesByCategory).flat();
}
