import { cwd } from 'node:process';
import { isAbsolute, resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import _ from 'lodash';
import getParser from './parsers/index.js';
import getFormatter from './formatters/index.js';
import comparator from './comparator.js';

const readFile = (path) => {
  try {
    return readFileSync(path, 'utf-8');
  } catch {
    throw new Error('File is not found');
  }
};

const parseFile = (path) => {
  const resolvedPath = isAbsolute(path) ? path : resolve(cwd(), path);
  const extension = _.last(resolvedPath.split('.'));
  const file = readFile(resolvedPath);

  return getParser(extension)(file);
};

const compareFiles = (file1, file2, format) => getFormatter(format)(comparator(file1, file2));

export { parseFile, compareFiles };
