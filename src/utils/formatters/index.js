import stylish from './stylish.js';
import plain from './plain.js';

const FORMATTERS = {
  stylish,
  plain,
};

const getFormatter = (name = 'stylish') => {
  if (!FORMATTERS[name]) {
    throw new Error(`Unsupported output format: ${name}`);
  }

  return FORMATTERS[name];
};

export default getFormatter;
