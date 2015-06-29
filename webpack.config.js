var path = require("path"),
    webpack = require("webpack");

module.exports = {
  entry: {
    egghead_tests: __dirname + "/assets/index.jsx"
  },
  output:{
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { 
        test: /\.css$/,
        loader: "style-loader!css-loader" 
      },
      {
        test: /\.scss$/,
        loader: "style!css!sass?includePaths[]="
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?optional=runtime'
      }
    ]
  }
}