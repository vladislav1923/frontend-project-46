import { cwd } from 'node:process';
import { isAbsolute, resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { yamlParser, jsonParser } from './parcers.js';
import stylish from './formaters.js';
import comparator from './comparator.js';

class File {
  static compare(file1, file2, format = 'stylish') {
    switch (format) {
      case 'stylish':
        return stylish(comparator(file1, file2));
      default:
        throw new Error(`Unsupported output format: ${format}`);
    }
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
    switch (this.format) {
      case 'json':
        this.file = jsonParser(file);
        break;
      case 'yml':
      case 'yaml':
        this.file = yamlParser(file);
        break;
      default:
        throw new Error(`Unsupported file format: ${this.format}`);
    }

    return this;
  }
}

export default File;
