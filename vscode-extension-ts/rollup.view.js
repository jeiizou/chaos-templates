import typescript from 'rollup-plugin-typescript2';
import tscompile from 'typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';
import scss from 'rollup-plugin-scss';
import * as path from 'path';
import * as fs from 'fs-extra';

const production = !process.env.NODE_ENV;

const files = fs.readdirSync('./src/views');

const config = (name) => {
    return {
        input: `./src/views/${name}/index.tsx`,
        output: {
            format: 'iife',
            sourcemap: false,
            file: `out/views/${name}.js`,
            name: name,
        },
        plugins: [
            replace({
                preventAssignment: true,
                values: {
                    'process.env.NODE_ENV': JSON.stringify('development'),
                },
            }),
            typescript({
                typescript: tscompile,
                tsconfig: 'tsconfig.json',
            }),

            babel({
                exclude: 'node_modules/**',
                babelHelpers: 'bundled',
            }),
            nodeResolve({
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
            }),
            scss({
                output: `out/views/${name}.css`,
            }),
            commonjs(),
            alias({
                entries: [
                    {
                        find: '@view',
                        replacement: path.resolve(__dirname, 'src/views'),
                    },
                ],
            }),
            copy({
                targets: [
                    // {
                    //     src: 'node_modules/react/umd/react.production.min.js',
                    //     dest: path.resolve(__dirname, 'out/assets'),
                    // },
                    // {
                    //     src: 'node_modules/react-dom/umd/react-dom.production.min.js',
                    //     dest: path.resolve(__dirname, 'out/assets'),
                    // },
                    {
                        src: path.resolve(
                            __dirname,
                            'node_modules/bulma/css/bulma.min.css',
                        ),
                        dest: path.resolve(__dirname, 'out/assets'),
                    },
                ],
                // copyOnce: true,
            }),
        ],
        // external: ['react', 'react-dom'],
    };
};

export default files.map((file) => {
    return config(file);
});
