import { describe, expect, it } from '@jest/globals';
import getDiff from '../src/utils/get-diff.js';

const EXPECTED_RESULT = JSON.stringify({
  '  common': {
    '+ follow': false,
    '  setting1': 'Value 1',
    '- setting2': 200,
    '- setting3': true,
    '+ setting3': null,
    '+ setting4': 'blah blah',
    '+ setting5': {
      '  key5': 'value5',
    },
    '  setting6': {
      '  doge': {
        '- wow': '',
        '+ wow': 'so much',
      },
      '  key': 'value',
      '+ ops': 'vops',
    },
  },
  '  group1': {
    '- baz': 'bas',
    '+ baz': 'bars',
    '  foo': 'bar',
    '- nest': {
      '  key': 'value',
    },
    '+ nest': 'str',
  },
  '- group2': {
    '  abc': 12345,
    '  deep': {
      '  id': 45,
    },
  },
  '+ group3': {
    '  deep': {
      '  id': {
        '  number': 45,
      },
    },
    '  fee': 100500,
  },
});

const EXPECTED_OPPOSITE_RESULT = JSON.stringify({
  '  common': {
    '- follow': false,
    '  setting1': 'Value 1',
    '+ setting2': 200,
    '- setting3': null,
    '+ setting3': true,
    '- setting4': 'blah blah',
    '- setting5': {
      '  key5': 'value5',
    },
    '  setting6': {
      '  doge': {
        '- wow': 'so much',
        '+ wow': '',
      },
      '  key': 'value',
      '- ops': 'vops',
    },
  },
  '  group1': {
    '- baz': 'bars',
    '+ baz': 'bas',
    '  foo': 'bar',
    '- nest': 'str',
    '+ nest': {
      '  key': 'value',
    },
  },
  '+ group2': {
    '  abc': 12345,
    '  deep': {
      '  id': 45,
    },
  },
  '- group3': {
    '  deep': {
      '  id': {
        '  number': 45,
      },
    },
    '  fee': 100500,
  },
});

describe('Files comparing', () => {
  it('should compare two json files', () => {
    const result = getDiff(
      '__tests__/__fixtures__/file1.json',
      '__tests__/__fixtures__/file2.json',
    );

    expect(result).toBe(EXPECTED_RESULT);
  });

  it('should compare two json files (opposition)', () => {
    const result = getDiff(
      '__tests__/__fixtures__/file2.json',
      '__tests__/__fixtures__/file1.json',
    );

    expect(result).toBe(EXPECTED_OPPOSITE_RESULT);
  });

  it('should compare two yaml files', () => {
    const result = getDiff(
      '__tests__/__fixtures__/file1.yaml',
      '__tests__/__fixtures__/file2.yml',
    );

    expect(result).toBe(EXPECTED_RESULT);
  });

  it('should compare two yaml files (opposition)', () => {
    const result = getDiff(
      '__tests__/__fixtures__/file2.yml',
      '__tests__/__fixtures__/file1.yaml',
    );

    expect(result).toBe(EXPECTED_OPPOSITE_RESULT);
  });

  it('should compare json to yaml files', () => {
    const result = getDiff(
      '__tests__/__fixtures__/file1.json',
      '__tests__/__fixtures__/file2.yml',
    );

    expect(result).toBe(EXPECTED_RESULT);
  });

  it('should compare yml to json files', () => {
    const result = getDiff(
      '__tests__/__fixtures__/file1.yaml',
      '__tests__/__fixtures__/file2.json',
    );

    expect(result).toBe(EXPECTED_RESULT);
  });
});
