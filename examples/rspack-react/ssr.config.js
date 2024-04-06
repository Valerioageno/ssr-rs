const path = require("path");
/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "./src/ssr-entry.tsx"),
  target: "webworker",
  output: {
    clean: true,
    chunkFormat: false,
    chunkLoading: false,
    path: path.resolve(__dirname, "./dist/ssr"),
    publicPath: "",
    globalObject: "this",
    filename: "index.js",
    iife: false,
    library: {
      type: "var",
      // Entry point
      name: "SSR",
    },
  },
  optimization: {
    minimize: false,
    splitChunks: false,
  },
  resolve: {
    fallback: { fs: false, path: false },
    extensions: [".ts", ".tsx", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./images/[hash]-[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [],
};
