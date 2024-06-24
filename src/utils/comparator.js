import _ from 'lodash';

export const statuses = {
  added: 'added',
  removed: 'removed',
  unchanged: 'unchanged',
  changed: 'changed',
};

const comparator = (a, b) => {
  let fields = [];

  Object.entries(a).forEach(([key, value]) => {
    const bValue = b[key];

    if (bValue === undefined) {
      fields = [...fields, {
        key,
        value: _.isObject(value) ? comparator(value, value) : value,
        status: statuses.removed,
      }];
    } else if (value === bValue) {
      fields = [...fields, {
        key,
        value: _.isObject(value) ? comparator(value, value) : value,
        status: statuses.unchanged,
      }];
    } else if (_.isObject(value) && _.isObject(bValue)) {
      fields = [...fields, {
        key,
        value: comparator(value, bValue),
        status: statuses.unchanged,
      }];
    } else {
      fields = [...fields, {
        key,
        value: _.isObject(bValue) ? comparator(bValue, bValue) : bValue,
        oldValue: _.isObject(value) ? comparator(value, value) : value,
        status: statuses.changed,
      }];
    }
  });

  Object.entries(b).forEach(([key, value]) => {
    const aValue = a[key];

    if (aValue === undefined) {
      fields = [...fields, {
        key,
        value: _.isObject(value) ? comparator(value, value) : value,
        status: statuses.added,
      }];
    }
  });

  return fields;
};

export default comparator;
