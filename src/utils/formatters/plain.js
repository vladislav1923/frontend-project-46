import _ from 'lodash';
import { statuses } from '../comparator.js';

const formatValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return _.isObject(value) ? '[complex value]' : value;
};

const inner = (node, trail = []) => {
  const newTrail = [...trail, node.key];
  if (node.status === statuses.unchanged && Array.isArray(node.value)) {
    return node.value.map((subnode) => inner(subnode, [...newTrail]));
  }

  const path = newTrail.join('.');

  switch (node.status) {
    case statuses.added:
      return `Property '${path}' was added with value: ${formatValue(node.value)}`;
    case statuses.removed:
      return `Property '${path}' was removed`;
    case statuses.changed:
      return `Property '${path}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.value)}`;
    default:
      return '';
  }
};

const plain = (fields) => {
  const lines = fields
    .map((field) => inner(field))
    .flat(Infinity)
    .filter((log) => Boolean(log));

  const sorted = _.sortBy(lines);

  return sorted.join('\n');
};

export default plain;
