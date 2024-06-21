import _ from 'lodash';
import { statuses } from './comparator.js';

const stylish = (fields) => _.sortBy(fields, ['key']).reduce((acc, { key, value, status, oldValue }) => {
  switch (status) {
    case statuses.added:
      acc[`+ ${key}`] = value && typeof value === 'object' ? stylish(value) : value;
      break;
    case statuses.removed:
      acc[`- ${key}`] = value && typeof value === 'object' ? stylish(value) : value;
      break;
    case statuses.unchanged:
      acc[`  ${key}`] = value && typeof value === 'object' ? stylish(value) : value;
      break;
    case statuses.changed:
      acc[`- ${key}`] = oldValue && typeof oldValue === 'object' ? stylish(oldValue) : oldValue;
      acc[`+ ${key}`] = value && typeof value === 'object' ? stylish(value) : value;
      break;
    default:
      break;
  }

  return acc;
}, {});

export const plain = (fields) => {
  const sorted = _.sortBy(fields, ['key'])
};

export default stylish;
