import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import { removeSync } from "fs-extra";
import svelte from "rollup-plugin-svelte-hot";
import Hmr from "rollup-plugin-hot";

const assetsDir = "public";
const buildDir = `public/build`;
const production = process.env["NODE_ENV"] === "production";
const isNollup = !!process.env.NOLLUP;

// clear previous builds
removeSync(buildDir);

export default {
  preserveEntrySignatures: false,
  input: [`src/main.js`],
  output: {
    sourcemap: true,
    format: "esm",
    dir: buildDir,
    chunkFileNames: `[name]${(production && "-[hash]") || ""}.js`,
  },
  plugins: [
    svelte({
      dev: !production,
      preprocess: require("svelte-windicss-preprocess").preprocess({
        config: "tailwind.config.js", // tailwind config file path (optional)
        compile: true, // false: interpretation mode; true: compilation mode
        prefix: "windi-", // set compilation mode style prefix
        globalPreflight: true, // set preflight style is global or scoped
        globalUtility: true, // set utility style is global or scoped
      }),
      hot: isNollup,
    }),
    resolve({
      browser: "true",
      dedupe: "importee => !!importee.match(/svelte(/|$)/)",
    }),
    commonjs(),
    production && terser(),
    !production && livereload(assetsDir), // refresh entire window when code is updated,
    !production && isNollup && Hmr({ inMemory: true, public: assetsDir }), // refresh only updated code,
    !production && !isNollup && livereload(distDir), // refresh entire window when code is updated
  ],
  watch: {
    clearScreen: false,
    buildDelay: 100,
  },
};
