import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import { terser } from "rollup-plugin-terser";
import multiEntry from "rollup-plugin-multi-entry";

const commonPlugins = [resolve(), commonjs(), json() /* terser() */];

const commonExternal = [
  "readline",
  "stream",
  "tty",
  "child_process",
  "fs",
  "string_decoder",
  "os",
  "path",
  "crypto",
  "util",
  "buffer",
  "events",
  "assert"
];

export default [
  {
    input: "index.js",
    output: {
      file: "takeoff.js",
      format: "cjs"
    },
    plugins: commonPlugins,
    external: commonExternal
  },
  {
    input: "utils/**/!(test).js",
    output: {
      file: "utils.js",
      format: "cjs"
    },
    plugins: [multiEntry(), ...commonPlugins],
    external: commonExternal
  }
];
