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
    port: 3002,
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
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
            // "resolve-url-loader",
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            // options: {
            //   webpackImporter: false,
            //   sassOptions: {
            //     importer: function(a,b,c) {
            //       console.log(1111, a);
            //       require('http:' + getRemoteEntryUrl(3004)).then(a => {
            //         console.log(2222, a);
            //       });
            //
            //     }
            //   }
            // }
          }
        ],
      },
    ],
    // resolve: {
    //   alias: {
    //     'federated_styles_files@': require('http:' + getRemoteEntryUrl(3005)),
    //   },
    // },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app2',
      filename: 'remoteEntry.js',
      exposes: {
        './ButtonContainer': './src/ButtonContainer',
      },
      remotes: {
        app3: `app3@${getRemoteEntryUrl(3003)}`,
        federated_styles: `federated_styles@${getRemoteEntryUrl(3004)}`,
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

function getRemoteEntryUrl(port) {
  const { CODESANDBOX_SSE, HOSTNAME = '' } = process.env;

  // Check if the example is running on codesandbox
  // https://codesandbox.io/docs/environment
  if (!CODESANDBOX_SSE) {
    return `//localhost:${port}/remoteEntry.js`;
  }

  const parts = HOSTNAME.split('-');
  const codesandboxId = parts[parts.length - 1];

  return `//${codesandboxId}-${port}.sse.codesandbox.io/remoteEntry.js`;
}
