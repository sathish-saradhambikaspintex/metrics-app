const babel = require("rollup-plugin-babel");
const cjs = require("rollup-plugin-commonjs");
// const resolve = require("rollup-plugin-node-resolve");
const uglify = require("rollup-plugin-uglify");
const rollup = require("rollup");

const inputExternal = ["react", "react-dom"];
const inputPlugins = [
  babel({
    exclude: "node_modules/**"
  }),
  cjs({
    include: /node_modules/,
    namedExports: {
      "../node_modules/react-is/index.js": ["isValidElementType"]
    }
  }),
  process.env.NODE_ENV === "production" && uglify()
];
const outputGlobal = {
  react: "React",
  "react-dom": "ReactDOM",
  "prop-types": "PropTypes"
};

const comConfig = {
  input: {
    // core options
    input: "components/index.js", // the only required option
    external: inputExternal,
    plugins: inputPlugins
  },
  output: {
    format: "cjs",
    file: "build/cjs/components.js",
    name: "anaReactComponents",
    globals: outputGlobal
  }
};
const redConfig = {
  input: {
    // core options
    input: "reducer/index.js", // the only required option
    external: inputExternal,
    plugins: inputPlugins
  },
  output: {
    format: "cjs",
    file: "build/cjs/reducers.js",
    name: "anaReducer",
    globals: outputGlobal
  }
};

async function build() {
  // create a bundle
  const comBundle = await rollup.rollup(comConfig.input);
  const redBundle = await rollup.rollup(redConfig.input);

  console.log(comBundle.imports);
  // console.log(comBundle.exports);
  // console.log(comBundle.modules);
  console.log(redBundle.imports);
  // console.log(redBundle.exports);
  // console.log(redBundle.modules);

  // or write the bundle to disk
  await comBundle.write(comConfig.output);
  await redBundle.write(redConfig.output);
}

build();
