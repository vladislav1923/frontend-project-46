import { cwd } from 'node:process';
import { isAbsolute, resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import _ from 'lodash';
import { yamlParser, jsonParser } from './parcers.js';

class File {
  name;

  format;

  file;

  fieldStatuses = {
    added: 'added',
    removed: 'removed',
    unchanged: 'unchanged',
    changed: 'changed',
  };

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

  compareTo(file) {
    const fields = [];

    Object.keys(this.file).forEach((key) => {
      if (!file[key]) {
        fields.push({
          key,
          value: this.file[key],
          status: this.fieldStatuses.removed,
        });
      } else if (this.file[key] === file[key]) {
        fields.push({
          key,
          value: this.file[key],
          status: this.fieldStatuses.unchanged,
        });
      } else {
        fields.push({
          key,
          value: file[key],
          oldValue: this.file[key],
          status: this.fieldStatuses.changed,
        });
      }
    });

    Object.keys(file).forEach((key) => {
      if (!this.file[key]) {
        fields.push({
          key,
          value: file[key],
          status: this.fieldStatuses.added,
        });
      }
    });

    const sortedFields = _.sortBy(fields, ['key']);
    return sortedFields.reduce((acc, field) => {
      switch (field.status) {
        case this.fieldStatuses.added:
          acc[`+ ${field.key}`] = field.value;
          break;
        case this.fieldStatuses.removed:
          acc[`- ${field.key}`] = field.value;
          break;
        case this.fieldStatuses.unchanged:
          acc[`  ${field.key}`] = field.value;
          break;
        case this.fieldStatuses.changed:
          acc[`- ${field.key}`] = field.oldValue;
          acc[`+ ${field.key}`] = field.value;
          break;
        default:
          break;
      }

      return acc;
    }, {});
  }
}

export default File;
