import json from './json.js';
import yaml from './yaml.js';

const PARSERS = {
  json,
  yaml,
  yml: yaml,
};

const getParser = (name = 'json') => {
  if (!PARSERS[name]) {
    throw new Error(`Unsupported input format: ${name}`);
  }

  return PARSERS[name];
};

export default getParser;
