const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { dependencies } = require('./package.json');

module.exports = {
  entry: path.resolve(__dirname, './src/index'),
  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-typescript', '@babel/preset-react'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'sample-[contenthash].js',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'sample',
      library: {
        type: 'var',
        name: 'sample',
      },
      filename: 'remoteSample.js',
      exposes: {
        './Sample': './src/Sample',
      },
      shared: {
        react: {
          import: 'react',
          shareKey: 'react',
          shareScope: 'default',
          singleton: true,
          requiredVersion: dependencies.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: dependencies['react-dom'],
        },
        i18next: {
          singleton: true,
        },
        'react-i18next': {
          singleton: true,
        },
        'single-spa': {
          singleton: true,
        },
        'single-spa-react': {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
};
