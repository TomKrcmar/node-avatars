import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

import Path from 'path';

const { NODE_ENV } = process.env;
const isProd = ({ production: true, development: false })[NODE_ENV] || false;

const srcPath = Path.resolve(__dirname, 'src');
const dstPath = Path.resolve(__dirname, isProd ? 'dist' : 'dist/dev');
const src = Path.resolve(srcPath, 'index.js');
const dst = Path.resolve(dstPath, 'hash-avatars.js');
const dst_m = Path.resolve(dstPath, 'hash-avatars.mjs');

const sourcemap = !isProd;

export default {
	input: src,
	output: [
		{
			file: dst,
			format: 'umd',
			name: 'HashAvatars',
			sourcemap,
		},
		{
			file: dst_m,
			format: 'es',
			sourcemap,
		}
	],
	plugins: [
		resolve(),
		babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
		isProd && terser()
	]
};
