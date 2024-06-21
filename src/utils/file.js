import { cwd } from 'node:process';
import { isAbsolute, resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { yamlParser, jsonParser } from './parcers.js';
import {stylish} from "./formaters.js";

class File {
  static fieldStatuses = {
    added: 'added',
    removed: 'removed',
    unchanged: 'unchanged',
    changed: 'changed',
  };

  static compare(file1, file2, format = 'stylish') {
    const fields = [];

    Object.keys(file1).forEach((key) => {
      if (file2[key] === undefined) {
        fields.push({
          key,
          value: typeof file1[key] === 'object'
            ? File.compare(file1[key], file1[key]) : file1[key],
          status: File.fieldStatuses.removed,
        });
      } else if (file1[key] === file2[key]) {
        fields.push({
          key,
          value: typeof file1[key] === 'object'
            ? File.compare(file1[key], file1[key]) : file1[key],
          status: File.fieldStatuses.unchanged,
        });
      } else if (typeof file1[key] === 'object' && typeof file2[key] === 'object') {
        fields.push({
          key,
          value: File.compare(file1[key], file2[key]),
          status: File.fieldStatuses.unchanged,
        });
      } else {
        fields.push({
          key,
          value: file2[key] && typeof file2[key] === 'object'
            ? File.compare(file2[key], file2[key]) : file2[key],
          oldValue: file1[key] && typeof file1[key] === 'object'
            ? File.compare(file1[key], file1[key]) : file1[key],
          status: File.fieldStatuses.changed,
        });
      }
    });

    Object.keys(file2).forEach((key) => {
      if (file1[key] === undefined) {
        fields.push({
          key,
          value: typeof file2[key] === 'object'
            ? File.compare(file2[key], file2[key]) : file2[key],
          status: File.fieldStatuses.added,
        });
      }
    });

    switch (format) {
      case 'stylish':
        return stylish(fields);
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
