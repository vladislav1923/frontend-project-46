import { describe, expect, it } from '@jest/globals';
import getDiff from '../src/api/index.js';
import {
  STYLISH_EXPECTED_RESULT,
  STYLISH_EXPECTED_OPPOSITE_RESULT,
} from './__fixtures__/stylish-results.js';
import { PLAIN_EXPECTED_OPPOSITE_RESULT, PLAIN_EXPECTED_RESULT } from './__fixtures__/plain-results.js';

describe('Stylish Diff Format', () => {
  it('should compare two json files', () => {
    const result = getDiff(
      '__tests__/__fixtures__/file1.json',
      '__tests__/__fixtures__/file2.json',
    );

    expect(result).toEqual(STYLISH_EXPECTED_RESULT);
  });

  it('should compare two json files (opposition)', () => {
    const result = getDiff(
      '__tests__/__fixtures__/file2.json',
      '__tests__/__fixtures__/file1.json',
    );

    expect(result).toEqual(STYLISH_EXPECTED_OPPOSITE_RESULT);
  });

  it('should compare two yaml files', () => {
    const result = getDiff(
      '__tests__/__fixtures__/file1.yaml',
      '__tests__/__fixtures__/file2.yml',
    );

    expect(result).toEqual(STYLISH_EXPECTED_RESULT);
  });

  it('should compare two yaml files (opposition)', () => {
    const result = getDiff(
      '__tests__/__fixtures__/file2.yml',
      '__tests__/__fixtures__/file1.yaml',
    );

    expect(result).toEqual(STYLISH_EXPECTED_OPPOSITE_RESULT);
  });

  it('should compare json to yaml files', () => {
    const result = getDiff(
      '__tests__/__fixtures__/file1.json',
      '__tests__/__fixtures__/file2.yml',
    );

    expect(result).toEqual(STYLISH_EXPECTED_RESULT);
  });

  it('should compare yml to json files', () => {
    const result = getDiff(
      '__tests__/__fixtures__/file1.yaml',
      '__tests__/__fixtures__/file2.json',
    );

    expect(result).toEqual(STYLISH_EXPECTED_RESULT);
  });
});

describe('Plain Diff format', () => {
  it('should compare two json files', () => {
    const result = getDiff(
      '__tests__/__fixtures__/file1.json',
      '__tests__/__fixtures__/file2.json',
      'plain',
    );

    expect(result).toBe(PLAIN_EXPECTED_RESULT);
  });

  it('should compare two yaml files', () => {
    const result = getDiff(
      '__tests__/__fixtures__/file2.yml',
      '__tests__/__fixtures__/file1.yaml',
      'plain',
    );

    expect(result).toBe(PLAIN_EXPECTED_OPPOSITE_RESULT);
  });
});

describe('Edge cases', () => {
  it('should throw an error if an input format is unsupported', () => {
    let errorMessage = '';
    try {
      getDiff(
        '__tests__/__fixtures__/file1.json',
        '__tests__/__fixtures__/file.txt',
      );
    } catch (error) {
      errorMessage = error.message;
    }

    expect(errorMessage).toBe('Unsupported input format: txt');
  });

  it('should throw an error if an output format is unsupported', () => {
    let errorMessage = '';
    try {
      getDiff(
        '__tests__/__fixtures__/file1.json',
        '__tests__/__fixtures__/file2.json',
        'plant',
      );
    } catch (error) {
      errorMessage = error.message;
    }

    expect(errorMessage).toBe('Unsupported output format: plant');
  });

  it('should throw an error if a file is not found', () => {
    let errorMessage = '';
    try {
      getDiff(
        '__tests__/__fixtures__/file1.json',
        '__tests__/__fixtures__/non-existent-file.json',
      );
    } catch (error) {
      errorMessage = error.message;
    }

    expect(errorMessage).toBe('File is not found');
  });
});
