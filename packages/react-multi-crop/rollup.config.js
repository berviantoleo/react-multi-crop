import babel from "@rollup/plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import del from "rollup-plugin-delete";
import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default {
  input: pkg.source,
  output: [
    { file: pkg.main, format: "cjs", sourcemap: true },
    { file: pkg.module, format: "esm", sourcemap: true },
  ],
  plugins: [
    typescript(),
    external(),
    resolve({
      mainFields: ["module", "main", "jsnext:main", "browser"],
      extensions,
    }),
    babel({
      exclude: "node_modules/**",
      extensions,
    }),
    del({ targets: ["dist/*"] }),
  ],
  external: Object.keys(pkg.peerDependencies || {}),
};
