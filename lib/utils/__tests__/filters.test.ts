import { describe, it, expect } from 'vitest';
import { buildProductsUrl, getFilterParamFromType, removeFilterParam } from '../filters';

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
});
