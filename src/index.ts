import { Command } from 'commander';
import pkg from '../package.json';
import { createApp } from './create';

const program = new Command();
program.version(pkg.version);

program
    .command('create <app-name>')
    .description('create a project by templates')
    .action(async (name, destination) => {
        try {
            await createApp(name);
        } catch (error) {}
    });

program.parse();
