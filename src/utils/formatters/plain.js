import { statuses } from '../comparator.js';

const formatValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value && typeof value === 'object' ? '[complex value]' : value;
};

const inner = (node, trail = []) => {
  trail.push(node.key);
  if (node.status === statuses.unchanged && Array.isArray(node.value)) {
    return node.value.map((subnode) => inner(subnode, [...trail]));
  }

  const path = trail.join('.');

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

const plain = (fields) => fields
  .map((field) => inner(field))
  .flat(Infinity)
  .filter((log) => Boolean(log))
  .sort()
  .join('\n');

export default plain;
