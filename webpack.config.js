const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/js/main.js',  // Entry point for your JS
    output: {
      filename: 'bundle.[contenthash].js',  // Unique hash for cache busting
      path: path.resolve(__dirname, 'dist'),  // Output directory
      clean: true,  // Clean the 'dist' folder before each build
    },
    mode: isProduction ? 'production' : 'development',
    devServer: {
      static: './dist',
      port: 8080,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',  // Your HTML template
        filename: 'index.html',  // Output HTML file
      }),
      ...(isProduction
        ? [
            new MiniCssExtractPlugin({
              filename: '[name].[contenthash].css',  // Output CSS filename with content hash
            }),
          ]
        : []),  // Only include MiniCssExtractPlugin in production
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,  // Handle CSS files
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',  // Use MiniCssExtractPlugin for prod
            'css-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,  // Handle images
          type: 'asset/resource',
        },
      ],
    },
  };
};
