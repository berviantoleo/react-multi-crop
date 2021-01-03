import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import pkg from './package.json';
import path from 'path';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: pkg.source,
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'esm',
    },
  ],
  plugins: [
    external(),
    resolve({
      mainFields: ['module', 'main', 'jsnext:main', 'browser'],
      extensions,
    }),
    babel({
      exclude: 'node_modules/**',
      configFile: path.resolve(__dirname, 'babel.config.prod.js'),
      extensions,
    }),
    del({ targets: ['dist/*'] }),
  ],
  external: Object.keys(pkg.peerDependencies || {}),
};
