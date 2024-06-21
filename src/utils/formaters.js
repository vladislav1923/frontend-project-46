import _ from 'lodash';
import File from './file.js';

const stylish = (fields) => _.sortBy(fields, ['key']).reduce((acc, field) => {
  switch (field.status) {
    case File.fieldStatuses.added:
      acc[`+ ${field.key}`] = field.value;
      break;
    case File.fieldStatuses.removed:
      acc[`- ${field.key}`] = field.value;
      break;
    case File.fieldStatuses.unchanged:
      acc[`  ${field.key}`] = field.value;
      break;
    case File.fieldStatuses.changed:
      acc[`- ${field.key}`] = field.oldValue;
      acc[`+ ${field.key}`] = field.value;
      break;
    default:
      break;
  }

  return acc;
}, {});

export default stylish;
