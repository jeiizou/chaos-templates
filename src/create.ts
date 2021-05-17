import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import execa from 'execa';
import pkg from '../package.json';

/**
 *
 * @param name app-name
 */
export async function createApp(name: string) {
    let answer = await inquirer.prompt([
        {
            type: 'list',
            message: '选择项目模板',
            name: 'templateType',
            choices: [
                {
                    name: 'SDK工具库(单工具)',
                    value: 'rollup-sdk-ts',
                },
                {
                    name: 'SDK工具库(多工具)',
                    value: 'lerna-rollup-sdk-ts',
                },
                {
                    name: 'Vue3项目',
                    value: 'vite-vue-ts',
                },
                {
                    name: 'React项目',
                    value: 'uni-react-ts',
                },
            ],
        },
    ]);

    let tagetDirectoryPath = path.resolve(process.cwd(), name);

    await fs.ensureDir(tagetDirectoryPath);

    await cloneProject(tagetDirectoryPath, answer.templateType);
}

async function cloneProject(path, type) {
    console.log('run start');
    await execa('degit', [`${pkg.gitpath}/${type}`], {
        stdio: 'inherit',
        cwd: path,
    });
    console.log('run end');
}
