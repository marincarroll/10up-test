const path = require( 'path' );
const nodeEnv = process.env.NODE_ENV;

module.exports = {
  mode: nodeEnv,
  entry: {
    'core-mods' : './assets/js/src/core-mods.js',
  },
  output: {
    path: path.resolve( __dirname, 'assets/js/build' ),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};