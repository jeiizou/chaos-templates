import typescript from 'rollup-plugin-typescript2';
import tscompile from 'typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import html from 'rollup-plugin-html';
import { terser } from 'rollup-plugin-terser';
import alias from '@rollup/plugin-alias';
import * as path from 'path';
import { RollupOptions } from 'rollup';

const production = !process.env.NODE_ENV;

/** @type RollupOptions */
const config = {
    input: `./src/extension.ts`,
    output: {
        format: 'commonjs',
        sourcemap: production ? false : true,
        file: `out/extension.js`,
    },
    plugins: [
        typescript({
            typescript: tscompile,
            tsconfig: 'tsconfig.json',
        }),
        nodeResolve({
            browser: false,
            preferBuiltins: true,
        }),
        commonjs(),
        alias({
            entries: [
                { find: '@', replacement: path.resolve(__dirname, 'src') },
            ],
        }),
        html({
            include: '**/*.html',
        }),
        production && terser(),
    ],
    external: ['vscode'],
};

export default config;
