const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildDirectory = 'dist';
const outputDirectory = `${buildDirectory}/client`;
module.exports = {
  mode: 'production',
  target: 'web',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
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
        test: /\.css$/,
        use:[{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
          },
        }, 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, buildDirectory)],
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
  ],
};
