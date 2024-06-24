import { cwd } from 'node:process';
import { isAbsolute, resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import getParser from './parsers/index.js';
import getFormatter from './formatters/index.js';
import comparator from './comparator.js';

const parseFile = (path) => {
  const resolvedPath = isAbsolute(path) ? path : resolve(cwd(), path);
  const extension = resolvedPath.split('.').pop();

  let file;
  try {
    file = readFileSync(resolvedPath, 'utf-8');
  } catch {
    throw new Error('File is not found');
  }

  return getParser(extension)(file);
};

const compareFiles = (file1, file2, format) => getFormatter(format)(comparator(file1, file2));

export { parseFile, compareFiles };
