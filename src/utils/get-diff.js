import File from './file.js';

const getDiff = (filepath1, filepath2) => {
  const file1 = new File(filepath1).parse();
  const file2 = new File(filepath2).parse();

  return JSON.stringify(File.compare(file1.file, file2.file));
};

export default getDiff;
