import { describe, expect, it } from '@jest/globals';
import getDiff from '../src/utils/get-diff.js';

describe('Shallow comparing', () => {
  it('should compare two json files', () => {
    const expected = JSON.stringify({
      '- follow': false,
      '  host': 'hexlet.io',
      '- proxy': '123.234.53.22',
      '- timeout': 50,
      '+ timeout': 20,
      '+ verbose': true,
    });
    const result = getDiff(
      '__tests__/__fixtures__/file1.json',
      '__tests__/__fixtures__/file2.json',
    );

    expect(result).toBe(expected);
  });

  it('should compare two json files (vice versa)', () => {
    const expected = JSON.stringify({
      '+ follow': false,
      '  host': 'hexlet.io',
      '+ proxy': '123.234.53.22',
      '- timeout': 20,
      '+ timeout': 50,
      '- verbose': true,
    });
    const result = getDiff(
      '__tests__/__fixtures__/file2.json',
      '__tests__/__fixtures__/file1.json',
    );

    expect(result).toBe(expected);
  });

  it('should compare two yaml files', () => {
    const expected = JSON.stringify({
      '- follow': false,
      '  host': 'hexlet.io',
      '- proxy': '123.234.53.22',
      '- timeout': 50,
      '+ timeout': 20,
      '+ verbose': true,
    });
    const result = getDiff(
      '__tests__/__fixtures__/file1.yaml',
      '__tests__/__fixtures__/file2.yml',
    );

    expect(result).toBe(expected);
  });

  it('should compare two yaml files (vice versa)', () => {
    const expected = JSON.stringify({
      '+ follow': false,
      '  host': 'hexlet.io',
      '+ proxy': '123.234.53.22',
      '- timeout': 20,
      '+ timeout': 50,
      '- verbose': true,
    });
    const result = getDiff(
      '__tests__/__fixtures__/file2.yml',
      '__tests__/__fixtures__/file1.yaml',
    );

    expect(result).toBe(expected);
  });

  it('should compare json to yaml files', () => {
    const expected = JSON.stringify({
      '- follow': false,
      '  host': 'hexlet.io',
      '- proxy': '123.234.53.22',
      '- timeout': 50,
      '+ timeout': 20,
      '+ verbose': true,
    });
    const result = getDiff(
      '__tests__/__fixtures__/file1.json',
      '__tests__/__fixtures__/file2.yml',
    );

    expect(result).toBe(expected);
  });

  it('should compare yml to json files', () => {
    const expected = JSON.stringify({
      '- follow': false,
      '  host': 'hexlet.io',
      '- proxy': '123.234.53.22',
      '- timeout': 50,
      '+ timeout': 20,
      '+ verbose': true,
    });
    const result = getDiff(
      '__tests__/__fixtures__/file1.yaml',
      '__tests__/__fixtures__/file2.json',
    );

    expect(result).toBe(expected);
  });
});
