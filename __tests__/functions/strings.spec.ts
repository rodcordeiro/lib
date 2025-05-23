// Generated by CodiumAI
import { describe, it, expect } from '@jest/globals';
import { StringUtils } from '../../src';

describe('StringUtils', () => {
  it('removeAccents should remove accents correctly', () => {
    expect(StringUtils.removeAccents('líção')).toBe('licao');
    expect(StringUtils.removeAccents('coração')).toBe('coracao');
    expect(StringUtils.removeAccents('Êxito')).toBe('Exito');
  });

  it('paddy should return a padded string', () => {
    expect(StringUtils.paddy('5', 3)).toBe('005');
    expect(StringUtils.paddy('42', 4, 'x')).toBe('xx42');
  });

  it('CamelCaseToUnderscore should convert camelCase to underscore_case', () => {
    expect(StringUtils.CamelCaseToUnderscore('camelCaseText')).toBe(
      'camel_case_text',
    );
    expect(StringUtils.CamelCaseToUnderscore('oneTwoThree')).toBe(
      'one_two_three',
    );
  });

  it('UnderscoreToCamelCase should convert underscore_case to camelCase', () => {
    expect(StringUtils.UnderscoreToCamelCase('camel_case_text')).toBe(
      'camelCaseText',
    );
    expect(StringUtils.UnderscoreToCamelCase('one_two_three')).toBe(
      'oneTwoThree',
    );
  });

  it('Capitalize should capitalize first letter', () => {
    expect(StringUtils.Capitalize('hello')).toBe('Hello');
    expect(StringUtils.Capitalize('a')).toBe('A');
  });

  it('IsNotEmpty should validate non-empty strings', () => {
    expect(StringUtils.IsNotEmpty('hello')).toBe(true);
    expect(StringUtils.IsNotEmpty('')).toBe(false);
    expect(StringUtils.IsNotEmpty('   ')).toBe(false);
    expect(StringUtils.IsNotEmpty(null)).toBe(false);
    expect(StringUtils.IsNotEmpty(undefined)).toBe(false);
    expect(StringUtils.IsNotEmpty('undefined')).toBe(false);
    expect(StringUtils.IsNotEmpty('null')).toBe(false);
  });

  it('RemoveBreakLines should remove newlines', () => {
    expect(StringUtils.RemoveBreakLines('Hello\nWorld')).toBe('HelloWorld');
    expect(StringUtils.RemoveBreakLines('Line1\r\nLine2')).toBe('Line1Line2');
  });

  it('RemoveSpaces should remove all spaces', () => {
    expect(StringUtils.RemoveSpaces('a b c')).toBe('abc');
    expect(StringUtils.RemoveSpaces('   spaced out   ')).toBe('spacedout');
  });

  it('RemoveSpecialCharacters should strip non-alphanumeric chars', () => {
    expect(StringUtils.RemoveSpecialCharacters('a@b#c$')).toBe('abc');
    expect(StringUtils.RemoveSpecialCharacters('hello! world?')).toBe(
      'helloworld',
    );
  });

  it('GetOnlyNumbers should return only digits', () => {
    expect(StringUtils.GetOnlyNumbers('abc123')).toBe('123');
    expect(StringUtils.GetOnlyNumbers('telefone: (11) 99999-8888')).toBe(
      '11999998888',
    );
  });

  it('GetOnlyLetters should return only letters', () => {
    expect(StringUtils.GetOnlyLetters('abc123')).toBe('abc');
    expect(StringUtils.GetOnlyLetters('a1b2c3!')).toBe('abc');
  });

  it('GetLastCharacters should return last N chars', () => {
    expect(StringUtils.GetLastCharacters('abcdef', 3)).toBe('def');
    expect(StringUtils.GetLastCharacters('12345', 2)).toBe('45');
  });

  it('GetFirstCharacters should return first N chars', () => {
    expect(StringUtils.GetFirstCharacters('abcdef', 3)).toBe('abc');
    expect(StringUtils.GetFirstCharacters('12345', 2)).toBe('12');
  });
});
