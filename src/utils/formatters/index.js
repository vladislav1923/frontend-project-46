import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const FORMATTERS = {
  stylish,
  plain,
  json,
};

const getFormatter = (name = 'stylish') => {
  if (!FORMATTERS[name]) {
    throw new Error(`Unsupported output format: ${name}`);
  }

  return FORMATTERS[name];
};

export default getFormatter;
