import { describe, it, expect } from '@jest/globals';
import { ColorUtils } from '../../src';

describe('ColorUtils', () => {

  describe('randomHexColor', () => {
    it('should return a valid hex color string starting with # and 7 characters long', () => {
      const color = ColorUtils.randomHexColor();
      expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  
    it('should return different colors (not always the same)', () => {
      const color1 = ColorUtils.randomHexColor();
      const color2 = ColorUtils.randomHexColor();
      expect(color1).not.toBe(color2); // not guaranteed, but good enough
    });
  });
  
  describe('lumiance', () => {
    it('should darken a hex color when luminosity is negative', () => {
      const result = ColorUtils.lumiance('#6699CC', -0.5);
      expect(result).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(result).not.toBe('#6699CC');
    });
  
    it('should lighten a hex color when luminosity is positive', () => {
      const result = ColorUtils.lumiance('#336699', 0.3);
      expect(result).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(result).not.toBe('#336699');
    });
  
    it('should return the same color when luminosity is 0', () => {
      const result = ColorUtils.lumiance('#123456', 0);
      expect(result.toLowerCase()).toBe('#123456');
    });
  
    it('should support 3-digit hex codes', () => {
      const result = ColorUtils.lumiance('#f0f', 0);
      expect(result.toLowerCase()).toBe('#ff00ff');
    });
  
    it('should throw an error for invalid hex codes', () => {
      expect(() => ColorUtils.lumiance('xyz')).toThrow('Invalid color hex code');
      expect(() => ColorUtils.lumiance('#12')).toThrow('Invalid color hex code');
      expect(() => ColorUtils.lumiance('12345g')).toThrow('Invalid color hex code');
    });
  
    it('should handle luminosity overflows correctly (values capped at 255)', () => {
      const result = ColorUtils.lumiance('#ffffff', 0.5);
      expect(result.toLowerCase()).toBe('#ffffff');
    });
  
    it('should handle underflows correctly (values capped at 0)', () => {
      const result = ColorUtils.lumiance('#000000', -0.5);
      expect(result.toLowerCase()).toBe('#000000');
    });
  });    
});
