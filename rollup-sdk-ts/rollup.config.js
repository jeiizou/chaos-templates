import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import cleanup from 'rollup-plugin-cleanup';
import pluginDelete from 'rollup-plugin-delete';
import path from 'path';
import pkg from './package.json';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.ts', '.tsx'];

const resolve = function (...args) {
    return path.resolve(__dirname, ...args);
};

/** @type {import('rollup').RollupOptions} */
export default {
    input: resolve('./src/index.ts'),
    output: [
        {
            file: resolve('./', pkg.main),
            format: 'cjs',
        },
        {
            file: resolve('./', pkg.module),
            format: 'es',
        },
    ],
    plugins: [
        json(),
        nodeResolve({
            extensions,
        }),
        babel({
            exclude: 'node_modules/**', // 只编译我们的源代码
            extensions,
            babelHelpers: 'runtime',
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'preventAssignment': false,
        }),
        cleanup(),
        commonjs(),
        terser(),
        pluginDelete({ targets: 'lib/*' }),
    ],
};
