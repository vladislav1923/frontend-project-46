import { Command } from 'commander';
import getDiff from '../api/index.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish');

program
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, { format }) => {
    console.log(getDiff(filepath1, filepath2, format));
  });

program.parse();

export default program;
