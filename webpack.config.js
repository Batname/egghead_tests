var path = require("path"),
    ExtractTextPlugin = require("extract-text-webpack-plugin");
    webpack = require("webpack");

var sassPaths = require("node-neat").includePaths.map(function(sassPath) {
  return "includePaths[]=" + sassPath;
}).join("&");

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
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!autoprefixer!sass?sourceMap&' + sassPaths)
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?optional=runtime'
      }
    ]
  }
}