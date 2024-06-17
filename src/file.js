import { cwd } from 'node:process';
import { resolve, isAbsolute } from 'node:path';
import { readFileSync } from 'node:fs';

class File {
  name;

  format;

  constructor(name) {
    this.name = isAbsolute(name) ? name : resolve(cwd(), name);
    this.format = this.name.split('.').pop();
  }

  parse() {
    const file = readFileSync(this.name, 'utf-8');
    switch (this.format) {
      case 'json':
        return JSON.parse(file);
      default:
        throw new Error(`Unsupported file format: ${this.format}`);
    }
  }
}

export default File;
