import { Command } from 'commander';
import getDiff from '../utils/get-diff.js';

const program = new Command();

program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format');

program
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
        console.log(JSON.parse(getDiff(filepath1, filepath2)));
    });

program.parse();

export default program;
