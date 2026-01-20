import { describe, it, expect } from 'vitest';
import { ROUTES, API_ROUTES } from '../routes';

describe('Routes Constants', () => {
  describe('ROUTES', () => {
    describe('Static routes', () => {
      it('should have home route', () => {
        expect(ROUTES.HOME).toBe('/');
      });

      it('should have products route', () => {
        expect(ROUTES.PRODUCTS).toBe('/productos');
      });

      it('should have cart route', () => {
        expect(ROUTES.CART).toBe('/carrito');
      });

      it('should have comparison route', () => {
        expect(ROUTES.COMPARISON).toBe('/comparar');
      });

      it('should have checkout route', () => {
        expect(ROUTES.CHECKOUT).toBe('/checkout');
      });

      it('should have about route', () => {
        expect(ROUTES.ABOUT).toBe('/nosotros');
      });

      it('should have contact route', () => {
        expect(ROUTES.CONTACT).toBe('/contacto');
      });
    });

    describe('Auth routes', () => {
      it('should have login route', () => {
        expect(ROUTES.LOGIN).toBe('/iniciar-sesion');
      });

      it('should have register route', () => {
        expect(ROUTES.REGISTER).toBe('/registro');
      });

      it('should have forgot password route', () => {
        expect(ROUTES.FORGOT_PASSWORD).toBe('/recuperar-password');
      });

      it('should have profile route', () => {
        expect(ROUTES.PROFILE).toBe('/perfil');
      });

      it('should have dashboard route', () => {
        expect(ROUTES.DASHBOARD).toBe('/dashboard');
      });

      it('should have orders route', () => {
        expect(ROUTES.ORDERS).toBe('/pedidos');
      });

      it('should have wishlist route', () => {
        expect(ROUTES.WISHLIST).toBe('/favoritos');
      });
    });

    describe('Dynamic route functions', () => {
      it('should generate product detail route', () => {
        expect(ROUTES.PRODUCT_DETAIL('123')).toBe('/productos/123');
        expect(ROUTES.PRODUCT_DETAIL('alebrije-oaxaca')).toBe('/productos/alebrije-oaxaca');
      });

      it('should generate shop detail route', () => {
        expect(ROUTES.SHOP_DETAIL('tejidos-sofia')).toBe('/tiendas/tejidos-sofia');
      });

      it('should generate product edit route', () => {
        expect(ROUTES.PRODUCT_EDIT('456')).toBe('/productos/editar/456');
      });

      it('should generate artisan story route', () => {
        expect(ROUTES.ARTISAN_STORY('sofia')).toBe('/artesano/sofia');
        expect(ROUTES.ARTISAN_STORY('pedro')).toBe('/artesano/pedro');
      });

      it('should generate blog post route', () => {
        expect(ROUTES.BLOG_POST('my-post')).toBe('/blog/my-post');
      });

      it('should generate edit product route (seller)', () => {
        expect(ROUTES.EDIT_PRODUCT('prod-123')).toBe('/productos/prod-123/editar');
      });

      it('should generate order detail route', () => {
        expect(ROUTES.ORDER_DETAIL('order-456')).toBe('/pedidos/order-456');
      });

      it('should generate admin verification detail route', () => {
        expect(ROUTES.ADMIN_VERIFICACION_DETAIL('ver-789')).toBe('/admin/verificaciones/ver-789');
      });
    });

    describe('Shop routes', () => {
      it('should have shop route', () => {
        expect(ROUTES.SHOP).toBe('/tienda');
      });

      it('should have shops listing route', () => {
        expect(ROUTES.SHOPS).toBe('/tiendas');
      });
    });

    describe('Product management routes', () => {
      it('should have product create route', () => {
        expect(ROUTES.PRODUCT_CREATE).toBe('/productos/crear');
      });

      it('should have product manage route', () => {
        expect(ROUTES.PRODUCT_MANAGE).toBe('/productos/gestionar');
      });
    });

    describe('Help & Support routes', () => {
      it('should have FAQ route', () => {
        expect(ROUTES.FAQ).toBe('/ayuda/faq');
      });

      it('should have shipping info route', () => {
        expect(ROUTES.SHIPPING_INFO).toBe('/ayuda/envios');
      });

      it('should have returns info route', () => {
        expect(ROUTES.RETURNS_INFO).toBe('/ayuda/devoluciones');
      });

      it('should have payment info route', () => {
        expect(ROUTES.PAYMENT_INFO).toBe('/ayuda/pagos');
      });
    });

    describe('Legal routes', () => {
      it('should have terms route', () => {
        expect(ROUTES.TERMS).toBe('/politicas/terminos');
      });

      it('should have privacy route', () => {
        expect(ROUTES.PRIVACY).toBe('/politicas/privacidad');
      });

      it('should have cookies route', () => {
        expect(ROUTES.COOKIES).toBe('/politicas/cookies');
      });
    });

    describe('Admin routes', () => {
      it('should have admin route', () => {
        expect(ROUTES.ADMIN).toBe('/admin');
      });

      it('should have admin verificaciones route', () => {
        expect(ROUTES.ADMIN_VERIFICACIONES).toBe('/admin/verificaciones');
      });

      it('should have admin usuarios route', () => {
        expect(ROUTES.ADMIN_USUARIOS).toBe('/admin/usuarios');
      });

      it('should have admin productos route', () => {
        expect(ROUTES.ADMIN_PRODUCTOS).toBe('/admin/productos');
      });
    });
  });

  describe('API_ROUTES', () => {
    it('should have products API route', () => {
      expect(API_ROUTES.PRODUCTS).toBe('/api/products');
    });

    it('should generate product API route', () => {
      expect(API_ROUTES.PRODUCT('123')).toBe('/api/products/123');
    });

    it('should have login API route', () => {
      expect(API_ROUTES.LOGIN).toBe('/api/auth/login');
    });

    it('should have register API route', () => {
      expect(API_ROUTES.REGISTER).toBe('/api/auth/register');
    });

    it('should have logout API route', () => {
      expect(API_ROUTES.LOGOUT).toBe('/api/auth/logout');
    });

    it('should have profile API route', () => {
      expect(API_ROUTES.PROFILE).toBe('/api/auth/profile');
    });

    it('should have verification API route', () => {
      expect(API_ROUTES.VERIFICATION).toBe('/api/seller/verification');
    });
  });
});
