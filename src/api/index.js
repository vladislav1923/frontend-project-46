import { parseFile, compareFiles } from '../utils/file.js';

const getDiff = (filepath1, filepath2, format) => compareFiles(
  parseFile(filepath1),
  parseFile(filepath2),
  format,
);

export default getDiff;
