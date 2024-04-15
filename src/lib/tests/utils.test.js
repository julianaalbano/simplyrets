import { formattedDate, convertNumberPriceToStringPrice } from '../utils';

describe('utils', () => {
  describe('formattedDate', () => {
    it('return the date in the correct format and type', () => {
      const expected = '09/18/2024';
      const result = formattedDate({ date: '2024-09-18T00:45:02.01603Z' });
      expect(result).toBe(expected);
      expect(typeof result).toBe('string');
    });
    it('returns an empty string if provided empty string', () => {
      const expected = '';
      const result = formattedDate({ date: '' });
      expect(result).toBe(expected);
    });
    it('returns an empty string if provided undefined argument', () => {
      const expected = '';
      const result = formattedDate({ date: undefined });
      expect(result).toBe(expected);
    });
  });
  describe('convertNumberPriceToStringPrice', () => {
    it('returns the price in the correct format and type', () => {
      const expected = '$1,234,567.00';
      const result = convertNumberPriceToStringPrice({ numPrice: 1234567 });
      expect(result).toBe(expected);
      expect(typeof result).toBe('string');
    });
    it('returns the price in the correct format and type for an argument of `0`', () => {
      const expected = '$0.00';
      const result = convertNumberPriceToStringPrice({ numPrice: 0 });
      expect(result).toBe(expected);
      expect(typeof result).toBe('string');
    });
    it('returns `$0.00` for invalid arguments (negative number)', () => {
      const expected = '$0.00';
      const result = convertNumberPriceToStringPrice({ numPrice: -3781 });
      expect(result).toBe(expected);
      expect(typeof result).toBe('string');
    });
    it('returns `$0.00` for invalid arguments (undefined)', () => {
      const expected = '$0.00';
      const result = convertNumberPriceToStringPrice({ numPrice: undefined });
      expect(result).toBe(expected);
      expect(typeof result).toBe('string');
    });
  });
});