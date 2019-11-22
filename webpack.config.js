const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "react-svg-loader", // 'react-svg'
            query: {
              svgo: {
                pretty: true,
                plugins: [{ removeStyleElement: true }]
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      reacto: path.resolve(__dirname, 'node_modules/react')
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ],
  devServer: {
    historyApiFallback: true
  }
};
