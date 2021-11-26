import babel from '@rollup/plugin-babel';
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import typescript from 'rollup-plugin-typescript2';
import sizes from 'rollup-plugin-sizes';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';
import path from 'path';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: pkg.source,
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'esm' },
  ],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
    }),
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
    terser(),
    sizes(),
  ],
  external: Object.keys(pkg.peerDependencies || {}),
};
