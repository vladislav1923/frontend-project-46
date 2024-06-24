import File from '../utils/file.js';

const getDiff = (filepath1, filepath2, format) => File.compare(
  new File(filepath1).parse().file,
  new File(filepath2).parse().file,
  format,
);

export default getDiff;
