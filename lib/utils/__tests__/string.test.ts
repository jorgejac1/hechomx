import { describe, it, expect } from 'vitest';
import {
  capitalize,
  capitalizeWords,
  slugify,
  unslugify,
  truncate,
  truncateWords,
  stripHtml,
  getInitials,
  formatPhoneNumber,
  pluralize,
  formatCount,
} from '../string';

describe('String Utilities', () => {
  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should handle already capitalized string', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle single character', () => {
      expect(capitalize('a')).toBe('A');
    });

    it('should not change rest of string', () => {
      expect(capitalize('hELLO')).toBe('HELLO');
    });
  });

  describe('capitalizeWords', () => {
    it('should capitalize each word', () => {
      expect(capitalizeWords('hello world')).toBe('Hello World');
    });

    it('should handle single word', () => {
      expect(capitalizeWords('hello')).toBe('Hello');
    });

    it('should handle multiple spaces', () => {
      expect(capitalizeWords('hello  world')).toBe('Hello  World');
    });

    it('should handle Spanish names', () => {
      expect(capitalizeWords('juan pérez garcía')).toBe('Juan Pérez García');
    });
  });

  describe('slugify', () => {
    it('should convert to lowercase', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('should replace spaces with hyphens', () => {
      expect(slugify('hello world')).toBe('hello-world');
    });

    it('should remove accents', () => {
      expect(slugify('Café México')).toBe('cafe-mexico');
    });

    it('should remove special characters', () => {
      expect(slugify('hello@world!')).toBe('helloworld');
    });

    it('should handle multiple spaces', () => {
      expect(slugify('hello   world')).toBe('hello-world');
    });

    it('should handle multiple hyphens', () => {
      expect(slugify('hello---world')).toBe('hello-world');
    });

    it('should handle Spanish characters', () => {
      expect(slugify('Artesanía Oaxaqueña')).toBe('artesania-oaxaquena');
    });
  });

  describe('unslugify', () => {
    it('should convert slug to readable text', () => {
      expect(unslugify('hello-world')).toBe('Hello World');
    });

    it('should handle single word', () => {
      expect(unslugify('hello')).toBe('Hello');
    });

    it('should capitalize each word', () => {
      expect(unslugify('artesania-mexicana')).toBe('Artesania Mexicana');
    });
  });

  describe('truncate', () => {
    it('should truncate long strings', () => {
      expect(truncate('Hello World', 8)).toBe('Hello...');
    });

    it('should not truncate short strings', () => {
      expect(truncate('Hello', 10)).toBe('Hello');
    });

    it('should use custom suffix', () => {
      expect(truncate('Hello World', 8, '…')).toBe('Hello W…');
    });

    it('should handle exact length', () => {
      expect(truncate('Hello', 5)).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(truncate('', 10)).toBe('');
    });
  });

  describe('truncateWords', () => {
    it('should truncate to specified word count', () => {
      expect(truncateWords('one two three four five', 3)).toBe('one two three...');
    });

    it('should not truncate if under word count', () => {
      expect(truncateWords('one two', 5)).toBe('one two');
    });

    it('should use custom suffix', () => {
      expect(truncateWords('one two three four', 2, '…')).toBe('one two…');
    });

    it('should handle single word', () => {
      expect(truncateWords('hello', 1)).toBe('hello');
    });
  });

  describe('stripHtml', () => {
    it('should remove HTML tags', () => {
      expect(stripHtml('<p>Hello</p>')).toBe('Hello');
    });

    it('should handle multiple tags', () => {
      expect(stripHtml('<div><p>Hello</p><span>World</span></div>')).toBe('HelloWorld');
    });

    it('should handle tags with attributes', () => {
      expect(stripHtml('<a href="test">Click</a>')).toBe('Click');
    });

    it('should handle plain text', () => {
      expect(stripHtml('Hello World')).toBe('Hello World');
    });

    it('should handle self-closing tags', () => {
      expect(stripHtml('Hello<br/>World')).toBe('HelloWorld');
    });
  });

  describe('getInitials', () => {
    it('should get initials from full name', () => {
      expect(getInitials('Juan Pérez')).toBe('JP');
    });

    it('should handle single name', () => {
      expect(getInitials('Juan')).toBe('J');
    });

    it('should limit to maxLength', () => {
      expect(getInitials('Juan Carlos Pérez García', 2)).toBe('JC');
    });

    it('should allow custom maxLength', () => {
      expect(getInitials('Juan Carlos Pérez', 3)).toBe('JCP');
    });

    it('should handle extra whitespace', () => {
      expect(getInitials('  Juan   Pérez  ')).toBe('JP');
    });

    it('should return uppercase', () => {
      expect(getInitials('juan pérez')).toBe('JP');
    });
  });

  describe('formatPhoneNumber', () => {
    it('should format 10-digit Mexican phone', () => {
      expect(formatPhoneNumber('5512345678')).toBe('(55) 1234-5678');
    });

    it('should handle phone with existing formatting', () => {
      expect(formatPhoneNumber('55-1234-5678')).toBe('(55) 1234-5678');
    });

    it('should return original if not 10 digits', () => {
      expect(formatPhoneNumber('123456')).toBe('123456');
    });

    it('should strip non-numeric characters', () => {
      expect(formatPhoneNumber('+52 55 1234 5678')).toBe('+52 55 1234 5678'); // 12 digits, returns original
    });

    it('should handle phone with parentheses', () => {
      expect(formatPhoneNumber('(55)12345678')).toBe('(55) 1234-5678');
    });
  });

  describe('pluralize', () => {
    it('should return singular for count of 1', () => {
      expect(pluralize(1, 'producto')).toBe('producto');
    });

    it('should add "s" for plural by default', () => {
      expect(pluralize(2, 'producto')).toBe('productos');
    });

    it('should use custom plural form', () => {
      expect(pluralize(2, 'artesano', 'artesanos')).toBe('artesanos');
    });

    it('should handle zero', () => {
      expect(pluralize(0, 'producto')).toBe('productos');
    });

    it('should handle large numbers', () => {
      expect(pluralize(100, 'item')).toBe('items');
    });
  });

  describe('formatCount', () => {
    it('should format count with singular', () => {
      expect(formatCount(1, 'producto')).toBe('1 producto');
    });

    it('should format count with plural', () => {
      expect(formatCount(5, 'producto')).toBe('5 productos');
    });

    it('should use custom plural', () => {
      expect(formatCount(3, 'reseña', 'reseñas')).toBe('3 reseñas');
    });

    it('should handle zero', () => {
      expect(formatCount(0, 'item')).toBe('0 items');
    });
  });
});
