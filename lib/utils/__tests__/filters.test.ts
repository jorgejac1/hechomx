import { describe, it, expect } from 'vitest';
import {
  buildProductsUrl,
  getFilterParamFromType,
  removeFilterParam,
  buildFilterParams,
} from '../filters';

describe('Filter Utilities', () => {
  describe('buildProductsUrl', () => {
    it('should build URL with single parameter', () => {
      const url = buildProductsUrl({ categoria: 'Joyería' });
      expect(url).toBe('/productos?categoria=Joyer%C3%ADa');
    });

    it('should build URL with multiple parameters', () => {
      const url = buildProductsUrl({
        categoria: 'Arte',
        estado: 'Oaxaca',
      });
      expect(url).toContain('categoria=Arte');
      expect(url).toContain('estado=Oaxaca');
    });

    it('should skip undefined parameters', () => {
      const url = buildProductsUrl({
        categoria: 'Arte',
        estado: undefined,
      });
      expect(url).toBe('/productos?categoria=Arte');
    });

    it('should skip null parameters', () => {
      const url = buildProductsUrl({
        categoria: 'Arte',
        estado: null as unknown as string,
      });
      expect(url).toBe('/productos?categoria=Arte');
    });

    it('should skip empty string parameters', () => {
      const url = buildProductsUrl({
        categoria: 'Arte',
        estado: '',
      });
      expect(url).toBe('/productos?categoria=Arte');
    });

    it('should return base URL when all params are empty', () => {
      const url = buildProductsUrl({});
      expect(url).toBe('/productos');
    });

    it('should use custom base URL', () => {
      const url = buildProductsUrl({ categoria: 'Arte' }, '/tienda');
      expect(url).toBe('/tienda?categoria=Arte');
    });

    it('should remove page parameter', () => {
      const url = buildProductsUrl({
        categoria: 'Arte',
        pagina: '2',
      });
      // Page param should be removed
      expect(url).not.toContain('pagina');
    });
  });

  describe('getFilterParamFromType', () => {
    it('should return correct param for featured', () => {
      expect(getFilterParamFromType('featured')).toBe('destacado');
    });

    it('should return correct param for verified', () => {
      expect(getFilterParamFromType('verified')).toBe('verificado');
    });

    it('should return correct param for inStock', () => {
      expect(getFilterParamFromType('inStock')).toBe('enstock');
    });

    it('should return correct param for price', () => {
      expect(getFilterParamFromType('price')).toBe('precio');
    });
  });

  describe('removeFilterParam', () => {
    it('should remove featured filter param', () => {
      const params = new URLSearchParams('destacado=si&categoria=Arte');
      const result = removeFilterParam(params, 'featured');
      expect(result.has('destacado')).toBe(false);
      expect(result.get('categoria')).toBe('Arte');
    });

    it('should remove verified filter param', () => {
      const params = new URLSearchParams('verificado=si&estado=Oaxaca');
      const result = removeFilterParam(params, 'verified');
      expect(result.has('verificado')).toBe(false);
      expect(result.get('estado')).toBe('Oaxaca');
    });

    it('should remove inStock filter param', () => {
      const params = new URLSearchParams('enstock=si&q=alebrije');
      const result = removeFilterParam(params, 'inStock');
      expect(result.has('enstock')).toBe(false);
      expect(result.get('q')).toBe('alebrije');
    });

    it('should remove price filter param', () => {
      const params = new URLSearchParams('precio=500&categoria=Joyería');
      const result = removeFilterParam(params, 'price');
      expect(result.has('precio')).toBe(false);
      expect(result.get('categoria')).toBe('Joyería');
    });

    it('should not affect other params', () => {
      const params = new URLSearchParams('destacado=si&verificado=si&categoria=Arte');
      const result = removeFilterParam(params, 'featured');
      expect(result.has('destacado')).toBe(false);
      expect(result.get('verificado')).toBe('si');
      expect(result.get('categoria')).toBe('Arte');
    });

    it('should return new URLSearchParams instance', () => {
      const params = new URLSearchParams('destacado=si');
      const result = removeFilterParam(params, 'featured');
      expect(result).not.toBe(params);
    });
  });

  describe('buildFilterParams', () => {
    const defaultFilters = {
      categories: [],
      states: [],
      materials: [],
      priceRange: { min: 0, max: 10000 },
      minRating: 0,
      inStock: null,
      verified: null,
      featured: null,
      sortBy: 'relevance',
    };
    const defaultPriceMax = 10000;

    it('should return empty params for default filters', () => {
      const params = buildFilterParams(defaultFilters, defaultPriceMax);
      expect(params.toString()).toBe('');
    });

    it('should add category param', () => {
      const filters = { ...defaultFilters, categories: ['Joyería'] };
      const params = buildFilterParams(filters, defaultPriceMax);
      expect(params.get('categoria')).toBe('Joyería');
    });

    it('should add state param', () => {
      const filters = { ...defaultFilters, states: ['Oaxaca'] };
      const params = buildFilterParams(filters, defaultPriceMax);
      expect(params.get('estado')).toBe('Oaxaca');
    });

    it('should add multiple material params', () => {
      const filters = { ...defaultFilters, materials: ['Plata', 'Oro', 'Cobre'] };
      const params = buildFilterParams(filters, defaultPriceMax);
      const materials = params.getAll('material');
      expect(materials).toEqual(['Plata', 'Oro', 'Cobre']);
    });

    it('should add single material param', () => {
      const filters = { ...defaultFilters, materials: ['Barro'] };
      const params = buildFilterParams(filters, defaultPriceMax);
      const materials = params.getAll('material');
      expect(materials).toEqual(['Barro']);
    });

    it('should not add material params when empty', () => {
      const filters = { ...defaultFilters, materials: [] };
      const params = buildFilterParams(filters, defaultPriceMax);
      expect(params.getAll('material')).toEqual([]);
    });

    it('should add price param only when below max', () => {
      const filters = { ...defaultFilters, priceRange: { min: 0, max: 5000 } };
      const params = buildFilterParams(filters, defaultPriceMax);
      expect(params.get('precio')).toBe('5000');
    });

    it('should not add price param when at max', () => {
      const filters = { ...defaultFilters, priceRange: { min: 0, max: 10000 } };
      const params = buildFilterParams(filters, defaultPriceMax);
      expect(params.has('precio')).toBe(false);
    });

    it('should add sort param when not default', () => {
      const filters = { ...defaultFilters, sortBy: 'price_asc' };
      const params = buildFilterParams(filters, defaultPriceMax);
      expect(params.get('ordenar')).toBe('price_asc');
    });

    it('should not add sort param for default relevance', () => {
      const params = buildFilterParams(defaultFilters, defaultPriceMax);
      expect(params.has('ordenar')).toBe(false);
    });

    it('should add inStock param when true', () => {
      const filters = { ...defaultFilters, inStock: true };
      const params = buildFilterParams(filters, defaultPriceMax);
      expect(params.get('enstock')).toBe('si');
    });

    it('should not add inStock param when null', () => {
      const params = buildFilterParams(defaultFilters, defaultPriceMax);
      expect(params.has('enstock')).toBe(false);
    });

    it('should add verified param when true', () => {
      const filters = { ...defaultFilters, verified: true };
      const params = buildFilterParams(filters, defaultPriceMax);
      expect(params.get('verificado')).toBe('si');
    });

    it('should add featured param when true', () => {
      const filters = { ...defaultFilters, featured: true };
      const params = buildFilterParams(filters, defaultPriceMax);
      expect(params.get('destacado')).toBe('si');
    });

    it('should preserve existing query param', () => {
      const existingParams = new URLSearchParams('q=alebrije');
      const params = buildFilterParams(defaultFilters, defaultPriceMax, existingParams);
      expect(params.get('q')).toBe('alebrije');
    });

    it('should preserve existing subcategory param', () => {
      const existingParams = new URLSearchParams('subcategoria=Anillos');
      const params = buildFilterParams(defaultFilters, defaultPriceMax, existingParams);
      expect(params.get('subcategoria')).toBe('Anillos');
    });

    it('should combine multiple filters', () => {
      const filters = {
        ...defaultFilters,
        categories: ['Arte'],
        states: ['Jalisco'],
        materials: ['Vidrio', 'Metal'],
        priceRange: { min: 0, max: 3000 },
        verified: true,
        sortBy: 'price_desc',
      };
      const params = buildFilterParams(filters, defaultPriceMax);

      expect(params.get('categoria')).toBe('Arte');
      expect(params.get('estado')).toBe('Jalisco');
      expect(params.getAll('material')).toEqual(['Vidrio', 'Metal']);
      expect(params.get('precio')).toBe('3000');
      expect(params.get('verificado')).toBe('si');
      expect(params.get('ordenar')).toBe('price_desc');
    });
  });
});
