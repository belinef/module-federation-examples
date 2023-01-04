const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3004,
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.shared\.s[ac]ss$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'federated_styles',
      filename: 'remoteEntry.js',
      remoteType: 'commonjs-static',
      exposes: {
        './ButtonStyleCss': './src/Button.styles.css',
        './ButtonStyleJss': './src/Button.styles.react-jss.js',
        './StyledButton': './src/StyledButton.js',
        './ButtonStyleCssModule': './src/Button.styles.module.css',
        './ButtonStyleScss': './src/Button.styles.scss',
        // './ButtonStyleScssFile': './src/Button.styles.shared.scss',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
