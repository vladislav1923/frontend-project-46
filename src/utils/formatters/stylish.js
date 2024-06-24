import _ from 'lodash';
import { statuses } from '../comparator.js';

const SIGNS = {
  [statuses.added]: '+',
  [statuses.removed]: '-',
  [statuses.changed]: '+',
  [statuses.unchanged]: ' ',
};

const getOpenOffset = (depth, status) => {
  const sign = SIGNS[status] ?? SIGNS[statuses.unchanged];
  return `${' '.repeat(depth * 4 - 2)}${sign} `;
};

const getCloseOffset = (depth) => `${' '.repeat(depth * 4)}`;

const inner = ({
  key, value, oldValue, status,
}, depth) => {
  const newDepth = depth + 1;

  const valueFormatter = (v, offset) => {
    if (_.isArray(v)) {
      const sortedValues = _.sortBy(v, ['key']);
      const children = sortedValues.map((node) => inner(node, newDepth)).join('');
      return `{${children}\n${offset}}`;
    }

    if (_.isObject(v)) {
      const child = inner(v, newDepth);
      return `{${child}\n${offset}}`;
    }

    return v;
  };

  const openOffset = getOpenOffset(newDepth, status);
  const closeOffset = getCloseOffset(newDepth);

  if (oldValue !== undefined) {
    const oldOpenOffset = getOpenOffset(newDepth, statuses.removed);
    return `\n${oldOpenOffset}${key}: ${valueFormatter(oldValue, closeOffset)}\n${openOffset}${key}: ${valueFormatter(value, closeOffset)}`;
  }

  return `\n${openOffset}${key}: ${valueFormatter(value, closeOffset)}`;
};

const stylish = (fields) => {
  const sorted = _.sortBy(fields, ['key']);
  const children = sorted.map((node) => inner(node, 0)).join('');
  return `{${children}\n}`;
};

export default stylish;
