import { cwd } from 'node:process';
import { isAbsolute, resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import getParser from './parsers/index.js';
import getFormatter from './formatters/index.js';
import comparator from './comparator.js';

class File {
  static compare(file1, file2, format) {
    return getFormatter(format)(comparator(file1, file2));
  }

  name;

  format;

  file;

  constructor(name) {
    this.name = isAbsolute(name) ? name : resolve(cwd(), name);
    this.format = this.name.split('.').pop();
  }

  parse() {
    const file = readFileSync(this.name, 'utf-8');
    this.file = getParser(this.format)(file);
    return this;
  }
}

export default File;
