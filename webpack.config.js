const { resolve } = require('path');
const nodeEnv = process.env.NODE_ENV;
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' ),
      NoEmitWebpackPlugin  = require('no-emit-webpack-plugin');

// Configure (S)CSS compilation
const extractConfig = [
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader'
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [ require( 'autoprefixer' ) ],
      }
    },
  },
  {
    loader: 'sass-loader',
    options: {
      implementation: require('sass'), 
      sassOptions: {
        outputStyle: nodeEnv == 'production' ? 'compressed' : 'expanded',
      }
    }
  }
];

module.exports = {
  mode: nodeEnv,
  entry: {
    style : './assets/scss/style.scss'
  },
  output: {
    path: resolve( __dirname, 'assets/css' )
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: extractConfig
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new NoEmitWebpackPlugin([ 
      //Do not emit JS asset from (S)CSS
      'style.js'
    ])
  ]
};