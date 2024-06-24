import _ from 'lodash';

export const statuses = {
  added: 'added',
  removed: 'removed',
  unchanged: 'unchanged',
  changed: 'changed',
};

const comparator = (a, b) => {
  const aEntries = Object.entries(a) ?? [];
  const bEntries = Object.entries(b) ?? [];

  const abDiff = aEntries.reduce((acc, [key, value]) => {
    const bValue = b[key];

    if (bValue === undefined) {
       const field = {
        key,
        value: _.isObject(value) ? comparator(value, value) : value,
        status: statuses.removed,
      };
      return [...acc, field];
    } else if (value === bValue) {
      const field = {
        key,
        value: _.isObject(value) ? comparator(value, value) : value,
        status: statuses.unchanged,
      };
      return [...acc, field];
    } else if (_.isObject(value) && _.isObject(bValue)) {
      const field = {
        key,
        value: comparator(value, bValue),
        status: statuses.unchanged,
      };
      return [...acc, field];
    } else {
      const field = {
        key,
        value: _.isObject(bValue) ? comparator(bValue, bValue) : bValue,
        oldValue: _.isObject(value) ? comparator(value, value) : value,
        status: statuses.changed,
      };
      return [...acc, field];
    }
    }, []);

  const baDiff = bEntries.reduce((acc, [key, value]) => {
    const aValue = a[key];

    if (aValue === undefined) {
      const field = {
        key,
        value: _.isObject(value) ? comparator(value, value) : value,
        status: statuses.added,
      };
      return [...acc, field];
    }

    return acc;
  }, []);

  return [...abDiff, ...baDiff];
};

export default comparator;
