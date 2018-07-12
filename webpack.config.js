const path = require('path');

module.exports = {
  entry: './src/main/Main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: [ "babel-preset-env" ]
          }
        }
      }
    ]
  },
  mode: "development"
};