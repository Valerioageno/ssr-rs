const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const buildDirectory = "dist/ssr/"

module.exports = {
  mode: 'production',
  target: 'web',
  entry: path.resolve(__dirname, './src/ssrEntry.tsx'),
  output: {
    path: path.resolve(__dirname, buildDirectory),
    // render_to_string entry point name!!
    library: 'SSR',
    libraryTarget: 'var',
    filename: 'index.js'
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
              name: './images/[hash]-[name].[ext]',
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
      filename: './styles/ssr.css',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, buildDirectory)],
    }),
  ],
};