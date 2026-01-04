import { defineConfig } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import externals from 'rollup-plugin-node-externals';

export default defineConfig({
    input: {
        index:'src/index.js'
    },
    output: [
        {
            dir:'dist',//输出目录
            format:'es',//输出ES模块文件
        }
    ],
    plugins: [
        json(),
        nodeResolve(),
        externals({
            devDeps:false //可以识别package.json中的devDependencies 依赖 当作外部依赖
        }),
        commonjs(),
        terser()
    ]
});