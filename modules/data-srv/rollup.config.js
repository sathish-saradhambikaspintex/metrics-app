import babel from "rollup-plugin-babel";
import cjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import uglify from "rollup-plugin-uglify";

export default {
  input: "src/index.js",
  output: {
    name: "HOAnalytics",
    file: "build/cjs/index.js",
    globals: {
      react: "React",
      "react-dom": "ReactDOM",
      "prop-types": "PropTypes"
    },
    format: "cjs"
  },
  external: ["react", "react-dom"],
  plugins: [
    babel({
      exclude: "node_modules/**"
    }),
    resolve({ preferBuiltins: true }),
    cjs({
      include: /node_modules/,
      namedExports: {
        "../node_modules/react-is/index.js": ["isValidElementType"]
      }
    }),
    process.env.NODE_ENV === "production" && uglify()
  ],
  watch: {
    include: "src/**"
  }
};
