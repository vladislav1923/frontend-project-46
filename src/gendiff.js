import { Command } from 'commander';
import File from './file.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format');

program
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const file1 = new File(filepath1).parse();
    const file2 = new File(filepath2).parse();
    console.log(file1, file2);
  });

program.parse();

export default program;
