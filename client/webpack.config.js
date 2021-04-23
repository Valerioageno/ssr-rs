const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const buildDirectory = "dist_ssr/"

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    ssr: path.resolve(__dirname, './src/ssrEntry.tsx'),
  },
  output: {
    path: path.resolve(__dirname, buildDirectory),
    // render_to_string entry point name!!
    library: 'SSR',
    libraryTarget: 'var',
    filename: '[name].js'
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'styles/[name].css',
      chunkFilename: '[id].css',
    }),
    new CleanWebpackPlugin({buildDirectory}),
  ],
};