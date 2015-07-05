import webpack , { DefinePlugin, BannerPlugin } from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import merge from 'lodash/object/merge';
import minimist from 'minimist';
import autoprefixer from 'autoprefixer-core';

const argv = minimist(process.argv.slice(2));
const DEBUG = !argv.release;
const STYLE_LOADER = 'style-loader/useable';
const CSS_LOADER = DEBUG ? 'css-loader' : 'css-loader?minimize';
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 20',
  'Firefox >= 24',
  'Explorer >= 8',
  'iOS >= 6',
  'Opera >= 12',
  'Safari >= 6'
];

const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  '__DEV__': DEBUG
};

var sassPaths = require("node-neat").includePaths.map(function(sassPath) {
  return "includePaths[]=" + sassPath;
}).join("&");



//
// Common configuration chunk to be used for both
// client-side (app.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

const config = {
  output: {
    publicPath: './',
    sourcePrefix: '  '
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ],

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],

    loaders: [

      {
        test: /\.css$/,
        loader: `${STYLE_LOADER}!${CSS_LOADER}!postcss-loader`
      },
      {
        test: /\.less$/,
        loader: `${STYLE_LOADER}!${CSS_LOADER}!postcss-loader!less-loader`
      },
      {
        test: /\.scss$/,
        loader: `${STYLE_LOADER}!${CSS_LOADER}!postcss-loader!sass-loader`
      },
      {
        test: /\.gif/,
        loader: 'url-loader?limit=10000&mimetype=image/gif'
      },
      {
        test: /\.jpg/,
        loader: 'url-loader?limit=10000&mimetype=image/jpg'
      },
      {
        test: /\.png/,
        loader: 'url-loader?limit=10000&mimetype=image/png'
      },
      {
        test: /\.svg/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  postcss: [autoprefixer(AUTOPREFIXER_BROWSERS)]
};

//
// Configuration for the client-side bundle (app.js)
// 
const appConfig = merge({}, config, {
  entry: __dirname + "/assets/app.js",
  output:{
    path: path.join(__dirname, "dist"),
    filename: "app.js"
  },
  plugins: config.plugins.concat([
      new DefinePlugin(merge(GLOBALS, {'__SERVER__': false}))
    ].concat(DEBUG ? [] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
    ])
  ),
});


export default appConfig;