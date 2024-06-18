import yaml from 'js-yaml';

export const jsonParser = (data) => JSON.parse(data);

export const yamlParser = (data) => yaml.load(data);
